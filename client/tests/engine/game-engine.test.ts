import { describe, it, expect, beforeEach } from 'vitest';
import type { GameState, GameConfig, BossCard, RoomCard, HeroCard, DungeonRoom } from '../../src/data/types';
import { createInitialState, getSoulCount, getWoundCount, getTreasureCount, isDungeonFull, getRoomsInHand, getSpellsInHand } from '../../src/engine/game-state';
import { calculateLuring } from '../../src/engine/treasure-calculator';
import { resolveHeroCombat } from '../../src/engine/combat-resolver';
import { validateBuild, executeBuild, executeRound } from '../../src/engine/turn-engine';
import { checkWinCondition } from '../../src/engine/win-condition';
import { BOSSES } from '../../src/data/cards/bosses';
import { HEROES } from '../../src/data/cards/heroes';

function makeConfig(overrides: Partial<GameConfig> = {}): GameConfig {
  return {
    playerCount: 2,
    heroMode: 'h1',
    expansions: ['base'],
    modules: {
      coins: false,
      minibosses: false,
      minions: false,
      hybridHeroes: false,
      darkHeroes: false,
      explorers: false,
      items: false,
      dice: false,
    },
    woundLimit: 5,
    soulTarget: 10,
    ...overrides,
  };
}

function getBaseBosses(): BossCard[] {
  return BOSSES.filter(b => b.expansion === 'base').slice(0, 2);
}

describe('Game State Creation', () => {
  it('creates initial state with correct structure', () => {
    const config = makeConfig();
    const bosses = getBaseBosses();
    const state = createInitialState(config, bosses);

    expect(state.players).toHaveLength(2);
    expect(state.roundNumber).toBe(0);
    expect(state.gameOver).toBe(false);
    expect(state.winner).toBeNull();
    expect(state.town).toHaveLength(0);
    expect(state.spellStack).toHaveLength(0);
  });

  it('deals starting hands correctly', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());

    for (const player of state.players) {
      expect(player.hand.length).toBe(7); // 5 rooms + 2 spells
      const rooms = getRoomsInHand(player);
      const spells = getSpellsInHand(player);
      expect(rooms.length).toBe(5);
      expect(spells.length).toBe(2);
    }
  });

  it('determines turn order by XP (highest first)', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const first = state.players[state.turnOrder[0]];
    const second = state.players[state.turnOrder[1]];
    expect(first.boss.xp).toBeGreaterThanOrEqual(second.boss.xp);
  });

  it('each player has the correct boss assigned', () => {
    const bosses = getBaseBosses();
    const state = createInitialState(makeConfig(), bosses);
    expect(state.players[0].boss.id).toBe(bosses[0].id);
    expect(state.players[1].boss.id).toBe(bosses[1].id);
  });
});

describe('Treasure Calculation', () => {
  it('counts boss treasure', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const player = state.players[0];
    const bossTreasure = Array.isArray(player.boss.treasure)
      ? player.boss.treasure[0]
      : player.boss.treasure;
    expect(getTreasureCount(player, bossTreasure)).toBeGreaterThanOrEqual(1);
  });

  it('counts room treasure', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const player = state.players[0];

    // Build a fighter room
    const room = getRoomsInHand(player).find(r => {
      const t = Array.isArray(r.treasure) ? r.treasure : [r.treasure];
      return t.includes('fighter');
    });

    if (room) {
      const before = getTreasureCount(player, 'fighter');
      executeBuild(state, {
        playerId: player.id,
        roomCard: room,
        position: 'new',
      });
      const after = getTreasureCount(player, 'fighter');
      expect(after).toBe(before + 1);
    }
  });
});

