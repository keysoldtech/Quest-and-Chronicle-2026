import type {
  GameState, RoomCard, DungeonRoom, HeroInstance,
} from '../data/types';
import {
  addToLog, isDungeonFull,
} from './game-state';
import { calculateLuring } from './treasure-calculator';
import { processAdventureForPlayer } from './combat-resolver';
import { resolveOnBuildEffect, resolveBossLevelUp } from './effect-resolver';
import { resolveSpellStack } from './spell-stack';
import { checkWinCondition } from './win-condition';
import { drawCards, drawOne } from '../utils/shuffle';

// ── Town Phase ──────────────────────────────────────────────────

/**
 * Draw heroes from the appropriate deck and place them in town.
 * Hero Mode determines which deck to draw from.
 */
export function executeTownPhase(state: GameState): void {
  state.currentPhase = 'town';
  addToLog(state, '', 'phase', `=== Round ${state.roundNumber + 1}: Town Phase ===`);

  const heroCount = state.players.length;
  const heroMode = state.config.heroMode;

  let drawnHeroes: typeof state.decks.heroOrdinary = [];

  if (heroMode === 'h1') {
    // H1: First 7 rounds = ordinary, then epic
    if (state.roundNumber < 7) {
      drawnHeroes = drawCards(state.decks.heroOrdinary, heroCount);
    } else {
      drawnHeroes = drawCards(state.decks.heroEpic, heroCount);
      if (drawnHeroes.length < heroCount) {
        // Fill remaining from ordinary if epic runs out
        drawnHeroes.push(...drawCards(state.decks.heroOrdinary, heroCount - drawnHeroes.length));
      }
    }
  } else if (heroMode === 'h2') {
    // H2: Ordinary runs out, then epic
    drawnHeroes = drawCards(state.decks.heroOrdinary, heroCount);
    if (drawnHeroes.length < heroCount) {
      drawnHeroes.push(...drawCards(state.decks.heroEpic, heroCount - drawnHeroes.length));
    }
  } else {
    // H3: Combined deck (would need to be pre-shuffled at setup)
    drawnHeroes = drawCards(state.decks.heroOrdinary, heroCount);
  }

  for (const hero of drawnHeroes) {
    state.town.push({
      card: hero,
      currentHP: hero.health,
      attachedItem: null,
      turnsInTown: 0,
    });
    addToLog(state, '', 'hero_arrives', `${hero.name} (${hero.class}, HP:${hero.health}) arrives in town`);
  }

  // Increment turnsInTown for heroes already in town
  for (const h of state.town) {
    if (!drawnHeroes.includes(h.card)) {
      h.turnsInTown++;
    }
  }
}

// ── Build Phase ─────────────────────────────────────────────────

export interface BuildAction {
  playerId: string;
  roomCard: RoomCard;
  position: number | 'new'; // index to build on top of, or 'new' for new slot
}

/**
 * Validate whether a build action is legal.
 */
export function validateBuild(state: GameState, action: BuildAction): string | null {
  const player = state.players.find(p => p.id === action.playerId);
  if (!player) return 'Player not found';

  const card = action.roomCard;
  const handIdx = player.hand.indexOf(card);
  if (handIdx < 0) return 'Card not in hand';

  // Check dungeon-full first for any room type trying to add a new slot
  if (action.position === 'new' && isDungeonFull(player)) {
    return 'Dungeon is full (5 rooms max)';
  }

  if (card.isAdvanced) {
    if (action.position === 'new') return 'Advanced rooms must be built on top of an existing room';
    const existingRoom = player.dungeon[action.position];
    if (!existingRoom) return 'No room at that position';

    const required = card.requiredTreasure ?? [];
    if (required.length > 0) {
      const existingTreasure = Array.isArray(existingRoom.card.treasure)
        ? existingRoom.card.treasure : [existingRoom.card.treasure];
      const hasMatch = required.some(t => existingTreasure.includes(t));
      if (!hasMatch) return 'Advanced room requires matching treasure on the room below';
    }
  }

  return null;
}

/**
 * Execute a build action for a player.
 */
export function executeBuild(state: GameState, action: BuildAction): void {
  const player = state.players.find(p => p.id === action.playerId)!;
  const card = action.roomCard;

  // Remove from hand
  const handIdx = player.hand.indexOf(card);
  player.hand.splice(handIdx, 1);

  const newRoom: DungeonRoom = {
    card,
    position: 0,
    damageCounters: 0,
    isDeactivated: false,
    attachedMiniboss: null,
    attachedItem: null,
  };

  if (action.position === 'new') {
    newRoom.position = player.dungeon.length;
    player.dungeon.push(newRoom);
  } else {
    // Build on top of existing room
    const oldRoom = player.dungeon[action.position];
    state.discards.room.push(oldRoom.card);
    newRoom.position = action.position;
    // Preserve miniboss attachment
    newRoom.attachedMiniboss = oldRoom.attachedMiniboss;
    player.dungeon[action.position] = newRoom;
  }

  addToLog(state, player.id, 'build',
    `Built ${card.name} (${card.roomType}, ${card.damage} dmg) at position ${newRoom.position}`);

  // Resolve "When Built" ability
  resolveOnBuildEffect(state, player, newRoom);

  // Check boss level-up
  if (player.dungeon.length >= 5 && !player.bossLeveledUp) {
    resolveBossLevelUp(state, player);
  }
}

