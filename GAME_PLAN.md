# Digital Boss Monster — Development Plan

## 1. Project Overview

This document outlines the plan for building a digital card game inspired by Boss Monster, using the **Unified Boss Monster System (UBMS)** ruleset. The game combines content from all Boss Monster expansions (Base, Next Level, Rise of the Minibosses, Super Boss Monster, Crash Landing, Vault of Villains, Tools of Hero-Kind, Implements of Destruction, and promos) into a single unified digital experience.

### What We Have Already

| Asset | Status | Details |
|---|---|---|
| **UBMS Master Rulebook** | Complete | Unified rules covering all expansions, turn structure, 8 optional modules, 5-6 player variant |
| **Boss Cards** | Complete | ~63 bosses across all expansions with structured JS data (id, name, XP, treasure, levelUpAbility, levelUpEffect) |
| **Monster Room Cards** | Complete | ~100+ monster rooms with damage, treasure, abilities, advanced/ordinary flags |
| **Trap Room Cards** | Complete | ~100+ trap rooms with similar structure |
| **Hero Cards** | Partial | ~120+ heroes defined but many entries are truncated (missing id, name, class, health fields — only flavorText/expansion/quantity remain) |
| **Spell Cards** | Complete | ~100+ spells with phase, effect type, targeting, cost data |
| **Miniboss Cards** | Partial | ~54 minibosses defined but many entries truncated (missing core fields) |
| **Item Cards** | Complete | ~44 items (hero items + boss implements) with ability data |
| **Card Database Index** | Complete | `index.js` with constants, enums, query helpers, deck builder, shuffle utility |
| **Image Utilities** | Complete | Wiki URL generation and local path mapping |

### What Needs To Be Done

The card data files have **syntax errors** and **incomplete entries** that need fixing before they can be used:
- Several JS files have double commas (`,,`) creating parse errors
- Many hero/miniboss/room entries are truncated — they have only `flavorText`, `expansion`, `quantity` but are missing `id`, `name`, `class`/`type`, `health`/`damage`, `treasure`, `ability` fields
- These truncated entries need to be either completed with proper data or removed

---

## 2. Architecture Recommendation

### Technology Stack

| Layer | Recommendation | Rationale |
|---|---|---|
| **Frontend** | React + TypeScript | Component-based UI ideal for card games; strong typing prevents card data bugs |
| **State Management** | Zustand or Redux Toolkit | Complex game state (multiple player dungeons, hero traversal, spell stack) |
| **Game Engine** | Custom turn-based engine | Boss Monster is sequential/phase-based, not real-time — a custom engine fits better than a general game framework |
| **Rendering** | HTML/CSS + Canvas overlay | Cards are primarily static images/data; canvas only needed for animations |
| **Multiplayer** | Socket.io + Express server | Real-time turn-based communication |
| **Database** | SQLite or PostgreSQL | Player accounts, match history, card collection |
| **AI Opponent** | Rule-based + Monte Carlo tree search | For single-player mode |

### Alternative: Simpler Stack (MVP)

For a faster MVP, a simpler approach could work:

| Layer | Choice | Rationale |
|---|---|---|
| **Frontend** | Vanilla JS + HTML/CSS | Matches the existing card data format (browser globals); no build step |
| **State** | Plain JS objects | Game state is manageable without a framework for 2-4 players |
| **Multiplayer** | Node.js + Socket.io | Lightweight server |

---

## 3. Game Systems Breakdown

The game has **7 core systems** that need to be built, plus **8 optional module systems**.

### 3.1 Core Systems

#### System 1: Card Data Layer
**Purpose:** Load, validate, query, and manage all 700+ cards.

- Fix and complete all card JS data files (heroes, minibosses have incomplete entries)
- Fix syntax errors (double commas in bosses.js, rooms-monster.js, items.js, etc.)
- Create TypeScript interfaces for each card type
- Build card validation to ensure all required fields are present
- Card image loading pipeline (local images with wiki fallback)

**Data model highlights:**
```
Boss: { id, name, xp, treasure, levelUpAbility, levelUpEffect, expansion }
Room: { id, name, roomType(monster|trap), isAdvanced, damage, treasure, ability, requiredTreasure? }
Hero: { id, name, heroType(ordinary|epic|explorer), class, health, treasure, ability? }
Spell: { id, name, spellType, phase, effect, description }
Item: { id, name, itemType(heroItem|implement), ability, description }
Miniboss: { id, name, level, damage, ability, promotedForm }
```

