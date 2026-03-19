/** Fisher-Yates shuffle — returns a new array. */
export function shuffle<T>(array: readonly T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Draw N cards from the top of a deck (mutates the deck array). */
export function drawCards<T>(deck: T[], count: number): T[] {
  return deck.splice(0, Math.min(count, deck.length));
}

/** Draw exactly 1 card from the top of a deck (mutates). Returns undefined if empty. */
export function drawOne<T>(deck: T[]): T | undefined {
  return deck.shift();
}
