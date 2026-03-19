/**
 * Storage Manager — ported from Quest-Chronicle-main
 * Handles localStorage with versioning, TTL, quota cleanup, export/import.
 */

const PREFIX = 'qc_';
const VERSION = '2.0';

interface Envelope<T> {
  version: string;
  timestamp: number;
  expiresAt: number | null;
  data: T;
}

export function save<T>(key: string, data: T, ttlMs?: number): boolean {
  try {
    const envelope: Envelope<T> = {
      version: VERSION,
      timestamp: Date.now(),
      expiresAt: ttlMs ? Date.now() + ttlMs : null,
      data,
    };
    localStorage.setItem(PREFIX + key, JSON.stringify(envelope));
    return true;
  } catch (e: any) {
    if (e.name === 'QuotaExceededError') {
      cleanup();
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify({ version: VERSION, timestamp: Date.now(), expiresAt: null, data }));
        return true;
      } catch { /* still failed */ }
    }
    return false;
  }
}

export function load<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;

    const envelope: Envelope<T> = JSON.parse(raw);
    if (!envelope || typeof envelope !== 'object' || !('data' in envelope)) {
      localStorage.removeItem(PREFIX + key);
      return null;
    }

    if (envelope.expiresAt && Date.now() > envelope.expiresAt) {
      localStorage.removeItem(PREFIX + key);
      return null;
    }

    return envelope.data;
  } catch {
    return null;
  }
}

export function remove(key: string): void {
  localStorage.removeItem(PREFIX + key);
}

export function exists(key: string): boolean {
  return load(key) !== null;
}

export function cleanup(): number {
  let removed = 0;
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (!key?.startsWith(PREFIX)) continue;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const envelope = JSON.parse(raw);
      if (envelope.expiresAt && Date.now() > envelope.expiresAt) {
        localStorage.removeItem(key);
        removed++;
      }
    } catch {
      localStorage.removeItem(key!);
      removed++;
    }
  }
  return removed;
}

export function exportAll(): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(PREFIX)) continue;
    const shortKey = key.substring(PREFIX.length);
    result[shortKey] = load(shortKey);
  }
  return result;
}

export function importAll(data: Record<string, unknown>): number {
  let imported = 0;
  for (const [key, value] of Object.entries(data)) {
    if (save(key, value)) imported++;
  }
  return imported;
}

// ── Game-specific save/load ─────────────────────────────────────

export function saveGame(gameState: unknown): boolean {
  return save('currentGame', gameState, 24 * 60 * 60 * 1000); // 24h TTL
}

export function loadGame<T>(): T | null {
  return load<T>('currentGame');
}

export function clearGame(): void {
  remove('currentGame');
}

export function saveSettings(settings: Record<string, unknown>): boolean {
  return save('settings', settings);
}

export function loadSettings(): Record<string, unknown> | null {
  return load('settings');
}

// Auto-cleanup on module load
cleanup();
