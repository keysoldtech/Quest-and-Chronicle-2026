/**
 * Boss Monster - Item Cards Database
 * Items from Tools of Hero-Kind and Implements of Destruction expansions
 */

const ITEMS = [
    // ========================================
    // TOOLS OF HERO-KIND - HERO ITEMS (24)
    // ========================================
    {
        id: 'item_sword_valor',
        localImage: 'public/images/cards/items/item_sword_valor.jpg',
        name: 'Sword of Valor',
        image: 'https://bossmonster.fandom.com/wiki/Sword of Valor'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'bonusHP',
            value: 2
        },
        description: 'Equipped Hero has +2 HP.',
        flavorText: 'A blade of legend.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_shield_light',,
        localImage: 'public/images/cards/items/item_shield_light.jpg'
        name: 'Shield of Light',
        image: 'https://bossmonster.fandom.com/wiki/Shield of Light'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'damageReduction',
            value: 1
        },
        description: 'Equipped Hero takes -1 damage from each Room.',
        flavorText: 'Bastion against evil.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_boots_speed',
        localImage: 'public/images/cards/items/item_boots_speed.jpg',
        name: 'Boots of Speed',
        image: 'https://bossmonster.fandom.com/wiki/Boots of Speed'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'skipRoom',
            value: 1
        },
        description: 'Equipped Hero skips one Room.',
        flavorText: 'Fast as lightning.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_ring_protection',
        localImage: 'public/images/cards/items/item_ring_protection.jpg',
        name: 'Ring of Protection',
        image: 'https://bossmonster.fandom.com/wiki/Ring of Protection'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'immuneToTrap',
            value: 1
        },
        description: 'Equipped Hero ignores first Trap Room damage.',
        flavorText: 'Ancient ward.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_cloak_invisibility',
        name: 'Cloak of Invisibility',
        image: 'https://bossmonster.fandom.com/wiki/Cloak of Invisibility'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'immuneToSpell'
        },
        description: 'Equipped Hero cannot be targeted by Spells.',
        flavorText: 'Now you see me...',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_amulet_healing',
        localImage: 'public/images/cards/items/item_amulet_healing.jpg',
        name: 'Amulet of Healing',
        image: 'https://bossmonster.fandom.com/wiki/Amulet of Healing'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'onRoomSurvive',
            effect: 'healHP',
            value: 1
        },
        description: 'Equipped Hero heals 1 HP after each Room.',
        flavorText: 'Warm glow of life.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_holy_cross',
        localImage: 'public/images/cards/items/item_holy_cross.jpg',
        name: 'Holy Cross',
        image: 'https://bossmonster.fandom.com/wiki/Holy Cross'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'immuneToMonster',
            value: 1
        },
        description: 'Equipped Hero ignores first Monster Room damage.',
        flavorText: 'The power of faith.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_staff_power',
        name: 'Staff of Power',
        image: 'https://bossmonster.fandom.com/wiki/Staff of Power'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'bonusHP',
            value: 3,
            condition: 'ifMage'
        },
        description: 'Mage Heroes have +3 HP.',
        flavorText: 'Arcane might.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_lockpicks',
        localImage: 'public/images/cards/items/item_lockpicks.jpg',
        name: 'Master Lockpicks',
        image: 'https://bossmonster.fandom.com/wiki/Master Lockpicks'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'skipTrapRoom',
            value: 1
        },
        description: 'Equipped Hero skips one Trap Room.',
        flavorText: 'Open sesame.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_helm_courage',
        localImage: 'public/images/cards/items/item_helm_courage.jpg',
        name: 'Helm of Courage',
        image: 'https://bossmonster.fandom.com/wiki/Helm of Courage'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'immuneToFear'
        },
        description: 'Equipped Hero cannot be sent back.',
        flavorText: 'No retreat.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_gauntlets_might',
        localImage: 'public/images/cards/items/item_gauntlets_might.jpg',
        name: 'Gauntlets of Might',
        image: 'https://bossmonster.fandom.com/wiki/Gauntlets of Might'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'bonusHP',
            value: 3,
            condition: 'ifFighter'
        },
        description: 'Fighter Heroes have +3 HP.',
        flavorText: 'Crushing grip.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_potion_invulnerability',
        localImage: 'public/images/cards/items/item_potion_invulnerability.jpg',
        name: 'Potion of Invulnerability',
        image: 'https://bossmonster.fandom.com/wiki/Potion of Invulnerability'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        consumable: true,
        ability: {
            trigger: 'onUse',
            effect: 'immuneToRoom',
            value: 1
        },
        description: 'Hero takes no damage from one Room (consumed).',
        flavorText: 'Drink up.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_holy_water',
        name: 'Holy Water',
        image: 'https://bossmonster.fandom.com/wiki/Holy Water'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        consumable: true,
        ability: {
            trigger: 'onUse',
            effect: 'destroyMonsterRoom'
        },
        description: 'Destroy one Monster Room (consumed).',
        flavorText: 'Blessed H2O.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_scroll_teleport',
        localImage: 'public/images/cards/items/item_scroll_teleport.jpg',
        name: 'Scroll of Teleportation',
        image: 'https://bossmonster.fandom.com/wiki/Scroll of Teleportation'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        consumable: true,
        ability: {
            trigger: 'onUse',
            effect: 'skipRooms',
            value: 2
        },
        description: 'Hero skips 2 Rooms (consumed).',
        flavorText: 'Poof!',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_bag_gold',
        localImage: 'public/images/cards/items/item_bag_gold.jpg',
        name: 'Bag of Gold',
        image: 'https://bossmonster.fandom.com/wiki/Bag of Gold'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'onSurvive',
            effect: 'penalty',
            value: 3,
            description: 'If Hero survives, Boss loses 3 Coins.'
        },
        description: 'If Hero survives, Boss loses 3 Coins.',
        flavorText: 'Shiny loot.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_dragon_scale',
        name: 'Dragon Scale Armor',
        image: 'https://bossmonster.fandom.com/wiki/Dragon Scale Armor'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'damageReduction',
            value: 2
        },
        description: 'Equipped Hero takes -2 damage from each Room.',
        flavorText: 'Forged from dragon hide.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_lucky_coin',
        name: 'Lucky Coin',
        image: 'https://bossmonster.fandom.com/wiki/Lucky Coin'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        ability: {
            trigger: 'onDeath',
            effect: 'coinFlip',
            heads: 'survive',
            headsHP: 1
        },
        description: 'When killed, flip coin. Heads: survive with 1 HP.',
        flavorText: 'Heads you live.',
        expansion: 'tools',
        quantity: 2
    },
    {
        id: 'item_resurrection_stone',
        localImage: 'public/images/cards/items/item_resurrection_stone.jpg',
        name: 'Resurrection Stone',
        image: 'https://bossmonster.fandom.com/wiki/Resurrection Stone'.replace(/\s/g, '_'),
        itemType: 'heroItem',
        equippedTo: 'hero',
        consumable: true,
        ability: {
            trigger: 'onDeath',
            effect: 'resurrect',
            hp: 3
        },
        description: 'When killed, return to life with 3 HP (consumed).',
        flavorText: 'Death denied.',
        expansion: 'tools',
        quantity: 2
    },

    // ========================================
    // IMPLEMENTS OF DESTRUCTION - BOSS ITEMS (20)
    // ========================================
    {
        id: 'item_skull_scepter',
        localImage: 'public/images/cards/items/item_skull_scepter.jpg',
        name: 'Skull Scepter',
        image: 'https://bossmonster.fandom.com/wiki/Skull Scepter'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'passive',
            effect: 'bonusDamageCleric',
            value: 1
        },
        description: '+1 damage to all Cleric Heroes.',
        flavorText: 'Dark authority.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_demon_crown',
        localImage: 'public/images/cards/items/item_demon_crown.jpg',
        name: 'Demon Crown',
        image: 'https://bossmonster.fandom.com/wiki/Demon Crown'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'onHeroKill',
            effect: 'drawSpell',
            value: 1
        },
        description: 'When a Hero dies, draw 1 Spell.',
        flavorText: 'Crown of hell.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_chaos_orb',
        name: 'Chaos Orb',
        image: 'https://bossmonster.fandom.com/wiki/Chaos Orb'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'passive',
            effect: 'roomDamageVariance',
            value: 2
        },
        description: 'Your Rooms deal +2 or -1 damage (random each time).',
        flavorText: 'Unpredictable power.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_vampire_fang',
        localImage: 'public/images/cards/items/item_vampire_fang.jpg',
        name: 'Vampire Fang Pendant',
        image: 'https://bossmonster.fandom.com/wiki/Vampire Fang Pendant'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'onHeroKillInMonster',
            effect: 'healWound',
            value: 1
        },
        description: 'When Hero dies in Monster Room, heal 1 Wound.',
        flavorText: 'Drink deep.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_trap_manual',
        localImage: 'public/images/cards/items/item_trap_manual.jpg',
        name: 'Trap Master\'s Manual',
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'passive',
            effect: 'bonusTrapDamage',
            value: 1
        },
        description: 'All your Trap Rooms deal +1 damage.',
        flavorText: 'Learn from the best.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_monster_whistle',
        name: 'Monster Whistle',
        image: 'https://bossmonster.fandom.com/wiki/Monster Whistle'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'passive',
            effect: 'bonusMonsterDamage',
            value: 1
        },
        description: 'All your Monster Rooms deal +1 damage.',
        flavorText: 'Call the beasts.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_soul_gem',
        localImage: 'public/images/cards/items/item_soul_gem.jpg',
        name: 'Soul Gem',
        image: 'https://bossmonster.fandom.com/wiki/Soul Gem'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'onHeroKill',
            effect: 'gainCoins',
            value: 1
        },
        description: 'When a Hero dies, gain 1 Coin.',
        flavorText: 'Precious souls.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_dark_tome',
        localImage: 'public/images/cards/items/item_dark_tome.jpg',
        name: 'Dark Tome',
        image: 'https://bossmonster.fandom.com/wiki/Dark Tome'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'onBuild',
            effect: 'drawSpell',
            value: 1
        },
        description: 'When you build a Room, draw 1 Spell.',
        flavorText: 'Forbidden knowledge.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_cursed_mirror',
        name: 'Cursed Mirror',
        image: 'https://bossmonster.fandom.com/wiki/Cursed Mirror'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'copyHeroTreasure'
        },
        description: 'Your Boss counts as having the same treasure as entering Heroes.',
        flavorText: 'Reflection of greed.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_blood_chalice',
        localImage: 'public/images/cards/items/item_blood_chalice.jpg',
        name: 'Blood Chalice',
        image: 'https://bossmonster.fandom.com/wiki/Blood Chalice'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'onHeroKill',
            effect: 'healOrDamage',
            value: 1
        },
        description: 'When Hero dies, heal 1 Wound OR deal 1 damage to any Hero.',
        flavorText: 'Drink or spill.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_necro_staff',
        localImage: 'public/images/cards/items/item_necro_staff.jpg',
        name: 'Necromancer\'s Staff',
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'onHeroKill',
            effect: 'retrieveRoom',
            value: 1
        },
        description: 'When Hero dies, retrieve 1 Room from discard.',
        flavorText: 'Command the dead.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_ring_domination',
        localImage: 'public/images/cards/items/item_ring_domination.jpg',
        name: 'Ring of Domination',
        image: 'https://bossmonster.fandom.com/wiki/Ring of Domination'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'oncePerTurn',
            effect: 'lureHero',
            value: 1,
            ignoreTreasure: true
        },
        description: 'Once per turn, lure 1 Hero ignoring treasure.',
        flavorText: 'Bend to my will.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_evil_eye',
        name: 'Evil Eye Amulet',
        image: 'https://bossmonster.fandom.com/wiki/Evil Eye Amulet'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'passive',
            effect: 'revealOpponentHand'
        },
        description: 'You can see all opponents\' hands.',
        flavorText: 'I see you.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_shadow_cloak',
        localImage: 'public/images/cards/items/item_shadow_cloak.jpg',
        name: 'Shadow Cloak',
        image: 'https://bossmonster.fandom.com/wiki/Shadow Cloak'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'passive',
            effect: 'immuneToSteal'
        },
        description: 'Your cards cannot be stolen.',
        flavorText: 'Hidden in darkness.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_chaos_blade',
        localImage: 'public/images/cards/items/item_chaos_blade.jpg',
        name: 'Chaos Blade',
        image: 'https://bossmonster.fandom.com/wiki/Chaos Blade'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'onHeroEnter',
            effect: 'damageHero',
            value: 1
        },
        description: 'Deal 1 damage to each Hero entering your dungeon.',
        flavorText: 'Slash of madness.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_gold_magnet',
        localImage: 'public/images/cards/items/item_gold_magnet.jpg',
        name: 'Gold Magnet',
        image: 'https://bossmonster.fandom.com/wiki/Gold Magnet'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'passive',
            effect: 'extraThiefTreasure',
            value: 1
        },
        description: 'Your Boss counts as having +1 Thief treasure.',
        flavorText: 'Bling bling.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_spell_focus',
        localImage: 'public/images/cards/items/item_spell_focus.jpg',
        name: 'Spell Focus Crystal',
        image: 'https://bossmonster.fandom.com/wiki/Spell Focus Crystal'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'passive',
            effect: 'extraMageTreasure',
            value: 1
        },
        description: 'Your Boss counts as having +1 Mage treasure.',
        flavorText: 'Arcane focus.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_holy_bane',
        name: 'Holybane Pendant',
        image: 'https://bossmonster.fandom.com/wiki/Holybane Pendant'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'passive',
            effect: 'extraClericTreasure',
            value: 1
        },
        description: 'Your Boss counts as having +1 Cleric treasure.',
        flavorText: 'Blasphemous charm.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_war_banner',
        localImage: 'public/images/cards/items/item_war_banner.jpg',
        name: 'War Banner',
        image: 'https://bossmonster.fandom.com/wiki/War Banner'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'passive',
            effect: 'extraFighterTreasure',
            value: 1
        },
        description: 'Your Boss counts as having +1 Fighter treasure.',
        flavorText: 'Rally the troops.',
        expansion: 'implements',
        quantity: 2
    },
    {
        id: 'item_doom_gauntlet',
        localImage: 'public/images/cards/items/item_doom_gauntlet.jpg',
        name: 'Doom Gauntlet',
        image: 'https://bossmonster.fandom.com/wiki/Doom Gauntlet'.replace(/\s/g, '_'),
        itemType: 'implement',
        equippedTo: 'boss',
        ability: {
            trigger: 'oncePerGame',
            effect: 'destroyRoom',
            target: 'any'
        },
        description: 'Once per game, destroy any Room.',
        flavorText: 'Snap!',
        expansion: 'implements',
        quantity: 2
    },

    // ========================================
    // HIDDEN SECRETS PACK ITEMS
    // ========================================
    {
        id: 'item_secret_map',
        localImage: 'public/images/cards/items/item_secret_map.jpg',
        name: 'Secret Map',
        image: 'https://bossmonster.fandom.com/wiki/Secret Map'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'onEquip',
            effect: 'revealDungeon',
            description: 'Hero\'s player may look at all face-down Rooms in any dungeon.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'drawRoom',
            value: 2,
            description: 'Draw 2 Room cards.'
        },
        description: 'Reveals hidden paths.',
        flavorText: 'X marks the spot.',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'item_shadow_cloak',
        localImage: 'public/images/cards/items/item_shadow_cloak.jpg',
        name: 'Shadow Cloak',
        image: 'https://bossmonster.fandom.com/wiki/Shadow Cloak'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'avoidFirstRoom',
            description: 'Hero takes no damage from the first Room entered.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'deactivateRoom',
            description: 'Deactivate a Room in any dungeon.'
        },
        description: 'Cloaked in darkness.',
        flavorText: 'Now you see me...',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'item_golden_idol',
        localImage: 'public/images/cards/items/item_golden_idol.jpg',
        name: 'Golden Idol',
        image: 'https://bossmonster.fandom.com/wiki/Golden Idol'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'onSurvive',
            effect: 'gainCoins',
            value: 3,
            description: 'If Hero survives, their player gains 3 Gold.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'gainCoins',
            value: 5,
            description: 'Gain 5 Gold.'
        },
        description: 'Worth its weight in gold.',
        flavorText: 'Priceless artifact.',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'item_enchanted_compass',
        localImage: 'public/images/cards/items/item_enchanted_compass.jpg',
        name: 'Enchanted Compass',
        image: 'https://bossmonster.fandom.com/wiki/Enchanted Compass'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'onEnterDungeon',
            effect: 'choosePath',
            description: 'Hero may skip one Room of their choice.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'lureHero',
            description: 'Lure a Hero from town.'
        },
        description: 'Points to treasure.',
        flavorText: 'Follow the needle.',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'item_tome_of_secrets',
        name: 'Tome of Secrets',
        image: 'https://bossmonster.fandom.com/wiki/Tome of Secrets'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'spellImmunity',
            description: 'Hero cannot be affected by Spell cards.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'drawSpell',
            value: 3,
            description: 'Draw 3 Spell cards.'
        },
        description: 'Ancient knowledge.',
        flavorText: 'Forbidden lore within.',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // BIG BOX ITEMS
    // ========================================
    {
        id: 'item_collectors_gem',
        localImage: 'public/images/cards/items/item_collectors_gem.jpg',
        name: 'Collector\'s Gem',
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'onSurvive',
            effect: 'drawCard',
            value: 2,
            description: 'If Hero survives, their player draws 2 cards.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'gainCoins',
            value: 3,
            description: 'Gain 3 Gold.'
        },
        description: 'A rare find.',
        flavorText: 'For collectors only.',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'item_big_box_blade',
        localImage: 'public/images/cards/items/item_big_box_blade.jpg',
        name: 'Big Box Blade',
        image: 'https://bossmonster.fandom.com/wiki/Big Box Blade'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'bonusHealth',
            value: 3,
            description: 'Hero has +3 Health.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'damageHero',
            value: 3,
            description: 'Deal 3 damage to a Hero.'
        },
        description: 'Oversized weapon.',
        flavorText: 'Compensating for something?',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'item_exclusive_emblem',
        localImage: 'public/images/cards/items/item_exclusive_emblem.jpg',
        name: 'Exclusive Emblem',
        image: 'https://bossmonster.fandom.com/wiki/Exclusive Emblem'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'onEnterDungeon',
            effect: 'revealTopRoom',
            description: 'Hero\'s player may look at the top card of the Room deck.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'searchDeck',
            deckType: 'room',
            description: 'Search the Room deck for any card.'
        },
        description: 'Mark of exclusivity.',
        flavorText: 'Limited edition.',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'item_backer_badge',
        localImage: 'public/images/cards/items/item_backer_badge.jpg',
        name: 'Backer Badge',
        image: 'https://bossmonster.fandom.com/wiki/Backer Badge'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'trapImmunity',
            description: 'Hero takes 1 less damage from Trap Rooms.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'drawCard',
            value: 2,
            description: 'Draw 2 cards.'
        },
        description: 'Thanks for backing!',
        flavorText: 'Proud supporter.',
        expansion: 'promo',
        quantity: 1
    },
    {
        id: 'item_anniversary_ring',
        localImage: 'public/images/cards/items/item_anniversary_ring.jpg',
        name: 'Anniversary Ring',
        image: 'https://bossmonster.fandom.com/wiki/Anniversary Ring'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'onKill',
            effect: 'returnToTown',
            description: 'When killed, Hero returns to town instead of score pile.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'healWound',
            value: 1,
            description: 'Convert 1 Wound to a Soul.'
        },
        description: 'Ten years strong.',
        flavorText: 'Celebrating a decade.',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // DUNGEON KART ITEM
    // ========================================
    {
        id: 'item_turbo_kart',
        localImage: 'public/images/cards/items/item_turbo_kart.jpg',
        name: 'Turbo Kart',
        image: 'https://bossmonster.fandom.com/wiki/Turbo Kart'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'speedBoost',
            description: 'Hero skips every other Room.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'gainCoins',
            value: 2,
            description: 'Gain 2 Gold.'
        },
        description: 'Zoom through dungeons!',
        flavorText: 'Vroom vroom!',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // SUPER BOSS MONSTER ITEMS
    // ========================================
    {
        id: 'item_super_sword',
        name: 'Super Sword',
        image: 'https://bossmonster.fandom.com/wiki/Super Sword'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'bonusHealth',
            value: 4,
            description: 'Hero has +4 Health.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'damageHero',
            value: 4,
            description: 'Deal 4 damage to a Hero.'
        },
        description: 'Ultimate weapon.',
        flavorText: 'It\'s over 9000!',
        expansion: 'super',
        quantity: 2
    },
    {
        id: 'item_mega_shield',
        localImage: 'public/images/cards/items/item_mega_shield.jpg',
        name: 'Mega Shield',
        image: 'https://bossmonster.fandom.com/wiki/Mega Shield'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'damageReduction',
            value: 2,
            description: 'Hero takes 2 less damage from each Room.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'healWound',
            value: 2,
            description: 'Convert 2 Wounds to Souls.'
        },
        description: 'Ultimate defense.',
        flavorText: 'Blocked!',
        expansion: 'super',
        quantity: 2
    },
    {
        id: 'item_power_glove',
        localImage: 'public/images/cards/items/item_power_glove.jpg',
        name: 'Power Glove',
        image: 'https://bossmonster.fandom.com/wiki/Power Glove'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'onSurvive',
            effect: 'damageRoom',
            value: 2,
            description: 'If Hero survives, add 2 damage counters to a Room.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'destroyRoom',
            target: 'opponent',
            description: 'Destroy a Room in another dungeon.'
        },
        description: 'It\'s so bad.',
        flavorText: 'I love the Power Glove.',
        expansion: 'super',
        quantity: 2
    },
    {
        id: 'item_bonus_star',
        localImage: 'public/images/cards/items/item_bonus_star.jpg',
        name: 'Bonus Star',
        image: 'https://bossmonster.fandom.com/wiki/Bonus Star'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'passive',
            effect: 'invincibility',
            duration: 1,
            description: 'Hero is immune to the first Room\'s damage.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'drawCard',
            value: 3,
            description: 'Draw 3 cards.'
        },
        description: 'Temporary invincibility!',
        flavorText: 'Star power!',
        expansion: 'super',
        quantity: 2
    },
    {
        id: 'item_1up_mushroom',
        localImage: 'public/images/cards/items/item_1up_mushroom.jpg',
        name: '1-Up Mushroom',
        image: 'https://bossmonster.fandom.com/wiki/1-Up Mushroom'.replace(/\s/g, '_'),
        itemType: 'item',
        equippedTo: 'hero',
        ability: {
            trigger: 'onKill',
            effect: 'resurrect',
            description: 'When killed, Hero returns to town with full health.'
        },
        bossAbility: {
            trigger: 'onClaim',
            effect: 'healWound',
            value: 1,
            description: 'Convert 1 Wound to a Soul.'
        },
        description: 'Extra life!',
        flavorText: 'Ba-ding!',
        expansion: 'super',
        quantity: 2
    }
];

// Export
if (typeof window !== 'undefined') {
    window.ITEM_CARDS = ITEMS;
}

if (typeof module !== 'undefined') {
    module.exports = ITEMS;
}

