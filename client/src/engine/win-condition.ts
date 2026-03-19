import type { GameState, PlayerState } from '../data/types';
import { getSoulCount, getWoundCount, getNetScore } from './game-state';

export interface WinCheckResult {
  gameOver: boolean;
  winner: string | null;
  eliminatedPlayers: string[];
  reason: string;
}

/**
 * Check win/loss conditions at end of each round.
 *
 * Standard (2-4p):
 *   - Win: first to 10+ souls
 *   - Lose: 5+ wounds → eliminated
 *   - If all but one eliminated, last standing wins
 *
 * Unlimited Lives (5-6p variant):
 *   - No elimination from wounds
 *   - Game ends when someone reaches 10 souls OR both hero decks empty
 *   - Winner = highest (souls - wounds); tie broken by lowest XP
 */
export function checkWinCondition(state: GameState): WinCheckResult {
  const isUnlimited = state.config.woundLimit === Infinity;
  const eliminated: string[] = [];

  if (!isUnlimited) {
    // Standard: check for elimination
    for (const p of state.players) {
      if (getWoundCount(p) >= state.config.woundLimit) {
        eliminated.push(p.id);
      }
    }

    // Check if only one player remains
    const alive = state.players.filter(p => !eliminated.includes(p.id));
    if (alive.length === 1) {
      return {
        gameOver: true,
        winner: alive[0].id,
        eliminatedPlayers: eliminated,
        reason: `${alive[0].name} is the last boss standing!`,
      };
    }
    if (alive.length === 0) {
      return {
        gameOver: true,
        winner: null,
        eliminatedPlayers: eliminated,
        reason: 'All bosses have been defeated! No winner.',
      };
    }

    // Check for soul victory among alive players
    const soulWinners = alive.filter(p => getSoulCount(p) >= state.config.soulTarget);
    if (soulWinners.length > 0) {
      // Tiebreak: most souls, then highest XP
      soulWinners.sort((a, b) => {
        const diff = getSoulCount(b) - getSoulCount(a);
        if (diff !== 0) return diff;
        return b.boss.xp - a.boss.xp;
      });
      return {
        gameOver: true,
        winner: soulWinners[0].id,
        eliminatedPlayers: eliminated,
        reason: `${soulWinners[0].name} collected ${getSoulCount(soulWinners[0])} souls!`,
      };
    }
  } else {
    // Unlimited Lives variant
    const soulReached = state.players.some(p => getSoulCount(p) >= state.config.soulTarget);
    const decksEmpty = state.decks.heroOrdinary.length === 0 && state.decks.heroEpic.length === 0;

    if (soulReached || decksEmpty) {
      const sorted = [...state.players].sort((a, b) => {
        const diff = getNetScore(b) - getNetScore(a);
        if (diff !== 0) return diff;
        return a.boss.xp - b.boss.xp; // lower XP wins ties
      });
      return {
        gameOver: true,
        winner: sorted[0].id,
        eliminatedPlayers: [],
        reason: `${sorted[0].name} wins with score ${getNetScore(sorted[0])}!`,
      };
    }
  }

  return {
    gameOver: false,
    winner: null,
    eliminatedPlayers: eliminated,
    reason: '',
  };
}
