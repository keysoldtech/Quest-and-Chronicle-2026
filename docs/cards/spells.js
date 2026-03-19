/**
 * Boss Monster - Spell Cards Database
 * All spells from all expansions
 */

const SPELLS = [
    // ========================================
    // BASE GAME SPELLS (24)
    // ========================================
    {
        id: 'spell_boulder',
        localImage: 'public/images/cards/spells/spell_boulder.jpg',
        name: 'Giant Boulder',
        image: 'https://bossmonster.fandom.com/wiki/Giant Boulder'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_cave_in.jpg',
        name: 'Cave-In',
        image: 'https://bossmonster.fandom.com/wiki/Cave-In'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_annihilate.jpg',
        name: 'Annihilate',
        image: 'https://bossmonster.fandom.com/wiki/Annihilate'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_teleport.jpg',
        name: 'Teleportation',
        image: 'https://bossmonster.fandom.com/wiki/Teleportation'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_freeze.jpg',
        name: 'Freeze',
        image: 'https://bossmonster.fandom.com/wiki/Freeze'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_charm.jpg',
        name: 'Charm',
        image: 'https://bossmonster.fandom.com/wiki/Charm'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_counterspell.jpg',
        name: 'Counterspell',
        image: 'https://bossmonster.fandom.com/wiki/Counterspell'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_exhaustion.jpg',
        name: 'Exhaustion',
        image: 'https://bossmonster.fandom.com/wiki/Exhaustion'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_fear.jpg',
        name: 'Fear',
        image: 'https://bossmonster.fandom.com/wiki/Fear'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_jeopardy.jpg',
        name: 'Jeopardy',
        image: 'https://bossmonster.fandom.com/wiki/Jeopardy'.replace(/\s/g, '_'),
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
        id: 'spell_knockout_gas',,
        localImage: 'public/images/cards/spells/spell_knockout_gas.jpg'
        name: 'Knockout Gas',
        image: 'https://bossmonster.fandom.com/wiki/Knockout Gas'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_motivation.jpg',
        name: 'Motivation',
        image: 'https://bossmonster.fandom.com/wiki/Motivation'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_princess_captive.jpg',
        name: 'Princess in Peril',
        image: 'https://bossmonster.fandom.com/wiki/Princess in Peril'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_soul_drain.jpg',
        name: 'Soul Drain',
        image: 'https://bossmonster.fandom.com/wiki/Soul Drain'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Zombify'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Dark Pact'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'any',
        effect: {
            type: 'drawSpell',
            value: 2,
            cost: { type: 'wound', value: 1 }
        },
        description: 'Take 1 Wound to draw 2 Spell cards.',
        flavorText: 'Power at a price.',
        expansion: 'base',
        quantity: 2
    },
    {
        id: 'spell_fortune',
        localImage: 'public/images/cards/spells/spell_fortune.jpg',
        name: 'Fortune',
        image: 'https://bossmonster.fandom.com/wiki/Fortune'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Ransack'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Resurrection'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Sabotage'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_vampire_touch.jpg',
        name: 'Vampiric Touch',
        image: 'https://bossmonster.fandom.com/wiki/Vampiric Touch'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_wind_change.jpg',
        name: 'Winds of Change',
        image: 'https://bossmonster.fandom.com/wiki/Winds of Change'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_trap_upgrade.jpg',
        name: 'Trap Upgrade',
        image: 'https://bossmonster.fandom.com/wiki/Trap Upgrade'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Monster Upgrade'.replace(/\s/g, '_'),
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

    // ========================================
    // THE NEXT LEVEL SPELLS (24)
    // ========================================
    {
        id: 'spell_backstab',
        name: 'Backstab',
        image: 'https://bossmonster.fandom.com/wiki/Backstab'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_betrayal.jpg',
        name: 'Betrayal',
        image: 'https://bossmonster.fandom.com/wiki/Betrayal'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_black_hole.jpg',
        name: 'Black Hole',
        image: 'https://bossmonster.fandom.com/wiki/Black Hole'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_blood_magic.jpg',
        name: 'Blood Magic',
        image: 'https://bossmonster.fandom.com/wiki/Blood Magic'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'any',
        effect: {
            type: 'drawRoom',
            value: 3,
            cost: { type: 'wound', value: 1 }
        },
        description: 'Take 1 Wound to draw 3 Room cards.',
        flavorText: 'Blood is power.',
        expansion: 'nextLevel',
        quantity: 2
    },
    {
        id: 'spell_clone',
        localImage: 'public/images/cards/spells/spell_clone.jpg',
        name: 'Clone Room',
        image: 'https://bossmonster.fandom.com/wiki/Clone Room'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_curse_of_weakness.jpg',
        name: 'Curse of Weakness',
        image: 'https://bossmonster.fandom.com/wiki/Curse of Weakness'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_death_touch.jpg',
        name: 'Death Touch',
        image: 'https://bossmonster.fandom.com/wiki/Death Touch'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_decoy.jpg',
        name: 'Decoy',
        image: 'https://bossmonster.fandom.com/wiki/Decoy'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_demolish.jpg',
        name: 'Demolish',
        image: 'https://bossmonster.fandom.com/wiki/Demolish'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Double Agent'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_earthquake.jpg',
        name: 'Earthquake',
        image: 'https://bossmonster.fandom.com/wiki/Earthquake'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Empower'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Extraction'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'adventure',
        effect: {
            type: 'healWound',
            value: 1,
            cost: { type: 'destroyRoom', value: 1 }
        },
        description: 'Destroy one of your Rooms to heal 1 Wound.',
        flavorText: 'Sacrifice for survival.',
        expansion: 'nextLevel',
        quantity: 2
    },
    {
        id: 'spell_fireball',
        localImage: 'public/images/cards/spells/spell_fireball.jpg',
        name: 'Fireball!',
        image: 'https://bossmonster.fandom.com/wiki/Fireball'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Gold Rush'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_identity_crisis.jpg',
        name: 'Identity Crisis',
        image: 'https://bossmonster.fandom.com/wiki/Identity Crisis'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_lure.jpg',
        name: 'Irresistible Lure',
        image: 'https://bossmonster.fandom.com/wiki/Irresistible Lure'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Mutation'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_necromancy.jpg',
        name: 'Necromancy',
        image: 'https://bossmonster.fandom.com/wiki/Necromancy'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Paralysis'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Raise Dead'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Remodel'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_sacrifice.jpg',
        name: 'Sacrifice',
        image: 'https://bossmonster.fandom.com/wiki/Sacrifice'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'adventure',
        effect: {
            type: 'killHero',
            target: 'heroInDungeon',
            cost: { type: 'destroyRoom', value: 1 }
        },
        description: 'Destroy one of your Rooms to kill a Hero.',
        flavorText: 'Worth it.',
        expansion: 'nextLevel',
        quantity: 2
    },
    {
        id: 'spell_steal_treasure',
        localImage: 'public/images/cards/spells/spell_steal_treasure.jpg',
        name: 'Steal Treasure',
        image: 'https://bossmonster.fandom.com/wiki/Steal Treasure'.replace(/\s/g, '_'),
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

    // ========================================
    // SUPER BOSS MONSTER SPELLS (20)
    // ========================================
    {
        id: 'spell_ambush',
        name: 'Ambush',
        image: 'https://bossmonster.fandom.com/wiki/Ambush'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Apocalypse'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_boss_rage.jpg',
        name: 'Boss Rage',
        image: 'https://bossmonster.fandom.com/wiki/Boss Rage'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_dark_bargain.jpg',
        name: 'Dark Bargain',
        image: 'https://bossmonster.fandom.com/wiki/Dark Bargain'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'any',
        effect: {
            type: 'searchDeck',
            target: 'roomDeck',
            value: 1,
            cost: { type: 'wound', value: 1 }
        },
        description: 'Take 1 Wound to search for any Room card.',
        flavorText: 'Name your price.',
        expansion: 'super',
        quantity: 2
    },
    {
        id: 'spell_deadly_gas',
        localImage: 'public/images/cards/spells/spell_deadly_gas.jpg',
        name: 'Deadly Gas',
        image: 'https://bossmonster.fandom.com/wiki/Deadly Gas'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Dominate'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_doppelganger.jpg',
        name: 'Doppelganger',
        image: 'https://bossmonster.fandom.com/wiki/Doppelganger'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Execute'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_explosion.jpg',
        name: 'Explosion',
        image: 'https://bossmonster.fandom.com/wiki/Explosion'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Fade Away'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_flash_freeze.jpg',
        name: 'Flash Freeze',
        image: 'https://bossmonster.fandom.com/wiki/Flash Freeze'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_giant_growth.jpg',
        name: 'Giant Growth',
        image: 'https://bossmonster.fandom.com/wiki/Giant Growth'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Grave Robber'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_greed.jpg',
        name: 'Greed',
        image: 'https://bossmonster.fandom.com/wiki/Greed'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Mass Heal'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Mind Control'.replace(/\s/g, '_'),
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

    // ========================================
    // CRASH LANDING SPELLS (16)
    // ========================================
    {
        id: 'spell_abduction',
        localImage: 'public/images/cards/spells/spell_abduction.jpg',
        name: 'Alien Abduction',
        image: 'https://bossmonster.fandom.com/wiki/Alien Abduction'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Beam Up'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_emp.jpg',
        name: 'EMP Blast',
        image: 'https://bossmonster.fandom.com/wiki/EMP Blast'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Hyperdrive'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_laser_beam.jpg',
        name: 'Laser Beam',
        image: 'https://bossmonster.fandom.com/wiki/Laser Beam'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_orbital_strike.jpg',
        name: 'Orbital Strike',
        image: 'https://bossmonster.fandom.com/wiki/Orbital Strike'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Phase Shift'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_stasis.jpg',
        name: 'Stasis Field',
        image: 'https://bossmonster.fandom.com/wiki/Stasis Field'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Tech Upgrade'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_tractor_beam.jpg',
        name: 'Tractor Beam',
        image: 'https://bossmonster.fandom.com/wiki/Tractor Beam'.replace(/\s/g, '_'),
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

    // ========================================
    // RISE OF MINIBOSSES SPELLS (12)
    // ========================================
    {
        id: 'spell_promote',
        name: 'Battlefield Promotion',
        image: 'https://bossmonster.fandom.com/wiki/Battlefield Promotion'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Miniboss Rally'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Recruitment Drive'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Miniboss Sacrifice'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'adventure',
        effect: {
            type: 'damageHero',
            value: 5,
            cost: { type: 'discardMiniboss', value: 1 }
        },
        description: 'Discard a Miniboss to deal 5 damage to a Hero.',
        flavorText: 'Take one for the team.',
        expansion: 'minibosses',
        quantity: 2
    },

    // ========================================
    // VAULT OF VILLAINS SPELLS (12)
    // ========================================
    {
        id: 'spell_curse',
        localImage: 'public/images/cards/spells/spell_curse.jpg',
        name: 'Ancient Curse',
        image: 'https://bossmonster.fandom.com/wiki/Ancient Curse'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Petrify'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_plague.jpg',
        name: 'Plague',
        image: 'https://bossmonster.fandom.com/wiki/Plague'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_summon_demon.jpg',
        name: 'Summon Demon',
        image: 'https://bossmonster.fandom.com/wiki/Summon Demon'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_steal_soul.jpg',
        name: 'Steal Soul',
        image: 'https://bossmonster.fandom.com/wiki/Steal Soul'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_underworld.jpg',
        name: 'Call from the Underworld',
        image: 'https://bossmonster.fandom.com/wiki/Call from the Underworld'.replace(/\s/g, '_'),
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

    // ========================================
    // HIDDEN SECRETS PACK SPELLS
    // ========================================
    {
        id: 'spell_final_form',
        localImage: 'public/images/cards/spells/spell_final_form.jpg',
        name: 'Final Form',
        image: 'https://bossmonster.fandom.com/wiki/Final Form'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'build',
        effect: {
            type: 'levelUpBoss',
            force: true
        },
        description: 'Level up your Boss immediately, ignoring XP requirements.',
        flavorText: 'This isn\'t even my final form!',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_boss_fight',
        name: 'Boss Fight',
        image: 'https://bossmonster.fandom.com/wiki/Boss Fight'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'adventure',
        effect: {
            type: 'bossAttack',
            damageValue: 'bossXP'
        },
        description: 'Deal damage equal to your Boss\'s XP divided by 100 to a Hero.',
        flavorText: 'Time for the final battle!',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_hidden_treasure',
        localImage: 'public/images/cards/spells/spell_hidden_treasure.jpg',
        name: 'Hidden Treasure',
        image: 'https://bossmonster.fandom.com/wiki/Hidden Treasure'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'bait',
        effect: {
            type: 'addTreasure',
            value: 2,
            treasureType: 'any'
        },
        description: 'Add 2 treasure of any type to your dungeon until end of turn.',
        flavorText: 'X marks the spot.',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_secret_passage',
        localImage: 'public/images/cards/spells/spell_secret_passage.jpg',
        name: 'Secret Passage',
        image: 'https://bossmonster.fandom.com/wiki/Secret Passage'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'adventure',
        effect: {
            type: 'skipRoom',
            value: 1
        },
        description: 'A Hero skips a Room in your dungeon.',
        flavorText: 'Behind the bookshelf...',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_trap_reset',
        localImage: 'public/images/cards/spells/spell_trap_reset.jpg',
        name: 'Trap Reset',
        image: 'https://bossmonster.fandom.com/wiki/Trap Reset'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'end',
        effect: {
            type: 'reactivateRoom',
            target: 'allTrapRooms'
        },
        description: 'Reactivate all Trap Rooms in your dungeon.',
        flavorText: 'Ready for round two.',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // GAMES NIGHT KIT SPELLS
    // ========================================
    {
        id: 'spell_game_night',
        localImage: 'public/images/cards/spells/spell_game_night.jpg',
        name: 'Game Night',
        image: 'https://bossmonster.fandom.com/wiki/Game Night'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'any',
        effect: {
            type: 'allPlayersDraw',
            value: 1
        },
        description: 'Each player draws a card.',
        flavorText: 'Everyone\'s invited!',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_party_crasher',
        localImage: 'public/images/cards/spells/spell_party_crasher.jpg',
        name: 'Party Crasher',
        image: 'https://bossmonster.fandom.com/wiki/Party Crasher'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'adventure',
        effect: {
            type: 'lureHero',
            target: 'fromOpponentDungeon'
        },
        description: 'Move a Hero from another dungeon to yours.',
        flavorText: 'Uninvited guest.',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_house_rules',
        localImage: 'public/images/cards/spells/spell_house_rules.jpg',
        name: 'House Rules',
        image: 'https://bossmonster.fandom.com/wiki/House Rules'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'build',
        effect: {
            type: 'buildAdvanced',
            ignoreRequirement: true
        },
        description: 'Build an Advanced Room without meeting treasure requirements.',
        flavorText: 'My dungeon, my rules.',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // SUPER BOSS MONSTER SPELLS
    // ========================================
    {
        id: 'spell_super_strength',
        localImage: 'public/images/cards/spells/spell_super_strength.jpg',
        name: 'Super Strength',
        image: 'https://bossmonster.fandom.com/wiki/Super Strength'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_mega_boulder.jpg',
        name: 'Mega Boulder',
        image: 'https://bossmonster.fandom.com/wiki/Mega Boulder'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_combo_attack.jpg',
        name: 'Combo Attack',
        image: 'https://bossmonster.fandom.com/wiki/Combo Attack'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_power_up.jpg',
        name: 'Power Up',
        image: 'https://bossmonster.fandom.com/wiki/Power Up'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Boss Mode'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_extra_life.jpg',
        name: 'Extra Life',
        image: 'https://bossmonster.fandom.com/wiki/Extra Life'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Continue?'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_cheat_code.jpg',
        name: 'Cheat Code',
        image: 'https://bossmonster.fandom.com/wiki/Cheat Code'.replace(/\s/g, '_'),
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

    // ========================================
    // PROMO & KICKSTARTER SPELLS
    // ========================================
    {
        id: 'spell_kickstarter_exclusive',
        localImage: 'public/images/cards/spells/spell_kickstarter_exclusive.jpg',
        name: 'Kickstarter Exclusive',
        image: 'https://bossmonster.fandom.com/wiki/Kickstarter Exclusive'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'bait',
        effect: {
            type: 'lureAllHeroType',
            heroType: 'ordinary'
        },
        description: 'All ordinary Heroes in town enter your dungeon.',
        flavorText: 'Thank you, backers!',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_stretch_goal',
        localImage: 'public/images/cards/spells/spell_stretch_goal.jpg',
        name: 'Stretch Goal',
        image: 'https://bossmonster.fandom.com/wiki/Stretch Goal'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'any',
        effect: {
            type: 'drawCard',
            value: 1,
            perPlayer: true
        },
        description: 'Draw a card for each player in the game.',
        flavorText: 'Unlocked!',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_backer_reward',
        localImage: 'public/images/cards/spells/spell_backer_reward.jpg',
        name: 'Backer Reward',
        image: 'https://bossmonster.fandom.com/wiki/Backer Reward'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'end',
        effect: {
            type: 'gainCoins',
            value: 5
        },
        description: 'Gain 5 Gold.',
        flavorText: 'For our loyal supporters.',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // 10TH ANNIVERSARY SPELLS
    // ========================================
    {
        id: 'spell_decade_of_doom',
        localImage: 'public/images/cards/spells/spell_decade_of_doom.jpg',
        name: 'Decade of Doom',
        image: 'https://bossmonster.fandom.com/wiki/Decade of Doom'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_legacy_spell.jpg',
        name: 'Legacy Spell',
        image: 'https://bossmonster.fandom.com/wiki/Legacy Spell'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Anniversary Celebration'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'any',
        effect: {
            type: 'multiEffect',
            effects: ['drawRoom', 'drawSpell', 'gainCoins'],
            values: [1, 1, 1]
        },
        description: 'Draw a Room, draw a Spell, and gain 1 Gold.',
        flavorText: 'Party time!',
        expansion: 'tenthAnniversary',
        quantity: 1
    },

    // ========================================
    // DUNGEON KART SPELL
    // ========================================
    {
        id: 'spell_turbo_boost',
        localImage: 'public/images/cards/spells/spell_turbo_boost.jpg',
        name: 'Turbo Boost',
        image: 'https://bossmonster.fandom.com/wiki/Turbo Boost'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'adventure',
        effect: {
            type: 'skipRooms',
            value: 2
        },
        description: 'A Hero skips the next 2 Rooms.',
        flavorText: 'Zoom zoom!',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // PORTABLE POWER SPELLS
    // ========================================
    {
        id: 'spell_quick_build',
        localImage: 'public/images/cards/spells/spell_quick_build.jpg',
        name: 'Quick Build',
        image: 'https://bossmonster.fandom.com/wiki/Quick Build'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'build',
        effect: {
            type: 'extraBuild',
            value: 1
        },
        description: 'Build an additional Room this turn.',
        flavorText: 'Speed construction.',
        expansion: 'promo',
        quantity: 2
    },
    {
        id: 'spell_pocket_spell',
        name: 'Pocket Spell',
        image: 'https://bossmonster.fandom.com/wiki/Pocket Spell'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'any',
        effect: {
            type: 'copySpell',
            target: 'lastPlayed'
        },
        description: 'Copy the effect of the last Spell played.',
        flavorText: 'Convenient magic.',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // LOST LEVELS SPELLS
    // ========================================
    {
        id: 'spell_warp_zone',
        localImage: 'public/images/cards/spells/spell_warp_zone.jpg',
        name: 'Warp Zone',
        image: 'https://bossmonster.fandom.com/wiki/Warp Zone'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'adventure',
        effect: {
            type: 'teleportHero',
            target: 'anyRoom'
        },
        description: 'Move a Hero to any Room in any dungeon.',
        flavorText: 'Secret passage!',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // DIGITAL BOSS MONSTER SPELLS
    // ========================================
    {
        id: 'spell_debug_mode',
        name: 'Debug Mode',
        image: 'https://bossmonster.fandom.com/wiki/Debug Mode'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'any',
        effect: {
            type: 'revealAll',
            target: 'allHands'
        },
        description: 'Look at all players\' hands.',
        flavorText: 'Console access granted.',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_respawn',
        name: 'Respawn',
        image: 'https://bossmonster.fandom.com/wiki/Respawn'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'end',
        effect: {
            type: 'returnHero',
            target: 'town'
        },
        description: 'Return a Hero from any score pile to town.',
        flavorText: 'Loading checkpoint...',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // BIG BOX SPELLS
    // ========================================
    {
        id: 'spell_collectors_choice',
        localImage: 'public/images/cards/spells/spell_collectors_choice.jpg',
        name: 'Collector\'s Choice',
        spellType: 'instant',
        phase: 'any',
        effect: {
            type: 'searchDeck',
            deckType: 'any',
            value: 1
        },
        description: 'Search any deck for a card and add it to your hand.',
        flavorText: 'A rare find.',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_exclusive_offer',
        localImage: 'public/images/cards/spells/spell_exclusive_offer.jpg',
        name: 'Exclusive Offer',
        image: 'https://bossmonster.fandom.com/wiki/Exclusive Offer'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'bait',
        effect: {
            type: 'addTreasure',
            value: 3,
            treasureType: 'any'
        },
        description: 'Add 3 treasure of any type until end of turn.',
        flavorText: 'Limited time only!',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // MORE SUPER BOSS MONSTER SPELLS
    // ========================================
    {
        id: 'spell_hyper_beam',
        localImage: 'public/images/cards/spells/spell_hyper_beam.jpg',
        name: 'Hyper Beam',
        image: 'https://bossmonster.fandom.com/wiki/Hyper Beam'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_ultra_shield.jpg',
        name: 'Ultra Shield',
        image: 'https://bossmonster.fandom.com/wiki/Ultra Shield'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_mega_drain.jpg',
        name: 'Mega Drain',
        image: 'https://bossmonster.fandom.com/wiki/Mega Drain'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_power_surge.jpg',
        name: 'Power Surge',
        image: 'https://bossmonster.fandom.com/wiki/Power Surge'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_boss_strike.jpg',
        name: 'Boss Strike',
        image: 'https://bossmonster.fandom.com/wiki/Boss Strike'.replace(/\s/g, '_'),
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
        image: 'https://bossmonster.fandom.com/wiki/Game Over'.replace(/\s/g, '_'),
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

    // ========================================
    // MORE 10TH ANNIVERSARY SPELLS  
    // ========================================
    {
        id: 'spell_decade_strike',
        localImage: 'public/images/cards/spells/spell_decade_strike.jpg',
        name: 'Decade Strike',
        image: 'https://bossmonster.fandom.com/wiki/Decade Strike'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_legacy_magic.jpg',
        name: 'Legacy Magic',
        image: 'https://bossmonster.fandom.com/wiki/Legacy Magic'.replace(/\s/g, '_'),
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
        localImage: 'public/images/cards/spells/spell_birthday_bash.jpg',
        name: 'Birthday Bash',
        image: 'https://bossmonster.fandom.com/wiki/Birthday Bash'.replace(/\s/g, '_'),
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
    },

    // ========================================
    // KICKSTARTER PROMO SPELLS
    // ========================================
    {
        id: 'spell_backer_blessing',
        localImage: 'public/images/cards/spells/spell_backer_blessing.jpg',
        name: 'Backer Blessing',
        image: 'https://bossmonster.fandom.com/wiki/Backer Blessing'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'any',
        effect: {
            type: 'drawCard',
            value: 2,
            source: 'any'
        },
        description: 'Draw 2 cards from any deck(s).',
        flavorText: 'Thank you, backers!',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_stretch_magic',
        localImage: 'public/images/cards/spells/spell_stretch_magic.jpg',
        name: 'Stretch Magic',
        image: 'https://bossmonster.fandom.com/wiki/Stretch Magic'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'bait',
        effect: {
            type: 'lureHero',
            ignoresTreasure: true
        },
        description: 'Lure any Hero from town, ignoring treasure requirements.',
        flavorText: 'Goal reached!',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_early_bird',
        localImage: 'public/images/cards/spells/spell_early_bird.jpg',
        name: 'Early Bird',
        image: 'https://bossmonster.fandom.com/wiki/Early Bird'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'town',
        effect: {
            type: 'viewHeroDeck',
            value: 3,
            reorder: true
        },
        description: 'Look at and reorder the top 3 cards of the Hero deck.',
        flavorText: 'First come, first served.',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // CONVENTION PROMO SPELLS
    // ========================================
    {
        id: 'spell_convention_chaos',
        localImage: 'public/images/cards/spells/spell_convention_chaos.jpg',
        name: 'Convention Chaos',
        image: 'https://bossmonster.fandom.com/wiki/Convention Chaos'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'adventure',
        effect: {
            type: 'shuffleHeroes',
            description: 'Shuffle all Heroes in all dungeons, then redistribute randomly.'
        },
        description: 'Redistribute all Heroes randomly.',
        flavorText: 'Cosplay confusion!',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'spell_meet_greet',
        localImage: 'public/images/cards/spells/spell_meet_greet.jpg',
        name: 'Meet & Greet',
        image: 'https://bossmonster.fandom.com/wiki/Meet & Greet'.replace(/\s/g, '_'),
        spellType: 'instant',
        phase: 'bait',
        effect: {
            type: 'revealHeroDeck',
            value: 5
        },
        description: 'Reveal the top 5 cards of the Hero deck.',
        flavorText: 'Say hello!',
        expansion: 'promo',
        quantity: 1
    }
];

// Export
if (typeof window !== 'undefined') {
    window.SPELL_CARDS = SPELLS;
}

if (typeof module !== 'undefined') {
    module.exports = SPELLS;
}

