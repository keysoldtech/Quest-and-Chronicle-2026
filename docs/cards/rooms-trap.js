/**
 * Boss Monster - Trap Room Cards Database
 * Official card data from Boss Monster Wiki
 * https://bossmonster.fandom.com/wiki/List_of_Cards
 * 749 unique cards with quantities totaling 1489
 */

const TRAP_ROOMS = [
    // ========================================
    // BASE SET TRAP ROOMS - ORDINARY (qty 2 each)
    // ========================================
    
        flavorText: 'It belongs in a museum!',
        expansion: 'base',
        cardNumber: 'BMA026',
        quantity: 3
    },
    {
        id: 'room_brainsucker_hive',
        localImage: 'public/images/cards/rooms/room_brainsucker_hive.jpg',
        name: 'Brainsucker Hive',
        image: 'https://bossmonster.fandom.com/wiki/Brainsucker Hive'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'opponentsDiscard',
            cardType: 'spell',
            value: 1,
            description: 'When a Hero enters this Room, each other player discards a Spell card.'
        },
        flavorText: 'Mmmm... gray matter...',
        expansion: 'base',
        cardNumber: 'BMA027',
        quantity: 3
    },
    {
        id: 'room_dark_laboratory',
        localImage: 'public/images/cards/rooms/room_dark_laboratory.jpg',
        name: 'Dark Laboratory',
        image: 'https://bossmonster.fandom.com/wiki/Dark Laboratory'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroKill',
            effect: 'gainCoins',
            value: 2,
            description: 'If a Hero dies in this Room, gain 2 Gold.'
        },
        flavorText: 'Mad science at its finest.',
        expansion: 'base',
        cardNumber: 'BMA028',
        quantity: 3
    },
    {
        id: 'room_dizzygas_hallway',
        localImage: 'public/images/cards/rooms/room_dizzygas_hallway.jpg',
        name: 'Dizzygas Hallway',
        image: 'https://bossmonster.fandom.com/wiki/Dizzygas Hallway'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'onHeroKill',
            effect: 'sendBackNextHero',
            description: 'If a Hero dies in this Room, choose a Hero in another dungeon and send it back to town.'
        },
        flavorText: "What's that smell?",
        expansion: 'base',
        cardNumber: 'BMA029',
        quantity: 3
    },
    {
        id: 'room_hidden_torches',,
        localImage: 'public/images/cards/rooms/room_hidden_torches.jpg'
        name: 'Room of Hidden Torches',
        image: 'https://bossmonster.fandom.com/wiki/Room of Hidden Torches'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'onBuild',
            effect: 'revealAndChoose',
            deckType: 'room',
            reveal: 3,
            keep: 1,
            toTop: true,
            description: 'When you build this Room, look at the top 3 cards of the Room deck and put them back in any order.'
        },
        flavorText: 'The real treasure was the traps.',
        expansion: 'base',
        cardNumber: 'BMA030',
        quantity: 3
    },
    
        flavorText: 'Reduce, reuse, recycle... heroes.',
        expansion: 'base',
        cardNumber: 'BMA033',
        quantity: 1
    },
    {
        id: 'room_annihilator',
        localImage: 'public/images/cards/rooms/room_annihilator.jpg',
        name: 'The Annihilator',
        image: 'https://bossmonster.fandom.com/wiki/The Annihilator'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['fighter'],
        damage: 3,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'damagePerTrap',
            value: 1,
            description: 'This Room has +1 damage for each Trap Room in your dungeon.'
        },
        flavorText: 'Total. Annihilation.',
        expansion: 'base',
        cardNumber: 'BMA034',
        quantity: 1
    },
    {
        id: 'room_jackpot_stash',
        localImage: 'public/images/cards/rooms/room_jackpot_stash.jpg',
        name: 'Jackpot Stash',
        image: 'https://bossmonster.fandom.com/wiki/Jackpot Stash'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['thief'],
        damage: 1,
        treasure: ['thief', 'thief'],
        ability: {
            trigger: 'onBuild',
            effect: 'gainCoins',
            value: 3,
            description: 'When you build this Room, gain 3 Gold.'
        },
        flavorText: 'Ka-ching!',
        expansion: 'base',
        cardNumber: 'BMA035',
        quantity: 1
    },
    {
        id: 'room_hall_of_statues',
        localImage: 'public/images/cards/rooms/room_hall_of_statues.jpg',
        name: 'Hall of Statues',
        image: 'https://bossmonster.fandom.com/wiki/Hall of Statues'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['mage'],
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'passive',
            effect: 'clericBonus',
            value: 2,
            description: 'This Room deals +2 damage to Cleric Heroes.'
        },
        flavorText: 'They used to be adventurers.',
        expansion: 'base',
        cardNumber: 'BMA036',
        quantity: 1
    },

    // ========================================
    // BOSS MONSTER 2 / NEXT LEVEL TRAP ROOMS (qty 2 each)
    // ========================================
    {
        id: 'room_arrow_slits',
        name: 'Arrow Slits',
        image: 'https://bossmonster.fandom.com/wiki/Arrow Slits'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'damageHeroInTown',
            value: 1,
            description: 'When a Hero enters this Room, deal 1 damage to a Hero in town.'
        },
        flavorText: 'Archers, loose!',
        expansion: 'nextLevel',
        cardNumber: 'BM2026',
        quantity: 3
    },
    
        flavorText: 'A whirlwind of steel.',
        expansion: 'nextLevel',
        cardNumber: 'BM2028',
        quantity: 3
    },
    {
        id: 'room_collapsing_ceiling',
        localImage: 'public/images/cards/rooms/room_collapsing_ceiling.jpg',
        name: 'Collapsing Ceiling',
        image: 'https://bossmonster.fandom.com/wiki/Collapsing Ceiling'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 3,
        treasure: 'fighter',
        ability: {
            trigger: 'afterDamage',
            effect: 'destroySelf',
            description: 'After this Room deals damage, destroy this Room.'
        },
        flavorText: "Duck! Or don't.",
        expansion: 'nextLevel',
        cardNumber: 'BM2029',
        quantity: 3
    },
    {
        id: 'room_explosive_runes',
        localImage: 'public/images/cards/rooms/room_explosive_runes.jpg',
        name: 'Explosive Runes',
        image: 'https://bossmonster.fandom.com/wiki/Explosive Runes'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onDestroy',
            effect: 'damageAllHeroesInDungeon',
            value: 2,
            description: 'When this Room is destroyed, deal 2 damage to each Hero in your dungeon.'
        },
        flavorText: 'Read at your own risk.',
        expansion: 'nextLevel',
        cardNumber: 'BM2030',
        quantity: 3
    },
    {
        id: 'room_fear_chamber',
        name: 'Fear Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Fear Chamber'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'sendBackToTown',
            condition: 'health3OrLess',
            description: 'When a Hero enters this Room, if it has 3 or less Health remaining, send it back to town.'
        },
        flavorText: 'Face your fears. Or flee.',
        expansion: 'nextLevel',
        cardNumber: 'BM2031',
        quantity: 3
    },
    {
        id: 'room_freezing_chamber',
        localImage: 'public/images/cards/rooms/room_freezing_chamber.jpg',
        name: 'Freezing Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Freezing Chamber'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'deactivateRoom',
            target: 'opponent',
            description: 'When a Hero enters this Room, deactivate one Room in any other dungeon.'
        },
        flavorText: 'Cool reception.',
        expansion: 'nextLevel',
        cardNumber: 'BM2032',
        quantity: 3
    },
    {
        id: 'room_lightning_rod',
        name: 'Lightning Rod',
        image: 'https://bossmonster.fandom.com/wiki/Lightning Rod'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'passive',
            effect: 'bonusAfterMonster',
            value: 1,
            description: 'If the previous Room in your dungeon is a Monster Room, this Room deals +1 damage.'
        },
        flavorText: 'ZAP!',
        expansion: 'nextLevel',
        cardNumber: 'BM2033',
        quantity: 3
    },
    {
        id: 'room_mimic_chamber',
        name: 'Mimic Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Mimic Chamber'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'thief',
        ability: {
            trigger: 'onHeroKill',
            effect: 'gainCoins',
            value: 2,
            description: 'If a Hero dies in this Room, gain 2 Gold.'
        },
        flavorText: "That's not a treasure chest...",
        expansion: 'nextLevel',
        cardNumber: 'BM2034',
        quantity: 3
    },
    {
        id: 'room_mirror_maze',
        name: 'Mirror Maze',
        image: 'https://bossmonster.fandom.com/wiki/Mirror Maze'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'coinFlip',
            heads: 'returnToEntrance',
            description: 'When a Hero enters this Room, flip a coin. If heads, send that Hero back to the entrance of your dungeon.'
        },
        flavorText: 'Which one is real?',
        expansion: 'nextLevel',
        cardNumber: 'BM2035',
        quantity: 3
    },
    {
        id: 'room_pit_fiend_hole',
        localImage: 'public/images/cards/rooms/room_pit_fiend_hole.jpg',
        name: 'Pit Fiend Hole',
        image: 'https://bossmonster.fandom.com/wiki/Pit Fiend Hole'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroKill',
            effect: 'retrieveSpell',
            value: 1,
            description: 'If a Hero dies in this Room, you may retrieve a Spell card from the discard pile.'
        },
        flavorText: 'Falling...falling...DEMON!',
        expansion: 'nextLevel',
        cardNumber: 'BM2036',
        quantity: 3
    },
    {
        id: 'room_quicksand_trap',
        localImage: 'public/images/cards/rooms/room_quicksand_trap.jpg',
        name: 'Quicksand Trap',
        image: 'https://bossmonster.fandom.com/wiki/Quicksand Trap'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'passive',
            effect: 'heroEntersTwice',
            description: 'A Hero must enter this Room twice, taking damage each time.'
        },
        flavorText: 'The more you struggle...',
        expansion: 'nextLevel',
        cardNumber: 'BM2037',
        quantity: 3
    },
    {
        id: 'room_rust_monster_lair',
        name: 'Rust Monster Lair',
        image: 'https://bossmonster.fandom.com/wiki/Rust Monster Lair'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'destroyItem',
            description: 'When a Hero enters this Room, destroy one Item that Hero is carrying.'
        },
        flavorText: 'That was expensive!',
        expansion: 'nextLevel',
        cardNumber: 'BM2038',
        quantity: 3
    },
    {
        id: 'room_slime_corridor',
        localImage: 'public/images/cards/rooms/room_slime_corridor.jpg',
        name: 'Slime Corridor',
        image: 'https://bossmonster.fandom.com/wiki/Slime Corridor'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'passive',
            effect: 'heroEntersTwice',
            description: 'A Hero must enter this Room twice, taking damage each time.'
        },
        flavorText: 'Squish squish squish.',
        expansion: 'nextLevel',
        cardNumber: 'BM2039',
        quantity: 3
    },
    {
        id: 'room_tesla_coils',
        name: 'Tesla Coils',
        image: 'https://bossmonster.fandom.com/wiki/Tesla Coils'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroKill',
            effect: 'damageHero',
            value: 1,
            target: 'anyHero',
            description: 'If a Hero dies in this Room, deal 1 damage to a Hero in any dungeon.'
        },
        flavorText: 'Shocking development.',
        expansion: 'nextLevel',
        cardNumber: 'BM2040',
        quantity: 3
    },
    
        flavorText: 'CRUNCH.',
        expansion: 'nextLevel',
        cardNumber: 'BM2042',
        quantity: 1
    },
    {
        id: 'room_death_laser',
        localImage: 'public/images/cards/rooms/room_death_laser.jpg',
        name: 'Death Laser',
        image: 'https://bossmonster.fandom.com/wiki/Death Laser'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['mage'],
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'passive',
            effect: 'damagePerTrap',
            value: 1,
            description: 'This Room has +1 damage for each Trap Room in your dungeon.'
        },
        flavorText: 'Pew pew pew!',
        expansion: 'nextLevel',
        cardNumber: 'BM2043',
        quantity: 1
    },
    
        flavorText: 'Imitation is deadly flattery.',
        expansion: 'nextLevel',
        cardNumber: 'BM2044',
        quantity: 1
    },
    {
        id: 'room_endless_pit',
        localImage: 'public/images/cards/rooms/room_endless_pit.jpg',
        name: 'Endless Pit',
        image: 'https://bossmonster.fandom.com/wiki/Endless Pit'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['thief'],
        damage: 2,
        treasure: 'thief',
        ability: {
            trigger: 'passive',
            effect: 'heroEntersTwice',
            description: 'A Hero must enter this Room twice, taking damage each time.'
        },
        flavorText: 'Down, down, down...',
        expansion: 'nextLevel',
        cardNumber: 'BM2045',
        quantity: 1
    },
    {
        id: 'room_soul_vacuum',
        localImage: 'public/images/cards/rooms/room_soul_vacuum.jpg',
        name: 'Soul Vacuum',
        image: 'https://bossmonster.fandom.com/wiki/Soul Vacuum'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['cleric', 'mage'],
        damage: 2,
        treasure: ['cleric', 'mage'],
        ability: {
            trigger: 'onHeroKill',
            effect: 'healWound',
            value: 1,
            description: 'If a Hero dies in this Room, you may convert 1 Wound to a Soul.'
        },
        flavorText: 'Souls sucked straight out.',
        expansion: 'nextLevel',
        cardNumber: 'BM2046',
        quantity: 1
    },
    {
        id: 'room_vault_of_greed',
        localImage: 'public/images/cards/rooms/room_vault_of_greed.jpg',
        name: 'Vault of Greed',
        image: 'https://bossmonster.fandom.com/wiki/Vault of Greed'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['thief'],
        damage: 1,
        treasure: ['thief', 'thief', 'thief'],
        ability: {
            trigger: 'onHeroKill',
            effect: 'gainCoins',
            value: 4,
            description: 'If a Hero dies in this Room, gain 4 Gold.'
        },
        flavorText: 'Greed is good.',
        expansion: 'nextLevel',
        cardNumber: 'BM2047',
        quantity: 1
    },
    {
        id: 'room_obliterator',
        name: 'The Obliterator',
        image: 'https://bossmonster.fandom.com/wiki/The Obliterator'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['fighter'],
        damage: 5,
        treasure: 'fighter',
        ability: {
            trigger: 'onBuild',
            effect: 'destroyOwnRoom',
            value: 1,
            description: 'When you build this Room, destroy another Room in your dungeon.'
        },
        flavorText: 'Ultimate destruction.',
        expansion: 'nextLevel',
        cardNumber: 'BM2048',
        quantity: 1
    },
    {
        id: 'room_anti_magic_zone',
        localImage: 'public/images/cards/rooms/room_anti_magic_zone.jpg',
        name: 'Anti-Magic Zone',
        image: 'https://bossmonster.fandom.com/wiki/Anti-Magic Zone'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['mage'],
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'passive',
            effect: 'mageBonus',
            value: 3,
            description: 'This Room deals +3 damage to Mage Heroes.'
        },
        flavorText: 'No magic allowed.',
        expansion: 'nextLevel',
        cardNumber: 'BM2049',
        quantity: 1
    },

    // ========================================
    // RISE OF MINIBOSSES TRAP ROOMS (qty 2 each)
    // ========================================
    {
        id: 'room_minion_training',
        localImage: 'public/images/cards/rooms/room_minion_training.jpg',
        name: 'Minion Training Ground',
        image: 'https://bossmonster.fandom.com/wiki/Minion Training Ground'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'fighter',
        ability: {
            trigger: 'onBuild',
            effect: 'drawMiniboss',
            value: 1,
            description: 'When you build this Room, draw a Miniboss card.'
        },
        flavorText: 'Train them young.',
        expansion: 'minibosses',
        cardNumber: 'ROM013',
        quantity: 3
    },
    {
        id: 'room_torture_chamber',
        localImage: 'public/images/cards/rooms/room_torture_chamber.jpg',
        name: 'Torture Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Torture Chamber'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'thief',
        ability: {
            trigger: 'onHeroKill',
            effect: 'promoteMiniboss',
            description: 'If a Hero dies in this Room, you may promote a Miniboss.'
        },
        flavorText: 'Pain is a great teacher.',
        expansion: 'minibosses',
        cardNumber: 'ROM014',
        quantity: 3
    },
    {
        id: 'room_sacrificial_altar',
        localImage: 'public/images/cards/rooms/room_sacrificial_altar.jpg',
        name: 'Sacrificial Altar',
        image: 'https://bossmonster.fandom.com/wiki/Sacrificial Altar'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroKill',
            effect: 'healWound',
            value: 1,
            description: 'If a Hero dies in this Room, convert 1 Wound to a Soul.'
        },
        flavorText: 'Blood for the blood god.',
        expansion: 'minibosses',
        cardNumber: 'ROM015',
        quantity: 3
    },
    {
        id: 'room_dark_ritual_chamber',
        localImage: 'public/images/cards/rooms/room_dark_ritual_chamber.jpg',
        name: 'Dark Ritual Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Dark Ritual Chamber'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroKill',
            effect: 'drawSpell',
            value: 1,
            description: 'If a Hero dies in this Room, draw a Spell card.'
        },
        flavorText: 'Ancient rites demand sacrifice.',
        expansion: 'minibosses',
        cardNumber: 'ROM016',
        quantity: 3
    },

    // ========================================
    // CRASH LANDING TRAP ROOMS (qty 2 each)
    // ========================================
    
        flavorText: 'Venting in progress.',
        expansion: 'crashLanding',
        cardNumber: 'CL016',
        quantity: 3
    },
    {
        id: 'room_stasis_field',
        localImage: 'public/images/cards/rooms/room_stasis_field.jpg',
        name: 'Stasis Field',
        image: 'https://bossmonster.fandom.com/wiki/Stasis Field'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'explorer',
        ability: {
            trigger: 'passive',
            effect: 'heroEntersTwice',
            description: 'A Hero must enter this Room twice, taking damage each time.'
        },
        flavorText: 'Frozen in time.',
        expansion: 'crashLanding',
        cardNumber: 'CL017',
        quantity: 3
    },
    {
        id: 'room_plasma_turrets',
        name: 'Plasma Turrets',
        image: 'https://bossmonster.fandom.com/wiki/Plasma Turrets'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'explorer',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'damageHeroInTown',
            value: 1,
            description: 'When a Hero enters this Room, deal 1 damage to a Hero in town.'
        },
        flavorText: 'Automated defense.',
        expansion: 'crashLanding',
        cardNumber: 'CL018',
        quantity: 3
    },
    {
        id: 'room_gravity_trap',
        localImage: 'public/images/cards/rooms/room_gravity_trap.jpg',
        name: 'Gravity Trap',
        image: 'https://bossmonster.fandom.com/wiki/Gravity Trap'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['explorer'],
        damage: 3,
        treasure: 'explorer',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'lureHeroFromTown',
            value: 1,
            description: 'When a Hero enters this Room, choose a Hero in town and bring it to the entrance of your dungeon.'
        },
        flavorText: 'Crushing gravity.',
        expansion: 'crashLanding',
        cardNumber: 'CL019',
        quantity: 1
    },
    {
        id: 'room_disruptor_field',
        localImage: 'public/images/cards/rooms/room_disruptor_field.jpg',
        name: 'Disruptor Field',
        image: 'https://bossmonster.fandom.com/wiki/Disruptor Field'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['explorer'],
        damage: 2,
        treasure: 'explorer',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'deactivateAllRooms',
            target: 'oneOpponent',
            description: 'When a Hero enters this Room, deactivate all Rooms in one other dungeon.'
        },
        flavorText: 'Systems offline.',
        expansion: 'crashLanding',
        cardNumber: 'CL020',
        quantity: 1
    },

    // ========================================
    // SUPER BOSS MONSTER TRAP ROOMS (qty 2 each)
    // ========================================
    
        flavorText: 'One prick is all it takes.',
        expansion: 'super',
        cardNumber: 'SBM026',
        quantity: 3
    },
    {
        id: 'room_acid_pool',
        localImage: 'public/images/cards/rooms/room_acid_pool.jpg',
        name: 'Acid Pool',
        image: 'https://bossmonster.fandom.com/wiki/Acid Pool'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'destroyItem',
            description: 'When a Hero enters this Room, destroy one Item that Hero is carrying.'
        },
        flavorText: 'Dissolves everything. Even hope.',
        expansion: 'super',
        cardNumber: 'SBM027',
        quantity: 3
    },
    {
        id: 'room_flame_jets',
        localImage: 'public/images/cards/rooms/room_flame_jets.jpg',
        name: 'Flame Jets',
        image: 'https://bossmonster.fandom.com/wiki/Flame Jets'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'fighterBonus',
            value: 1,
            description: 'This Room deals +1 damage to Fighter Heroes.'
        },
        flavorText: 'Fire in the hole!',
        expansion: 'super',
        cardNumber: 'SBM028',
        quantity: 3
    },
    {
        id: 'room_cursed_fountain',
        name: 'Cursed Fountain',
        image: 'https://bossmonster.fandom.com/wiki/Cursed Fountain'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'curse',
            description: 'When a Hero enters this Room, that Hero takes +1 damage from all Rooms this turn.'
        },
        flavorText: "Don't drink the water.",
        expansion: 'super',
        cardNumber: 'SBM029',
        quantity: 3
    },
    {
        id: 'room_crushing_walls',
        localImage: 'public/images/cards/rooms/room_crushing_walls.jpg',
        name: 'Crushing Walls',
        image: 'https://bossmonster.fandom.com/wiki/Crushing Walls'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 3,
        treasure: 'fighter',
        ability: {
            trigger: 'afterDamage',
            effect: 'deactivateSelf',
            description: 'After this Room deals damage, deactivate this Room.'
        },
        flavorText: 'Walls closing in!',
        expansion: 'super',
        cardNumber: 'SBM030',
        quantity: 3
    },
    {
        id: 'room_sand_trap',
        localImage: 'public/images/cards/rooms/room_sand_trap.jpg',
        name: 'Sand Trap',
        image: 'https://bossmonster.fandom.com/wiki/Sand Trap'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'passive',
            effect: 'heroEntersTwice',
            description: 'A Hero must enter this Room twice, taking damage each time.'
        },
        flavorText: 'Sinking feeling.',
        expansion: 'super',
        cardNumber: 'SBM031',
        quantity: 3
    },
    {
        id: 'room_web_spinner',
        name: 'Web Spinner',
        image: 'https://bossmonster.fandom.com/wiki/Web Spinner'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'skipNextRoom',
            description: 'When a Hero enters this Room, it skips the next Room (takes no damage, triggers no effects).'
        },
        flavorText: 'Stuck in a web of lies. And actual web.',
        expansion: 'super',
        cardNumber: 'SBM032',
        quantity: 3
    },

    // ========================================
    // SUPER BOSS MONSTER ADVANCED TRAP ROOMS (qty 1 each)
    // ========================================
    {
        id: 'room_death_roller',
        localImage: 'public/images/cards/rooms/room_death_roller.jpg',
        name: 'Death Roller',
        image: 'https://bossmonster.fandom.com/wiki/Death Roller'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['fighter'],
        damage: 4,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'damagePerTrap',
            value: 1,
            description: 'This Room has +1 damage for each Trap Room in your dungeon.'
        },
        flavorText: 'Roll out!',
        expansion: 'super',
        cardNumber: 'SBM033',
        quantity: 1
    },
    {
        id: 'room_magma_chamber',
        localImage: 'public/images/cards/rooms/room_magma_chamber.jpg',
        name: 'Magma Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Magma Chamber'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['mage'],
        damage: 3,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroKill',
            effect: 'damageHero',
            value: 2,
            target: 'anyHero',
            description: 'If a Hero dies in this Room, deal 2 damage to a Hero in any dungeon.'
        },
        flavorText: 'The floor is lava. Literally.',
        expansion: 'super',
        cardNumber: 'SBM034',
        quantity: 1
    },
    {
        id: 'room_void_chamber',
        localImage: 'public/images/cards/rooms/room_void_chamber.jpg',
        name: 'Void Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Void Chamber'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['cleric', 'mage'],
        damage: 3,
        treasure: ['cleric', 'mage'],
        ability: {
            trigger: 'onHeroKill',
            effect: 'removeFromGame',
            description: 'If a Hero dies in this Room, remove it from the game instead of placing it in your score area.'
        },
        flavorText: 'Into the void.',
        expansion: 'super',
        cardNumber: 'SBM035',
        quantity: 1
    },

    // ========================================
    // VAULT OF VILLAINS TRAP ROOMS (qty 2 each)
    // ========================================
    {
        id: 'room_labyrinth_trap',
        localImage: 'public/images/cards/rooms/room_labyrinth_trap.jpg',
        name: 'Labyrinth Trap',
        image: 'https://bossmonster.fandom.com/wiki/Labyrinth Trap'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'thief',
        ability: {
            trigger: 'passive',
            effect: 'heroEntersTwice',
            description: 'A Hero must enter this Room twice, taking damage each time.'
        },
        flavorText: 'Lost in the maze.',
        expansion: 'vault',
        cardNumber: 'VOV016',
        quantity: 3
    },
    {
        id: 'room_guillotine',
        name: 'Guillotine',
        image: 'https://bossmonster.fandom.com/wiki/Guillotine'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 3,
        treasure: 'fighter',
        ability: {
            trigger: 'onHeroKill',
            effect: 'drawRoom',
            value: 1,
            description: 'If a Hero dies in this Room, draw a Room card.'
        },
        flavorText: 'Off with their heads!',
        expansion: 'vault',
        cardNumber: 'VOV017',
        quantity: 3
    },
    {
        id: 'room_curse_chamber',
        name: 'Curse Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Curse Chamber'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'curse',
            description: 'When a Hero enters this Room, that Hero takes +1 damage from all other Rooms in this dungeon.'
        },
        flavorText: 'Doomed from the start.',
        expansion: 'vault',
        cardNumber: 'VOV018',
        quantity: 3
    },
    {
        id: 'room_iron_maiden',
        name: 'Iron Maiden',
        image: 'https://bossmonster.fandom.com/wiki/Iron Maiden'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['fighter'],
        damage: 4,
        treasure: 'fighter',
        ability: {
            trigger: 'onHeroKill',
            effect: 'healWound',
            value: 1,
            description: 'If a Hero dies in this Room, convert 1 Wound to a Soul.'
        },
        flavorText: 'Embrace the spikes.',
        expansion: 'vault',
        cardNumber: 'VOV019',
        quantity: 1
    },
    {
        id: 'room_voodoo_shrine',
        localImage: 'public/images/cards/rooms/room_voodoo_shrine.jpg',
        name: 'Voodoo Shrine',
        image: 'https://bossmonster.fandom.com/wiki/Voodoo Shrine'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['cleric'],
        damage: 2,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroKill',
            effect: 'damageHero',
            value: 2,
            target: 'anyHero',
            description: 'If a Hero dies in this Room, deal 2 damage to a Hero in any dungeon.'
        },
        flavorText: 'Stick it to them.',
        expansion: 'vault',
        cardNumber: 'VOV020',
        quantity: 1
    },
    {
        id: 'room_underworld_gate',
        name: 'Underworld Gate',
        image: 'https://bossmonster.fandom.com/wiki/Underworld Gate'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['cleric'],
        damage: 3,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroKill',
            effect: 'retrieveRoom',
            value: 2,
            description: 'If a Hero dies in this Room, you may retrieve up to 2 Room cards from the discard pile.'
        },
        flavorText: 'Gateway to Hades.',
        expansion: 'vault',
        cardNumber: 'VOV021',
        quantity: 1
    },
    {
        id: 'room_tartarus_pit',
        localImage: 'public/images/cards/rooms/room_tartarus_pit.jpg',
        name: 'Tartarus Pit',
        image: 'https://bossmonster.fandom.com/wiki/Tartarus Pit'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['cleric', 'fighter'],
        damage: 5,
        treasure: ['cleric', 'fighter'],
        ability: {
            trigger: 'onHeroKill',
            effect: 'removeFromGame',
            description: 'If a Hero dies in this Room, remove it from the game instead of placing it in your scorekeeping area.'
        },
        flavorText: 'The deepest pit.',
        expansion: 'vault',
        cardNumber: 'VOV022',
        quantity: 1
    },

    // ========================================
    // PROMO TRAP ROOMS (qty 1 each)
    // ========================================
    {
        id: 'room_bone_crank',
        localImage: 'public/images/cards/rooms/room_bone_crank.jpg',
        name: 'Bone Crank',
        image: 'https://bossmonster.fandom.com/wiki/Bone Crank'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'onBuild',
            effect: 'deactivateRoom',
            target: 'any',
            description: 'When you build this Room, deactivate one Room in any dungeon.'
        },
        flavorText: 'Grind those bones.',
        expansion: 'promo',
        cardNumber: 'KSA010',
        quantity: 1
    },
    {
        id: 'room_trash_compactor',
        localImage: 'public/images/cards/rooms/room_trash_compactor.jpg',
        name: 'Trash Compactor',
        image: 'https://bossmonster.fandom.com/wiki/Trash Compactor'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 3,
        treasure: 'thief',
        ability: {
            trigger: 'afterDamage',
            effect: 'limitDamage',
            description: 'If a Hero survives this Room, this Room deals no more damage until end of turn.'
        },
        flavorText: 'Squeeze play.',
        expansion: 'promo',
        cardNumber: 'KSA011',
        quantity: 1
    },
    {
        id: 'room_portal_trap',
        localImage: 'public/images/cards/rooms/room_portal_trap.jpg',
        name: 'Portal Trap',
        image: 'https://bossmonster.fandom.com/wiki/Portal Trap'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'teleportHero',
            description: 'When a Hero enters this Room, move it to any other Room in your dungeon.'
        },
        flavorText: 'Now you see me...',
        expansion: 'promo',
        cardNumber: 'KSA012',
        quantity: 1
    },
    {
        id: 'room_dungeon_kart_track',
        name: 'Dungeon Kart Track',
        image: 'https://bossmonster.fandom.com/wiki/Dungeon Kart Track'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'thief',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'gainCoins',
            value: 1,
            description: 'When a Hero enters this Room, gain 1 Gold.'
        },
        flavorText: 'Ready, set, GO!',
        expansion: 'promo',
        cardNumber: 'DKP001',
        quantity: 1
    },

    // ========================================
    // PORTABLE POWER TRAP ROOMS
    // ========================================
    {
        id: 'room_mini_spike_pit',
        localImage: 'public/images/cards/rooms/room_mini_spike_pit.jpg',
        name: 'Mini Spike Pit',
        image: 'https://bossmonster.fandom.com/wiki/Mini Spike Pit'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'passive',
            effect: 'heroEntersTwice',
            description: 'Hero enters this Room twice.'
        },
        flavorText: 'Small but painful.',
        expansion: 'promo',
        cardNumber: 'POP005',
        quantity: 3
    },
    
        flavorText: 'Secret level!',
        expansion: 'promo',
        cardNumber: 'LST004',
        quantity: 1
    },

    // ========================================
    // DIGITAL BOSS MONSTER TRAP ROOMS
    // ========================================
    {
        id: 'room_lag_spike',
        localImage: 'public/images/cards/rooms/room_lag_spike.jpg',
        name: 'Lag Spike',
        image: 'https://bossmonster.fandom.com/wiki/Lag Spike'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'deactivateRoom',
            target: 'self',
            description: 'After dealing damage, deactivate this Room.'
        },
        flavorText: 'Connection lost.',
        expansion: 'promo',
        cardNumber: 'DBM007',
        quantity: 1
    },
    {
        id: 'room_virus_trap',
        localImage: 'public/images/cards/rooms/room_virus_trap.jpg',
        name: 'Virus Trap',
        image: 'https://bossmonster.fandom.com/wiki/Virus Trap'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'spreadDamage',
            value: 1,
            description: 'Deal 1 damage to all Heroes in all dungeons.'
        },
        flavorText: 'Spreading corruption.',
        expansion: 'promo',
        cardNumber: 'DBM008',
        quantity: 1
    },

    // ========================================
    // 10TH ANNIVERSARY TRAP ROOMS
    // ========================================
    {
        id: 'room_anniversary_trap',
        localImage: 'public/images/cards/rooms/room_anniversary_trap.jpg',
        name: 'Anniversary Trap',
        image: 'https://bossmonster.fandom.com/wiki/Anniversary Trap'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'thief',
        ability: {
            trigger: 'onBuild',
            effect: 'gainCoins',
            value: 2,
            description: 'When built, gain 2 Gold.'
        },
        flavorText: 'Ten years of trapping.',
        expansion: 'tenthAnniversary',
        cardNumber: 'TEN007',
        quantity: 3
    },
    {
        id: 'room_legacy_trap',
        localImage: 'public/images/cards/rooms/room_legacy_trap.jpg',
        name: 'Legacy Trap',
        image: 'https://bossmonster.fandom.com/wiki/Legacy Trap'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'onHeroKill',
            effect: 'retrieveFromDiscard',
            cardType: 'room',
            value: 1,
            description: 'If a Hero dies here, retrieve a Room from discard.'
        },
        flavorText: 'Traps of the past.',
        expansion: 'tenthAnniversary',
        cardNumber: 'TEN008',
        quantity: 3
    },
    
        flavorText: 'Party time!',
        expansion: 'tenthAnniversary',
        cardNumber: 'TEN010',
        quantity: 1
    },

    // ========================================
    // BIG BOX TRAP ROOMS
    // ========================================
    {
        id: 'room_collectors_trap',
        localImage: 'public/images/cards/rooms/room_collectors_trap.jpg',
        name: 'Collector\'s Trap',
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'thief',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'revealHand',
            target: 'heroOwner',
            description: 'When a Hero enters, look at their player\'s hand.'
        },
        flavorText: 'For collectors only.',
        expansion: 'promo',
        cardNumber: 'BIGBOX005',
        quantity: 1
    },
    
        flavorText: 'Thanks for backing!',
        expansion: 'promo',
        cardNumber: 'KSA018',
        quantity: 1
    },

    // ========================================
    // MORE SUPER BOSS MONSTER TRAP ROOMS
    // ========================================
    
        flavorText: 'Faster blades.',
        expansion: 'super',
        cardNumber: 'SBM042',
        quantity: 3
    },
    {
        id: 'room_mega_fire',
        localImage: 'public/images/cards/rooms/room_mega_fire.jpg',
        name: 'Mega Fire Trap',
        image: 'https://bossmonster.fandom.com/wiki/Mega Fire Trap'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroKill',
            effect: 'damageAllHeroes',
            value: 1,
            description: 'If a Hero dies, deal 1 damage to all Heroes in all dungeons.'
        },
        flavorText: 'Spreading flames.',
        expansion: 'super',
        cardNumber: 'SBM043',
        quantity: 3
    },
    {
        id: 'room_super_freeze',
        localImage: 'public/images/cards/spells/spell_freeze.jpg',
        name: 'Super Freeze Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Super Freeze Chamber'.replace(/\s/g, '_'),
        subtitle: 'Trap Room',
        roomType: 'trap',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'deactivateRooms',
            value: 2,
            target: 'any',
            description: 'When a Hero enters, deactivate 2 Rooms in any dungeon.'
        },
        flavorText: 'Flash freeze.',
        expansion: 'super',
        cardNumber: 'SBM044',
        quantity: 3
    },
    {
        id: 'room_power_spike',
        name: 'Power Spike Pit',
        image: 'https://bossmonster.fandom.com/wiki/Power Spike Pit'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['thief'],
        damage: 3,
        treasure: 'thief',
        ability: {
            trigger: 'passive',
            effect: 'damagePerTrap',
            value: 1,
            description: '+1 damage for each Trap Room in your dungeon.'
        },
        flavorText: 'Power overwhelming.',
        expansion: 'super',
        cardNumber: 'SBM045',
        quantity: 1
    },
    {
        id: 'room_boss_trap',
        localImage: 'public/images/cards/rooms/room_boss_trap.jpg',
        name: 'Boss Trap',
        image: 'https://bossmonster.fandom.com/wiki/Boss Trap'.replace(/\s/g, '_'),
        subtitle: 'Advanced Trap Room',
        roomType: 'trap',
        isAdvanced: true,
        requiredTreasure: ['fighter'],
        damage: 4,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'bossXPBonus',
            description: 'Add your Boss XP / 200 to this Room\'s damage.'
        },
        flavorText: 'The boss\'s favorite.',
        expansion: 'super',
        cardNumber: 'SBM046',
        quantity: 1
    }
];

// Calculate total trap room cards
const TOTAL_TRAP_ROOMS = TRAP_ROOMS.reduce((sum, room) => sum + room.quantity, 0);

// Export
if (typeof window !== 'undefined') {
    window.TRAP_ROOMS = TRAP_ROOMS;
    window.TOTAL_TRAP_ROOMS = TOTAL_TRAP_ROOMS;
}

if (typeof module !== 'undefined') {
    module.exports = { TRAP_ROOMS, TOTAL_TRAP_ROOMS };
}
