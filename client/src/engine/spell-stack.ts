import type { GameState, SpellCard, PlayerState, PendingSpell, CardEffect } from '../data/types';
import { addToLog } from './game-state';
import { drawCards } from '../utils/shuffle';

/**
 * Check whether a spell can legally be played in the current phase.
 */
export function canPlaySpell(state: GameState, spell: SpellCard): boolean {
  const phase = state.currentPhase;
  if (spell.phase === 'any') return true;
  if (spell.phase === phase) return true;
  return false;
}

/**
 * Push a spell onto the spell stack (for interrupt resolution).
 */
export function pushSpell(
  state: GameState,
  playerId: string,
  spell: SpellCard,
  targets: Record<string, unknown> = {},
): void {
  state.spellStack.push({ card: spell, playerId, targets });
  addToLog(state, playerId, 'play_spell', `Played ${spell.name}`);
}

/**
 * Resolve the spell stack in LIFO order (last in, first out).
 */
export function resolveSpellStack(state: GameState): void {
  while (state.spellStack.length > 0) {
    const pending = state.spellStack.pop()!;
    resolveSpellEffect(state, pending);
  }
}

/**
 * Resolve a single spell effect.
 */
function resolveSpellEffect(state: GameState, pending: PendingSpell): void {
  const player = state.players.find(p => p.id === pending.playerId);
  if (!player) return;

  const effect = pending.card.effect;

  switch (effect.type) {
    case 'damageHero': {
      // In full implementation, target selection from pending.targets
      addToLog(state, player.id, 'spell_effect',
        `${pending.card.name}: ${pending.card.description}`);
      break;
    }

    case 'killHero': {
      addToLog(state, player.id, 'spell_effect',
        `${pending.card.name}: ${pending.card.description}`);
      break;
    }

    case 'drawSpell': {
      const count = (effect.value as number) ?? 1;
      const drawn = drawCards(state.decks.spell, count);
      for (const c of drawn) player.hand.push(c);
      addToLog(state, player.id, 'spell_effect', `Drew ${drawn.length} spell card(s)`);
      break;
    }

    case 'drawRoom': {
      const count = (effect.value as number) ?? 1;
      const drawn = drawCards(state.decks.room, count);
      for (const c of drawn) player.hand.push(c);
      addToLog(state, player.id, 'spell_effect', `Drew ${drawn.length} room card(s)`);
      break;
    }

    case 'healWound': {
      const count = (effect.value as number) ?? 1;
      for (let i = 0; i < count && player.wounds.length > 0; i++) {
        const w = player.wounds.pop()!;
        player.souls.push(w);
      }
      addToLog(state, player.id, 'spell_effect', `Healed ${count} wound(s)`);
      break;
    }

    case 'cancelSpell': {
      // The spell being cancelled was already removed from the stack
      // (it was the one before this on the stack, resolved after this)
      addToLog(state, player.id, 'spell_effect', 'Counterspell!');
      break;
    }

    case 'lureHero': {
      addToLog(state, player.id, 'spell_effect',
        `${pending.card.name}: ${pending.card.description}`);
      break;
    }

    case 'sendBack': {
      addToLog(state, player.id, 'spell_effect',
        `${pending.card.name}: ${pending.card.description}`);
      break;
    }

    case 'moveHero': {
      addToLog(state, player.id, 'spell_effect',
        `${pending.card.name}: ${pending.card.description}`);
      break;
    }

    case 'freezeHero': {
      addToLog(state, player.id, 'spell_effect',
        `${pending.card.name}: ${pending.card.description}`);
      break;
    }

    case 'buildExtraRoom': {
      addToLog(state, player.id, 'spell_effect', 'May build an additional room this turn');
      break;
    }

    case 'bonusDamage': {
      addToLog(state, player.id, 'spell_effect',
        `${pending.card.name}: ${pending.card.description}`);
      break;
    }

    case 'destroyRoom': {
      addToLog(state, player.id, 'spell_effect',
        `${pending.card.name}: ${pending.card.description}`);
      break;
    }

    case 'gainCoins': {
      const amount = (effect.value as number) ?? 0;
      player.coins += amount;
      addToLog(state, player.id, 'spell_effect', `Gained ${amount} coins`);
      break;
    }

    case 'stealCoins': {
      addToLog(state, player.id, 'spell_effect',
        `${pending.card.name}: ${pending.card.description}`);
      break;
    }

    case 'retrieveFromDiscard': {
      addToLog(state, player.id, 'spell_effect',
        `${pending.card.name}: ${pending.card.description}`);
      break;
    }

    default:
      addToLog(state, player.id, 'spell_effect',
        `${pending.card.name}: ${pending.card.description}`);
  }

  // Move spell to discard pile
  state.discards.spell.push(pending.card);
}
