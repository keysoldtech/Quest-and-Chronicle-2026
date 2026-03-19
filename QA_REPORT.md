# Quest & Chronicle — QA Playtest Report

Based on two full playthroughs (one to Game Over at Round 8) and a complete code review of every source file.

---

## Critical Bugs

### 1. Hero Luring Rarely Triggers in 2-Player Games
**Severity:** Critical — core mechanic broken in the most common game mode  
**Where:** `treasure-calculator.ts` + `game-state.ts`

Heroes almost never leave town in 2-player games because both players frequently have equal treasure counts, causing perpetual ties. In standard 2-4p mode, ties mean heroes stay in town forever. This makes the game feel empty — dungeons have no heroes to fight for several rounds.

**Root cause:** `getTreasureCount()` counts boss treasure (1) + room treasures. In early rounds, both players have ~1-2 rooms each, so the total treasure for any type is often tied. Since bosses only provide 1 treasure each, and rooms provide 1 each, it takes 3+ rounds of differential building before a tie breaks.

**Recommended fixes:**
- Add a tiebreaker mechanism (e.g., XP priority, or random assignment) instead of heroes staying in town indefinitely
- Consider having heroes go to the dungeon with the most TOTAL treasure if their preferred type is tied
- Alternatively, accumulate "frustration" — heroes that have stayed in town for 2+ rounds should enter a random dungeon

### 2. Failing Test — `rejects building when dungeon is full`
**Severity:** Medium  
**Where:** `tests/engine/game-engine.test.ts` line 145

Test expects error `"Dungeon is full (5 rooms max)"` but the engine returns `"Advanced rooms must be built on top of an existing room"` because the extra room drawn from the deck happens to be an advanced room. The advanced room check in `validateBuild()` fires before the dungeon-full check.

**Fix:** In `validateBuild()`, check `isDungeonFull` before checking advanced room rules when `position === 'new'`. Or update the test to draw a non-advanced room.

### 3. Spell Card Emoji Rendering Broken
**Severity:** Medium — affects readability of spell cards  
**Where:** `SpellCardView` in `Card.tsx` + `phaseIcon()` function

Spell cards display raw HTML entities like `&#127775;` and `&#9876;` as literal text instead of rendering as emoji/symbols. The `phaseIcon()` function returns HTML entity strings, but they're rendered as text via JSX (not `dangerouslySetInnerHTML`). The same issue affects spell cards in the hand — the phase restriction icons show as `&#127775;` etc.

**Fix:** Use actual Unicode characters (e.g., `'⚔'`, `'🌟'`) instead of HTML entities in `phaseIcon()`, or render them using `dangerouslySetInnerHTML` like `TreasureIcon` does.

---

## Gameplay Issues

### 4. Games End Too Quickly via Wounds (Not Souls)
**Severity:** High — undermines the intended win condition  
**Where:** `win-condition.ts` + overall game balance

In my playthrough, the game ended at Round 8 with both players having 0-2 souls and 1-5 wounds. No one came close to 10 souls. The game ended because I (Gorgona) accumulated 5 wounds, not because anyone earned 10 souls. This means the wound-death condition dominates and the soul-victory condition is rarely achievable.

