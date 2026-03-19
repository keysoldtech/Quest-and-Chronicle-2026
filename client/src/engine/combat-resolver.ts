import type {
  GameState, PlayerState, HeroInstance,
} from '../data/types';
import { addToLog } from './game-state';

export interface CombatEvent {
  type: 'enter_room' | 'take_damage' | 'room_ability' | 'hero_died' | 'hero_survived' | 'spell_window';
  roomIndex?: number;
  damage?: number;
  heroHP?: number;
  description: string;
}

export interface CombatResult {
  heroDied: boolean;
  remainingHP: number;
  roomReached: number; // index of last room entered (-1 if never entered)
  events: CombatEvent[];
}

/**
 * Resolve a single hero traversing a player's dungeon.
 * Hero enters Room 0 (entrance, farthest from boss) and moves toward higher indices.
 */
export function resolveHeroCombat(
  _state: GameState,
  player: PlayerState,
  hero: HeroInstance,
): CombatResult {
  const events: CombatEvent[] = [];
  let currentHP = hero.currentHP;
  let roomReached = -1;

  for (let i = 0; i < player.dungeon.length; i++) {
    const room = player.dungeon[i];

    if (room.isDeactivated) {
      events.push({
        type: 'enter_room',
        roomIndex: i,
        heroHP: currentHP,
        description: `${hero.card.name} passes through deactivated ${room.card.name}`,
      });
      roomReached = i;
      continue;
    }

    roomReached = i;
    events.push({
      type: 'enter_room',
      roomIndex: i,
      heroHP: currentHP,
      description: `${hero.card.name} enters ${room.card.name}`,
    });

    // Calculate room damage
    let roomDamage = room.card.damage + room.damageCounters;

    // Miniboss bonus damage
    if (room.attachedMiniboss) {
      roomDamage += room.attachedMiniboss.card.damage;
    }

    // Apply damage
    currentHP -= roomDamage;
    events.push({
      type: 'take_damage',
      roomIndex: i,
      damage: roomDamage,
      heroHP: currentHP,
      description: `${room.card.name} deals ${roomDamage} damage (HP: ${currentHP}/${hero.card.health})`,
    });

    // Room ability trigger: onHeroEnter
    if (room.card.ability && room.card.ability.trigger === 'onHeroEnter') {
      events.push({
        type: 'room_ability',
        roomIndex: i,
        description: `${room.card.name} ability: ${room.card.ability.description}`,
      });
    }

    // Spell interrupt window
    events.push({
      type: 'spell_window',
      roomIndex: i,
      heroHP: currentHP,
      description: 'Spell interrupt window',
    });

    // Check if hero dies
    if (currentHP <= 0) {
      events.push({
        type: 'hero_died',
        roomIndex: i,
        heroHP: 0,
        description: `${hero.card.name} has been slain in ${room.card.name}!`,
      });

      // Trigger onHeroKill abilities
      if (room.card.ability && room.card.ability.trigger === 'onHeroKill') {
        events.push({
          type: 'room_ability',
          roomIndex: i,
          description: `${room.card.name} kill effect: ${room.card.ability.description}`,
        });
      }

      return { heroDied: true, remainingHP: 0, roomReached, events };
    }
  }

  // Hero survived the dungeon
  events.push({
    type: 'hero_survived',
    heroHP: currentHP,
    description: `${hero.card.name} survived with ${currentHP} HP! Boss takes a wound.`,
  });

  return { heroDied: false, remainingHP: currentHP, roomReached, events };
}

/**
 * Process all heroes entering a player's dungeon during Adventure phase.
 * Returns the list of heroes that were lured to this dungeon.
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
      // Boss gains soul(s)
      player.souls.push(hero.card);
      const soulValue = hero.card.heroType === 'epic' ? 2 : 1;
      addToLog(state, player.id, 'gain_soul',
        `Gained ${soulValue} soul(s) from ${hero.card.name}`);
    } else {
      // Boss takes wound(s)
      player.wounds.push(hero.card);
      const woundValue = hero.card.heroType === 'epic' ? 2 : 1;
      addToLog(state, player.id, 'take_wound',
        `Took ${woundValue} wound(s) from ${hero.card.name}`);
    }
  }
}
