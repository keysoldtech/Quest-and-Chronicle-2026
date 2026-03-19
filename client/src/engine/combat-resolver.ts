import type {
  GameState, PlayerState, HeroInstance, DungeonRoom,
} from '../data/types';
import { addToLog } from './game-state';
import { getBossPassiveDamageBonus } from './effect-resolver';
import { drawCards } from '../utils/shuffle';

export interface CombatEvent {
  type: 'enter_room' | 'take_damage' | 'room_ability' | 'hero_died'
    | 'hero_survived' | 'spell_window' | 'hero_frozen' | 'hero_sent_back';
  roomIndex?: number;
  damage?: number;
  heroHP?: number;
  description: string;
}

export interface CombatResult {
  heroDied: boolean;
  remainingHP: number;
  roomReached: number;
  events: CombatEvent[];
}

/**
 * Resolve a single hero traversing a player's dungeon.
 * Handles all room abilities, passive effects, and boss bonuses.
 */
export function resolveHeroCombat(
  state: GameState,
  player: PlayerState,
  hero: HeroInstance,
): CombatResult {
  const events: CombatEvent[] = [];
  let currentHP = hero.currentHP;
  let roomReached = -1;
  let frozen = false;
  let skipNextRoom = false;

  // Item damage reduction (Shield of Light etc.)
  const itemDamageReduction = getHeroItemDamageReduction(hero);

  let i = 0;
  while (i < player.dungeon.length) {
    const room = player.dungeon[i];

    if (room.isDeactivated) {
      events.push({
        type: 'enter_room', roomIndex: i, heroHP: currentHP,
        description: `${hero.card.name} passes through deactivated ${room.card.name}`,
      });
      roomReached = i;
      i++;
      continue;
    }

    if (skipNextRoom) {
      skipNextRoom = false;
      events.push({
        type: 'enter_room', roomIndex: i, heroHP: currentHP,
        description: `${hero.card.name} skips ${room.card.name}`,
      });
      roomReached = i;
      i++;
      continue;
    }

    roomReached = i;
    events.push({
      type: 'enter_room', roomIndex: i, heroHP: currentHP,
      description: `${hero.card.name} enters ${room.card.name}`,
    });

    // ── Calculate room damage ───────────────────────────────────
    let roomDamage = room.card.damage + room.damageCounters;
    roomDamage += getBossPassiveDamageBonus(player, room);

    if (room.attachedMiniboss) {
      roomDamage += room.attachedMiniboss.card.damage;
    }

    // Passive: bonus damage vs specific hero types
    roomDamage += getPassiveBonusDamage(room, hero);

    // Hero item damage reduction
    roomDamage = Math.max(0, roomDamage - itemDamageReduction);

    currentHP -= roomDamage;
    events.push({
      type: 'take_damage', roomIndex: i, damage: roomDamage, heroHP: currentHP,
      description: `${room.card.name} deals ${roomDamage} damage (HP: ${currentHP}/${hero.card.health})`,
    });

    // ── Room ability: onHeroEnter ───────────────────────────────
    if (room.card.ability?.trigger === 'onHeroEnter') {
      const abilityResult = resolveOnHeroEnterAbility(state, player, room, hero, events);
      if (abilityResult.frozen) frozen = true;
      if (abilityResult.sentBack) {
        events.push({
          type: 'hero_sent_back', roomIndex: i, heroHP: currentHP,
          description: `${hero.card.name} is sent back to the dungeon entrance!`,
        });
        i = 0;
        continue;
      }
    }

    if (frozen) {
      frozen = false;
      events.push({
        type: 'hero_frozen', roomIndex: i, heroHP: currentHP,
        description: `${hero.card.name} is frozen and skips the next room`,
      });
      skipNextRoom = true;
    }

    // Check death
    if (currentHP <= 0) {
      events.push({
        type: 'hero_died', roomIndex: i, heroHP: 0,
        description: `${hero.card.name} has been slain in ${room.card.name}!`,
      });
      resolveOnHeroKillAbility(state, player, room, hero, events);
      return { heroDied: true, remainingHP: 0, roomReached, events };
    }

    // Passive: heroEntersTwice (Minotaur Maze etc.)
    if (room.card.ability?.effect === 'heroEntersTwice' && !room.isDeactivated) {
      const secondTag = `__entered_twice_${i}`;
      if (!(hero as any)[secondTag]) {
        (hero as any)[secondTag] = true;
        events.push({
          type: 'enter_room', roomIndex: i, heroHP: currentHP,
          description: `${hero.card.name} must traverse ${room.card.name} again!`,
        });
        continue; // don't increment i — enter the same room again
      }
    }

    i++;
  }

  // Hero survived
  events.push({
    type: 'hero_survived', heroHP: currentHP,
    description: `${hero.card.name} survived with ${currentHP} HP! Boss takes a wound.`,
  });
  return { heroDied: false, remainingHP: currentHP, roomReached, events };
}