/**
 * Execute the Build phase for all players.
 * In a real game this would be simultaneous face-down then reveal.
 * For the engine, we process in turn order.
 */
export function executeBuildPhase(state: GameState, actions: BuildAction[]): void {
  state.currentPhase = 'build';
  addToLog(state, '', 'phase', '=== Build Phase ===');

  for (const idx of state.turnOrder) {
    const player = state.players[idx];
    const action = actions.find(a => a.playerId === player.id);
    if (action) {
      const error = validateBuild(state, action);
      if (error) {
        addToLog(state, player.id, 'error', `Invalid build: ${error}`);
      } else {
        executeBuild(state, action);
      }
    } else {
      addToLog(state, player.id, 'skip', 'Chose not to build');
    }
  }
}

// ── Bait Phase ──────────────────────────────────────────────────

export function executeBaitPhase(state: GameState): Map<string, HeroInstance[]> {
  state.currentPhase = 'bait';
  addToLog(state, '', 'phase', '=== Bait Phase ===');

  const lureResults = calculateLuring(state);
  const assignments = new Map<string, HeroInstance[]>();

  for (const p of state.players) assignments.set(p.id, []);

  // Process lure results (iterate backwards so splice doesn't break indices)
  const toRemove: number[] = [];
  for (const result of lureResults) {
    if (result.targetPlayerId) {
      const hero = state.town[result.heroIndex];
      assignments.get(result.targetPlayerId)!.push(hero);
      toRemove.push(result.heroIndex);
      addToLog(state, result.targetPlayerId, 'lure',
        `${hero.card.name} lured to ${state.players.find(p => p.id === result.targetPlayerId)!.name}'s dungeon`);
    } else {
      const hero = state.town[result.heroIndex];
      addToLog(state, '', 'lure', `${hero.card.name} stays in town (tie)`);
    }
  }

  // Remove lured heroes from town (reverse order to preserve indices)
  toRemove.sort((a, b) => b - a);
  for (const idx of toRemove) {
    state.town.splice(idx, 1);
  }

  return assignments;
}

// ── Adventure Phase ─────────────────────────────────────────────

export function executeAdventurePhase(
  state: GameState,
  assignments: Map<string, HeroInstance[]>,
): void {
  state.currentPhase = 'adventure';
  addToLog(state, '', 'phase', '=== Adventure Phase ===');

  for (const idx of state.turnOrder) {
    const player = state.players[idx];
    const heroes = assignments.get(player.id) ?? [];

    if (heroes.length === 0) {
      addToLog(state, player.id, 'adventure', 'No heroes entered dungeon');
      continue;
    }

    processAdventureForPlayer(state, player, heroes);
  }

  // Resolve any pending spells
  resolveSpellStack(state);
}

// ── End Phase ───────────────────────────────────────────────────

export function executeEndPhase(state: GameState): boolean {
  state.currentPhase = 'end';
  addToLog(state, '', 'phase', '=== End Phase ===');

  // Draw 1 room card for each player at end of round
  for (const idx of state.turnOrder) {
    const player = state.players[idx];
    const drawn = drawOne(state.decks.room);
    if (drawn) {
      player.hand.push(drawn);
      addToLog(state, player.id, 'draw', `Drew ${drawn.name}`);
    }
  }

  // Reset per-turn flags
  for (const p of state.players) {
    p.usedLevelUpThisTurn = false;
    // Reactivate deactivated rooms
    for (const r of p.dungeon) {
      r.isDeactivated = false;
    }
  }

  // Check win conditions
  const result = checkWinCondition(state);

  if (result.gameOver) {
    state.gameOver = true;
    state.winner = result.winner;
    addToLog(state, '', 'game_over', result.reason);
    return true;
  }

  // Handle eliminations in standard mode
  for (const elimId of result.eliminatedPlayers) {
    addToLog(state, elimId, 'eliminated',
      `${state.players.find(p => p.id === elimId)!.name} has been eliminated!`);
  }

  state.roundNumber++;
  return false;
}

// ── Full Round ──────────────────────────────────────────────────

/**
 * Execute a complete round of the game.
 * Returns true if the game is over.
 */
export function executeRound(state: GameState, buildActions: BuildAction[]): boolean {
  // 1. Town Phase
  executeTownPhase(state);

  // 2. Build Phase
  executeBuildPhase(state, buildActions);

  // 3. Bait Phase
  const assignments = executeBaitPhase(state);

  // 4. Adventure Phase
  executeAdventurePhase(state, assignments);

  // 5. End Phase
  return executeEndPhase(state);
}