describe('Dungeon Building', () => {
  it('builds a room in a new slot', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const player = state.players[0];
    const handSizeBefore = player.hand.length;
    const room = getRoomsInHand(player)[0];

    executeBuild(state, { playerId: player.id, roomCard: room, position: 'new' });
    expect(player.dungeon).toHaveLength(1);
    expect(player.dungeon[0].card.id).toBe(room.id);
    expect(player.hand.length).toBe(handSizeBefore - 1);
  });

  it('rejects building when dungeon is full', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const player = state.players[0];

    // Build 5 rooms
    for (let i = 0; i < 5; i++) {
      const room = getRoomsInHand(player)[0];
      if (!room) break;
      executeBuild(state, { playerId: player.id, roomCard: room, position: 'new' });
    }

    expect(isDungeonFull(player)).toBe(true);

    // Draw more rooms for the test
    if (state.decks.room.length > 0) {
      const extraRoom = state.decks.room[0];
      player.hand.push(extraRoom);
      const error = validateBuild(state, {
        playerId: player.id,
        roomCard: extraRoom,
        position: 'new',
      });
      expect(error).toBe('Dungeon is full (5 rooms max)');
    }
  });

  it('builds a room on top of existing room', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const player = state.players[0];

    const room1 = getRoomsInHand(player)[0];
    executeBuild(state, { playerId: player.id, roomCard: room1, position: 'new' });

    const room2 = getRoomsInHand(player).find(r => !r.isAdvanced);
    if (room2) {
      executeBuild(state, { playerId: player.id, roomCard: room2, position: 0 });
      expect(player.dungeon).toHaveLength(1);
      expect(player.dungeon[0].card.id).toBe(room2.id);
      expect(state.discards.room).toContain(room1);
    }
  });
});

describe('Hero Combat', () => {
  it('hero dies in dungeon with enough damage', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const player = state.players[0];

    // Build rooms totaling enough damage
    for (let i = 0; i < 3; i++) {
      const room = getRoomsInHand(player)[0];
      if (room) executeBuild(state, { playerId: player.id, roomCard: room, position: 'new' });
    }

    const totalDamage = player.dungeon.reduce((s, r) => s + r.card.damage, 0);
    // Find a hero with health <= totalDamage
    const weakHero = HEROES.find(h => h.health <= totalDamage && h.heroType === 'ordinary');
    if (weakHero) {
      const heroInstance = { card: weakHero, currentHP: weakHero.health, attachedItem: null, turnsInTown: 0 };
      const result = resolveHeroCombat(state, player, heroInstance);
      expect(result.heroDied).toBe(true);
      expect(result.remainingHP).toBe(0);
    }
  });

  it('hero survives dungeon with low damage', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const player = state.players[0];

    // Build just 1 room (low damage)
    const room = getRoomsInHand(player)[0];
    if (room) executeBuild(state, { playerId: player.id, roomCard: room, position: 'new' });

    // Use a high-health hero
    const strongHero = HEROES.find(h => h.health >= 10);
    if (strongHero) {
      const heroInstance = { card: strongHero, currentHP: strongHero.health, attachedItem: null, turnsInTown: 0 };
      const result = resolveHeroCombat(state, player, heroInstance);
      expect(result.heroDied).toBe(false);
      expect(result.remainingHP).toBeGreaterThan(0);
    }
  });

  it('generates combat events for each room', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const player = state.players[0];

    for (let i = 0; i < 2; i++) {
      const room = getRoomsInHand(player)[0];
      if (room) executeBuild(state, { playerId: player.id, roomCard: room, position: 'new' });
    }

    const hero = HEROES.find(h => h.heroType === 'ordinary')!;
    const heroInstance = { card: hero, currentHP: hero.health, attachedItem: null, turnsInTown: 0 };
    const result = resolveHeroCombat(state, player, heroInstance);

    expect(result.events.length).toBeGreaterThan(0);
    const enterEvents = result.events.filter(e => e.type === 'enter_room');
    expect(enterEvents.length).toBe(player.dungeon.length);
  });
});

