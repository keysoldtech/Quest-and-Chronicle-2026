import type {
  GameState, PlayerState, CardEffect, RoomAbility, DungeonRoom, HeroInstance,
} from '../data/types';
import { addToLog } from './game-state';
import { drawCards } from '../utils/shuffle';

/**
 * Resolve a room's "When Built" ability.
 */
export function resolveOnBuildEffect(
  state: GameState,
  player: PlayerState,
  room: DungeonRoom,
): void {
  const ability = room.card.ability;
  if (!ability || ability.trigger !== 'onBuild') return;

  resolveRoomAbility(state, player, ability);
}

/**
 * Resolve a generic room ability effect.
 */
export function resolveRoomAbility(
  state: GameState,
  player: PlayerState,
  ability: RoomAbility,
): void {
  switch (ability.effect) {
    case 'drawSpell': {
      const count = ability.value ?? 1;
      const drawn = drawCards(state.decks.spell, count);
      for (const card of drawn) player.hand.push(card);
      addToLog(state, player.id, 'draw', `Drew ${drawn.length} spell card(s)`);
      break;
    }

    case 'drawRoom': {
      const count = ability.value ?? 1;
      const drawn = drawCards(state.decks.room, count);
      for (const card of drawn) player.hand.push(card);
      addToLog(state, player.id, 'draw', `Drew ${drawn.length} room card(s)`);
      break;
    }

    case 'drawCard': {
      const count = ability.value ?? 1;
      const drawn = drawCards(state.decks.room, count);
      for (const card of drawn) player.hand.push(card);
      addToLog(state, player.id, 'draw', `Drew ${drawn.length} card(s)`);
      break;
    }

    case 'drawMiniboss': {
      const count = ability.value ?? 1;
      const drawn = drawCards(state.decks.miniboss, count);
      for (const card of drawn) player.minibossHand.push(card);
      addToLog(state, player.id, 'draw', `Drew ${drawn.length} miniboss card(s)`);
      break;
    }

    case 'gainCoins': {
      const amount = ability.value ?? 1;
      player.coins += amount;
      addToLog(state, player.id, 'coins', `Gained ${amount} coin(s)`);
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
        addToLog(state, player.id, 'coins', `Stole ${amount} coin(s) from each opponent`);
      }
      break;
    }

    case 'healWound': {
      if (player.wounds.length > 0) {
        const healed = player.wounds.pop()!;
        player.souls.push(healed);
        addToLog(state, player.id, 'heal', 'Converted 1 wound to a soul');
      }
      break;
    }

    case 'opponentsDiscard': {
      for (const other of state.players) {
        if (other.id === player.id) continue;
        if (ability.cardType === 'spell') {
          const spellIdx = other.hand.findIndex(c => 'spellType' in c);
          if (spellIdx >= 0) {
            const discarded = other.hand.splice(spellIdx, 1)[0];
            if ('spellType' in discarded) {
              state.discards.spell.push(discarded as any);
            }
          }
        }
      }
      addToLog(state, player.id, 'effect', 'Opponents discarded cards');
      break;
    }

    case 'freePromotion': {
      addToLog(state, player.id, 'effect', 'May promote a miniboss for free');
      break;
    }

    default:
      addToLog(state, player.id, 'effect', `Room ability: ${ability.description}`);
  }
}

/**
 * Resolve a boss level-up effect. Called once when dungeon reaches 5 rooms.
 */
export function resolveBossLevelUp(
  state: GameState,
  player: PlayerState,
): void {
  if (player.bossLeveledUp) return;
  if (player.dungeon.length < 5) return;

  player.bossLeveledUp = true;
  const effect = player.boss.levelUpEffect;

  addToLog(state, player.id, 'level_up',
    `${player.boss.name} leveled up! ${player.boss.levelUpAbility}`);

  // Handle immediate one-shot level-up effects
  switch (effect.type) {
    case 'drawSpell': {
      const count = (effect.value as number) ?? 1;
      const drawn = drawCards(state.decks.spell, count);
      for (const c of drawn) player.hand.push(c);
      break;
    }
    case 'drawRoom': {
      const count = (effect.value as number) ?? 1;
      const drawn = drawCards(state.decks.room, count);
      for (const c of drawn) player.hand.push(c);
      break;
    }
    case 'opponentsDiscard': {
      const count = (effect.value as number) ?? 1;
      for (const other of state.players) {
        if (other.id === player.id) continue;
        for (let i = 0; i < count && other.hand.length > 0; i++) {
          const card = other.hand.pop()!;
          if ('spellType' in card) state.discards.spell.push(card as any);
          else state.discards.room.push(card as any);
        }
      }
      break;
    }
    case 'searchDeck': {
      // In a digital game, this would open a deck browser UI
      addToLog(state, player.id, 'effect', 'May search a deck for a card');
      break;
    }
    default:
      // Passive/ongoing abilities are checked elsewhere (e.g. bonusDamage in combat)
      break;
  }
}

/**
 * Check if a boss has a passive level-up effect of a given type.
 */
export function hasBossPassive(player: PlayerState, effectType: string): boolean {
  if (!player.bossLeveledUp) return false;
  const e = player.boss.levelUpEffect;
  return e.type === effectType && (e.trigger === 'passive' || !e.trigger);
}

/**
 * Get bonus damage from boss passive effects for a room.
 */
export function getBossPassiveDamageBonus(player: PlayerState, room: DungeonRoom): number {
  if (!player.bossLeveledUp) return 0;
  const e = player.boss.levelUpEffect;
  if (e.type !== 'bonusDamage' || e.trigger !== 'passive') return 0;

  const val = (e.value as number) ?? 0;
  const target = e.target as string;

  if (target === 'monsterRooms' && room.card.roomType === 'monster') return val;
  if (target === 'trapRooms' && room.card.roomType === 'trap') return val;
  if (target === 'allRooms') return val;
  if (target === 'lastRoom') {
    const lastIdx = player.dungeon.length - 1;
    if (player.dungeon[lastIdx] === room) return val;
  }
  return 0;
}
