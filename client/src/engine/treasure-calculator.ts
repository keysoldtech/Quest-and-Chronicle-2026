import type { GameState, HeroInstance, PlayerState, TreasureType } from '../data/types';
import { getTreasureCount } from './game-state';

export interface LureResult {
  heroIndex: number;
  targetPlayerId: string | null; // null = stays in town
}

/**
 * For each hero in town, determine which dungeon they are lured to.
 * Standard (2-4p): hero goes to dungeon with most matching treasure; ties = stays in town.
 * Variant (5-6p): ties split heroes by XP order.
 */
export function calculateLuring(state: GameState): LureResult[] {
  const results: LureResult[] = [];
  const isVariant = state.config.woundLimit === Infinity;

  for (let hi = 0; hi < state.town.length; hi++) {
    const hero = state.town[hi];
    const treasure = hero.card.treasure;
    const scores = state.players.map(p => ({
      playerId: p.id,
      count: getTreasureCount(p, treasure),
      xp: p.boss.xp,
    }));

    const maxCount = Math.max(...scores.map(s => s.count));
    if (maxCount === 0) {
      results.push({ heroIndex: hi, targetPlayerId: null });
      continue;
    }

    const tied = scores.filter(s => s.count === maxCount);

    if (tied.length === 1) {
      results.push({ heroIndex: hi, targetPlayerId: tied[0].playerId });
    } else if (isVariant) {
      // 5-6p variant: highest XP among tied players gets the hero
      tied.sort((a, b) => b.xp - a.xp);
      results.push({ heroIndex: hi, targetPlayerId: tied[0].playerId });
    } else {
      // Standard: tie = hero stays in town
      results.push({ heroIndex: hi, targetPlayerId: null });
    }
  }

  return results;
}

/** Get the total treasure counts for a player, keyed by treasure type. */
export function getTreasureSummary(player: PlayerState): Record<TreasureType, number> {
  const types: TreasureType[] = ['fighter', 'mage', 'thief', 'cleric', 'explorer'];
  const summary: Record<string, number> = {};
  for (const t of types) {
    summary[t] = getTreasureCount(player, t);
  }
  return summary as Record<TreasureType, number>;
}
