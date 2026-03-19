# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Quest & Chronicle is a single-player (vs AI) digital card game inspired by Boss Monster. It is a **client-only** React + TypeScript + Vite app — no backend, no database, no external services.

All code lives under `client/`. The `docs/` directory contains reference material (rulebook, original JS card data) but is not part of the build.

### Commands

All commands run from the `client/` directory:

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (localhost:5173) |
| Lint | `npm run lint` |
| Tests | `npx vitest run` |
| Build | `npm run build` |

### Known issues (pre-existing)

- `npm run lint` reports 12 errors: 3 `@typescript-eslint/no-explicit-any` in `effect-resolver.ts`, 4 `react-hooks/rules-of-hooks` in `GameBoard.tsx`, and 5 unused-import warnings in the test file. These are in the existing code and not regressions.
- `npx vitest run` has 1 failing test out of 20 (`rejects building when dungeon is full`). The test expects the error message `"Dungeon is full (5 rooms max)"` but the engine returns `"Advanced rooms must be built on top of an existing room"`.

### Notes

- No `.env` files or secrets are required. The app is fully client-side with all data bundled.
- The dev server uses Vite with HMR at `http://localhost:5173`.
- Pass `--host 0.0.0.0` to `npm run dev` when you need the server accessible on all interfaces (e.g. for browser testing in cloud VMs): `npm run dev -- --host 0.0.0.0`.