describe('Luring', () => {
  it('lures heroes to dungeon with most matching treasure', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const p1 = state.players[0];
    const p2 = state.players[1];

    // Build a fighter room for player 1
    const fighterRoom = getRoomsInHand(p1).find(r => {
      const t = Array.isArray(r.treasure) ? r.treasure : [r.treasure];
      return t.includes('fighter');
    });
    if (fighterRoom) {
      executeBuild(state, { playerId: p1.id, roomCard: fighterRoom, position: 'new' });
    }

    // Place a fighter hero in town
    const fighterHero = HEROES.find(h => h.class === 'fighter' && h.heroType === 'ordinary');
    if (fighterHero) {
      state.town.push({ card: fighterHero, currentHP: fighterHero.health, attachedItem: null, turnsInTown: 0 });
      const results = calculateLuring(state);
      const fighterResult = results[results.length - 1];

      if (getTreasureCount(p1, 'fighter') > getTreasureCount(p2, 'fighter')) {
        expect(fighterResult.targetPlayerId).toBe(p1.id);
      }
    }
  });
});

describe('Win Conditions', () => {
  it('no winner at start', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const result = checkWinCondition(state);
    expect(result.gameOver).toBe(false);
  });

  it('player wins with 10 souls', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const player = state.players[0];
    const dummyHero: HeroCard = {
      id: 'hero_test', name: 'Test', heroType: 'ordinary', class: 'fighter',
      health: 1, treasure: 'fighter', ability: null, flavorText: '', expansion: 'base', quantity: 1,
    };
    for (let i = 0; i < 10; i++) player.souls.push(dummyHero);

    const result = checkWinCondition(state);
    expect(result.gameOver).toBe(true);
    expect(result.winner).toBe(player.id);
  });

  it('player eliminated with 5 wounds', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const player = state.players[0];
    const dummyHero: HeroCard = {
      id: 'hero_test', name: 'Test', heroType: 'ordinary', class: 'fighter',
      health: 1, treasure: 'fighter', ability: null, flavorText: '', expansion: 'base', quantity: 1,
    };
    for (let i = 0; i < 5; i++) player.wounds.push(dummyHero);

    const result = checkWinCondition(state);
    expect(result.eliminatedPlayers).toContain(player.id);
  });

  it('last player standing wins', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const dummyHero: HeroCard = {
      id: 'hero_test', name: 'Test', heroType: 'ordinary', class: 'fighter',
      health: 1, treasure: 'fighter', ability: null, flavorText: '', expansion: 'base', quantity: 1,
    };
    // Eliminate player 0
    for (let i = 0; i < 5; i++) state.players[0].wounds.push(dummyHero);

    const result = checkWinCondition(state);
    expect(result.gameOver).toBe(true);
    expect(result.winner).toBe(state.players[1].id);
  });

  it('epic heroes count as 2 souls', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());
    const player = state.players[0];
    const epicHero: HeroCard = {
      id: 'hero_epic_test', name: 'Epic Test', heroType: 'epic', class: 'fighter',
      health: 12, treasure: 'fighter', ability: null, flavorText: '', expansion: 'base', quantity: 1,
    };
    for (let i = 0; i < 5; i++) player.souls.push(epicHero); // 5 epic = 10 souls
    expect(getSoulCount(player)).toBe(10);

    const result = checkWinCondition(state);
    expect(result.gameOver).toBe(true);
    expect(result.winner).toBe(player.id);
  });
});

describe('Full Round Execution', () => {
  it('executes a complete round without errors', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());

    // Build actions: each player builds their first room
    const buildActions = state.players.map(p => {
      const room = getRoomsInHand(p)[0];
      return room ? { playerId: p.id, roomCard: room, position: 'new' as const } : null;
    }).filter((a): a is NonNullable<typeof a> => a !== null);

    const gameOver = executeRound(state, buildActions);
    expect(typeof gameOver).toBe('boolean');
    expect(state.roundNumber).toBe(1);
    expect(state.log.length).toBeGreaterThan(0);
  });

  it('runs multiple rounds', () => {
    const state = createInitialState(makeConfig(), getBaseBosses());

    for (let round = 0; round < 5; round++) {
      const buildActions = state.players.map(p => {
        const room = getRoomsInHand(p)[0];
        return room ? { playerId: p.id, roomCard: room, position: 'new' as const } : null;
      }).filter((a): a is NonNullable<typeof a> => a !== null);

      const gameOver = executeRound(state, buildActions);
      if (gameOver) break;
    }

    expect(state.roundNumber).toBeGreaterThanOrEqual(1);
  });
});
