/**
 * Boss Monster - Complete Card Database Index
 * Combines all card modules into a unified database
 * 
 * Total Cards: ~700+
 * - Bosses: ~60 cards
 * - Monster Rooms: ~100+ cards
 * - Trap Rooms: ~100+ cards
 * - Heroes: ~120+ cards
 * - Spells: ~100+ cards
 * - Minibosses: ~54 cards
 * - Items: ~44 cards
 */

// Card type constants
const CARD_TYPE = {
    BOSS: 'boss',
    ROOM: 'room',
    HERO: 'hero',
    SPELL: 'spell',
    MINIBOSS: 'miniboss',
    ITEM: 'item'
};

// Room type constants
const ROOM_TYPE = {
    MONSTER: 'monster',
    TRAP: 'trap'
};

// Treasure type constants
const TREASURE = {
    FIGHTER: 'fighter',
    MAGE: 'mage',
    THIEF: 'thief',
    CLERIC: 'cleric',
    EXPLORER: 'explorer'
};

// Hero type constants
const HERO_TYPE = {
    ORDINARY: 'ordinary',
    EPIC: 'epic',
    EXPLORER: 'explorer'
};

// Expansion constants
const EXPANSION = {
    BASE: 'base',
    NEXT_LEVEL: 'nextLevel',
    MINIBOSSES: 'minibosses',
    SUPER: 'super',
    CRASH_LANDING: 'crashLanding',
    VAULT: 'vault',
    ANNIVERSARY: 'anniversary',
    TOOLS: 'tools',
    IMPLEMENTS: 'implements',
    PAPER_PIXELS: 'paperPixels'
};

// Effect type constants for ability system
const EFFECT = {
    DRAW_SPELL: 'drawSpell',
    DRAW_ROOM: 'drawRoom',
    DRAW_MINIBOSS: 'drawMiniboss',
    DRAW_ITEM: 'drawItem',
    DRAW_ANY: 'drawAny',
    DAMAGE_HERO: 'damageHero',
    KILL_HERO: 'killHero',
    HEAL_WOUND: 'healWound',
    GAIN_COINS: 'gainCoins',
    STEAL_COINS: 'stealCoins',
    LURE_HERO: 'lureHero',
    SEND_BACK: 'sendBack',
    DESTROY_ROOM: 'destroyRoom',
    DEACTIVATE_ROOM: 'deactivateRoom',
    ADD_DAMAGE_COUNTER: 'addDamageCounter',
    RETRIEVE_FROM_DISCARD: 'retrieveFromDiscard',
    SEARCH_DECK: 'searchDeck',
    STEAL_CARD: 'stealCard',
    OPPONENTS_DISCARD: 'opponentsDiscard',
    CANCEL_SPELL: 'cancelSpell',
    COPY_ROOM: 'copyRoom',
    SWAP_ROOMS: 'swapRooms',
    MOVE_HERO: 'moveHero',
    BONUS_DAMAGE: 'bonusDamage',
    EXTRA_BUILD: 'extraBuild',
    FREE_PROMOTION: 'freePromotion'
};

/**
 * Card Database - unified object containing all cards
 */
