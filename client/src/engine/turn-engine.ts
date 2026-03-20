import type {
  GameState, RoomCard, DungeonRoom, HeroInstance, MinibossCard, PlayerState,
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

export function executeTownPhase(state: GameState): void {
  state.currentPhase = 'town';
  addToLog(state, '', 'phase', `=== Round ${state.roundNumber + 1}: Town Phase ===`);

  const heroCount = state.players.length;
  const heroMode = state.config.heroMode;

  let drawnHeroes: typeof state.decks.heroOrdinary = [];

  if (heroMode === 'h1') {
    if (state.roundNumber < 7) {
      drawnHeroes = drawCards(state.decks.heroOrdinary, heroCount);
    } else {
      drawnHeroes = drawCards(state.decks.heroEpic, heroCount);
      if (drawnHeroes.length < heroCount) {
        drawnHeroes.push(...drawCards(state.decks.heroOrdinary, heroCount - drawnHeroes.length));
      }
    }
  } else if (heroMode === 'h2') {
    drawnHeroes = drawCards(state.decks.heroOrdinary, heroCount);
    if (drawnHeroes.length < heroCount) {
      drawnHeroes.push(...drawCards(state.decks.heroEpic, heroCount - drawnHeroes.length));
    }
  } else {
    drawnHeroes = drawCards(state.decks.heroOrdinary, heroCount);
  }

  for (const hero of drawnHeroes) {
    const heroInst: HeroInstance = {
      card: hero,
      currentHP: hero.health,
      attachedItem: null,
      turnsInTown: 0,
    };

    // Items module: attach item to hero
    if (state.config.modules.items && state.decks.item.length > 0) {
      const item = state.decks.item[0];
      const itemTreasure = item.treasure;
      if (!itemTreasure || itemTreasure === hero.treasure) {
        heroInst.attachedItem = state.decks.item.shift()!;
        addToLog(state, '', 'item_attach', `${heroInst.attachedItem.name} attached to ${hero.name}`);
      }
    }

    state.town.push(heroInst);
    addToLog(state, '', 'hero_arrives',
      `${hero.name} (${hero.class}, HP:${hero.health}${heroInst.attachedItem ? `, carrying ${heroInst.attachedItem.name}` : ''}) arrives in town`);
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
  position: number | 'new';
  attachMiniboss?: MinibossCard;
}

export function validateBuild(state: GameState, action: BuildAction): string | null {
  const player = state.players.find(p => p.id === action.playerId);
  if (!player) return 'Player not found';

  const card = action.roomCard;
  const handIdx = player.hand.indexOf(card);
  if (handIdx < 0) return 'Card not in hand';

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

export function executeBuild(state: GameState, action: BuildAction): void {
  const player = state.players.find(p => p.id === action.playerId)!;
  const card = action.roomCard;

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
    const oldRoom = player.dungeon[action.position];
    // onDestroy ability for the covered room
    if (oldRoom.card.ability?.trigger === 'onDestroy') {
      resolveOnDestroyAbility(state, player, oldRoom);
    }
    state.discards.room.push(oldRoom.card);
    newRoom.position = action.position;
    newRoom.attachedMiniboss = oldRoom.attachedMiniboss;
    player.dungeon[action.position] = newRoom;
  }

  addToLog(state, player.id, 'build',
    `Built ${card.name} (${card.roomType}, ${card.damage} dmg) at position ${newRoom.position}`);

  // Attach miniboss if provided
  if (action.attachMiniboss && state.config.modules.minibosses) {
    const mbIdx = player.minibossHand.indexOf(action.attachMiniboss);
    if (mbIdx >= 0) {
      player.minibossHand.splice(mbIdx, 1);
      newRoom.attachedMiniboss = {
        card: action.attachMiniboss,
        currentLevel: 1,
      };
      addToLog(state, player.id, 'attach_miniboss',
        `Attached ${action.attachMiniboss.name} to ${card.name}`);
    }
  }

  resolveOnBuildEffect(state, player, newRoom);

  if (player.dungeon.length >= 5 && !player.bossLeveledUp) {
    resolveBossLevelUp(state, player);
  }
}

function resolveOnDestroyAbility(state: GameState, player: PlayerState, room: DungeonRoom): void {
  const ability = room.card.ability;
  if (!ability || ability.trigger !== 'onDestroy') return;

  switch (ability.effect) {
    case 'drawRoom': {
      const count = ability.value ?? 1;
      const drawn = drawCards(state.decks.room, count);
      for (const c of drawn) player.hand.push(c);
      addToLog(state, player.id, 'room_destroy', `${room.card.name} destroyed: drew ${count} room(s)`);
      break;
    }
    case 'drawSpell': {
      const count = ability.value ?? 1;
      const drawn = drawCards(state.decks.spell, count);
      for (const c of drawn) player.hand.push(c);
      addToLog(state, player.id, 'room_destroy', `${room.card.name} destroyed: drew ${count} spell(s)`);
      break;
    }
    case 'buildCopy': {
      addToLog(state, player.id, 'room_destroy', `${room.card.name} destroyed: may rebuild a copy`);
      break;
    }
    default:
      addToLog(state, player.id, 'room_destroy', `${room.card.name} destroyed: ${ability.description}`);
  }
}

export function executeBuildPhase(state: GameState, actions: BuildAction[]): void {
  state.currentPhase = 'build';
  addToLog(state, '', 'phase', '=== Build Phase ===');

  // Coins module: grant start-of-turn coins
  if (state.config.modules.coins) {
    for (const p of state.players) {
      p.coins += 1;
      addToLog(state, p.id, 'coins', 'Gained 1 coin (start of turn)');
    }
  }

  // Miniboss module: draw miniboss card each turn
  if (state.config.modules.minibosses && state.decks.miniboss.length > 0) {
    for (const idx of state.turnOrder) {
      const p = state.players[idx];
      const drawn = drawOne(state.decks.miniboss);
      if (drawn) {
        p.minibossHand.push(drawn);
        addToLog(state, p.id, 'draw', `Drew miniboss: ${drawn.name}`);
      }
    }
  }

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

  const toRemove: number[] = [];
  for (const result of lureResults) {
    if (result.targetPlayerId) {
      const hero = state.town[result.heroIndex];
      assignments.get(result.targetPlayerId)!.push(hero);
      toRemove.push(result.heroIndex);
      const targetPlayer = state.players.find(p => p.id === result.targetPlayerId)!;
      addToLog(state, result.targetPlayerId, 'lure',
        `${hero.card.name} lured to ${targetPlayer.name}'s dungeon`);
    } else {
      const hero = state.town[result.heroIndex];
      addToLog(state, '', 'lure', `${hero.card.name} stays in town (tie)`);
    }
  }

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

  resolveSpellStack(state);
}

// ── End Phase ───────────────────────────────────────────────────

export function executeEndPhase(state: GameState): boolean {
  state.currentPhase = 'end';
  addToLog(state, '', 'phase', '=== End Phase ===');

  for (const idx of state.turnOrder) {
    const player = state.players[idx];
    const drawn = drawOne(state.decks.room);
    if (drawn) {
      player.hand.push(drawn);
      addToLog(state, player.id, 'draw', `Drew ${drawn.name}`);
    }

    // Also draw a spell if spell deck has cards
    if (state.decks.spell.length > 0 && state.roundNumber % 2 === 0) {
      const spellDrawn = drawOne(state.decks.spell);
      if (spellDrawn) {
        player.hand.push(spellDrawn);
        addToLog(state, player.id, 'draw', `Drew spell: ${spellDrawn.name}`);
      }
    }
  }

  // Reset per-turn flags
  for (const p of state.players) {
    p.usedLevelUpThisTurn = false;
    for (const r of p.dungeon) {
      r.isDeactivated = false;
    }
  }

  // Miniboss module: promote minibosses that can be promoted (auto for AI)
  // (Player promotion handled via UI)

  const result = checkWinCondition(state);

  if (result.gameOver) {
    state.gameOver = true;
    state.winner = result.winner;
    addToLog(state, '', 'game_over', result.reason);
    return true;
  }

  for (const elimId of result.eliminatedPlayers) {
    addToLog(state, elimId, 'eliminated',
      `${state.players.find(p => p.id === elimId)!.name} has been eliminated!`);
  }

  state.roundNumber++;
  return false;
}

// ── Full Round ──────────────────────────────────────────────────

export function executeRound(state: GameState, buildActions: BuildAction[]): boolean {
  executeTownPhase(state);
  executeBuildPhase(state, buildActions);
  const assignments = executeBaitPhase(state);
  executeAdventurePhase(state, assignments);
  return executeEndPhase(state);
}
