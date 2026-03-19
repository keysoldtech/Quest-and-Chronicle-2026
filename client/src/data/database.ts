import type {
  BossCard, RoomCard, HeroCard, SpellCard, MinibossCard, ItemCard,
  AnyCard, TreasureType, HeroTier, Expansion,
} from './types';
import { BOSSES } from './cards/bosses';
import { MONSTER_ROOMS } from './cards/rooms-monster';
import { TRAP_ROOMS } from './cards/rooms-trap';
import { HEROES } from './cards/heroes';
import { SPELLS } from './cards/spells';
import { ITEMS } from './cards/items';

function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Expand a card array by its quantity field into individual copies. */
function expandByQuantity<T extends { quantity: number }>(cards: T[]): T[] {
  const result: T[] = [];
  for (const card of cards) {
    for (let i = 0; i < card.quantity; i++) result.push(card);
  }
  return result;
}

export class CardDatabase {
  readonly bosses: BossCard[];
  readonly monsterRooms: RoomCard[];
  readonly trapRooms: RoomCard[];
  readonly heroes: HeroCard[];
  readonly spells: SpellCard[];
  readonly items: ItemCard[];

  constructor(expansions?: Expansion[]) {
    const expSet = expansions ? new Set(expansions) : null;
    const filterExp = <T extends { expansion: string }>(arr: T[]) =>
      expSet ? arr.filter(c => expSet.has(c.expansion as Expansion)) : arr;

    this.bosses = filterExp(BOSSES);
    this.monsterRooms = filterExp(MONSTER_ROOMS);
    this.trapRooms = filterExp(TRAP_ROOMS);
    this.heroes = filterExp(HEROES);
    this.spells = filterExp(SPELLS);
    this.items = filterExp(ITEMS);
  }

  getAllRooms(): RoomCard[] {
    return [...this.monsterRooms, ...this.trapRooms];
  }

  getOrdinaryRooms(): RoomCard[] {
    return this.getAllRooms().filter(r => !r.isAdvanced);
  }

  getAdvancedRooms(): RoomCard[] {
    return this.getAllRooms().filter(r => r.isAdvanced);
  }

  getOrdinaryHeroes(): HeroCard[] {
    return this.heroes.filter(h => h.heroType === 'ordinary');
  }

  getEpicHeroes(): HeroCard[] {
    return this.heroes.filter(h => h.heroType === 'epic');
  }

  getRoomsByTreasure(treasure: TreasureType): RoomCard[] {
    return this.getAllRooms().filter(r => {
      if (Array.isArray(r.treasure)) return r.treasure.includes(treasure);
      return r.treasure === treasure;
    });
  }

  getHeroesByClass(cls: TreasureType): HeroCard[] {
    return this.heroes.filter(h => h.class === cls);
  }

  getCardById(id: string): AnyCard | undefined {
    const all: AnyCard[] = [
      ...this.bosses, ...this.monsterRooms, ...this.trapRooms,
      ...this.heroes, ...this.spells, ...this.items,
    ];
    return all.find(c => c.id === id);
  }

  /** Create a shuffled deck of room cards expanded by quantity. */
  createRoomDeck(): RoomCard[] {
    return shuffle(expandByQuantity(this.getAllRooms()));
  }

  /** Create a shuffled deck of spell cards expanded by quantity. */
  createSpellDeck(): SpellCard[] {
    return shuffle(expandByQuantity(this.spells));
  }

  /** Create a shuffled deck of ordinary hero cards expanded by quantity. */
  createOrdinaryHeroDeck(): HeroCard[] {
    return shuffle(expandByQuantity(this.getOrdinaryHeroes()));
  }

  /** Create a shuffled deck of epic hero cards expanded by quantity. */
  createEpicHeroDeck(): HeroCard[] {
    return shuffle(expandByQuantity(this.getEpicHeroes()));
  }

  /** Create a shuffled item deck expanded by quantity. */
  createItemDeck(): ItemCard[] {
    return shuffle(expandByQuantity(this.items));
  }

  /** Get N random bosses for player selection. */
  getRandomBosses(count: number): BossCard[] {
    return shuffle(this.bosses).slice(0, count);
  }

  getTotalCount(): number {
    return this.bosses.length + this.monsterRooms.length + this.trapRooms.length +
      this.heroes.length + this.spells.length + this.items.length;
  }
}

export { shuffle, expandByQuantity };