const CardDatabase = {
    // Constants
    CARD_TYPE,
    ROOM_TYPE,
    TREASURE,
    HERO_TYPE,
    EXPANSION,
    EFFECT,
    
    // Card arrays (populated by individual module files)
    bosses: [],
    monsterRooms: [],
    trapRooms: [],
    heroes: [],
    spells: [],
    minibosses: [],
    items: [],
    
    /**
     * Initialize the database by loading all card modules
     */
    init() {
        // In browser, cards are loaded via script tags
        if (typeof window !== 'undefined') {
            this.bosses = window.BOSS_CARDS || [];
            this.monsterRooms = window.MONSTER_ROOMS || [];
            this.trapRooms = window.TRAP_ROOMS || [];
            this.heroes = window.HERO_CARDS || [];
            this.spells = window.SPELL_CARDS || [];
            this.minibosses = window.MINIBOSS_CARDS || [];
            this.items = window.ITEM_CARDS || [];
        }
        
        console.log(`Card Database initialized with ${this.getTotalCount()} cards`);
        return this;
    },
    
    /**
     * Get all rooms (monster + trap)
     */
    getAllRooms() {
        return [...this.monsterRooms, ...this.trapRooms];
    },
    
    /**
     * Get total card count
     */
    getTotalCount() {
        return this.bosses.length + 
               this.monsterRooms.length + 
               this.trapRooms.length + 
               this.heroes.length + 
               this.spells.length + 
               this.minibosses.length + 
               this.items.length;
    },
    
    /**
     * Get card by ID
     */
    getCardById(id) {
        const allCards = [
            ...this.bosses,
            ...this.monsterRooms,
            ...this.trapRooms,
            ...this.heroes,
            ...this.spells,
            ...this.minibosses,
            ...this.items
        ];
        return allCards.find(card => card.id === id);
    },
    
    /**
     * Get cards by expansion
     */
    getCardsByExpansion(expansion) {
        const allCards = [
            ...this.bosses,
            ...this.monsterRooms,
            ...this.trapRooms,
            ...this.heroes,
            ...this.spells,
            ...this.minibosses,
            ...this.items
        ];
        return allCards.filter(card => card.expansion === expansion);
    },
    
    /**
     * Get cards by type
     */
    getCardsByType(type) {
        switch(type) {
            case CARD_TYPE.BOSS: return this.bosses;
            case CARD_TYPE.ROOM: return this.getAllRooms();
            case CARD_TYPE.HERO: return this.heroes;
            case CARD_TYPE.SPELL: return this.spells;
            case CARD_TYPE.MINIBOSS: return this.minibosses;
            case CARD_TYPE.ITEM: return this.items;
            default: return [];
        }
    },
    
    /**
     * Get rooms by treasure type
     */
    getRoomsByTreasure(treasure) {
        return this.getAllRooms().filter(room => {
            if (Array.isArray(room.treasure)) {
                return room.treasure.includes(treasure);
            }
            return room.treasure === treasure;
        });
    },
    
    /**
     * Get heroes by class
     */
    getHeroesByClass(heroClass) {
        return this.heroes.filter(hero => hero.class === heroClass);
    },
    
    /**
     * Get ordinary rooms only
     */
    getOrdinaryRooms() {
        return this.getAllRooms().filter(room => !room.isAdvanced);
    },
    
    /**
     * Get advanced rooms only
     */
    getAdvancedRooms() {
        return this.getAllRooms().filter(room => room.isAdvanced);
    },
    
    /**
     * Get ordinary heroes only
     */
    getOrdinaryHeroes() {
        return this.heroes.filter(hero => hero.heroType === HERO_TYPE.ORDINARY);
    },
    
    /**
     * Get epic heroes only
     */
    getEpicHeroes() {
        return this.heroes.filter(hero => hero.heroType === HERO_TYPE.EPIC);
    },
    
    /**
     * Get explorer heroes (Crash Landing)
     */
    getExplorerHeroes() {
        return this.heroes.filter(hero => hero.heroType === HERO_TYPE.EXPLORER);
    },
    
    /**
     * Get minibosses by level
     */
    getMinibossesByLevel(level) {
        return this.minibosses.filter(mb => mb.level === level);
    },
    
    /**
     * Get hero items
     */
    getHeroItems() {
        return this.items.filter(item => item.itemType === 'heroItem');
    },
    
    /**
     * Get boss implements
     */
    getBossImplements() {
        return this.items.filter(item => item.itemType === 'implement');
    },
    
    /**
     * Get expansion info
     */
    getExpansionStats() {
        const stats = {};
        Object.values(EXPANSION).forEach(exp => {
            stats[exp] = this.getCardsByExpansion(exp).length;
        });
        return stats;
    },
    
    /**
     * Shuffle an array (Fisher-Yates)
     */
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    /**
     * Create a deck of cards
     */
    createDeck(cardType, options = {}) {
        let cards = this.getCardsByType(cardType);
        
        // Filter by expansion if specified
        if (options.expansions && options.expansions.length > 0) {
            cards = cards.filter(card => options.expansions.includes(card.expansion));
        }
        
        // Filter by additional criteria
        if (options.filter) {
            cards = cards.filter(options.filter);
        }
        
        // Shuffle if requested
        if (options.shuffle !== false) {
            cards = this.shuffle(cards);
        }
        
        return cards;
    }
};

// Export for browser
if (typeof window !== 'undefined') {
    window.CardDatabase = CardDatabase;
    window.CARD_TYPE = CARD_TYPE;
    window.ROOM_TYPE = ROOM_TYPE;
    window.TREASURE = TREASURE;
    window.HERO_TYPE = HERO_TYPE;
    window.EXPANSION = EXPANSION;
    window.EFFECT = EFFECT;
}

// Export for Node.js
if (typeof module !== 'undefined') {
    module.exports = {
        CardDatabase,
        CARD_TYPE,
        ROOM_TYPE,
        TREASURE,
        HERO_TYPE,
        EXPANSION,
        EFFECT
    };
}

