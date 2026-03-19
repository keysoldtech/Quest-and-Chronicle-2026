// ── String-union types for card data ────────────────────────────
// Using string unions (not enums) so card data files can use plain
// string literals without importing enum references everywhere.

export type CardType = 'boss' | 'room' | 'hero' | 'spell' | 'miniboss' | 'item';

export type RoomType = 'monster' | 'trap';

export type TreasureType = 'fighter' | 'mage' | 'thief' | 'cleric' | 'explorer';

export type HeroTier = 'ordinary' | 'epic' | 'explorer';

export type Expansion =
  | 'base' | 'nextLevel' | 'minibosses' | 'super'
  | 'crashLanding' | 'vault' | 'tenthAnniversary'
  | 'tools' | 'implements' | 'promo';

export type Phase = 'town' | 'market' | 'build' | 'minion' | 'bait' | 'adventure' | 'end';

export type SpellPhase = 'build' | 'adventure' | 'bait' | 'any' | 'end' | 'town';

// ── Ability / Effect Interfaces ─────────────────────────────────

export interface EffectCost {
  type: 'soul' | 'wound' | 'gold' | 'discardRoom' | 'discardSpell' | 'discardMiniboss' | 'destroyRoom' | 'destroyOrdinaryRoom' | 'destroySoul' | 'destroyMiniboss';
  value?: number;
}

export interface CardEffect {
  type: string;
  value?: number;
  target?: string;
  trigger?: string;
  cost?: EffectCost;
  condition?: string;
  description?: string;
  destroyRoom?: boolean;
  duration?: string | number;
  treasureType?: string;
  heroClass?: string;
  cardType?: string;
  deckType?: string;
  permanent?: boolean;
  override?: boolean;
  [key: string]: unknown; // allow extra properties from card data
}

export interface RoomAbility {
  trigger: string;
  effect: string;
  value?: number;
  target?: string;
  description: string;
  condition?: string;
  cardType?: string;
  random?: boolean;
  heads?: string;
  tails?: string;
  deckType?: string;
  reveal?: number;
  keep?: number;
  toTop?: boolean;
  effects?: string[];
  values?: number[];
  [key: string]: unknown; // allow extra properties from card data
}

// ── Card Interfaces ─────────────────────────────────────────────

export interface BossCard {
  id: string;
  name: string;
  subtitle: string;
  xp: number;
  treasure: TreasureType | TreasureType[];
  levelUpAbility: string;
  levelUpEffect: CardEffect;
  flavorText: string;
  expansion: string;
  cardNumber?: string;
  quantity: number;
  image?: string;
  localImage?: string;
}

export interface RoomCard {
  id: string;
  name: string;
  subtitle?: string;
  roomType: RoomType;
  isAdvanced: boolean;
  damage: number;
  treasure: TreasureType | TreasureType[];
  ability: RoomAbility | null;
  requiredTreasure?: TreasureType[];
  flavorText: string;
  expansion: string;
  cardNumber?: string;
  quantity: number;
  image?: string;
  localImage?: string;
}

export interface HeroCard {
  id: string;
  name: string;
  heroType: HeroTier;
  class: TreasureType;
  health: number;
  treasure: TreasureType;
  ability: string | null;
  abilityEffect?: CardEffect;
  flavorText: string;
  expansion: string;
  quantity: number;
  image?: string;
  localImage?: string;
}

export interface SpellCard {
  id: string;
  name: string;
  spellType: string;
  phase: SpellPhase;
  effect: CardEffect;
  description: string;
  flavorText: string;
  expansion: string;
  quantity: number;
  image?: string;
  localImage?: string;
}

export interface MinibossCard {
  id: string;
  name: string;
  level: number;
  damage: number;
  treasure?: TreasureType;
  ability: RoomAbility | null;
  promotedForm?: string;
  flavorText: string;
  expansion: string;
  quantity: number;
  image?: string;
  localImage?: string;
}

export interface ItemCard {
  id: string;
  name: string;
  itemType: 'heroItem' | 'implement';
  equippedTo?: 'hero' | 'room' | 'boss';
  ability: RoomAbility;
  description: string;
  flavorText: string;
  expansion: string;
  quantity: number;
  treasure?: TreasureType;
  image?: string;
  localImage?: string;
}

export type AnyCard = BossCard | RoomCard | HeroCard | SpellCard | MinibossCard | ItemCard;

// ── Game State Interfaces ───────────────────────────────────────

export interface DungeonRoom {
  card: RoomCard;
  position: number; // 0 = entrance (farthest from boss), max = closest to boss
  damageCounters: number;
  isDeactivated: boolean;
  attachedMiniboss: MinibossInstance | null;
  attachedItem: ItemCard | null;
}

export interface MinibossInstance {
  card: MinibossCard;
  currentLevel: number;
}

export interface HeroInstance {
  card: HeroCard;
  currentHP: number;
  attachedItem: ItemCard | null;
  turnsInTown: number;
}

export interface PlayerState {
  id: string;
  name: string;
  boss: BossCard;
  bossLeveledUp: boolean;
  dungeon: DungeonRoom[];
  hand: (RoomCard | SpellCard)[];
  souls: HeroCard[];
  wounds: HeroCard[];
  coins: number;
  claimedItems: { card: ItemCard; faceUp: boolean }[];
  minibossHand: MinibossCard[];
  usedLevelUpThisTurn: boolean;
}

export interface Decks {
  room: RoomCard[];
  spell: SpellCard[];
  heroOrdinary: HeroCard[];
  heroEpic: HeroCard[];
  item: ItemCard[];
  miniboss: MinibossCard[];
}

export interface DiscardPiles {
  room: RoomCard[];
  spell: SpellCard[];
  hero: HeroCard[];
  item: ItemCard[];
  miniboss: MinibossCard[];
}

export interface PendingSpell {
  card: SpellCard;
  playerId: string;
  targets: Record<string, unknown>;
}

/** H1: First 7 rounds = Ordinary, then Epic. H2: Ordinary runs out, then Epic. H3: Shuffled together. */
export type HeroMode = 'h1' | 'h2' | 'h3';

export interface GameConfig {
  playerCount: number;
  heroMode: HeroMode;
  expansions: Expansion[];
  modules: {
    coins: boolean;
    minibosses: boolean;
    minions: boolean;
    hybridHeroes: boolean;
    darkHeroes: boolean;
    explorers: boolean;
    items: boolean;
    dice: boolean;
  };
  woundLimit: number; // 5 standard, Infinity for unlimited-lives variant
  soulTarget: number; // 10 standard
}

export interface GameState {
  config: GameConfig;
  players: PlayerState[];
  decks: Decks;
  discards: DiscardPiles;
  town: HeroInstance[];
  currentPhase: Phase;
  currentPlayerIndex: number;
  turnOrder: number[];
  roundNumber: number;
  spellStack: PendingSpell[];
  gameOver: boolean;
  winner: string | null;
  log: GameLogEntry[];
}

export interface GameLogEntry {
  round: number;
  phase: Phase;
  playerId: string;
  action: string;
  details: string;
  timestamp: number;
}