#### System 2: Game State Manager
**Purpose:** Track all mutable game state across phases.

```
GameState:
  - players[]: { boss, dungeon[], hand[], souls, wounds, coins, items, minibosses }
  - decks: { room, spell, hero(ordinary), hero(epic), item, miniboss }
  - discards: { room, spell, hero, item, miniboss }
  - town: Hero[]
  - currentPhase: Phase enum
  - turnOrder: number[]
  - roundNumber: number
  - activeEffects: Effect[]
  - spellStack: Spell[] (for interrupt resolution)
```

#### System 3: Turn Engine
**Purpose:** Orchestrate the 7-phase turn loop per the UBMS rules.

| Phase | Key Logic |
|---|---|
| **Town** | Draw heroes based on Hero Mode (H1/H2/H3), place in town, attach items if module active |
| **Market** | Optional: players draft from market by XP priority |
| **Build** | Each player places 1 room face-down, reveal simultaneously, resolve "When Built" triggers, attach minibosses |
| **Minion** | Optional: minion movement, actions, cleanup |
| **Bait** | Calculate treasure totals per dungeon, assign heroes to highest-matching dungeon, handle ties (stay in town for 2-4p, split for 5-6p) |
| **Adventure** | Heroes traverse dungeons room-by-room, apply damage, trigger room abilities, process spell interrupts, determine kill/wound |
| **End** | Cleanup, check win/loss (10 souls to win, 5 wounds to lose in standard; net score in 5-6p variant) |

#### System 4: Combat / Adventure Resolver
**Purpose:** Simulate hero traversal through a dungeon.

This is the most complex system. For each hero entering a dungeon:
1. Hero enters Room 1 (leftmost, farthest from boss)
2. Room deals damage (base + counters + bonuses)
3. Room ability triggers (if applicable)
4. Check for spell interrupt window
5. Check if hero dies (HP <= 0) → Boss gains soul(s)
6. If alive, hero moves to next room
7. After all rooms: if hero survives → Boss takes wound(s)
8. Handle items on heroes (claiming on kill, face-down on survive)

**Complexity factors:**
- Rooms that make heroes enter twice (Minotaur Maze)
- Rooms that skip heroes (speed effects)
- Spell interrupts at any point
- Miniboss bonus damage
- Item damage reduction/immunity
- Epic heroes worth 2 souls/wounds
- Boss level-up ability interactions

#### System 5: Treasure & Luring Calculator
**Purpose:** Determine which heroes go to which dungeon during the Bait phase.

For each hero in town:
1. Sum treasure icons of matching type across all dungeons (rooms + boss treasure)
2. Find dungeon with highest matching treasure
3. Handle ties: hero stays in town (2-4p) or splits (5-6p variant)
4. Handle Spell overrides (Charm, Decoy, etc.)
5. Handle boss abilities that modify luring (Seducia, Lilith)

#### System 6: Ability / Effect Resolver
**Purpose:** Universal system to resolve any card ability or effect.

Every ability in the game maps to one of these effect types (from the EFFECT enum in index.js):
- Card manipulation: drawSpell, drawRoom, drawMiniboss, drawItem, drawAny, retrieveFromDiscard, searchDeck
- Combat: damageHero, killHero, bonusDamage
- Economy: gainCoins, stealCoins
- Hero manipulation: lureHero, sendBack, moveHero
- Room manipulation: destroyRoom, deactivateRoom, copyRoom, swapRooms
- Defense: healWound, cancelSpell
- Build: extraBuild, freePromotion

Each effect needs:
- Trigger condition (onBuild, onHeroEnter, onHeroKill, onDestroy, passive, oncePerTurn, etc.)
- Target selection (self, opponent, any, heroInDungeon, etc.)
- Cost resolution (souls, wounds, coins, discard card, destroy room)
- Validation (can this effect legally fire right now?)

#### System 7: UI / Presentation Layer
**Purpose:** Render the game state visually.

