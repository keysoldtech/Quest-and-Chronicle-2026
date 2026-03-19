import type { GameState, PlayerState, TreasureType } from '../data/types';
import { getTreasureCount } from './game-state';

export interface LureResult {
  heroIndex: number;
  targetPlayerId: string | null; // null = stays in town
}

/**
 * For each hero in town, determine which dungeon they are lured to.
 *
 * Tiebreaker order:
 *   1. Most matching treasure
 *   2. Fewest total rooms (smaller dungeon is "hungrier")
 *   3. Highest Boss XP
 * If still tied after all three, the hero stays in town.
 *
 * In the 5-6p variant (unlimited lives), ties always resolve
 * (XP is the final breaker; first in turn order wins).
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
      dungeonSize: p.dungeon.length,
      xp: p.boss.xp,
    }));

    const maxCount = Math.max(...scores.map(s => s.count));
    if (maxCount === 0) {
      results.push({ heroIndex: hi, targetPlayerId: null });
      continue;
    }

    let candidates = scores.filter(s => s.count === maxCount);

    if (candidates.length === 1) {
      results.push({ heroIndex: hi, targetPlayerId: candidates[0].playerId });
      continue;
    }

    // Tiebreaker 2: fewest rooms
    const minRooms = Math.min(...candidates.map(c => c.dungeonSize));
    candidates = candidates.filter(c => c.dungeonSize === minRooms);

    if (candidates.length === 1) {
      results.push({ heroIndex: hi, targetPlayerId: candidates[0].playerId });
      continue;
    }

    // Tiebreaker 3: highest XP
    candidates.sort((a, b) => b.xp - a.xp);
    if (candidates[0].xp !== candidates[1].xp || isVariant) {
      results.push({ heroIndex: hi, targetPlayerId: candidates[0].playerId });
    } else {
      // True tie after all breakers in standard mode — stays in town
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