**Causes:**
- Heroes that survive the dungeon deal wounds, and early dungeons (1-3 rooms) can't kill most heroes
- Heroes accumulate in town due to luring ties (Bug #1), then all flood in at once when a tiebreaker finally happens
- Room damage is generally low (1-2 per room); even 5 rooms totaling 5-8 damage can't kill 6+ HP heroes

**Recommendations:**
- Consider starting with a free first room (like the physical game where boss XP determines starting room)
- Increase base room damage slightly, or add damage bonuses for consecutive rooms
- Reduce wound limit to 3 for faster games, or increase it to 7 for more building time

### 5. Boss Level-Up Passive Abilities Not Applied in Combat
**Severity:** High  
**Where:** `combat-resolver.ts` — `resolveHeroCombat()` does not call `getBossPassiveDamageBonus()`

The `effect-resolver.ts` has `getBossPassiveDamageBonus()` which calculates boss passive damage bonuses (e.g., Fenrir: +1 to monster rooms, Thenubis: +1 to trap rooms). However, `resolveHeroCombat()` only uses `room.card.damage + room.damageCounters` — it never calls `getBossPassiveDamageBonus()`. This means boss level-up passives that grant bonus damage are silently ignored.

**Fix:** In `resolveHeroCombat()`, add: `roomDamage += getBossPassiveDamageBonus(player, room);`

### 6. No Visible Feedback When Heroes Are Lured
**Severity:** Medium  
**Where:** `gameStore.ts` `advancePhase()` method

The Battle Report filters log entries by `phase === 'adventure' || phase === 'bait'`, but luring log entries are created during `executeBaitPhase()` when `state.currentPhase` is `'bait'`. The log entries include messages like `"Hero X lured to Y's dungeon"` and `"Hero X stays in town (tie)"`. However, in testing, the Battle Report section often appears empty or only shows "No heroes entered dungeon" even when heroes are in town. The adventure log may be getting cleared or filtered incorrectly.

**Fix:** Ensure bait-phase luring messages always appear in the Battle Report. Consider adding a dedicated "Luring Report" section that shows where each hero went (or why they stayed) before the adventure begins.

---

## UI/UX Issues

### 7. `GameBoard.tsx` Has React Hooks Rules Violation
**Severity:** High (lint error, potential runtime crash)  
**Where:** `GameBoard.tsx` lines 30, 35, 44, 50

Four `useCallback` hooks are called after an early return (`if (!state || !humanPlayer) return null`). React hooks must be called unconditionally. This violates Rules of Hooks and will cause bugs if the component re-renders with different `state`/`humanPlayer` values.

**Fix:** Move the early return AFTER all hook calls, or restructure to avoid conditional hook usage.

### 8. Opponent Dungeon Shows No Boss Card Details
**Severity:** Low  
**Where:** `Dungeon.tsx` — `compact` mode hides boss card, only shows name + XP

In `compact` mode (used for AI opponents), the boss card is reduced to just `{name} XP {xp}`. Players can't see the opponent's boss ability, which is important for strategy (e.g., knowing Draculord converts wounds to souls).

**Recommendation:** Show a tooltip on hover with the boss ability, or expand the compact view slightly to include the boss treasure type.

### 9. No Treasure Type Indicator Per Dungeon
**Severity:** Medium  
**Where:** `Dungeon.tsx`

There's no summary showing total treasure counts per type for each dungeon. Since luring is based on treasure, players need to see "Fighter: 3, Mage: 1" etc. to make strategic room placement decisions. Currently you have to mentally count treasure icons across all rooms.

**Recommendation:** Add a treasure summary bar to each dungeon view showing totals per type.

### 10. Room Cards Show Heart Icon for Damage
**Severity:** Low (confusing)  
**Where:** `Card.tsx` `RoomCardView` — uses `&#9829;` (heart) for damage

Room cards use a heart icon (♥) for damage, but hearts typically represent health/HP. The dungeon room view also uses hearts for damage. This conflicts with hero cards where hearts represent HP.

**Fix:** Use a sword/skull icon for damage to distinguish it from HP hearts.

### 11. No Confirmation or Undo for Room Placement
**Severity:** Medium  
**Where:** `GameBoard.tsx` build flow

Clicking a build slot immediately builds the room with no confirmation. There's a Cancel button, but no undo after placement. Since building is the most important decision each turn, an accidental click can ruin a game.

**Recommendation:** Add a confirmation step ("Build X at slot Y? Confirm / Cancel") or allow undo within the same phase.

### 12. Adventure Log Max Height Cuts Off Important Info
**Severity:** Low  
**Where:** `App.css` line 206 — `.adventure-log { max-height: 200px; }`

The Battle Report section has a 200px max height. In games with multiple heroes entering dungeons, the log gets cut off and you have to scroll. The most important information (kills/wounds) is often at the bottom.

**Recommendation:** Auto-scroll to bottom, or increase max height, or show a summary at the top (e.g., "2 heroes slain, 1 wound taken").

---

## AI Improvements

### 13. AI Ignores Treasure Strategy
**Severity:** High — AI plays suboptimally  
**Where:** `ai/strategy.ts` `makeBuildDecision()`

The AI only considers room damage and abilities when choosing which room to build. It completely ignores treasure type, meaning it doesn't try to attract specific heroes. A smarter AI would:
- Check which heroes are in town and what treasure they want
- Prioritize rooms matching the most heroes' treasure types
- Avoid building rooms with the same treasure type as the opponent

### 14. AI Never Upgrades/Replaces Rooms
**Severity:** Medium  
**Where:** `ai/strategy.ts` line 25 — `if (!isDungeonFull(player))` always tries new slot first

The AI only replaces rooms when the dungeon is full (5 rooms). It never strategically upgrades a weak room when it has a better one, even when the dungeon has 3-4 rooms. It should consider replacing a 1-damage room with a 3-damage room earlier.

### 15. AI Never Plays Adventure-Phase Spells
**Severity:** Medium  
**Where:** `ai/strategy.ts` `makeSpellDecision()` — only plays during build phase

The function comment says "Only plays during build phase for now." Spells like damage spells, hero manipulation, etc. during adventure phase are never used by the AI.

---

## Code Quality

### 16. Three `@typescript-eslint/no-explicit-any` Errors
**Where:** `effect-resolver.ts` lines 100, 155, 156

Spell and room cards are cast to `any` when pushed to discard piles. Should use proper union type casting.

### 17. Five Unused Imports in Test File
**Where:** `game-engine.test.ts` lines 1-3

`beforeEach`, `GameState`, `RoomCard`, `DungeonRoom`, `getWoundCount` are imported but never used.

### 18. `window.location.reload()` for Play Again
**Severity:** Low  
**Where:** `GameOver.tsx` line 64

Using `window.location.reload()` to restart the game is a heavy-handed approach. It loses all state and forces a full page reload. Should reset the Zustand store instead.

---

## Missing Features (from GAME_PLAN.md Phase 2)

| Feature | Status | Impact |
|---------|--------|--------|
| Drag-and-drop room placement | Missing | UX improvement |
| Adventure animation (hero walking through rooms) | Missing | Visual feedback |
| Spell interaction UI during adventure | Missing | Core mechanic incomplete |
| Module toggles on setup screen | Missing | Can't enable coins/minibosses/etc |
| Expansion selection on setup screen | Hardcoded to base+nextLevel | No UI to change |
| PWA support | Missing | Offline play not available |
| Sound/music | Missing | Atmosphere |
| Tutorial | Missing | Onboarding |

---

## Priority Recommendations

**Immediate (blocks fun gameplay):**
1. Fix hero luring tiebreaker (Bug #1) — this is the #1 issue
2. Fix boss passive damage bonuses not applied (Bug #5)
3. Fix React hooks violation in GameBoard (Bug #7)

**Short-term (significant quality improvement):**
4. Fix spell emoji rendering (Bug #3)
5. Add treasure summary to dungeon views (Issue #9)
6. Improve AI treasure awareness (Issue #13)
7. Fix the failing test (Bug #2)

**Medium-term (polish):**
8. Add adventure phase animation or better combat visualization
9. Add spell interaction UI during adventure
10. Add confirmation for room placement
11. Improve AI to play adventure-phase spells and upgrade rooms