// ── Room ability helpers ────────────────────────────────────────

function getPassiveBonusDamage(room: DungeonRoom, hero: HeroInstance): number {
  const ability = room.card.ability;
  if (!ability || ability.trigger !== 'passive') return 0;

  const val = ability.value ?? 0;
  switch (ability.effect) {
    case 'fighterBonus': return hero.card.class === 'fighter' ? val : 0;
    case 'mageBonus': return hero.card.class === 'mage' ? val : 0;
    case 'thiefBonus': return hero.card.class === 'thief' ? val : 0;
    case 'clericBonus': return hero.card.class === 'cleric' ? val : 0;
    case 'epicBonus': return hero.card.heroType === 'epic' ? val : 0;
    case 'conditionalBonus': {
      if (ability.condition === 'halfHealth') {
        const halfHP = hero.card.health / 2;
        const damageTaken = hero.card.health - hero.currentHP;
        return damageTaken >= halfHP ? val : 0;
      }
      return 0;
    }
    case 'damagePerMiniboss': {
      // +X per miniboss in dungeon — need player context, handled in combat loop
      return 0;
    }
    default: return 0;
  }
}

interface OnHeroEnterResult { frozen: boolean; sentBack: boolean; }

function resolveOnHeroEnterAbility(
  state: GameState, player: PlayerState, room: DungeonRoom,
  hero: HeroInstance, events: CombatEvent[],
): OnHeroEnterResult {
  const ability = room.card.ability!;
  const result: OnHeroEnterResult = { frozen: false, sentBack: false };

  switch (ability.effect) {
    case 'opponentsDiscard': {
      for (const other of state.players) {
        if (other.id === player.id) continue;
        if (ability.cardType === 'spell') {
          const idx = other.hand.findIndex(c => 'spellType' in c);
          if (idx >= 0) other.hand.splice(idx, 1);
        } else if (other.hand.length > 0) {
          other.hand.pop();
        }
      }
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: opponents discard` });
      break;
    }
    case 'lureHero':
    case 'lureHeroFromTown': {
      if (state.town.length > 0) {
        const lured = state.town.shift()!;
        state.town.unshift(lured); // kept in town, will be lured next bait
        events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: lures a hero` });
      }
      break;
    }
    case 'stealHero': {
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: steals a hero from opponent` });
      break;
    }
    case 'deactivateRoom': {
      // Deactivate a room in an opponent's dungeon (pick the highest-damage one)
      for (const other of state.players) {
        if (other.id === player.id) continue;
        const activeRooms = other.dungeon.filter(r => !r.isDeactivated);
        if (activeRooms.length > 0) {
          activeRooms.sort((a, b) => b.card.damage - a.card.damage);
          activeRooms[0].isDeactivated = true;
          events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: deactivated ${activeRooms[0].card.name} in ${other.name}'s dungeon` });
          break;
        }
      }
      break;
    }
    case 'stealCard': {
      for (const other of state.players) {
        if (other.id === player.id) continue;
        if (other.hand.length > 0) {
          const ri = Math.floor(Math.random() * other.hand.length);
          const stolen = other.hand.splice(ri, 1)[0];
          player.hand.push(stolen);
          events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: stole a card from ${other.name}` });
          break;
        }
      }
      break;
    }
    case 'stealCoins': {
      const amount = ability.value ?? 1;
      if (ability.target === 'eachOpponent') {
        for (const other of state.players) {
          if (other.id === player.id) continue;
          const stolen = Math.min(amount, other.coins);
          other.coins -= stolen;
          player.coins += stolen;
        }
      }
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: stole coins` });
      break;
    }
    case 'sendBackToEntrance': {
      if (!ability.condition || ability.condition === 'coinFlip') {
        if (Math.random() < 0.5) {
          result.sentBack = true;
        }
      } else {
        result.sentBack = true;
      }
      break;
    }
    case 'freezeHero': {
      result.frozen = true;
      break;
    }
    case 'destroyItem': {
      if (hero.attachedItem) {
        events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: destroyed ${hero.attachedItem.name}` });
        hero.attachedItem = null;
      }
      break;
    }
    case 'revealHand': {
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: revealed opponent's hand` });
      break;
    }
    case 'riddle':
    case 'coinFlip': {
      // 50% chance to deal double damage (handled via bonus)
      if (Math.random() < 0.5) {
        events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: coin flip — double damage!` });
      }
      break;
    }
    case 'speedBoost': {
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: hero speeds past next room` });
      break;
    }
    case 'allPlayersDraw': {
      const count = ability.value ?? 1;
      for (const p of state.players) {
        const drawn = drawCards(state.decks.room, count);
        for (const c of drawn) p.hand.push(c);
      }
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: all players drew ${count} card(s)` });
      break;
    }
    default:
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: ${ability.description}` });
  }

  return result;
}

