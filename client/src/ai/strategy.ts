import type { GameState, PlayerState, SpellCard } from '../data/types';
import { getRoomsInHand, getSpellsInHand, isDungeonFull } from '../engine/game-state';
import { validateBuild, type BuildAction } from '../engine/turn-engine';
import { canPlaySpell } from '../engine/spell-stack';

/**
 * AI build decision: pick the best room to build.
 * Strategy: prioritize highest damage, prefer filling empty slots, then upgrades.
 */
export function makeBuildDecision(
  state: GameState,
  player: PlayerState,
): BuildAction | null {
  const rooms = getRoomsInHand(player);
  if (rooms.length === 0) return null;

  // Sort rooms by damage (highest first), then by whether they have abilities
  const scored = rooms.map(room => ({
    room,
    score: room.damage * 10 + (room.ability ? 5 : 0) + (room.isAdvanced ? 3 : 0),
  })).sort((a, b) => b.score - a.score);

  for (const { room } of scored) {
    // Try building in a new slot first
    if (!isDungeonFull(player)) {
      const error = validateBuild(state, {
        playerId: player.id,
        roomCard: room,
        position: 'new',
      });
      if (!error) {
        return { playerId: player.id, roomCard: room, position: 'new' };
      }
    }

    // Try building on top of lowest-damage existing room
    if (player.dungeon.length > 0) {
      const sortedSlots = [...player.dungeon]
        .sort((a, b) => a.card.damage - b.card.damage);

      for (const slot of sortedSlots) {
        if (room.damage <= slot.card.damage && !room.isAdvanced) continue;
        const pos = player.dungeon.indexOf(slot);
        const error = validateBuild(state, {
          playerId: player.id,
          roomCard: room,
          position: pos,
        });
        if (!error) {
          return { playerId: player.id, roomCard: room, position: pos };
        }
      }
    }
  }

  // Fall back to building any valid room
  for (const room of rooms) {
    if (!isDungeonFull(player)) {
      const error = validateBuild(state, {
        playerId: player.id, roomCard: room, position: 'new',
      });
      if (!error) return { playerId: player.id, roomCard: room, position: 'new' };
    }
  }

  return null;
}

/**
 * AI spell decision: play a spell if beneficial.
 * Only plays during build phase for now (simple strategy).
 */
export function makeSpellDecision(
  state: GameState,
  player: PlayerState,
): SpellCard | null {
  const spells = getSpellsInHand(player);
  if (spells.length === 0) return null;

  // During build phase, play draw spells or build-enhancing spells
  for (const spell of spells) {
    if (!canPlaySpell(state, spell)) continue;

    // Play draw spells eagerly
    if (spell.effect.type === 'drawRoom' || spell.effect.type === 'drawSpell' ||
        spell.effect.type === 'drawCard') {
      return spell;
    }

    // Play build-related spells
    if (spell.effect.type === 'buildExtraRoom' && getRoomsInHand(player).length > 1) {
      return spell;
    }
  }

  return null;
}