Key views:
- **Main Game Board:** Shows all player dungeons, town, hero deck, and active hero
- **Player Hand:** Cards in your hand (rooms, spells)
- **Dungeon View:** Your 1-5 room dungeon + boss card, with attached minibosses/items visible
- **Town View:** Heroes waiting to be lured, items available
- **Adventure Animation:** Hero moving through rooms, damage numbers, death/survival
- **Spell Stack:** Visual display of interrupt chain
- **Scoreboard:** Souls, wounds, coins per player

### 3.2 Optional Module Systems

These map directly to UBMS Section 5 and can each be toggled on/off:

| Module | Complexity | What It Adds |
|---|---|---|
| **Coin Module** | Low | Currency tracking, coin-cost abilities, market purchases |
| **Miniboss Module** | Medium | Miniboss deck, attachment to rooms, 3-level promotion system, bonus damage |
| **Minion Module** | High | Board-based minion movement, landmark interactions, pre-hero phase |
| **Hybrid Hero Module** | Low | Dual-treasure heroes, modified luring calculation |
| **Dark Hero Module** | Medium | Reverse luring (punishes strongest), special scoring |
| **Explorer Module** | Medium | 5th treasure type, alien heroes, explorer rooms |
| **Items Module** | Medium | Item deck, hero item attachment, boss item claiming/usage |
| **Dice Module** | Low | Random damage rolls, reroll with coins |

---

## 4. Phased Development Plan

### Phase 1: Foundation — Card Data & Core Engine

**Goal:** Working game logic with no UI.

| Task | Details |
|---|---|
| 1.1 Fix card data | Repair all JS files — fix syntax errors, complete truncated entries for heroes/minibosses/rooms |
| 1.2 TypeScript card models | Define interfaces for all 7 card types |
| 1.3 Card database service | Load, validate, query cards; deck creation and shuffling |
| 1.4 Game state model | Define the full game state object |
| 1.5 Turn engine | Implement the 7-phase loop (town → market → build → minion → bait → adventure → end) |
| 1.6 Treasure calculator | Luring logic for the Bait phase |
| 1.7 Combat resolver | Hero-traverses-dungeon simulation |
| 1.8 Effect resolver | Universal ability/effect execution system |
| 1.9 Win/loss checker | 10 souls, 5 wounds, net score variant |
| 1.10 Console game | Playable text-based game for testing all logic |

### Phase 2: Single-Player UI

**Goal:** Playable single-player game in the browser vs. AI.

| Task | Details |
|---|---|
| 2.1 Project scaffolding | React + TypeScript setup, component architecture |
| 2.2 Card components | Render boss, room, hero, spell, item, miniboss cards |
| 2.3 Game board layout | Main board with dungeon rows, town, hero deck, hand area |
| 2.4 Dungeon builder UI | Drag-and-drop room placement, advanced room overlay |
| 2.5 Adventure animation | Hero walking through rooms, damage popups, death/survival |
| 2.6 Spell interaction UI | Spell play from hand, interrupt prompts, targeting |
| 2.7 Phase indicators | Clear display of current phase, whose turn it is |
| 2.8 AI opponent | Rule-based AI (builds rooms, plays spells, makes build decisions) |
| 2.9 Game setup screen | Boss selection (random/draft), module toggles, player count |
| 2.10 End game screen | Winner display, score summary |

### Phase 3: Multiplayer

**Goal:** Online multiplayer for 2-6 players.

| Task | Details |
|---|---|
| 3.1 Server architecture | Node.js + Socket.io game server |
| 3.2 Game room system | Create/join rooms, lobby, ready check |
| 3.3 State synchronization | Server-authoritative game state, client receives updates |
| 3.4 Hidden information | Each player only sees their own hand; server controls visibility |
| 3.5 Reconnection | Handle disconnects, reconnect to in-progress game |
| 3.6 Chat / emotes | In-game communication |

### Phase 4: Polish & Optional Modules

**Goal:** Full feature parity with physical game.

