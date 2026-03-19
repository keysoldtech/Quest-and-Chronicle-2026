import type { SpellCard } from '../types';

export const SPELLS: SpellCard[] = [
  {
    id: 'spell_boulder',
    name: 'Giant Boulder',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 5,
        target: 'heroInDungeon',
        destroyRoom: true
      },
    description: 'Deal 5 damage to a Hero. Destroy the Room they\'re in.',
    flavorText: 'Indiana would be proud.',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_cave_in',
    name: 'Cave-In',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 3,
        target: 'heroInDungeon'
      },
    description: 'Deal 3 damage to a Hero in any dungeon.',
    flavorText: 'The roof, the roof is falling in!',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_annihilate',
    name: 'Annihilate',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'killHero',
        target: 'heroHealth4OrLess'
      },
    description: 'Destroy a Hero with 4 or less HP remaining.',
    flavorText: 'Poof. Gone.',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_teleport',
    name: 'Teleportation',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'moveHero',
        target: 'heroInDungeon',
        destination: 'anyRoom'
      },
    description: 'Move a Hero to any Room in any dungeon.',
    flavorText: 'Thinking with portals.',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_freeze',
    name: 'Freeze',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'freezeHero',
        target: 'heroInDungeon'
      },
    description: 'A Hero skips their next Room.',
    flavorText: 'Cool it!',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_charm',
    name: 'Charm',
    spellType: 'instant',
    phase: 'bait',
    effect: {
        type: 'lureHero',
        value: 1,
        override: true
      },
    description: 'Lure a Hero to your dungeon, ignoring treasure counts.',
    flavorText: 'Come hither...',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_counterspell',
    name: 'Counterspell',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'cancelSpell'
      },
    description: 'Cancel another Spell.',
    flavorText: 'Nope.',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_exhaustion',
    name: 'Exhaustion',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 2,
        target: 'heroInRoom'
      },
    description: 'Deal 2 damage to a Hero in a Room.',
    flavorText: 'So... tired...',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_fear',
    name: 'Fear',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'sendBack',
        target: 'heroInDungeon',
        destination: 'entrance'
      },
    description: 'Send a Hero back to the dungeon entrance.',
    flavorText: 'BOO!',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_jeopardy',
    name: 'Jeopardy',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'sendBack',
        target: 'heroInDungeon',
        destination: 'town'
      },
    description: 'Send a Hero back to town.',
    flavorText: 'What is... retreat?',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_knockout_gas',
    name: 'Knockout Gas',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 1,
        target: 'allHeroesInDungeon'
      },
    description: 'Deal 1 damage to all Heroes in your dungeon.',
    flavorText: 'Sweet dreams.',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_motivation',
    name: 'Motivation',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'buildExtraRoom'
      },
    description: 'Build an additional Room this turn.',
    flavorText: 'Get to work!',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_princess_captive',
    name: 'Princess in Peril',
    spellType: 'instant',
    phase: 'bait',
    effect: {
        type: 'lureAllType',
        heroClass: 'fighter'
      },
    description: 'All Fighters in town go to your dungeon.',
    flavorText: 'Help! Help!',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_soul_drain',
    name: 'Soul Drain',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'healWound',
        value: 1,
        condition: 'heroKilledThisTurn'
      },
    description: 'If you killed a Hero this turn, heal 1 Wound.',
    flavorText: 'Delicious souls.',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_zombify',
    name: 'Zombify',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'convertHero',
        target: 'deadHero',
        conversion: 'monsterRoom'
      },
    description: 'Turn a dead Hero into a Monster Room (2 damage, Hero\'s treasure).',
    flavorText: 'Rise again!',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_dark_pact',
    name: 'Dark Pact',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'drawSpell',
        value: 2,
        cost: {
          type: 'wound',
          value: 1
        }
      },
    description: 'Take 1 Wound to draw 2 Spell cards.',
    flavorText: 'Power at a price.',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_fortune',
    name: 'Fortune',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'drawRoom',
        value: 2
      },
    description: 'Draw 2 Room cards.',
    flavorText: 'Luck be a lady.',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_ransack',
    name: 'Ransack',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'gainCoins',
        value: 2,
        condition: 'heroKilledThisTurn'
      },
    description: 'If you killed a Hero this turn, gain 2 Coins.',
    flavorText: 'Loot everything!',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_resurrection',
    name: 'Resurrection',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'retrieveFromDiscard',
        cardType: 'room',
        value: 1
      },
    description: 'Retrieve 1 Room from the discard pile.',
    flavorText: 'Back from the dead.',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_sabotage',
    name: 'Sabotage',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'preventBuild',
        target: 'opponent'
      },
    description: 'Prevent an opponent from building this turn.',
    flavorText: 'Oops, was that important?',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_vampire_touch',
    name: 'Vampiric Touch',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageAndHeal',
        damage: 2,
        heal: 1
      },
    description: 'Deal 2 damage to a Hero. If it dies, heal 1 Wound.',
    flavorText: 'Draining...',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_wind_change',
    name: 'Winds of Change',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'moveHero',
        target: 'heroInDungeon',
        destination: 'otherDungeon'
      },
    description: 'Move a Hero from your dungeon to another.',
    flavorText: 'Blown away.',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_trap_upgrade',
    name: 'Trap Upgrade',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'addDamageCounter',
        target: 'trapRoom',
        value: 1
      },
    description: 'Add 1 damage counter to a Trap Room.',
    flavorText: 'More spikes!',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_monster_upgrade',
    name: 'Monster Upgrade',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'addDamageCounter',
        target: 'monsterRoom',
        value: 1
      },
    description: 'Add 1 damage counter to a Monster Room.',
    flavorText: 'Feed the beast!',
    expansion: 'base',
    quantity: 2
  },
  {
    id: 'spell_backstab',
    name: 'Backstab',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 4,
        condition: 'heroInLastRoom'
      },
    description: 'Deal 4 damage to a Hero in the Boss Room.',
    flavorText: 'Et tu, minion?',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_betrayal',
    name: 'Betrayal',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'stealHero',
        target: 'heroInOpponentDungeon'
      },
    description: 'Move a Hero from an opponent\'s dungeon to yours.',
    flavorText: 'Switching sides.',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_black_hole',
    name: 'Black Hole',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'killHero',
        target: 'heroInRoom',
        destroyRoom: true
      },
    description: 'Destroy a Hero and the Room they\'re in.',
    flavorText: 'Into the void.',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_blood_magic',
    name: 'Blood Magic',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'drawRoom',
        value: 3,
        cost: {
          type: 'wound',
          value: 1
        }
      },
    description: 'Take 1 Wound to draw 3 Room cards.',
    flavorText: 'Blood is power.',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_clone',
    name: 'Clone Room',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'copyRoom',
        target: 'anyRoom'
      },
    description: 'Copy a Room in any dungeon. Build the copy.',
    flavorText: 'Double trouble.',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_curse_of_weakness',
    name: 'Curse of Weakness',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'reduceHP',
        target: 'heroInTown',
        value: 3
      },
    description: 'A Hero in town loses 3 max HP.',
    flavorText: 'Feeling feeble?',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_death_touch',
    name: 'Death Touch',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'killHero',
        target: 'heroHealth3OrLess'
      },
    description: 'Kill a Hero with 3 or less HP remaining.',
    flavorText: 'One touch is all it takes.',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_decoy',
    name: 'Decoy',
    spellType: 'instant',
    phase: 'bait',
    effect: {
        type: 'redirectHero',
        target: 'heroGoingToOpponent'
      },
    description: 'Redirect a Hero going to an opponent to your dungeon.',
    flavorText: 'Over here!',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_demolish',
    name: 'Demolish',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'destroyRoom',
        target: 'anyRoom'
      },
    description: 'Destroy any Room in any dungeon.',
    flavorText: 'Tear it down!',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_double_agent',
    name: 'Double Agent',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'controlHero',
        description: 'Control a Hero; it damages other Heroes.'
      },
    description: 'A Hero damages all other Heroes in your dungeon.',
    flavorText: 'Working for the enemy.',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_earthquake',
    name: 'Earthquake',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'deactivateRooms',
        target: 'all',
        value: 1
      },
    description: 'Deactivate 1 Room in every dungeon.',
    flavorText: 'Shake shake shake.',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_empower',
    name: 'Empower',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'bonusDamage',
        target: 'ownRoom',
        value: 3
      },
    description: 'A Room deals +3 damage this turn.',
    flavorText: 'POWER UP!',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_extraction',
    name: 'Extraction',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'healWound',
        value: 1,
        cost: {
          type: 'destroyRoom',
          value: 1
        }
      },
    description: 'Destroy one of your Rooms to heal 1 Wound.',
    flavorText: 'Sacrifice for survival.',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_fireball',
    name: 'Fireball!',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'randomDamage',
        min: 1,
        max: 6,
        diceType: 'd6',
        target: 'heroInDungeon'
      },
    description: 'Deal 1-6 damage to a Hero (roll a d6).',
    flavorText: 'BOOM!',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_gold_rush',
    name: 'Gold Rush',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'gainCoins',
        value: 4
      },
    description: 'Gain 4 Coins.',
    flavorText: 'Cha-ching!',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_identity_crisis',
    name: 'Identity Crisis',
    spellType: 'instant',
    phase: 'bait',
    effect: {
        type: 'changeHeroClass',
        target: 'heroInTown'
      },
    description: 'Change a Hero\'s class to any other class.',
    flavorText: 'Who am I?',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_lure',
    name: 'Irresistible Lure',
    spellType: 'instant',
    phase: 'bait',
    effect: {
        type: 'lureHero',
        value: 2
      },
    description: 'Lure 2 Heroes from town to your dungeon.',
    flavorText: 'Come to me...',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_mutation',
    name: 'Mutation',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'changeRoomType',
        target: 'ownRoom'
      },
    description: 'Change one of your Rooms to Monster or Trap type.',
    flavorText: 'Evolve!',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_necromancy',
    name: 'Necromancy',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'reviveHero',
        target: 'deadHero',
        controlledBy: 'self'
      },
    description: 'A dead Hero fights for you, dealing its HP as damage to next Hero.',
    flavorText: 'Rise!',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_paralysis',
    name: 'Paralysis',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'skipRoom',
        target: 'heroInDungeon',
        value: 2
      },
    description: 'A Hero skips 2 Rooms.',
    flavorText: 'Can\'t... move...',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_raise_dead',
    name: 'Raise Dead',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'retrieveFromDiscard',
        cardType: 'room',
        value: 2
      },
    description: 'Retrieve 2 Room cards from the discard pile.',
    flavorText: 'From dust to dungeon.',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_remodel',
    name: 'Remodel',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'swapRooms',
        target: 'ownRooms'
      },
    description: 'Swap the positions of 2 of your Rooms.',
    flavorText: 'Feng shui of evil.',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_sacrifice',
    name: 'Sacrifice',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'killHero',
        target: 'heroInDungeon',
        cost: {
          type: 'destroyRoom',
          value: 1
        }
      },
    description: 'Destroy one of your Rooms to kill a Hero.',
    flavorText: 'Worth it.',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_steal_treasure',
    name: 'Steal Treasure',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'stealCoins',
        target: 'opponent',
        value: 3
      },
    description: 'Steal 3 Coins from an opponent.',
    flavorText: 'Mine now!',
    expansion: 'nextLevel',
    quantity: 2
  },
  {
    id: 'spell_ambush',
    name: 'Ambush',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 3,
        target: 'heroEnteringDungeon'
      },
    description: 'Deal 3 damage to a Hero as they enter your dungeon.',
    flavorText: 'Surprise!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_apocalypse',
    name: 'Apocalypse',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'destroyAllRooms',
        target: 'allPlayers'
      },
    description: 'Destroy all Rooms in all dungeons.',
    flavorText: 'End of days.',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_boss_rage',
    name: 'Boss Rage',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'bonusDamage',
        target: 'allRooms',
        value: 1
      },
    description: 'All your Rooms deal +1 damage this turn.',
    flavorText: 'RAAAARGH!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_dark_bargain',
    name: 'Dark Bargain',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'searchDeck',
        target: 'roomDeck',
        value: 1,
        cost: {
          type: 'wound',
          value: 1
        }
      },
    description: 'Take 1 Wound to search for any Room card.',
    flavorText: 'Name your price.',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_deadly_gas',
    name: 'Deadly Gas',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 2,
        target: 'allHeroesInAllDungeons'
      },
    description: 'Deal 2 damage to all Heroes in all dungeons.',
    flavorText: 'Breathe deep.',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_dominate',
    name: 'Dominate',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'controlHero',
        target: 'heroInDungeon',
        action: 'attackOtherHero'
      },
    description: 'A Hero attacks another Hero for its full HP.',
    flavorText: 'You serve me now.',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_doppelganger',
    name: 'Doppelganger',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'copyRoom',
        target: 'ownRoom',
        permanent: true
      },
    description: 'Create a permanent copy of one of your Rooms.',
    flavorText: 'Seeing double.',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_execute',
    name: 'Execute',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'killHero',
        target: 'heroHealth5OrLess'
      },
    description: 'Kill a Hero with 5 or less HP remaining.',
    flavorText: 'Off with their head!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_explosion',
    name: 'Explosion',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 6,
        target: 'heroInRoom',
        destroyRoom: true
      },
    description: 'Deal 6 damage to a Hero. Destroy the Room.',
    flavorText: 'KABOOM!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_fade',
    name: 'Fade Away',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'immuneToHero',
        target: 'ownDungeon'
      },
    description: 'Your dungeon takes no Wounds from surviving Heroes this turn.',
    flavorText: 'Now you see me...',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_flash_freeze',
    name: 'Flash Freeze',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'freezeAllHeroes',
        target: 'heroesInDungeon'
      },
    description: 'All Heroes in your dungeon skip their next Room.',
    flavorText: 'Frozen solid.',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_giant_growth',
    name: 'Giant Growth',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'bonusDamage',
        target: 'monsterRoom',
        value: 4
      },
    description: 'A Monster Room deals +4 damage this turn.',
    flavorText: 'GROW!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_grave_robber',
    name: 'Grave Robber',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'retrieveFromDiscard',
        cardType: 'any',
        value: 2
      },
    description: 'Retrieve 2 cards from any discard pile.',
    flavorText: 'Dig it up.',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_greed',
    name: 'Greed',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'stealCoins',
        target: 'allOpponents',
        value: 1
      },
    description: 'Steal 1 Coin from each opponent.',
    flavorText: 'Gimme gimme gimme.',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_mass_heal',
    name: 'Mass Heal',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'healWound',
        value: 2
      },
    description: 'Heal 2 Wounds.',
    flavorText: 'Feel better?',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_mind_control',
    name: 'Mind Control',
    spellType: 'instant',
    phase: 'bait',
    effect: {
        type: 'stealHero',
        target: 'heroGoingToOpponent'
      },
    description: 'A Hero going to an opponent goes to your dungeon instead.',
    flavorText: 'You will obey.',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_abduction',
    name: 'Alien Abduction',
    spellType: 'instant',
    phase: 'bait',
    effect: {
        type: 'lureHero',
        value: 1,
        fromAnywhere: true
      },
    description: 'Lure a Hero from town or another dungeon.',
    flavorText: 'We come in peace... not.',
    expansion: 'crashLanding',
    quantity: 2
  },
  {
    id: 'spell_beam_up',
    name: 'Beam Up',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'removeHero',
        target: 'heroInDungeon'
      },
    description: 'Remove a Hero from the game.',
    flavorText: 'Energize!',
    expansion: 'crashLanding',
    quantity: 2
  },
  {
    id: 'spell_emp',
    name: 'EMP Blast',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'deactivateRooms',
        target: 'opponentDungeon',
        value: 'all'
      },
    description: 'Deactivate all Rooms in one opponent\'s dungeon.',
    flavorText: 'Systems down.',
    expansion: 'crashLanding',
    quantity: 2
  },
  {
    id: 'spell_hyperdrive',
    name: 'Hyperdrive',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'skipAllRooms',
        target: 'heroInDungeon'
      },
    description: 'A Hero skips directly to the Boss Room.',
    flavorText: 'Warp speed!',
    expansion: 'crashLanding',
    quantity: 2
  },
  {
    id: 'spell_laser_beam',
    name: 'Laser Beam',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 5,
        target: 'heroInDungeon'
      },
    description: 'Deal 5 damage to a Hero.',
    flavorText: 'Pew!',
    expansion: 'crashLanding',
    quantity: 2
  },
  {
    id: 'spell_orbital_strike',
    name: 'Orbital Strike',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 3,
        target: 'allHeroesInTown'
      },
    description: 'Deal 3 damage to all Heroes in town.',
    flavorText: 'Fire from above!',
    expansion: 'crashLanding',
    quantity: 2
  },
  {
    id: 'spell_phase_shift',
    name: 'Phase Shift',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'phaseRoom',
        target: 'ownRoom'
      },
    description: 'A Hero passes through one of your Rooms without taking damage.',
    flavorText: 'Walk through walls.',
    expansion: 'crashLanding',
    quantity: 2
  },
  {
    id: 'spell_stasis',
    name: 'Stasis Field',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'freezeHero',
        target: 'heroInDungeon',
        duration: 2
      },
    description: 'A Hero skips 2 turns.',
    flavorText: 'Frozen in time.',
    expansion: 'crashLanding',
    quantity: 2
  },
  {
    id: 'spell_tech_upgrade',
    name: 'Tech Upgrade',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'addDamageCounter',
        target: 'explorerRoom',
        value: 2
      },
    description: 'Add 2 damage counters to an Explorer Room.',
    flavorText: 'Upgrade complete.',
    expansion: 'crashLanding',
    quantity: 2
  },
  {
    id: 'spell_tractor_beam',
    name: 'Tractor Beam',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'pullHero',
        target: 'heroInOpponentDungeon'
      },
    description: 'Pull a Hero from an opponent\'s dungeon to yours.',
    flavorText: 'Gotcha!',
    expansion: 'crashLanding',
    quantity: 2
  },
  {
    id: 'spell_promote',
    name: 'Battlefield Promotion',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'promoteMiniboss',
        cost: 0
      },
    description: 'Promote a Miniboss for free.',
    flavorText: 'You\'ve earned it.',
    expansion: 'minibosses',
    quantity: 2
  },
  {
    id: 'spell_miniboss_rally',
    name: 'Miniboss Rally',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'bonusDamage',
        target: 'roomsWithMiniboss',
        value: 2
      },
    description: 'Rooms with Minibosses deal +2 damage this turn.',
    flavorText: 'For the boss!',
    expansion: 'minibosses',
    quantity: 2
  },
  {
    id: 'spell_recruit',
    name: 'Recruitment Drive',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'drawMiniboss',
        value: 2
      },
    description: 'Draw 2 Miniboss cards.',
    flavorText: 'Now hiring.',
    expansion: 'minibosses',
    quantity: 2
  },
  {
    id: 'spell_miniboss_sacrifice',
    name: 'Miniboss Sacrifice',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 5,
        cost: {
          type: 'discardMiniboss',
          value: 1
        }
      },
    description: 'Discard a Miniboss to deal 5 damage to a Hero.',
    flavorText: 'Take one for the team.',
    expansion: 'minibosses',
    quantity: 2
  },
  {
    id: 'spell_curse',
    name: 'Ancient Curse',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'curse',
        target: 'heroInTown',
        effect: 'damagePerRoom',
        value: 1
      },
    description: 'A Hero takes +1 damage from each Room.',
    flavorText: 'Cursed forever.',
    expansion: 'vault',
    quantity: 2
  },
  {
    id: 'spell_petrify',
    name: 'Petrify',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'killHero',
        target: 'heroHealth6OrLess'
      },
    description: 'Kill a Hero with 6 or less HP.',
    flavorText: 'Turned to stone.',
    expansion: 'vault',
    quantity: 2
  },
  {
    id: 'spell_plague',
    name: 'Plague',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 1,
        target: 'allHeroesInAllDungeons',
        ongoing: true
      },
    description: 'All Heroes take 1 damage each turn.',
    flavorText: 'Spread the sickness.',
    expansion: 'vault',
    quantity: 2
  },
  {
    id: 'spell_summon_demon',
    name: 'Summon Demon',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'createRoom',
        roomType: 'monster',
        damage: 4,
        treasure: 'cleric',
        duration: 'turn'
      },
    description: 'Create a temporary 4-damage Monster Room.',
    flavorText: 'From the depths!',
    expansion: 'vault',
    quantity: 2
  },
  {
    id: 'spell_steal_soul',
    name: 'Steal Soul',
    spellType: 'instant',
    phase: 'end',
    effect: {
        type: 'stealSoul',
        target: 'opponent'
      },
    description: 'Steal 1 Soul from an opponent.',
    flavorText: 'That\'s mine now.',
    expansion: 'vault',
    quantity: 2
  },
  {
    id: 'spell_underworld',
    name: 'Call from the Underworld',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'retrieveFromDiscard',
        cardType: 'room',
        value: 3
      },
    description: 'Retrieve 3 Room cards from the discard pile.',
    flavorText: 'Rise from the grave!',
    expansion: 'vault',
    quantity: 2
  },
  {
    id: 'spell_super_strength',
    name: 'Super Strength',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'doubleDamage',
        target: 'allRooms',
        duration: 'turn'
      },
    description: 'All Rooms in your dungeon deal double damage this turn.',
    flavorText: 'MAXIMUM POWER!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_mega_boulder',
    name: 'Mega Boulder',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 8,
        destroyRoom: true
      },
    description: 'Deal 8 damage to a Hero. Destroy the Room they\'re in.',
    flavorText: 'Bigger is better.',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_combo_attack',
    name: 'Combo Attack',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 2,
        repeat: 3
      },
    description: 'Deal 2 damage to a Hero three times.',
    flavorText: 'One, two, three!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_power_up',
    name: 'Power Up',
    spellType: 'instant',
    phase: 'build',
    effect: {
        type: 'addDamageCounter',
        value: 2,
        target: 'anyRoom'
      },
    description: 'Add 2 damage counters to a Room.',
    flavorText: 'Level up!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_boss_mode',
    name: 'Boss Mode',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'bossAttack',
        value: 5
      },
    description: 'Your Boss deals 5 damage to a Hero in your dungeon.',
    flavorText: 'Boss enters the battle!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_extra_life',
    name: 'Extra Life',
    spellType: 'instant',
    phase: 'end',
    effect: {
        type: 'healWound',
        value: 2
      },
    description: 'Convert 2 Wounds to Souls.',
    flavorText: '1-UP!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_continue',
    name: 'Continue?',
    spellType: 'instant',
    phase: 'end',
    effect: {
        type: 'preventElimination',
        duration: 'turn'
      },
    description: 'If you would be eliminated this turn, survive with 1 Soul instead.',
    flavorText: 'Insert coin to continue.',
    expansion: 'super',
    quantity: 1
  },
  {
    id: 'spell_cheat_code',
    name: 'Cheat Code',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'drawCard',
        value: 3,
        choice: true
      },
    description: 'Draw 3 cards from either deck.',
    flavorText: 'Up, up, down, down...',
    expansion: 'super',
    quantity: 1
  },
  {
    id: 'spell_decade_of_doom',
    name: 'Decade of Doom',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 10
      },
    description: 'Deal 10 damage to a Hero.',
    flavorText: 'Ten years of terror!',
    expansion: 'tenthAnniversary',
    quantity: 1
  },
  {
    id: 'spell_legacy_spell',
    name: 'Legacy Spell',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'copySpell',
        target: 'discard'
      },
    description: 'Copy the effect of any Spell in the discard pile.',
    flavorText: 'The past returns.',
    expansion: 'tenthAnniversary',
    quantity: 1
  },
  {
    id: 'spell_anniversary_celebration',
    name: 'Anniversary Celebration',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'multiEffect',
        effects: ["drawRoom","drawSpell","gainCoins"],
        values: [1,1,1]
      },
    description: 'Draw a Room, draw a Spell, and gain 1 Gold.',
    flavorText: 'Party time!',
    expansion: 'tenthAnniversary',
    quantity: 1
  },
  {
    id: 'spell_hyper_beam',
    name: 'Hyper Beam',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 6
      },
    description: 'Deal 6 damage to a Hero.',
    flavorText: 'Maximum firepower!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_ultra_shield',
    name: 'Ultra Shield',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'preventDamage',
        target: 'allRooms',
        duration: 'turn'
      },
    description: 'Prevent all damage to Rooms this turn.',
    flavorText: 'Impenetrable defense!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_mega_drain',
    name: 'Mega Drain',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageAndHeal',
        damageValue: 3,
        healValue: 1
      },
    description: 'Deal 3 damage to a Hero. Convert 1 Wound to a Soul.',
    flavorText: 'Take their life force!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_power_surge',
    name: 'Power Surge',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'addDamageCounters',
        value: 3,
        target: 'anyRoom'
      },
    description: 'Add 3 damage counters to a Room.',
    flavorText: 'Overcharge!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_boss_strike',
    name: 'Boss Strike',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'bossAttack',
        damageValue: 'bossXP'
      },
    description: 'Your Boss deals damage equal to XP/100 to a Hero.',
    flavorText: 'Personal attack!',
    expansion: 'super',
    quantity: 2
  },
  {
    id: 'spell_game_over',
    name: 'Game Over',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'killHero',
        condition: 'halfHealth'
      },
    description: 'Kill a Hero with half or less health remaining.',
    flavorText: 'INSERT COIN TO CONTINUE',
    expansion: 'super',
    quantity: 1
  },
  {
    id: 'spell_decade_strike',
    name: 'Decade Strike',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageHero',
        value: 5
      },
    description: 'Deal 5 damage to a Hero.',
    flavorText: 'Ten years of damage.',
    expansion: 'tenthAnniversary',
    quantity: 2
  },
  {
    id: 'spell_legacy_magic',
    name: 'Legacy Magic',
    spellType: 'instant',
    phase: 'any',
    effect: {
        type: 'retrieveFromDiscard',
        cardType: 'spell',
        value: 2
      },
    description: 'Retrieve 2 Spell cards from the discard pile.',
    flavorText: 'Ancient magic returns.',
    expansion: 'tenthAnniversary',
    quantity: 2
  },
  {
    id: 'spell_birthday_bash',
    name: 'Birthday Bash',
    spellType: 'instant',
    phase: 'adventure',
    effect: {
        type: 'damageAllHeroes',
        value: 2
      },
    description: 'Deal 2 damage to all Heroes in all dungeons.',
    flavorText: 'Party crasher!',
    expansion: 'tenthAnniversary',
    quantity: 1
  }
] as SpellCard[];

export const TOTAL_SPELL_CARDS = SPELLS.reduce((sum, s) => sum + s.quantity, 0);
