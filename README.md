# Quest and Chronicle 2026

A digital card game inspired by Boss Monster, built using the **Unified Boss Monster System (UBMS)** ruleset that merges all Boss Monster expansions into a single unified experience. Browser-first, installable as a PWA, and wrappable in Chromium (Tauri/Electron) for desktop distribution.

## Project Status

**Planning Phase** — See [GAME_PLAN.md](./GAME_PLAN.md) for the full development plan.

## What's Here

- `GAME_PLAN.md` — Comprehensive development plan covering architecture, systems, phased roadmap, and risks
- `docs/ubms_rulebook.txt` — The Unified Boss Monster System master rulebook (text edition)
- `docs/cards/` — Card data files (JavaScript) for all card types:
  - `bosses.js` — ~63 boss cards across all expansions
  - `rooms-monster.js` — ~100+ monster room cards
  - `rooms-trap.js` — ~100+ trap room cards  
  - `heroes.js` — ~120+ hero cards (partially complete)
  - `spells.js` — ~100+ spell cards
  - `minibosses.js` — ~54 miniboss cards (partially complete)
  - `items.js` — ~44 item cards
  - `index.js` — Card database index with constants and query utilities
  - `image-utils.js` — Card image URL/path utilities

## Game Overview

Players take on the role of dungeon bosses, building rooms to lure and defeat heroes. The game features:

- **7-phase turn structure:** Town → Market → Build → Minion → Bait → Adventure → End
- **700+ unique cards** across 7 card types
- **8 optional modules:** Coins, Minibosses, Minions, Hybrid Heroes, Dark Heroes, Explorers, Items, Dice
- **2-6 player support** with variant rules for larger games
- **Boss level-up system** with one-time powerful abilities

## Platform Targets

| Target | Status | Details |
|---|---|---|
| **Browser** | Primary | All development and testing in a browser tab via `npm run dev` |
| **PWA** | Phase 2 | Installable web app with offline single-player support |
| **Desktop** | Phase 5 | Tauri or Electron wrapper for native desktop distribution |

## Next Steps

1. Fix card data files (syntax errors and incomplete entries)
2. Build the core game engine (turn loop, combat resolver, effect system)
3. Create single-player UI with AI opponent + PWA support
4. Add multiplayer support
5. Wrap in Tauri/Electron for desktop app
