/**
 * Boss Monster - Monster Room Cards Database
 * Official card data from Boss Monster Wiki
 * https://bossmonster.fandom.com/wiki/List_of_Cards
 * Includes exact quantities for 1489 total cards
 */

const MONSTER_ROOMS = [
    // ========================================
    // BASE SET MONSTER ROOMS - ORDINARY (qty 2 each)
    // ========================================
    {
        id: 'room_dark_altar',
        localImage: 'public/images/cards/rooms/room_dark_altar.jpg',
        name: 'Dark Altar',
        image: 'https://bossmonster.fandom.com/wiki/Dark Altar'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'cleric',
        ability: {
            trigger: 'onBuild',
            effect: 'drawSpell',
            value: 1,
            description: 'When you build this Room, draw a Spell card.'
        },
        flavorText: 'The gods of darkness demand tribute.',
        expansion: 'base',
        cardNumber: 'BMA009',
        quantity: 3
    },
    {
        id: 'room_goblin_armory',
        localImage: 'public/images/cards/rooms/room_goblin_armory.jpg',
        name: 'Goblin Armory',
        image: 'https://bossmonster.fandom.com/wiki/Goblin Armory'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'fighter',
        ability: {
            trigger: 'onBuild',
            effect: 'drawRoom',
            value: 1,
            description: 'When you build this Room, draw a Room card.'
        },
        flavorText: 'Goblins: quantity over quality.',
        expansion: 'base',
        cardNumber: 'BMA010',
        quantity: 3
    },
    
        flavorText: 'Where every night is a monster mash.',
        expansion: 'base',
        cardNumber: 'BMA012',
        quantity: 3
    },
    
        flavorText: 'Rest in pieces.',
        expansion: 'base',
        cardNumber: 'BMA014',
        quantity: 3
    },
    
        flavorText: 'Come for the ambiance. Stay forever.',
        expansion: 'base',
        cardNumber: 'BMA016',
        quantity: 3
    },
    {
        id: 'room_witch_kitchen',
        localImage: 'public/images/cards/rooms/room_witch_kitchen.jpg',
        name: 'Witch\'s Kitchen',
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroKill',
            effect: 'drawSpell',
            value: 1,
            description: 'If a Hero dies in this Room, draw a Spell card.'
        },
        flavorText: 'Eye of newt, wing of bat, soul of hero...',
        expansion: 'base',
        cardNumber: 'BMA017',
        quantity: 3
    },
    
        flavorText: 'Collect them all!',
        expansion: 'base',
        cardNumber: 'BMA019',
        quantity: 1
    },
    {
        id: 'room_lich_library',
        localImage: 'public/images/cards/rooms/room_lich_library.jpg',
        name: 'Lich\'s Library',
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['mage'],
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onBuild',
            effect: 'drawSpell',
            value: 2,
            description: 'When you build this Room, draw two Spell cards.'
        },
        flavorText: 'Knowledge is power. Dead knowledge is more power.',
        expansion: 'base',
        cardNumber: 'BMA020',
        quantity: 1
    },
    {
        id: 'room_dragon_hatchery',
        localImage: 'public/images/cards/rooms/room_dragon_hatchery.jpg',
        name: 'Dragon Hatchery',
        image: 'https://bossmonster.fandom.com/wiki/Dragon Hatchery'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['fighter', 'mage'],
        damage: 3,
        treasure: ['fighter', 'mage'],
        ability: {
            trigger: 'passive',
            effect: 'epicBonus',
            value: 2,
            description: 'This Room deals +2 damage to Epic Heroes.'
        },
        flavorText: 'Cute little world-enders.',
        expansion: 'base',
        cardNumber: 'BMA021',
        quantity: 1
    },
    {
        id: 'room_minotaur_maze',
        localImage: 'public/images/cards/rooms/room_minotaur_maze.jpg',
        name: 'Minotaur Maze',
        image: 'https://bossmonster.fandom.com/wiki/Minotaur Maze'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['fighter'],
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'heroEntersTwice',
            description: 'A Hero must enter this room twice, taking damage each time.'
        },
        flavorText: 'You are here. And here. And here...',
        expansion: 'base',
        cardNumber: 'BMA022',
        quantity: 1
    },
    {
        id: 'room_succubus_spa',
        localImage: 'public/images/cards/rooms/room_succubus_spa.jpg',
        name: 'Succubus Spa',
        image: 'https://bossmonster.fandom.com/wiki/Succubus Spa'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['cleric'],
        damage: 2,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'lureHero',
            value: 1,
            description: 'When a Hero enters this Room, choose a Hero in another player\'s dungeon and bring it to the entrance of your dungeon.'
        },
        flavorText: 'Let your worries drift away.',
        expansion: 'base',
        cardNumber: 'BMA023',
        quantity: 1
    },
    {
        id: 'room_gorgon_gallery',
        localImage: 'public/images/cards/rooms/room_gorgon_gallery.jpg',
        name: 'Gorgon\'s Gallery',
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['mage'],
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'deactivateRoom',
            target: 'opponent',
            description: 'When a Hero enters this Room, deactivate one Room in any other dungeon.'
        },
        flavorText: 'A petrifying collection.',
        expansion: 'base',
        cardNumber: 'BMA024',
        quantity: 1
    },

    // ========================================
    // BOSS MONSTER 2 / NEXT LEVEL MONSTER ROOMS (qty 2 each)
    // ========================================
    {
        id: 'room_banshee_tower',
        localImage: 'public/images/cards/rooms/room_banshee_tower.jpg',
        name: 'Banshee Tower',
        image: 'https://bossmonster.fandom.com/wiki/Banshee Tower'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'opponentsDiscard',
            cardType: 'spell',
            value: 1,
            description: 'When a Hero enters this Room, each other player discards a Spell card.'
        },
        flavorText: 'Her scream is the last thing you\'ll hear.',
        expansion: 'nextLevel',
        cardNumber: 'BM2009',
        quantity: 3
    },
    
        flavorText: 'Stone by day, death by night.',
        expansion: 'nextLevel',
        cardNumber: 'BM2011',
        quantity: 3
    },
    {
        id: 'room_ghoul_pit',
        localImage: 'public/images/cards/rooms/room_ghoul_pit.jpg',
        name: 'Ghoul Pit',
        image: 'https://bossmonster.fandom.com/wiki/Ghoul Pit'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroKill',
            effect: 'drawRoom',
            value: 1,
            description: 'If a Hero dies in this Room, draw a Room card.'
        },
        flavorText: 'They hunger for more than flesh.',
        expansion: 'nextLevel',
        cardNumber: 'BM2012',
        quantity: 3
    },
    {
        id: 'room_harpy_nest',,
        localImage: 'public/images/cards/rooms/room_harpy_nest.jpg'
        name: 'Harpy Nest',
        image: 'https://bossmonster.fandom.com/wiki/Harpy Nest'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'sendBackToEntrance',
            condition: 'coinFlip',
            description: 'When a Hero enters this Room, flip a coin. If heads, that Hero goes back to the entrance of your dungeon.'
        },
        flavorText: 'Screech! Scratch! SUFFER!',
        expansion: 'nextLevel',
        cardNumber: 'BM2013',
        quantity: 3
    },
    {
        id: 'room_hydra_pool',
        localImage: 'public/images/cards/rooms/room_hydra_pool.jpg',
        name: 'Hydra Pool',
        image: 'https://bossmonster.fandom.com/wiki/Hydra Pool'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'onDestroy',
            effect: 'drawRoom',
            value: 2,
            description: 'When this Room is destroyed, draw two Room cards.'
        },
        flavorText: 'Cut one head, two more appear.',
        expansion: 'nextLevel',
        cardNumber: 'BM2014',
        quantity: 3
    },
    {
        id: 'room_medusa_chamber',
        localImage: 'public/images/cards/rooms/room_medusa_chamber.jpg',
        name: 'Medusa\'s Chamber',
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'deactivateRoom',
            target: 'ownRoom',
            description: 'When a Hero enters this Room, you must deactivate another Room in your dungeon.'
        },
        flavorText: 'Don\'t look. DON\'T LOOK!',
        expansion: 'nextLevel',
        cardNumber: 'BM2015',
        quantity: 3
    },
    {
        id: 'room_mummy_tomb',
        localImage: 'public/images/cards/rooms/room_mummy_tomb.jpg',
        name: 'Mummy Tomb',
        image: 'https://bossmonster.fandom.com/wiki/Mummy Tomb'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroKill',
            effect: 'gainCoins',
            value: 2,
            description: 'If a Hero dies in this Room, gain 2 Gold.'
        },
        flavorText: 'Cursed treasure within.',
        expansion: 'nextLevel',
        cardNumber: 'BM2016',
        quantity: 3
    },
    {
        id: 'room_phantom_opera',
        localImage: 'public/images/cards/rooms/room_phantom_opera.jpg',
        name: 'Phantom Opera',
        image: 'https://bossmonster.fandom.com/wiki/Phantom Opera'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'onBuild',
            effect: 'stealCoins',
            value: 1,
            target: 'eachOpponent',
            description: 'When you build this Room, take 1 Gold from each opponent.'
        },
        flavorText: 'The music of the night.',
        expansion: 'nextLevel',
        cardNumber: 'BM2017',
        quantity: 3
    },
    {
        id: 'room_shadow_assassins',
        localImage: 'public/images/cards/rooms/room_shadow_assassins.jpg',
        name: 'Shadow Assassins',
        image: 'https://bossmonster.fandom.com/wiki/Shadow Assassins'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'passive',
            effect: 'thiefBonus',
            value: 2,
            description: 'This Room deals +2 damage to Thief Heroes.'
        },
        flavorText: 'You won\'t see them coming.',
        expansion: 'nextLevel',
        cardNumber: 'BM2018',
        quantity: 3
    },
    {
        id: 'room_troll_bridge',
        localImage: 'public/images/cards/rooms/room_troll_bridge.jpg',
        name: 'Troll Bridge',
        image: 'https://bossmonster.fandom.com/wiki/Troll Bridge'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'regenerate',
            value: 1,
            description: 'At the end of each turn, remove one damage counter from this Room.'
        },
        flavorText: 'You gotta pay the troll toll.',
        expansion: 'nextLevel',
        cardNumber: 'BM2019',
        quantity: 3
    },
    
        flavorText: 'Undead dragon. Ultimate evil.',
        expansion: 'nextLevel',
        cardNumber: 'BM2021',
        quantity: 1
    },
    {
        id: 'room_mind_flayer_colony',
        localImage: 'public/images/cards/rooms/room_mind_flayer_colony.jpg',
        name: 'Mind Flayer Colony',
        image: 'https://bossmonster.fandom.com/wiki/Mind Flayer Colony'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['mage'],
        damage: 3,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'stealCard',
            cardType: 'any',
            random: true,
            description: 'When a Hero enters this Room, choose an opponent and take a card at random from their hand.'
        },
        flavorText: 'Your thoughts belong to us now.',
        expansion: 'nextLevel',
        cardNumber: 'BM2022',
        quantity: 1
    },
    {
        id: 'room_beholder_sanctum',
        localImage: 'public/images/cards/rooms/room_beholder_sanctum.jpg',
        name: 'Beholder Sanctum',
        image: 'https://bossmonster.fandom.com/wiki/Beholder Sanctum'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['mage'],
        damage: 3,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'deactivateRooms',
            value: 2,
            target: 'any',
            description: 'When a Hero enters this Room, deactivate up to 2 Rooms in any dungeon(s).'
        },
        flavorText: 'Beauty is in the eye of the beholder.',
        expansion: 'nextLevel',
        cardNumber: 'BM2023',
        quantity: 1
    },
    {
        id: 'room_kraken_depths',
        localImage: 'public/images/cards/rooms/room_kraken_depths.jpg',
        name: 'Kraken Depths',
        image: 'https://bossmonster.fandom.com/wiki/Kraken Depths'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['fighter'],
        damage: 3,
        treasure: 'fighter',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'lureHeroFromTown',
            value: 1,
            description: 'When a Hero enters this Room, choose a Hero in town and bring it to the entrance of your dungeon.'
        },
        flavorText: 'Release the Kraken!',
        expansion: 'nextLevel',
        cardNumber: 'BM2024',
        quantity: 1
    },
    
        flavorText: 'Where the little guys live.',
        expansion: 'minibosses',
        cardNumber: 'ROM009',
        quantity: 3
    },
    {
        id: 'room_promotion_chamber',
        localImage: 'public/images/cards/rooms/room_promotion_chamber.jpg',
        name: 'Promotion Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Promotion Chamber'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'onHeroKill',
            effect: 'freePromotion',
            description: 'If a Hero dies in this Room, you may promote a Miniboss for free.'
        },
        flavorText: 'Rise through the ranks.',
        expansion: 'minibosses',
        cardNumber: 'ROM010',
        quantity: 3
    },
    {
        id: 'room_goblin_war_camp',
        name: 'Goblin War Camp',
        image: 'https://bossmonster.fandom.com/wiki/Goblin War Camp'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'passive',
            effect: 'damagePerMiniboss',
            value: 1,
            description: 'This Room has +1 damage for each Miniboss in your dungeon.'
        },
        flavorText: 'Goblins assemble!',
        expansion: 'minibosses',
        cardNumber: 'ROM011',
        quantity: 3
    },
    {
        id: 'room_dark_elf_enclave',
        localImage: 'public/images/cards/rooms/room_dark_elf_enclave.jpg',
        name: 'Dark Elf Enclave',
        image: 'https://bossmonster.fandom.com/wiki/Dark Elf Enclave'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroKill',
            effect: 'drawMiniboss',
            value: 1,
            description: 'If a Hero dies in this Room, draw a Miniboss card.'
        },
        flavorText: 'Exiled but not defeated.',
        expansion: 'minibosses',
        cardNumber: 'ROM012',
        quantity: 3
    },

    // ========================================
    // CRASH LANDING MONSTER ROOMS (qty 2 each)
    // ========================================
    {
        id: 'room_xenomorph_hive',
        localImage: 'public/images/cards/rooms/room_xenomorph_hive.jpg',
        name: 'Xenomorph Hive',
        image: 'https://bossmonster.fandom.com/wiki/Xenomorph Hive'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'explorer',
        ability: {
            trigger: 'onHeroKill',
            effect: 'addDamageCounter',
            value: 1,
            target: 'self',
            description: 'If a Hero dies in this Room, add a damage counter to this Room.'
        },
        flavorText: 'They mostly come at night. Mostly.',
        expansion: 'crashLanding',
        cardNumber: 'CL009',
        quantity: 3
    },
    {
        id: 'room_robot_assembly',
        localImage: 'public/images/cards/rooms/room_robot_assembly.jpg',
        name: 'Robot Assembly Line',
        image: 'https://bossmonster.fandom.com/wiki/Robot Assembly Line'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'explorer',
        ability: {
            trigger: 'onBuild',
            effect: 'drawRoom',
            value: 1,
            description: 'When you build this Room, draw a Room card.'
        },
        flavorText: 'Building a better killer.',
        expansion: 'crashLanding',
        cardNumber: 'CL010',
        quantity: 3
    },
    {
        id: 'room_mind_control_lab',
        name: 'Mind Control Lab',
        image: 'https://bossmonster.fandom.com/wiki/Mind Control Lab'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'explorer',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'stealHero',
            target: 'fromOpponent',
            description: 'When a Hero enters this Room, you may move a Hero from another player\'s dungeon to the entrance of your dungeon.'
        },
        flavorText: 'Your mind belongs to us.',
        expansion: 'crashLanding',
        cardNumber: 'CL011',
        quantity: 3
    },
    {
        id: 'room_alien_queen_chamber',
        name: 'Alien Queen Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Alien Queen Chamber'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['explorer'],
        damage: 4,
        treasure: 'explorer',
        ability: {
            trigger: 'onHeroKill',
            effect: 'lureHero',
            value: 1,
            description: 'If a Hero dies in this Room, choose a Hero in town and bring it to the entrance of your dungeon.'
        },
        flavorText: 'Mother of all monsters.',
        expansion: 'crashLanding',
        cardNumber: 'CL012',
        quantity: 1
    },
    {
        id: 'room_clone_vats',
        localImage: 'public/images/cards/rooms/room_clone_vats.jpg',
        name: 'Clone Vats',
        image: 'https://bossmonster.fandom.com/wiki/Clone Vats'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'explorer',
        ability: {
            trigger: 'onDestroy',
            effect: 'buildCopy',
            description: 'When this Room is destroyed, you may immediately build a copy of it in the same slot.'
        },
        flavorText: 'They just keep coming.',
        expansion: 'crashLanding',
        cardNumber: 'CL013',
        quantity: 3
    },
    
        flavorText: 'Where the ghouls play.',
        expansion: 'promo',
        cardNumber: 'KSA008',
        quantity: 1
    },
    {
        id: 'room_shark_tank',
        localImage: 'public/images/cards/rooms/room_shark_tank.jpg',
        name: 'Shark Tank',
        image: 'https://bossmonster.fandom.com/wiki/Shark Tank'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'conditionalBonus',
            condition: 'halfHealth',
            value: 2,
            description: 'If a Hero has taken damage equal to half its Health before entering this Room, this Room deals +2 damage.'
        },
        flavorText: 'Smell blood in the water.',
        expansion: 'promo',
        cardNumber: 'KSA009',
        quantity: 1
    },

    // ========================================
    // VAULT OF VILLAINS MONSTER ROOMS (qty 2 each)
    // ========================================
    {
        id: 'room_minotaur_labyrinth',
        localImage: 'public/images/cards/rooms/room_minotaur_labyrinth.jpg',
        name: 'Minotaur Labyrinth',
        image: 'https://bossmonster.fandom.com/wiki/Minotaur Labyrinth'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'heroEntersTwice',
            description: 'A Hero must enter this Room twice, taking damage each time.'
        },
        flavorText: 'No one escapes the maze.',
        expansion: 'vault',
        cardNumber: 'VOV009',
        quantity: 3
    },
    {
        id: 'room_hydra_swamp',
        localImage: 'public/images/cards/rooms/room_hydra_swamp.jpg',
        name: 'Hydra Swamp',
        image: 'https://bossmonster.fandom.com/wiki/Hydra Swamp'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'onDestroy',
            effect: 'drawRoom',
            value: 2,
            description: 'When this Room is destroyed, draw 2 Room cards.'
        },
        flavorText: 'Cut one head, two more grow.',
        expansion: 'vault',
        cardNumber: 'VOV010',
        quantity: 3
    },
    {
        id: 'room_cerberus_gate',
        name: 'Cerberus Gate',
        image: 'https://bossmonster.fandom.com/wiki/Cerberus Gate'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['fighter', 'cleric'],
        damage: 4,
        treasure: ['fighter', 'cleric'],
        ability: {
            trigger: 'passive',
            effect: 'blockRetreat',
            description: 'Heroes cannot be sent back from your dungeon by Spell cards.'
        },
        flavorText: 'Three heads guard the underworld.',
        expansion: 'vault',
        cardNumber: 'VOV011',
        quantity: 1
    },
    {
        id: 'room_manticore_nest',
        name: 'Manticore Nest',
        image: 'https://bossmonster.fandom.com/wiki/Manticore Nest'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 3,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'clericBonus',
            value: 1,
            description: 'This Room deals +1 damage to Cleric Heroes.'
        },
        flavorText: 'Venomous tail, deadly aim.',
        expansion: 'vault',
        cardNumber: 'VOV012',
        quantity: 3
    },
    {
        id: 'room_sphinx_chamber',
        localImage: 'public/images/cards/rooms/room_sphinx_chamber.jpg',
        name: 'Sphinx Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Sphinx Chamber'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'riddle',
            description: 'When a Hero enters this Room, flip a coin. If heads, this Room deals double damage.'
        },
        flavorText: 'Answer correctly.',
        expansion: 'vault',
        cardNumber: 'VOV013',
        quantity: 3
    },
    {
        id: 'room_cyclops_forge',
        localImage: 'public/images/cards/rooms/room_cyclops_forge.jpg',
        name: 'Cyclops Forge',
        image: 'https://bossmonster.fandom.com/wiki/Cyclops Forge'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 3,
        treasure: 'fighter',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'destroyItem',
            description: 'When a Hero enters this Room, destroy one Item that Hero is carrying.'
        },
        flavorText: 'One eye, many hammers.',
        expansion: 'vault',
        cardNumber: 'VOV014',
        quantity: 3
    },
    {
        id: 'room_hades_throne',
        name: 'Hades\' Throne',
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['cleric', 'cleric'],
        damage: 4,
        treasure: ['cleric', 'cleric'],
        ability: {
            trigger: 'onHeroKill',
            effect: 'multiEffect',
            effects: ['healWound', 'drawSpell'],
            values: [1, 1],
            description: 'If a Hero dies in this Room, convert 1 Wound to a Soul and draw a Spell card.'
        },
        flavorText: 'Lord of the underworld.',
        expansion: 'vault',
        cardNumber: 'VOV015',
        quantity: 1
    },

    // ========================================
    // TOOLS OF HERO-KIND MONSTER ROOMS (qty 2 each)
    // ========================================
    {
        id: 'room_warg_kennel',
        localImage: 'public/images/cards/rooms/room_warg_kennel.jpg',
        name: 'Warg Kennel',
        image: 'https://bossmonster.fandom.com/wiki/Warg Kennel'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'destroyItem',
            description: 'When a Hero enters this Room, destroy one Item that Hero is carrying.'
        },
        flavorText: 'Good boy.',
        expansion: 'tools',
        cardNumber: 'TOH005',
        quantity: 3
    },
    {
        id: 'room_orc_mess_hall',
        localImage: 'public/images/cards/rooms/room_orc_mess_hall.jpg',
        name: 'Orc Mess Hall',
        image: 'https://bossmonster.fandom.com/wiki/Orc Mess Hall'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'onHeroKill',
            effect: 'drawRoom',
            value: 1,
            description: 'If a Hero dies in this Room, draw a Room card.'
        },
        flavorText: 'What\'s on the menu? Hero.',
        expansion: 'tools',
        cardNumber: 'TOH006',
        quantity: 3
    },

    // ========================================
    // IMPLEMENTS OF DESTRUCTION MONSTER ROOMS (qty 2 each)
    // ========================================
    
        flavorText: 'Built for war.',
        expansion: 'implements',
        cardNumber: 'IOD006',
        quantity: 3
    },

    // ========================================
    // PORTABLE POWER PACK ROOMS
    // ========================================
    {
        id: 'room_pocket_dimension',
        name: 'Pocket Dimension',
        image: 'https://bossmonster.fandom.com/wiki/Pocket Dimension'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onBuild',
            effect: 'drawCard',
            value: 2,
            description: 'When you build this Room, draw 2 cards.'
        },
        flavorText: 'Bigger on the inside.',
        expansion: 'promo',
        cardNumber: 'POP002',
        quantity: 3
    },
    {
        id: 'room_mini_minotaur',
        localImage: 'public/images/cards/rooms/room_mini_minotaur.jpg',
        name: 'Mini Minotaur Maze',
        image: 'https://bossmonster.fandom.com/wiki/Mini Minotaur Maze'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'heroEntersTwice',
            description: 'A Hero must enter this Room twice.'
        },
        flavorText: 'Small but confusing.',
        expansion: 'promo',
        cardNumber: 'POP003',
        quantity: 3
    },
    {
        id: 'room_travel_sized_trap',
        localImage: 'public/images/cards/rooms/room_travel_sized_trap.jpg',
        name: 'Travel-Sized Terror',
        image: 'https://bossmonster.fandom.com/wiki/Travel-Sized Terror'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'thief',
        ability: {
            trigger: 'onHeroKill',
            effect: 'drawRoom',
            value: 1,
            description: 'If a Hero dies here, draw a Room card.'
        },
        flavorText: 'Compact evil.',
        expansion: 'promo',
        cardNumber: 'POP004',
        quantity: 3
    },

    // ========================================
    // LOST LEVELS ROOMS
    // ========================================
    {
        id: 'room_deleted_scene',
        localImage: 'public/images/cards/rooms/room_deleted_scene.jpg',
        name: 'Deleted Scene',
        image: 'https://bossmonster.fandom.com/wiki/Deleted Scene'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onDestroy',
            effect: 'drawSpell',
            value: 1,
            description: 'When destroyed, draw a Spell card.'
        },
        flavorText: 'Cut from the final edit.',
        expansion: 'promo',
        cardNumber: 'LST002',
        quantity: 1
    },
    {
        id: 'room_bonus_level',
        localImage: 'public/images/cards/rooms/room_bonus_level.jpg',
        name: 'Bonus Level',
        image: 'https://bossmonster.fandom.com/wiki/Bonus Level'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'onHeroKill',
            effect: 'gainCoins',
            value: 3,
            description: 'If a Hero dies here, gain 3 Gold.'
        },
        flavorText: 'Secret area!',
        expansion: 'promo',
        cardNumber: 'LST003',
        quantity: 1
    },

    // ========================================
    // DIGITAL BOSS MONSTER ROOMS
    // ========================================
    {
        id: 'room_pixel_pit',
        localImage: 'public/images/cards/rooms/room_pixel_pit.jpg',
        name: 'Pixel Pit',
        image: 'https://bossmonster.fandom.com/wiki/Pixel Pit'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'passive',
            effect: 'heroEntersTwice',
            description: 'A Hero enters this Room twice.'
        },
        flavorText: 'Fall into the pixels.',
        expansion: 'promo',
        cardNumber: 'DBM004',
        quantity: 1
    },
    {
        id: 'room_glitch_zone',
        localImage: 'public/images/cards/rooms/room_glitch_zone.jpg',
        name: 'Glitch Zone',
        image: 'https://bossmonster.fandom.com/wiki/Glitch Zone'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 3,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'randomEffect',
            description: 'Flip a coin. Heads: deal +2 damage. Tails: deal -1 damage.'
        },
        flavorText: 'ERROR: UNEXPECTED DAMAGE',
        expansion: 'promo',
        cardNumber: 'DBM005',
        quantity: 1
    },
    {
        id: 'room_save_point',
        localImage: 'public/images/cards/rooms/room_save_point.jpg',
        name: 'Save Point',
        image: 'https://bossmonster.fandom.com/wiki/Save Point'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'cleric',
        ability: {
            trigger: 'onBuild',
            effect: 'healWound',
            value: 1,
            description: 'When built, convert 1 Wound to a Soul.'
        },
        flavorText: 'Game saved.',
        expansion: 'promo',
        cardNumber: 'DBM006',
        quantity: 1
    },

    // ========================================
    // SUPER BOSS MONSTER MONSTER ROOMS
    // ========================================
    
        flavorText: 'Extra bitey.',
        expansion: 'super',
        cardNumber: 'SBM037',
        quantity: 3
    },
    {
        id: 'room_hyper_hydra',
        localImage: 'public/images/cards/rooms/room_hyper_hydra.jpg',
        name: 'Hyper Hydra Hole',
        image: 'https://bossmonster.fandom.com/wiki/Hyper Hydra Hole'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'onDestroy',
            effect: 'drawRoom',
            value: 3,
            description: 'When destroyed, draw 3 Room cards.'
        },
        flavorText: 'Cut one head, three grow back.',
        expansion: 'super',
        cardNumber: 'SBM038',
        quantity: 3
    },
    {
        id: 'room_ultra_dragon',
        localImage: 'public/images/cards/rooms/room_ultra_dragon.jpg',
        name: 'Ultra Dragon Den',
        image: 'https://bossmonster.fandom.com/wiki/Ultra Dragon Den'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['fighter', 'mage'],
        damage: 5,
        treasure: ['fighter', 'mage'],
        ability: {
            trigger: 'passive',
            effect: 'epicBonus',
            value: 3,
            description: 'Deals +3 damage to Epic Heroes.'
        },
        flavorText: 'Ultimate dragon power.',
        expansion: 'super',
        cardNumber: 'SBM039',
        quantity: 1
    },
    {
        id: 'room_boss_chamber',
        localImage: 'public/images/cards/rooms/room_boss_chamber.jpg',
        name: 'Boss Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Boss Chamber'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['fighter'],
        damage: 4,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'bossBonus',
            description: 'Add your Boss XP / 100 to this Room\'s damage.'
        },
        flavorText: 'Where the boss lives.',
        expansion: 'super',
        cardNumber: 'SBM040',
        quantity: 1
    },

    // ========================================
    // 10TH ANNIVERSARY ROOMS
    // ========================================
    {
        id: 'room_anniversary_altar',
        localImage: 'public/images/cards/rooms/room_anniversary_altar.jpg',
        name: 'Anniversary Altar',
        image: 'https://bossmonster.fandom.com/wiki/Anniversary Altar'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'cleric',
        ability: {
            trigger: 'onBuild',
            effect: 'multiDraw',
            description: 'Draw 1 Room and 1 Spell card.'
        },
        flavorText: 'Ten years of worship.',
        expansion: 'tenthAnniversary',
        cardNumber: 'TEN004',
        quantity: 3
    },
    {
        id: 'room_legacy_lair',
        localImage: 'public/images/cards/rooms/room_legacy_lair.jpg',
        name: 'Legacy Lair',
        image: 'https://bossmonster.fandom.com/wiki/Legacy Lair'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'passive',
            effect: 'countAllMonsters',
            description: '+1 damage for each Monster Room in all dungeons.'
        },
        flavorText: 'The past haunts.',
        expansion: 'tenthAnniversary',
        cardNumber: 'TEN005',
        quantity: 3
    },
    {
        id: 'room_celebration_chamber',
        localImage: 'public/images/cards/rooms/room_celebration_chamber.jpg',
        name: 'Celebration Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Celebration Chamber'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'onHeroKill',
            effect: 'gainCoins',
            value: 2,
            description: 'If a Hero dies here, gain 2 Gold.'
        },
        flavorText: 'Party time!',
        expansion: 'tenthAnniversary',
        cardNumber: 'TEN006',
        quantity: 3
    },

    // ========================================
    // BIG BOX & KICKSTARTER EXCLUSIVE ROOMS
    // ========================================
    {
        id: 'room_collectors_vault',
        localImage: 'public/images/cards/rooms/room_collectors_vault.jpg',
        name: 'Collector\'s Vault',
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: ['thief', 'thief'],
        ability: {
            trigger: 'onBuild',
            effect: 'gainCoins',
            value: 4,
            description: 'When built, gain 4 Gold.'
        },
        flavorText: 'For true collectors only.',
        expansion: 'promo',
        cardNumber: 'BIGBOX003',
        quantity: 1
    },
    {
        id: 'room_exclusive_exhibit',
        localImage: 'public/images/cards/rooms/room_exclusive_exhibit.jpg',
        name: 'Exclusive Exhibit',
        image: 'https://bossmonster.fandom.com/wiki/Exclusive Exhibit'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'revealHand',
            target: 'opponent',
            description: 'When a Hero enters, look at an opponent\'s hand.'
        },
        flavorText: 'Look, but don\'t touch.',
        expansion: 'promo',
        cardNumber: 'BIGBOX004',
        quantity: 1
    },
    {
        id: 'room_backer_bonus',
        localImage: 'public/images/cards/rooms/room_backer_bonus.jpg',
        name: 'Backer Bonus Room',
        image: 'https://bossmonster.fandom.com/wiki/Backer Bonus Room'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'onBuild',
            effect: 'drawCard',
            value: 1,
            description: 'When built, draw a card.'
        },
        flavorText: 'Thank you, backers!',
        expansion: 'promo',
        cardNumber: 'KSA016',
        quantity: 1
    },
    
        flavorText: 'The throne of ultimate evil.',
        expansion: 'promo',
        cardNumber: 'OVR002',
        quantity: 1
    },

    // ========================================
    // DUNGEON KART ROOM
    // ========================================
    {
        id: 'room_racing_track',
        name: 'Racing Track',
        image: 'https://bossmonster.fandom.com/wiki/Racing Track'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'thief',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'speedBoost',
            description: 'Hero skips the next Room (no damage, no effects).'
        },
        flavorText: 'Zoom past the danger!',
        expansion: 'promo',
        cardNumber: 'DKP002',
        quantity: 1
    },

    // ========================================
    // MORE KICKSTARTER PROMO ROOMS
    // ========================================
    {
        id: 'room_backer_beast',
        localImage: 'public/images/cards/rooms/room_backer_beast.jpg',
        name: 'Backer Beast Lair',
        image: 'https://bossmonster.fandom.com/wiki/Backer Beast Lair'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'fighter',
        ability: {
            trigger: 'onHeroKill',
            effect: 'drawCard',
            value: 1,
            description: 'If a Hero dies here, draw a card.'
        },
        flavorText: 'Funded by fans.',
        expansion: 'promo',
        cardNumber: 'KSA019',
        quantity: 1
    },
    
        flavorText: 'VIP access only.',
        expansion: 'promo',
        cardNumber: 'KSA021',
        quantity: 1
    },

    // ========================================
    // MORE CONVENTION PROMO ROOMS
    // ========================================
    {
        id: 'room_convention_center',
        localImage: 'public/images/cards/rooms/room_convention_center.jpg',
        name: 'Convention Center',
        image: 'https://bossmonster.fandom.com/wiki/Convention Center'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'allPlayersDraw',
            value: 1,
            description: 'When a Hero enters, all players draw a card.'
        },
        flavorText: 'Meet the monsters!',
        expansion: 'promo',
        cardNumber: 'CON003',
        quantity: 1
    },
    {
        id: 'room_demo_dungeon',
        localImage: 'public/images/cards/rooms/room_demo_dungeon.jpg',
        name: 'Demo Dungeon',
        image: 'https://bossmonster.fandom.com/wiki/Demo Dungeon'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onBuild',
            effect: 'revealAndChoose',
            deckType: 'room',
            reveal: 3,
            keep: 1,
            description: 'Look at top 3 Room cards, keep 1.'
        },
        flavorText: 'Try before you die!',
        expansion: 'promo',
        cardNumber: 'CON004',
        quantity: 1
    },

    // ========================================
    // MORE HIDDEN SECRETS ROOMS
    // ========================================
    {
        id: 'room_hidden_chamber',
        name: 'Hidden Chamber',
        image: 'https://bossmonster.fandom.com/wiki/Hidden Chamber'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'thief',
        ability: {
            trigger: 'onBuild',
            effect: 'drawSpell',
            value: 1,
            description: 'When built, draw a Spell card.'
        },
        flavorText: 'Secret room.',
        expansion: 'promo',
        cardNumber: 'HSP001',
        quantity: 1
    },
    {
        id: 'room_secret_lab',
        localImage: 'public/images/cards/rooms/room_secret_lab.jpg',
        name: 'Secret Lab',
        image: 'https://bossmonster.fandom.com/wiki/Secret Lab'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroKill',
            effect: 'gainCoins',
            value: 3,
            description: 'If a Hero dies here, gain 3 Gold.'
        },
        flavorText: 'Top secret experiments.',
        expansion: 'promo',
        cardNumber: 'HSP002',
        quantity: 1
    },

    // ========================================
    // MORE GAMES NIGHT ROOMS
    // ========================================
    {
        id: 'room_game_room',
        name: 'Game Room',
        image: 'https://bossmonster.fandom.com/wiki/Game Room'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 2,
        treasure: 'mage',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'coinFlip',
            heads: 'doubleDamage',
            tails: 'halfDamage',
            description: 'Flip a coin: heads = double damage, tails = half.'
        },
        flavorText: 'Roll the dice!',
        expansion: 'promo',
        cardNumber: 'GNK001',
        quantity: 1
    },
    {
        id: 'room_dice_pit',
        localImage: 'public/images/cards/rooms/room_dice_pit.jpg',
        name: 'Dice Pit',
        image: 'https://bossmonster.fandom.com/wiki/Dice Pit'.replace(/\s/g, '_'),
        subtitle: 'Monster Room',
        roomType: 'monster',
        isAdvanced: false,
        damage: 1,
        treasure: 'thief',
        ability: {
            trigger: 'passive',
            effect: 'randomDamage',
            min: 1,
            max: 4,
            description: 'Deals 1-4 damage (roll a d4).'
        },
        flavorText: 'Lady luck decides.',
        expansion: 'promo',
        cardNumber: 'GNK002',
        quantity: 1
    },

    // ========================================
    // MORE SBMKS ROOMS
    // ========================================
    {
        id: 'room_sbm_dragon_lair',
        name: 'Super Dragon Lair',
        image: 'https://bossmonster.fandom.com/wiki/Super Dragon Lair'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['fighter', 'mage'],
        damage: 5,
        treasure: ['fighter', 'mage'],
        ability: {
            trigger: 'onHeroKill',
            effect: 'drawCard',
            value: 2,
            description: 'If a Hero dies here, draw 2 cards.'
        },
        flavorText: 'The ultimate dragon.',
        expansion: 'promo',
        cardNumber: 'SBMKS007',
        quantity: 1
    },
    {
        id: 'room_sbm_throne',
        localImage: 'public/images/cards/rooms/room_sbm_throne.jpg',
        name: 'Super Throne Room',
        image: 'https://bossmonster.fandom.com/wiki/Super Throne Room'.replace(/\s/g, '_'),
        subtitle: 'Advanced Monster Room',
        roomType: 'monster',
        isAdvanced: true,
        requiredTreasure: ['cleric'],
        damage: 4,
        treasure: 'cleric',
        ability: {
            trigger: 'onHeroKill',
            effect: 'healWound',
            value: 2,
            description: 'If a Hero dies here, convert 2 Wounds to Souls.'
        },
        flavorText: 'Sit upon the throne.',
        expansion: 'promo',
        cardNumber: 'SBMKS008',
        quantity: 1
    },

    // ========================================
    // ERRATA ROOMS
    // ========================================
    
        flavorText: 'Typo fixed.',
        expansion: 'errata',
        cardNumber: 'ERR002',
        quantity: 1
    }
];

// Calculate total monster room cards
const TOTAL_MONSTER_ROOMS = MONSTER_ROOMS.reduce((sum, room) => sum + room.quantity, 0);

// Export
if (typeof window !== 'undefined') {
    window.MONSTER_ROOMS = MONSTER_ROOMS;
    window.TOTAL_MONSTER_ROOMS = TOTAL_MONSTER_ROOMS;
}

if (typeof module !== 'undefined') {
    module.exports = { MONSTER_ROOMS, TOTAL_MONSTER_ROOMS };
}
