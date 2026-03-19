import type {
  GameState, GameConfig, PlayerState,
  BossCard, RoomCard, SpellCard,
  DungeonRoom, Phase,
} from '../data/types';
import { CardDatabase } from '../data/database';

export function createInitialState(config: GameConfig, bosses: BossCard[]): GameState {
  const db = new CardDatabase(config.expansions);

  const players: PlayerState[] = bosses.map((boss, i) => ({
    id: `player_${i}`,
    name: `Player ${i + 1}`,
    boss,
    bossLeveledUp: false,
    dungeon: [],
    hand: [],
    souls: [],
    wounds: [],
    coins: config.modules.coins ? 0 : 0,
    claimedItems: [],
    minibossHand: [],
    usedLevelUpThisTurn: false,
  }));

  const roomDeck = db.createRoomDeck();
  const spellDeck = db.createSpellDeck();
  const ordinaryDeck = db.createOrdinaryHeroDeck();
  const epicDeck = db.createEpicHeroDeck();
  const itemDeck = config.modules.items ? db.createItemDeck() : [];

  // Deal starting hands: 5 rooms, 2 spells per player
  for (const p of players) {
    for (let j = 0; j < 5 && roomDeck.length > 0; j++) {
      p.hand.push(roomDeck.shift()!);
    }
    for (let j = 0; j < 2 && spellDeck.length > 0; j++) {
      p.hand.push(spellDeck.shift()!);
    }
  }

  // Determine turn order: highest XP first
  const turnOrder = players
    .map((p, i) => ({ idx: i, xp: p.boss.xp }))
    .sort((a, b) => b.xp - a.xp)
    .map(o => o.idx);

  return {
    config,
    players,
    decks: {
      room: roomDeck,
      spell: spellDeck,
      heroOrdinary: ordinaryDeck,
      heroEpic: epicDeck,
      item: itemDeck,
      miniboss: [],
    },
    discards: {
      room: [],
      spell: [],
      hero: [],
      item: [],
      miniboss: [],
    },
    town: [],
    currentPhase: 'build' as Phase,
    currentPlayerIndex: 0,
    turnOrder,
    roundNumber: 0,
    spellStack: [],
    gameOver: false,
    winner: null,
    log: [],
  };
}

// ── State query helpers ─────────────────────────────────────────

export function getPlayer(state: GameState, playerId: string): PlayerState {
  const p = state.players.find(p => p.id === playerId);
  if (!p) throw new Error(`Player ${playerId} not found`);
  return p;
}

export function getSoulCount(player: PlayerState): number {
  return player.souls.reduce((sum, h) => sum + (h.heroType === 'epic' ? 2 : 1), 0);
}

export function getWoundCount(player: PlayerState): number {
  return player.wounds.reduce((sum, h) => sum + (h.heroType === 'epic' ? 2 : 1), 0);
}

export function getNetScore(player: PlayerState): number {
  return getSoulCount(player) - getWoundCount(player);
}

export function getDungeonDamage(dungeon: DungeonRoom[]): number {
  return dungeon
    .filter(r => !r.isDeactivated)
    .reduce((sum, r) => sum + r.card.damage + r.damageCounters, 0);
}

export function getTreasureCount(player: PlayerState, treasure: string): number {
  let count = 0;
  const bossTreasure = player.boss.treasure;
  if (Array.isArray(bossTreasure)) {
    count += bossTreasure.filter(t => t === treasure).length;
  } else if (bossTreasure === treasure) {
    count += 1;
  }
  for (const room of player.dungeon) {
    if (room.isDeactivated) continue;
    const rt = room.card.treasure;
    if (Array.isArray(rt)) {
      count += rt.filter(t => t === treasure).length;
    } else if (rt === treasure) {
      count += 1;
    }
  }
  return count;
}

export function isDungeonFull(player: PlayerState): boolean {
  return player.dungeon.length >= 5;
}

export function getRoomsInHand(player: PlayerState): RoomCard[] {
  return player.hand.filter((c): c is RoomCard => 'roomType' in c);
}

export function getSpellsInHand(player: PlayerState): SpellCard[] {
  return player.hand.filter((c): c is SpellCard => 'spellType' in c);
}

export function addToLog(
  state: GameState, playerId: string, action: string, details: string,
): void {
  state.log.push({
    round: state.roundNumber,
    phase: state.currentPhase,
    playerId,
    action,
    details,
    timestamp: Date.now(),
  });
}
