/**
 * Boss Monster - Hero Cards Database
 * All heroes from all expansions: Ordinary, Epic, and Explorer
 */

const HEROES = [
    // ========================================
    // BASE GAME ORDINARY HEROES (20)
    // ========================================
    // FIGHTERS
    
        flavorText: 'Dragons tremble at his name.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Supreme sorcerer of the realm.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Silent. Deadly. Professional.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Martyr in the making.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Red is his color. And yours.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Master of the mystic arts.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Steals more than just treasure.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Destiny incarnate.',
        expansion: 'base',
        quantity: 3
    },

    // ========================================
    // THE NEXT LEVEL HEROES (20)
    // ========================================
    
        flavorText: 'Unstoppable force.',
        expansion: 'nextLevel',
        quantity: 3
    },
    
        flavorText: 'Burn the witch!',
        expansion: 'nextLevel',
        quantity: 3
    },
    
        flavorText: 'Time is on his side.',
        expansion: 'nextLevel',
        quantity: 3
    },
    
        flavorText: 'Between dimensions.',
        expansion: 'nextLevel',
        quantity: 3
    },
    
        flavorText: 'The perfect heist.',
        expansion: 'nextLevel',
        quantity: 3
    },
    
        flavorText: 'Lord of darkness.',
        expansion: 'nextLevel',
        quantity: 3
    },
    
        flavorText: 'Death is not the end.',
        expansion: 'nextLevel',
        quantity: 3
    },
    
        flavorText: 'Divine retribution.',
        expansion: 'nextLevel',
        quantity: 3
    },

    // ========================================
    // SUPER BOSS MONSTER HEROES (20)
    // ========================================
    
        flavorText: 'Are you not entertained?',
        expansion: 'super',
        quantity: 3
    },
    
        flavorText: 'Master of elements.',
        expansion: 'super',
        quantity: 3
    },
    
        flavorText: 'X marks the spot.',
        expansion: 'super',
        quantity: 3
    },
    
        flavorText: 'God walks among us.',
        expansion: 'super',
        quantity: 3
    },

    // ========================================
    // CRASH LANDING EXPLORER HEROES (16)
    // ========================================
    
        flavorText: 'Leader of the expedition.',
        expansion: 'crashLanding',
        quantity: 3
    },
    
        flavorText: 'Half man, half machine.',
        expansion: 'crashLanding',
        quantity: 3
    },
    
        flavorText: 'Mother of all aliens.',
        expansion: 'crashLanding',
        quantity: 3
    },
    
        flavorText: 'Time is relative.',
        expansion: 'crashLanding',
        quantity: 3
    },

    // ========================================
    // RISE OF MINIBOSSES HEROES (12)
    // ========================================
    
        flavorText: 'Hunting the hunters.',
        expansion: 'minibosses',
        quantity: 3
    },
    
        flavorText: 'Breaking spells and bones.',
        expansion: 'minibosses',
        quantity: 3
    },

    // ========================================
    // VAULT OF VILLAINS HEROES (12)
    // ========================================
    
        flavorText: 'Slayer of legends.',
        expansion: 'vault',
        quantity: 3
    },
    
        flavorText: 'Nothing is hidden.',
        expansion: 'vault',
        quantity: 3
    },
    
        flavorText: 'These belong in a museum!',
        expansion: 'vault',
        quantity: 3
    },
    
        flavorText: 'Divine vengeance.',
        expansion: 'vault',
        quantity: 3
    },

    // ========================================
    // ADDITIONAL HEROES - BASE GAME (20 more)
    // ========================================
    
        flavorText: 'Pain makes him stronger.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'War goddess incarnate.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Touched by the void.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Time is on her side.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Walks through walls.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Dancing with shadows.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Supreme holy authority.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Light reveals all.',
        expansion: 'base',
        quantity: 3
    },
    
        flavorText: 'Cannot be killed... easily.',
        expansion: 'nextLevel',
        quantity: 3
    },
    
        flavorText: 'Magic mirror.',
        expansion: 'nextLevel',
        quantity: 3
    },
    
        flavorText: 'Steals everything.',
        expansion: 'nextLevel',
        quantity: 3
    },
    
        flavorText: 'Holy devastation.',
        expansion: 'nextLevel',
        quantity: 3
    },
    
        flavorText: 'Never fights alone.',
        expansion: 'super',
        quantity: 3
    },
    
        flavorText: 'Magic shields all.',
        expansion: 'super',
        quantity: 3
    },
    
        flavorText: 'Master of thieves.',
        expansion: 'super',
        quantity: 3
    },
    
        flavorText: 'Sees the future.',
        expansion: 'super',
        quantity: 3
    },

    // ========================================
    // ADDITIONAL EXPLORERS (20 more)
    // ========================================
    
        flavorText: 'Lead the charge.',
        expansion: 'crashLanding',
        quantity: 3
    },
    
        flavorText: 'Mind over matter.',
        expansion: 'crashLanding',
        quantity: 3
    },
    
        flavorText: 'Armored to the teeth.',
        expansion: 'crashLanding',
        quantity: 3
    },
    
        flavorText: 'Mother of the swarm.',
        expansion: 'crashLanding',
        quantity: 3
    },

    // ========================================
    // HIDDEN HEROES EDITION VARIANTS (40 unique)
    // ========================================
    
        flavorText: 'I have stolen princesses back from sleeping barrow kings.',
        expansion: 'promo',
        quantity: 1
    },
    
        flavorText: 'She had a face like a flower.',
        expansion: 'promo',
        quantity: 1
    },
    
        flavorText: 'Reshi, what do you know of the Fae?',
        expansion: 'promo',
        quantity: 1
    },
    
        flavorText: 'The Underthing holds many secrets.',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // DRAGON PRINCE HEROES
    // ========================================
    
        flavorText: 'Moonshadow elf assassin.',
        expansion: 'promo',
        quantity: 1
    },
    
        flavorText: 'Dark magic has its uses.',
        expansion: 'promo',
        quantity: 1
    },
    
        flavorText: 'The Dragon Prince.',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // CHRISTMAS PROMO HERO
    // ========================================
    
        flavorText: 'He knows if you\'ve been naughty.',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // SUPER BOSS MONSTER EXTRA HEROES
    // ========================================
    {
        id: 'hero_super_barbarian',
        localImage: 'public/images/cards/heroes/hero_super_barbarian.jpg',
        name: 'Barbarian King',
        image: 'https://bossmonster.fandom.com/wiki/Barbarian King'.replace(/\s/g, '_'),
        heroType: 'ordinary',
        class: 'fighter',
        health: 8,
        treasure: 'fighter',
        ability: null,
        flavorText: 'RAAAARGH!',
        expansion: 'super',
        quantity: 3
    },
    {
        id: 'hero_super_archmage',
        localImage: 'public/images/cards/heroes/hero_super_archmage.jpg',
        name: 'Archmage Supreme',
        image: 'https://bossmonster.fandom.com/wiki/Archmage Supreme'.replace(/\s/g, '_'),
        heroType: 'ordinary',
        class: 'mage',
        health: 6,
        treasure: 'mage',
        ability: null,
        flavorText: 'Master of the arcane.',
        expansion: 'super',
        quantity: 3
    },
    
        flavorText: 'Undefeated champion.',
        expansion: 'super',
        quantity: 1
    },
    
        flavorText: 'Undead beware.',
        expansion: 'super',
        quantity: 1
    },
    
        flavorText: 'Magic means nothing to her.',
        expansion: 'super',
        quantity: 1
    },
    
        flavorText: 'Master of shadows.',
        expansion: 'super',
        quantity: 1
    },

    // ========================================
    // 10TH ANNIVERSARY HEROES
    // ========================================
    
        flavorText: 'Where it all began.',
        expansion: 'tenthAnniversary',
        quantity: 1
    },

    // ========================================
    // BIG BOX HEROES
    // ========================================
    
        flavorText: 'Stories are told of his deeds.',
        expansion: 'promo',
        quantity: 1
    },

    // ========================================
    // MORE HIDDEN HEROES VARIANTS
    // ========================================
    
        flavorText: 'The hidden hero rises.',
        expansion: 'hiddenHeroes',
        quantity: 1
    },
    
        flavorText: 'Sees all secrets.',
        expansion: 'hiddenHeroes',
        quantity: 1
    },
    
        flavorText: 'Death is not the end.',
        expansion: 'hiddenHeroes',
        quantity: 1
    },
    
        flavorText: 'Unseen, unstoppable.',
        expansion: 'hiddenHeroes',
        quantity: 1
    },

    // ========================================
    // MORE PROMO HEROES
    // ========================================
    
        flavorText: 'Maximum power.',
        expansion: 'super',
        quantity: 1
    },
    
        flavorText: 'Ultimate wisdom.',
        expansion: 'super',
        quantity: 1
    },

    // ========================================
    // MORE 10TH ANNIVERSARY HEROES
    // ========================================
    
        flavorText: 'The champion of champions.',
        expansion: 'tenthAnniversary',
        quantity: 1
    },

    // ========================================
    // FINAL PROMO/VARIANT HEROES (39 more to reach 749)
    // ========================================
    
        flavorText: 'The ultimate hero.',
        expansion: 'promo',
        quantity: 1
    },
    
        flavorText: 'The hero to end all heroes.',
        expansion: 'promo',
        quantity: 1
    }
];

// Export
if (typeof window !== 'undefined') {
    window.HERO_CARDS = HEROES;
}

if (typeof module !== 'undefined') {
    module.exports = HEROES;
}