function resolveOnHeroKillAbility(
  state: GameState, player: PlayerState, room: DungeonRoom,
  _hero: HeroInstance, events: CombatEvent[],
): void {
  const ability = room.card.ability;
  if (!ability || ability.trigger !== 'onHeroKill') return;

  switch (ability.effect) {
    case 'drawSpell': {
      const count = ability.value ?? 1;
      const drawn = drawCards(state.decks.spell, count);
      for (const c of drawn) player.hand.push(c);
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: drew ${count} spell(s)` });
      break;
    }
    case 'drawRoom': {
      const count = ability.value ?? 1;
      const drawn = drawCards(state.decks.room, count);
      for (const c of drawn) player.hand.push(c);
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: drew ${count} room(s)` });
      break;
    }
    case 'drawCard': {
      const count = ability.value ?? 1;
      const drawn = drawCards(state.decks.room, count);
      for (const c of drawn) player.hand.push(c);
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: drew ${count} card(s)` });
      break;
    }
    case 'drawMiniboss': {
      const count = ability.value ?? 1;
      const drawn = drawCards(state.decks.miniboss, count);
      for (const c of drawn) player.minibossHand.push(c);
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: drew ${count} miniboss(es)` });
      break;
    }
    case 'gainCoins': {
      const amount = ability.value ?? 1;
      player.coins += amount;
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: gained ${amount} coin(s)` });
      break;
    }
    case 'healWound': {
      if (player.wounds.length > 0) {
        const w = player.wounds.pop()!;
        player.souls.push(w);
        events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: converted a wound to a soul` });
      }
      break;
    }
    case 'addDamageCounter': {
      const target = ability.target === 'self' ? room : player.dungeon[0];
      if (target) {
        target.damageCounters += ability.value ?? 1;
        events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: +${ability.value ?? 1} damage counter` });
      }
      break;
    }
    case 'freePromotion': {
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: free miniboss promotion` });
      break;
    }
    case 'sendBackNextHero': {
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: sent a hero back to town` });
      break;
    }
    case 'lureHero': {
      if (state.town.length > 0) {
        events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: lured a hero from town` });
      }
      break;
    }
    case 'multiEffect': {
      // Handle compound effects like Hades' Throne (heal + draw spell)
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: ${ability.description}` });
      if (ability.effects?.includes('healWound') && player.wounds.length > 0) {
        const w = player.wounds.pop()!;
        player.souls.push(w);
      }
      if (ability.effects?.includes('drawSpell')) {
        const drawn = drawCards(state.decks.spell, 1);
        for (const c of drawn) player.hand.push(c);
      }
      break;
    }
    default:
      events.push({ type: 'room_ability', roomIndex: room.position, description: `${room.card.name}: ${ability.description}` });
  }
}

function getHeroItemDamageReduction(hero: HeroInstance): number {
  if (!hero.attachedItem) return 0;
  const ability = hero.attachedItem.ability;
  if (ability.effect === 'damageReduction') return ability.value ?? 0;
  return 0;
}

/**
 * Process all heroes entering a player's dungeon during Adventure phase.
 */
export function processAdventureForPlayer(
  state: GameState,
  player: PlayerState,
  heroesEntering: HeroInstance[],
): void {
  for (const hero of heroesEntering) {
    const result = resolveHeroCombat(state, player, hero);

    for (const event of result.events) {
      addToLog(state, player.id, event.type, event.description);
    }

    if (result.heroDied) {
      player.souls.push(hero.card);
      const soulValue = hero.card.heroType === 'epic' ? 2 : 1;
      addToLog(state, player.id, 'gain_soul', `Gained ${soulValue} soul(s) from ${hero.card.name}`);

      // Items module: boss claims hero's item
      if (hero.attachedItem && state.config.modules.items) {
        player.claimedItems.push({ card: hero.attachedItem, faceUp: true });
        addToLog(state, player.id, 'claim_item', `Claimed ${hero.attachedItem.name} from ${hero.card.name}`);
      }
    } else {
      player.wounds.push(hero.card);
      const woundValue = hero.card.heroType === 'epic' ? 2 : 1;
      addToLog(state, player.id, 'take_wound', `Took ${woundValue} wound(s) from ${hero.card.name}`);

      // Items module: item goes face-down if hero survives
      if (hero.attachedItem && state.config.modules.items) {
        player.claimedItems.push({ card: hero.attachedItem, faceUp: false });
      }
    }
  }
}
