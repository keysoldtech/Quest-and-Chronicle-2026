import type { GameState, PlayerState, SpellCard, MinibossCard } from '../data/types';
import { getRoomsInHand, getSpellsInHand, isDungeonFull, getTreasureCount } from '../engine/game-state';
import { validateBuild, type BuildAction } from '../engine/turn-engine';
import { canPlaySpell } from '../engine/spell-stack';

/**
 * AI build decision: treasure-aware room selection.
 * Prioritizes rooms whose treasure type matches heroes currently in town,
 * then falls back to highest damage.
 */
export function makeBuildDecision(
  state: GameState,
  player: PlayerState,
): BuildAction | null {
  const rooms = getRoomsInHand(player);
  if (rooms.length === 0) return null;

  // Score rooms by: treasure demand (heroes in town) + damage + ability bonus
  const townTreasureDemand: Record<string, number> = {};
  for (const hero of state.town) {
    townTreasureDemand[hero.card.treasure] = (townTreasureDemand[hero.card.treasure] ?? 0) + 1;
  }

  const scored = rooms.map(room => {
    const treasures = Array.isArray(room.treasure) ? room.treasure : [room.treasure];
    let score = room.damage * 10;
    score += room.ability ? 5 : 0;
    score += room.isAdvanced ? 8 : 0;

    // Bonus for matching treasure types that heroes in town want
    for (const t of treasures) {
      score += (townTreasureDemand[t] ?? 0) * 15;
    }

    // Bonus if we're currently losing the treasure race for this type
    for (const t of treasures) {
      const myCount = getTreasureCount(player, t);
      const maxOpponent = Math.max(
        ...state.players.filter(p => p.id !== player.id).map(p => getTreasureCount(p, t))
      );
      if (myCount <= maxOpponent) score += 10;
    }

    return { room, score };
  }).sort((a, b) => b.score - a.score);

  for (const { room } of scored) {
    // Try new slot first
    if (!isDungeonFull(player)) {
      const err = validateBuild(state, { playerId: player.id, roomCard: room, position: 'new' });
      if (!err) {
        const mb = pickMinibossToAttach(player);
        return { playerId: player.id, roomCard: room, position: 'new', attachMiniboss: mb ?? undefined };
      }
    }

    // Try upgrading weakest room (only if new room is stronger)
    if (player.dungeon.length > 0) {
      const weakest = [...player.dungeon]
        .sort((a, b) => (a.card.damage + a.damageCounters) - (b.card.damage + b.damageCounters));

      for (const slot of weakest) {
        if (room.damage <= slot.card.damage && !room.isAdvanced) continue;
        const pos = player.dungeon.indexOf(slot);
        const err = validateBuild(state, { playerId: player.id, roomCard: room, position: pos });
        if (!err) {
          return { playerId: player.id, roomCard: room, position: pos };
        }
      }
    }
  }

  // Fall back: any valid build
  for (const room of rooms) {
    if (!isDungeonFull(player)) {
      const err = validateBuild(state, { playerId: player.id, roomCard: room, position: 'new' });
      if (!err) return { playerId: player.id, roomCard: room, position: 'new' };
    }
  }

  return null;
}

/**
 * AI spell decision: considers all phases.
 */
export function makeSpellDecision(
  state: GameState,
  player: PlayerState,
): SpellCard | null {
  const spells = getSpellsInHand(player);
  if (spells.length === 0) return null;

  for (const spell of spells) {
    if (!canPlaySpell(state, spell)) continue;

    // Play draw spells eagerly
    if (['drawRoom', 'drawSpell', 'drawCard', 'drawMiniboss'].includes(spell.effect.type)) {
      return spell;
    }

    // Play heal spells when wounded
    if (spell.effect.type === 'healWound' && player.wounds.length > 0) {
      return spell;
    }

    // Play coin spells when coins module is active
    if (spell.effect.type === 'gainCoins' && state.config.modules.coins) {
      return spell;
    }

    // Play damage spells during adventure if there are heroes
    if (state.currentPhase === 'adventure' || state.currentPhase === 'bait') {
      if (['damageHero', 'killHero', 'bonusDamage'].includes(spell.effect.type) && state.town.length > 0) {
        return spell;
      }
    }

    // Play extra build during build phase
    if (['buildExtraRoom', 'extraBuild'].includes(spell.effect.type) && getRoomsInHand(player).length > 1) {
      return spell;
    }
  }

  return null;
}

function pickMinibossToAttach(player: PlayerState): MinibossCard | null {
  if (player.minibossHand.length === 0) return null;
  // Attach the first available miniboss
  return player.minibossHand[0];
}
