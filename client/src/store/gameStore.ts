import { create } from 'zustand';
import type {
  GameState, GameConfig, BossCard, RoomCard, SpellCard,
  PlayerState, Phase,
} from '../data/types';
import { createInitialState } from '../engine/game-state';
import {
  executeTownPhase, executeBuildPhase, executeBaitPhase,
  executeAdventurePhase, executeEndPhase, validateBuild,
  type BuildAction,
} from '../engine/turn-engine';
import { resolveSpellStack, canPlaySpell, pushSpell } from '../engine/spell-stack';
import { CardDatabase } from '../data/database';
import { makeBuildDecision, makeSpellDecision } from '../ai/strategy';

export type GameScreen = 'setup' | 'playing' | 'gameover';

export interface GameStore {
  screen: GameScreen;
  state: GameState | null;
  db: CardDatabase | null;
  selectedBosses: BossCard[];
  humanPlayerIndex: number;
  aiPlayerIndices: number[];
  animatingAdventure: boolean;
  adventureLog: string[];

  // Setup actions
  startGame: (config: GameConfig, humanBoss: BossCard, aiBosses: BossCard[]) => void;

  // Phase execution
  advancePhase: () => void;

  // Player actions
  buildRoom: (roomCard: RoomCard, position: number | 'new') => void;
  skipBuild: () => void;
  playSpell: (spell: SpellCard) => void;

  // Queries
  getHumanPlayer: () => PlayerState | null;
  getPhaseLabel: () => string;
  canBuild: (room: RoomCard, position: number | 'new') => string | null;
}

export const useGameStore = create<GameStore>((set, get) => ({
  screen: 'setup',
  state: null,
  db: null,
  selectedBosses: [],
  humanPlayerIndex: 0,
  aiPlayerIndices: [],
  animatingAdventure: false,
  adventureLog: [],

  startGame: (config, humanBoss, aiBosses) => {
    const allBosses = [humanBoss, ...aiBosses];
    const db = new CardDatabase(config.expansions);
    const state = createInitialState(config, allBosses);

    // Name the players
    state.players[0].name = 'You';
    for (let i = 1; i < state.players.length; i++) {
      state.players[i].name = aiBosses[i - 1].name;
    }

    set({
      screen: 'playing',
      state,
      db,
      humanPlayerIndex: 0,
      aiPlayerIndices: aiBosses.map((_, i) => i + 1),
      adventureLog: [],
    });
  },

  advancePhase: () => {
    const { state } = get();
    if (!state || state.gameOver) return;

    const phase = state.currentPhase;

    if (phase === 'build' || phase === 'end') {
      // Start a new round: Town → Build (waiting for player input)
      executeTownPhase(state);
      state.currentPhase = 'build';
      set({ state: { ...state }, adventureLog: [] });
      return;
    }

    if (phase === 'bait') {
      // Bait → Adventure → End
      const assignments = executeBaitPhase(state);
      executeAdventurePhase(state, assignments);

      // Collect adventure log entries
      const adventureEntries = state.log
        .filter(e => e.phase === 'adventure' || e.phase === 'bait')
        .slice(-50)
        .map(e => e.details);

      const gameOver = executeEndPhase(state);

      if (gameOver) {
        set({ screen: 'gameover', state: { ...state }, adventureLog: adventureEntries });
      } else {
        set({ state: { ...state }, adventureLog: adventureEntries });
      }
      return;
    }
  },

  buildRoom: (roomCard, position) => {
    const { state, aiPlayerIndices } = get();
    if (!state || state.currentPhase !== 'build') return;

    const humanPlayer = state.players[get().humanPlayerIndex];
    const humanAction: BuildAction = {
      playerId: humanPlayer.id,
      roomCard,
      position,
    };

    // Get AI build actions
    const aiActions: BuildAction[] = aiPlayerIndices.map(idx => {
      const aiPlayer = state.players[idx];
      return makeBuildDecision(state, aiPlayer);
    }).filter((a): a is BuildAction => a !== null);

    executeBuildPhase(state, [humanAction, ...aiActions]);

    // AI spell plays during build
    for (const idx of aiPlayerIndices) {
      const aiPlayer = state.players[idx];
      const spellAction = makeSpellDecision(state, aiPlayer);
      if (spellAction) {
        const spellIdx = aiPlayer.hand.indexOf(spellAction);
        if (spellIdx >= 0) {
          aiPlayer.hand.splice(spellIdx, 1);
          pushSpell(state, aiPlayer.id, spellAction);
        }
      }
    }
    resolveSpellStack(state);

    // Move to bait phase
    state.currentPhase = 'bait';
    set({ state: { ...state } });
  },

  skipBuild: () => {
    const { state, aiPlayerIndices } = get();
    if (!state || state.currentPhase !== 'build') return;

    const aiActions: BuildAction[] = aiPlayerIndices.map(idx => {
      const aiPlayer = state.players[idx];
      return makeBuildDecision(state, aiPlayer);
    }).filter((a): a is BuildAction => a !== null);

    executeBuildPhase(state, aiActions);
    state.currentPhase = 'bait';
    set({ state: { ...state } });
  },

  playSpell: (spell) => {
    const { state } = get();
    if (!state) return;
    const player = state.players[get().humanPlayerIndex];

    if (!canPlaySpell(state, spell)) return;

    const idx = player.hand.findIndex(c => c === spell);
    if (idx < 0) return;
    player.hand.splice(idx, 1);
    pushSpell(state, player.id, spell);
    resolveSpellStack(state);
    set({ state: { ...state } });
  },

  getHumanPlayer: () => {
    const { state, humanPlayerIndex } = get();
    if (!state) return null;
    return state.players[humanPlayerIndex];
  },

  getPhaseLabel: () => {
    const { state } = get();
    if (!state) return '';
    const labels: Record<Phase, string> = {
      town: 'Town Phase',
      market: 'Market Phase',
      build: 'Build Phase',
      minion: 'Minion Phase',
      bait: 'Bait Phase',
      adventure: 'Adventure Phase',
      end: 'End Phase',
    };
    return labels[state.currentPhase] ?? state.currentPhase;
  },

  canBuild: (room, position) => {
    const { state, humanPlayerIndex } = get();
    if (!state) return 'No game in progress';
    return validateBuild(state, {
      playerId: state.players[humanPlayerIndex].id,
      roomCard: room,
      position,
    });
  },
}));
