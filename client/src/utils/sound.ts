/**
 * Sound Manager — ported from Quest-Chronicle-main
 * Web Audio API synths for UI feedback. No MP3 files needed.
 */

let ctx: AudioContext | null = null;
let enabled = true;
let volume = 0.35;

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    try {
      const w = window as Window & { webkitAudioContext?: typeof AudioContext };
      const AC = window.AudioContext ?? w.webkitAudioContext;
      if (AC) ctx = new AC();
    } catch { /* no audio */ }
  }
  if (ctx?.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

const synths: Record<string, (c: AudioContext, v: number) => void> = {
  buttonClick(c, v) {
    const now = c.currentTime;
    const dur = 0.085;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + dur * 0.7);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(Math.max(0.0001, v * 0.22), now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(now);
    osc.stop(now + dur);
  },

  cardPlay(c, v) {
    const now = c.currentTime;
    const dur = 0.14;
    const sr = c.sampleRate;
    const frames = Math.max(1, Math.floor(sr * dur));
    const buf = c.createBuffer(1, frames, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < frames; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / frames) * 0.9;
    }
    const src = c.createBufferSource();
    src.buffer = buf;
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 450;
    const gain = c.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(Math.max(0.0001, v * 0.18), now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    src.connect(filter).connect(gain).connect(c.destination);
    src.start(now);
    src.stop(now + dur);
  },

  heroKill(c, v) {
    const now = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.3);
    gain.gain.setValueAtTime(Math.max(0.0001, v * 0.3), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    osc.connect(gain).connect(c.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  },

  heroDeath(c, v) {
    const now = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.6);
    gain.gain.setValueAtTime(Math.max(0.0001, v * 0.25), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    osc.connect(gain).connect(c.destination);
    osc.start(now);
    osc.stop(now + 0.65);
  },

  levelUp(c, v) {
    const now = c.currentTime;
    [400, 500, 600, 800].forEach((freq, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = now + i * 0.12;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(Math.max(0.0001, v * 0.2), t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      osc.connect(gain).connect(c.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    });
  },

  spellCast(c, v) {
    const now = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.4);
    gain.gain.setValueAtTime(Math.max(0.0001, v * 0.15), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    osc.connect(gain).connect(c.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  },

  coinGain(c, v) {
    const now = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(2400, now + 0.08);
    gain.gain.setValueAtTime(Math.max(0.0001, v * 0.15), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
    osc.connect(gain).connect(c.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  },

  wound(c, v) {
    const now = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);
    gain.gain.setValueAtTime(Math.max(0.0001, v * 0.3), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    osc.connect(gain).connect(c.destination);
    osc.start(now);
    osc.stop(now + 0.55);
  },
};

export const SoundManager = {
  play(name: string) {
    if (!enabled) return;
    const c = ensureContext();
    if (!c) return;
    const synth = synths[name];
    if (synth) synth(c, volume);
  },
  setVolume(v: number) {
    volume = Math.max(0, Math.min(1, v));
    try { localStorage.setItem('qc_sound_volume', String(volume)); } catch { /* ignore */ }
  },
  getVolume() { return volume; },
  toggle() { enabled = !enabled; return enabled; },
  isEnabled() { return enabled; },
};

// Load saved volume
try {
  const saved = localStorage.getItem('qc_sound_volume');
  if (saved) volume = parseFloat(saved);
} catch { /* ignore */ }
