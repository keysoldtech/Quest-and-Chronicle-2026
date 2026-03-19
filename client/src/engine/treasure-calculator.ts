import type { GameState, PlayerState, TreasureType } from '../data/types';
import { getTreasureCount } from './game-state';

export interface LureResult {
  heroIndex: number;
  targetPlayerId: string | null; // null = stays in town
}

/** How many rounds a hero waits in town before tiebreakers force luring. */
const STALE_HERO_ROUNDS = 2;

/**
 * For each hero in town, determine which dungeon they are lured to.
 *
 * Core rule: hero goes to the dungeon with the most matching treasure.
 * If two or more dungeons are tied, the hero **stays in town** — this
 * is intentional and forces players to be strategic about which rooms
 * they build.
 *
 * Staleness rule: if a hero has been waiting in town for 2+ rounds
 * (meaning ties have kept it stuck), tiebreakers kick in to prevent
 * permanent gridlock:
 *   1. Fewest total rooms (smaller dungeon is "hungrier")
 *   2. Highest Boss XP
 *
 * In the 5-6p variant (unlimited lives), tiebreakers always apply
 * immediately (no waiting).
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

    const candidates = scores.filter(s => s.count === maxCount);

    // No tie — hero goes to the clear winner
    if (candidates.length === 1) {
      results.push({ heroIndex: hi, targetPlayerId: candidates[0].playerId });
      continue;
    }

    // Tied! Check if the hero has been waiting long enough for forced resolution,
    // or if we're in the 5-6p variant where ties always resolve immediately.
    const forceResolve = isVariant || hero.turnsInTown >= STALE_HERO_ROUNDS;

    if (!forceResolve) {
      // Strategic tie — hero stays in town, players must adjust their builds
      results.push({ heroIndex: hi, targetPlayerId: null });
      continue;
    }

    // Forced resolution: break the tie with secondary criteria
    let remaining = candidates;

    // Tiebreaker 1: fewest rooms (smaller dungeon is hungrier)
    const minRooms = Math.min(...remaining.map(c => c.dungeonSize));
    remaining = remaining.filter(c => c.dungeonSize === minRooms);

    if (remaining.length === 1) {
      results.push({ heroIndex: hi, targetPlayerId: remaining[0].playerId });
      continue;
    }

    // Tiebreaker 2: highest XP
    remaining.sort((a, b) => b.xp - a.xp);
    // At this point just pick the first one — XP ties between bosses are very rare
    results.push({ heroIndex: hi, targetPlayerId: remaining[0].playerId });
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
