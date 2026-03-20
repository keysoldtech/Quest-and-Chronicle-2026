# Boss Monster

A digital card game inspired by Boss Monster, built using the **Unified Boss Monster System (UBMS)** ruleset that merges all Boss Monster expansions into a single unified experience. Browser-first, installable as a PWA, and wrappable in Chromium (Tauri/Electron) for desktop distribution.

## Quick Start

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Pick a boss, start playing.

## Project Status

**Playable** — Single-player vs AI with full game loop, 20 passing engine tests, production build ready, ESLint clean.

## How to Play

1. **Select your Boss** — Choose from 16 bosses (Base + Next Level sets). Each has unique XP, treasure type, and a level-up ability.
2. **Build your dungeon** — Each round, pick a room from your hand and place it in your dungeon. Rooms deal damage to heroes and may have special abilities.
3. **Lure heroes** — Heroes in town are drawn to the dungeon with the most matching treasure. Build the right rooms to attract the heroes you can kill.
4. **Survive the adventure** — Heroes walk through your dungeon room by room. If your rooms deal enough damage, the hero dies and you gain a soul. If the hero survives, you take a wound.
5. **Win** — First boss to collect **10 souls** wins. If you take **5 wounds**, you're eliminated.

## What's Built

### Game Engine (`client/src/engine/`)
Pure TypeScript, no DOM dependencies — runs in browser, Node, service workers, or Tauri.

| System | What It Does |
|---|---|
| **Turn Engine** | Full round loop: Town → Build → Bait → Adventure → End |
| **Combat Resolver** | Hero dungeon traversal with room damage, ability triggers, kill/wound tracking |
| **Treasure Calculator** | Bait phase luring with tie-breaking (2-4p standard, 5-6p variant) |
| **Effect Resolver** | Room abilities (draw, damage, coins, etc.), boss level-up, passive bonuses |
| **Spell Stack** | LIFO interrupt system for spell resolution |
| **Win Condition** | Standard (10 souls / 5 wounds) and unlimited-lives variant |

### Card Database (`client/src/data/`)
- **52 bosses** across 8 expansions
- **100+ rooms** (monster + trap) with damage, treasure, and abilities
- **30+ heroes** (ordinary + epic) with health and class data
- **104 spells** with phase restrictions and effect data
- **40+ items** (hero items + boss implements)

### UI (`client/src/ui/`)
- **Setup screen** — Boss selection grid, player count (2-4)
- **Game board** — Phase indicator, opponent dungeons, town with heroes, your dungeon, your hand, build slot picker, battle report log
- **Game over** — Winner display, full scoreboard, play again

### AI Opponent (`client/src/ai/`)
- Builds highest-damage rooms, prefers empty slots, upgrades weak rooms
- Plays draw spells during build phase
- Falls back to valid builds when preferred choices aren't available

## Commands

```bash
cd client
npm install          # Install dependencies
npm run dev          # Dev server at localhost:5173 (hot reload)
npm run build        # Production build to dist/
npm run preview      # Preview production build
npm test             # Run 20 engine tests (Vitest)
```

## Project Structure

```
client/
├── src/
│   ├── data/           # Card types, card data, database service
│   │   ├── types.ts    # All TypeScript interfaces
│   │   ├── database.ts # Card loading, filtering, deck creation
│   │   └── cards/      # Bosses, rooms, heroes, spells, items
│   ├── engine/         # Game logic (pure TS, no DOM)
│   │   ├── turn-engine.ts
│   │   ├── combat-resolver.ts
│   │   ├── treasure-calculator.ts
│   │   ├── effect-resolver.ts
│   │   ├── spell-stack.ts
│   │   └── win-condition.ts
│   ├── ai/             # AI opponent strategy
│   ├── store/          # Zustand state management
│   └── ui/             # React components and screens
├── tests/              # Vitest engine tests
├── docs/               # Original card data (JS) and UBMS rulebook
└── dist/               # Production build output
```

## Platform Targets

| Target | Status | Details |
|---|---|---|
| **Browser** | **Working** | `npm run dev` → play at localhost:5173 |
| **PWA** | Planned | Installable web app with offline single-player |
| **Desktop** | Planned | Tauri or Electron wrapper for native distribution |

## Roadmap

See [GAME_PLAN.md](./GAME_PLAN.md) for the full development plan.

- [x] Card data ported to TypeScript (bosses, rooms, heroes, spells, items)
- [x] Game engine (turn loop, combat, luring, effects, spells, win conditions)
- [x] React UI (setup, game board, game over)
- [x] AI opponent
- [x] 20 engine tests passing
- [x] Production build working
- [ ] PWA support (manifest, service worker, offline mode)
- [ ] Spell interaction UI during adventure phase
- [ ] More AI sophistication
- [ ] Optional modules (coins, minibosses, items, explorers)
- [ ] Multiplayer (Socket.io)
- [ ] Desktop wrapper (Tauri/Electron)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript |
| Build | Vite |
| State | Zustand |
| Tests | Vitest |
| Styling | CSS (custom dark theme) |