| Task | Details |
|---|---|
| 4.1 Coin module | Currency tracking, coin-cost abilities |
| 4.2 Miniboss module | Miniboss deck, promotion, room attachment |
| 4.3 Item module | Item deck, hero attachment, boss claiming |
| 4.4 Explorer module | 5th treasure type, alien heroes/rooms |
| 4.5 Minion module | Board-based minions (requires Super Boss Monster board) |
| 4.6 Sound & music | 8-bit retro soundtrack (matching Boss Monster's aesthetic) |
| 4.7 Animations | Card flip, room build, hero death, spell cast |
| 4.8 Tutorial | Interactive tutorial teaching game phases |
| 4.9 Card collection | View all cards, filter by expansion/type |
| 4.10 Match history | Track wins, losses, favorite bosses |

---

## 5. Critical Design Decisions

### 5.1 Spell Timing / Interrupt System

Boss Monster's spell system uses a "last in, first out" stack (similar to Magic: The Gathering). When a spell is played, opponents can respond with their own spell before it resolves. This needs a clean implementation:

- **Spell Stack:** Array of pending spells, resolves in reverse order
- **Priority Windows:** After each game event (hero enters room, hero dies, room built), open a window for spell responses
- **Counterspell:** Can cancel any spell on the stack
- **Timing:** Spells have phase restrictions (Build, Adventure, Any) that must be enforced

### 5.2 Advanced Room Building Rules

Advanced rooms (gold border) can only be built on top of an existing room that shares at least one matching treasure icon. This creates strategic dungeon-building decisions:

- Validate treasure match before allowing advanced room placement
- Handle the "covers" mechanic (advanced room replaces the ordinary room below it)
- Some bosses bypass this restriction (Doctor Panic)

### 5.3 Boss Level-Up Trigger

The boss levels up exactly once — when the dungeon first reaches 5 visible rooms. This is a one-time event with significant impact:

- Track whether each boss has leveled up
- Some level-up abilities are permanent/passive (Fenrir: +1 damage to monster rooms)
- Some are once-per-turn actives (Gorgona: use a room ability twice)
- Some are one-shot powerful effects (Anererak: opponents discard 2 cards)

### 5.4 Hero Traversal Order

Heroes enter the dungeon at Room 1 (farthest from boss) and move toward the boss. Room positions matter strategically:

- Room 1 is the entrance (leftmost in the dungeon display)
- Room 5 (or the last room) is closest to the boss
- The boss card itself is after the last room
- Heroes that survive all rooms deal a wound to the boss

### 5.5 Turn Order

Turn order is determined by Boss XP (highest goes first). This matters for:
- Build phase: higher XP builds first (reveals first)
- Bait phase: ties broken by XP
- Spell play: priority in interrupt windows

---

## 6. Card Data Fixes Needed

Before development can begin in earnest, the card data files need cleanup:

### Syntax Errors
- `bosses.js` line 167: double comma `id: 'boss_koschei',,`
- `rooms-monster.js` line 259: double comma `id: 'room_harpy_nest',,`
- `rooms-trap.js` line 82: double comma `id: 'room_hidden_torches',,`
- `items.js` line 28: double comma `id: 'item_shield_light',,`
- `spells.js` line 178: double comma `id: 'spell_knockout_gas',,`

### Truncated Card Entries
Many cards across heroes.js, minibosses.js, rooms-monster.js, and rooms-trap.js are missing core fields. Only `flavorText`, `expansion`, and `quantity` remain. Examples:

**heroes.js:** Most hero entries are truncated — missing `id`, `name`, `heroType`, `class`, `health`, `treasure`, `ability`. Only ~4 complete hero entries exist out of 60+.

**minibosses.js:** Most entries are truncated — missing `id`, `name`, `level`, `damage`, `treasure`, `ability`. Only `promotedForm`, `flavorText`, `expansion`, `quantity` remain.

**rooms-monster.js and rooms-trap.js:** Several entries are truncated similarly.

### Recommendation
Either:
1. **Complete the data manually** by cross-referencing the Boss Monster Wiki and rulebooks
2. **Generate the missing data** using the card names/IDs that can be inferred from the `promotedForm` fields and flavor text
3. **Start with only complete cards** and add the rest incrementally

---

## 7. Folder Structure Proposal

```
/
├── docs/                          # Game design documents
│   ├── GAME_PLAN.md              # This file
│   ├── ubms-rulebook.txt         # Unified rules
│   └── reference/                # PDF rulebooks
├── src/
│   ├── data/                     # Card data
│   │   ├── cards/
│   │   │   ├── bosses.ts
│   │   │   ├── rooms-monster.ts
│   │   │   ├── rooms-trap.ts
│   │   │   ├── heroes.ts
│   │   │   ├── spells.ts
│   │   │   ├── minibosses.ts
│   │   │   └── items.ts
│   │   ├── types.ts              # Card type interfaces
│   │   └── database.ts           # Card database service
│   ├── engine/                   # Game logic
│   │   ├── game-state.ts         # State model
│   │   ├── turn-engine.ts        # Phase loop
│   │   ├── combat-resolver.ts    # Adventure phase logic
│   │   ├── treasure-calculator.ts # Bait phase luring
│   │   ├── effect-resolver.ts    # Universal effect system
│   │   ├── spell-stack.ts        # Interrupt system
│   │   └── win-condition.ts      # Victory/defeat checks
│   ├── modules/                  # Optional game modules
│   │   ├── coins.ts
│   │   ├── minibosses.ts
│   │   ├── minions.ts
│   │   ├── items.ts
│   │   ├── explorers.ts
│   │   ├── hybrid-heroes.ts
│   │   ├── dark-heroes.ts
│   │   └── dice.ts
│   ├── ai/                       # AI opponent
│   │   ├── strategy.ts
│   │   └── decision-tree.ts
│   ├── ui/                       # Frontend components
│   │   ├── components/
│   │   │   ├── Card/
│   │   │   ├── Dungeon/
│   │   │   ├── Town/
│   │   │   ├── Hand/
│   │   │   ├── SpellStack/
│   │   │   └── Scoreboard/
│   │   ├── screens/
│   │   │   ├── GameSetup/
│   │   │   ├── GameBoard/
│   │   │   └── GameOver/
│   │   └── App.tsx
│   ├── network/                  # Multiplayer
│   │   ├── server.ts
│   │   ├── client.ts
│   │   └── protocol.ts
│   └── utils/
│       ├── shuffle.ts
│       └── random.ts
├── public/
│   └── images/
│       └── cards/                # Card artwork
│           ├── bosses/
│           ├── rooms/
│           ├── heroes/
│           ├── spells/
│           ├── items/
│           └── minibosses/
├── tests/
│   ├── engine/
│   ├── data/
│   └── integration/
├── package.json
└── tsconfig.json
```

---

## 8. Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| **Incomplete card data** | High — can't build without accurate data | Prioritize completing heroes.js and minibosses.js; start with base + next level expansions only |
| **Spell interaction complexity** | High — hundreds of spell×room×boss combos | Build comprehensive test suite; implement effects generically via the effect resolver |
| **Balance issues** | Medium — digital format may expose imbalances | Use the UBMS rulebook's balance notes; add analytics to track win rates by boss |
| **Art/images** | Medium — no card artwork included | Use text-only cards initially; add placeholder art; consider pixel art generation |
| **Multiplayer cheating** | Medium — clients could see hidden info | Server-authoritative architecture; never send opponent hand data to client |
| **Scope creep** | High — 8 optional modules is a lot | Phase the modules; MVP with base game only; add modules one at a time |

---

## 9. Recommended Starting Point

**Start with Phase 1 (Foundation) focusing on the Base Set only:**

1. Fix the card data files (syntax + completions) for Base Set cards
2. Implement the core turn engine with just the 7 phases
3. Build the combat resolver for hero-dungeon traversal
4. Create a console-playable version to validate all logic
5. Then layer on the UI (Phase 2)

This keeps scope manageable while validating the hardest part first — the game rules engine.

---

## 10. Summary of Card Counts

| Card Type | Unique Cards | With Quantities | Expansions |
|---|---|---|---|
| Bosses | ~63 | ~63 (1 each) | All |
| Monster Rooms | ~80+ | ~200+ | All |
| Trap Rooms | ~80+ | ~200+ | All |
| Heroes | ~60+ | ~300+ (2-3 each) | All |
| Spells | ~90+ | ~180+ | All |
| Minibosses | ~54 | ~100+ | Rise of Minibosses |
| Items | ~44 | ~80+ | Tools, Implements |
| **Total** | **~470+** | **~1100+** | **All expansions** |

---

*This plan is a living document. Update it as development progresses and design decisions are finalized.*
