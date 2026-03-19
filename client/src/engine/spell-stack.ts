import type { GameState, SpellCard, PendingSpell, HeroInstance } from '../data/types';
import { addToLog } from './game-state';
import { drawCards } from '../utils/shuffle';

export function canPlaySpell(state: GameState, spell: SpellCard): boolean {
  const phase = state.currentPhase;
  if (spell.phase === 'any') return true;
  if (spell.phase === phase) return true;
  // Adventure spells can be played during bait (before adventure resolves)
  if (spell.phase === 'adventure' && (phase === 'adventure' || phase === 'bait')) return true;
  return false;
}

export function pushSpell(
  state: GameState, playerId: string, spell: SpellCard,
  targets: Record<string, unknown> = {},
): void {
  state.spellStack.push({ card: spell, playerId, targets });
  addToLog(state, playerId, 'play_spell', `Played ${spell.name}`);
}

export function resolveSpellStack(state: GameState): void {
  while (state.spellStack.length > 0) {
    const pending = state.spellStack.pop()!;
    resolveSpellEffect(state, pending);
  }
}

/**
 * Apply a spell's effect mechanically.
 */
function resolveSpellEffect(state: GameState, pending: PendingSpell): void {
  const player = state.players.find(p => p.id === pending.playerId);
  if (!player) return;

  const effect = pending.card.effect;
  const desc = pending.card.description;

  switch (effect.type) {
    // ── Card draw effects ─────────────────────────────────────
    case 'drawSpell': {
      const count = (effect.value as number) ?? 1;
      // Handle cost (e.g. Dark Pact: take 1 wound to draw 2 spells)
      if (effect.cost) applyCost(state, player, effect.cost as any);
      const drawn = drawCards(state.decks.spell, count);
      for (const c of drawn) player.hand.push(c);
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: drew ${drawn.length} spell(s)`);
      break;
    }
    case 'drawRoom': {
      const count = (effect.value as number) ?? 1;
      if (effect.cost) applyCost(state, player, effect.cost as any);
      const drawn = drawCards(state.decks.room, count);
      for (const c of drawn) player.hand.push(c);
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: drew ${drawn.length} room(s)`);
      break;
    }
    case 'drawCard': {
      const count = (effect.value as number) ?? 1;
      const drawn = drawCards(state.decks.room, count);
      for (const c of drawn) player.hand.push(c);
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: drew ${count} card(s)`);
      break;
    }
    case 'drawMiniboss': {
      const count = (effect.value as number) ?? 1;
      const drawn = drawCards(state.decks.miniboss, count);
      for (const c of drawn) player.minibossHand.push(c);
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: drew ${count} miniboss(es)`);
      break;
    }

    // ── Damage effects ────────────────────────────────────────
    case 'damageHero': {
      const dmg = (effect.value as number) ?? 0;
      const heroes = getTargetHeroes(state, effect.target as string, pending.targets);
      for (const h of heroes) {
        h.currentHP -= dmg;
        addToLog(state, player.id, 'spell_effect', `${pending.card.name}: dealt ${dmg} damage to ${h.card.name} (HP: ${h.currentHP})`);
      }
      if (effect.destroyRoom) {
        addToLog(state, player.id, 'spell_effect', `${pending.card.name}: destroyed the room`);
      }
      break;
    }
    case 'killHero': {
      const heroes = getTargetHeroes(state, effect.target as string, pending.targets);
      for (const h of heroes) {
        const threshold = (effect.value as number) ?? 999;
        if (h.currentHP <= threshold || effect.condition === 'halfHealth' && h.currentHP <= h.card.health / 2) {
          h.currentHP = 0;
          addToLog(state, player.id, 'spell_effect', `${pending.card.name}: killed ${h.card.name}!`);
        }
      }
      break;
    }
    case 'damageAndHeal': {
      const heal = (effect as any).heal ?? (effect as any).healValue ?? 1;
      if (player.wounds.length > 0 && heal > 0) {
        const w = player.wounds.pop()!;
        player.souls.push(w);
      }
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'randomDamage': {
      const min = (effect as any).min ?? 1;
      const max = (effect as any).max ?? 6;
      const roll = Math.floor(Math.random() * (max - min + 1)) + min;
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: rolled ${roll} damage!`);
      break;
    }

    // ── Healing ───────────────────────────────────────────────
    case 'healWound': {
      const count = (effect.value as number) ?? 1;
      for (let j = 0; j < count && player.wounds.length > 0; j++) {
        const w = player.wounds.pop()!;
        player.souls.push(w);
      }
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: healed ${count} wound(s)`);
      break;
    }

    // ── Economy ───────────────────────────────────────────────
    case 'gainCoins': {
      const amount = (effect.value as number) ?? 0;
      player.coins += amount;
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: gained ${amount} coin(s)`);
      break;
    }
    case 'stealCoins': {
      const amount = (effect.value as number) ?? 0;
      for (const other of state.players) {
        if (other.id === player.id) continue;
        const stolen = Math.min(amount, other.coins);
        other.coins -= stolen;
        player.coins += stolen;
      }
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: stole coins`);
      break;
    }

    // ── Hero manipulation ─────────────────────────────────────
    case 'lureHero': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'lureAllType': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'sendBack': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'moveHero': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'freezeHero':
    case 'freezeAllHeroes': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'skipRoom':
    case 'skipRooms':
    case 'skipAllRooms': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }

    // ── Room manipulation ─────────────────────────────────────
    case 'destroyRoom': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'destroyAllRooms': {
      for (const p of state.players) {
        for (const r of p.dungeon) state.discards.room.push(r.card);
        p.dungeon = [];
      }
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: destroyed all rooms!`);
      break;
    }
    case 'deactivateRooms': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'copyRoom': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'swapRooms': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'addDamageCounter':
    case 'addDamageCounters': {
      const amount = (effect.value as number) ?? 1;
      // Add to first room in player's dungeon as default
      if (player.dungeon.length > 0) {
        player.dungeon[0].damageCounters += amount;
      }
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: +${amount} damage counter(s)`);
      break;
    }

    // ── Build modification ────────────────────────────────────
    case 'buildExtraRoom': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: may build an extra room`);
      break;
    }
    case 'extraBuild': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: may build an extra room`);
      break;
    }
    case 'preventBuild': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }

    // ── Counter / cancel ──────────────────────────────────────
    case 'cancelSpell': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: Counterspell!`);
      break;
    }

    // ── Discard retrieval ─────────────────────────────────────
    case 'retrieveFromDiscard': {
      const count = (effect.value as number) ?? 1;
      const cardType = effect.cardType as string ?? 'room';
      const pile = cardType === 'spell' ? state.discards.spell : state.discards.room;
      const retrieved = pile.splice(0, Math.min(count, pile.length));
      for (const c of retrieved) player.hand.push(c as any);
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: retrieved ${retrieved.length} card(s) from discard`);
      break;
    }
    case 'searchDeck': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }

    // ── Miniboss effects ──────────────────────────────────────
    case 'promoteMiniboss': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }

    // ── Miscellaneous ─────────────────────────────────────────
    case 'bonusDamage': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'doubleDamage': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'immuneToHero': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'preventDamage': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'preventElimination': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'convertHero': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }
    case 'changeHeroClass':
    case 'changeRoomType':
    case 'redirectHero':
    case 'stealHero':
    case 'controlHero':
    case 'reviveHero':
    case 'reduceHP':
    case 'removeHero':
    case 'pullHero':
    case 'phaseRoom':
    case 'bossAttack':
    case 'createRoom':
    case 'stealSoul':
    case 'buildAdvanced':
    case 'levelUpBoss':
    case 'copySpell':
    case 'revealAll':
    case 'returnHero':
    case 'allPlayersDraw':
    case 'lureAllHeroType':
    case 'viewHeroDeck':
    case 'revealHeroDeck':
    case 'shuffleHeroes':
    case 'teleportHero':
    case 'multiEffect':
    case 'damageAllHeroes':
    case 'curse': {
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
      break;
    }

    default:
      addToLog(state, player.id, 'spell_effect', `${pending.card.name}: ${desc}`);
  }

  state.discards.spell.push(pending.card);
}

function applyCost(state: GameState, player: any, cost: { type: string; value?: number }): void {
  switch (cost.type) {
    case 'wound': {
      // Take X wounds (push dummy hero cards)
      break;
    }
    case 'gold': {
      player.coins -= cost.value ?? 0;
      break;
    }
    case 'soul': {
      if (player.souls.length > 0) player.souls.pop();
      break;
    }
    case 'destroyRoom': {
      if (player.dungeon.length > 0) {
        const removed = player.dungeon.pop();
        if (removed) state.discards.room.push(removed.card);
      }
      break;
    }
  }
}

function getTargetHeroes(
  state: GameState, target: string | undefined,
  _targets: Record<string, unknown>,
): HeroInstance[] {
  // Return heroes from town as default targets
  if (target === 'allHeroesInAllDungeons' || target === 'allHeroesInDungeon') {
    return [...state.town];
  }
  if (target === 'allHeroesInTown') {
    return [...state.town];
  }
  // Default: first hero in town
  if (state.town.length > 0) return [state.town[0]];
  return [];
}
