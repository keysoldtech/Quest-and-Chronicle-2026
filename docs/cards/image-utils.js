/**
 * Boss Monster Card Image Utilities
 * Generates wiki URLs and local image paths for cards
 */

// Convert card name to wiki URL slug
function toWikiSlug(name) {
    return name
        .replace(/ /g, '_')
        .replace(/'/g, "'")
        .replace(/&/g, '%26');
}

// Get the wiki page URL for a card
function getWikiUrl(cardName) {
    return `https://bossmonster.fandom.com/wiki/${encodeURIComponent(toWikiSlug(cardName))}`;
}

// Get local image path for a card
function getLocalImagePath(cardId, cardType) {
    // Try .jpg first (most downloaded images are .jpg), fallback to .png
    return `images/cards/${cardType}/${cardId}.jpg`;
}

// Card type to folder mapping
const CARD_TYPE_FOLDERS = {
    boss: 'bosses',
    room: 'rooms',
    hero: 'heroes',
    spell: 'spells',
    miniboss: 'minibosses',
    item: 'items'
};

// Generate image data for a card
function getCardImageData(card) {
    // Determine card type based on properties
    let cardType = 'boss'; // default
    
    if (card.roomType) {
        cardType = 'room';
    } else if (card.heroType) {
        cardType = 'hero';
    } else if (card.spellType || card.phase) {
        cardType = 'spell';
    } else if (card.itemType) {
        cardType = 'item';
    } else if (card.level !== undefined && card.xp === undefined) {
        cardType = 'miniboss';
    }
    
    const folder = CARD_TYPE_FOLDERS[cardType];
    
    return {
        wikiUrl: getWikiUrl(card.name),
        localPath: `images/cards/${folder}/${card.id}.jpg`,
        placeholderPath: `images/cards/placeholder-${cardType}.png`
    };
}

// Export
if (typeof window !== 'undefined') {
    window.CardImageUtils = {
        toWikiSlug,
        getWikiUrl,
        getLocalImagePath,
        getCardImageData,
        CARD_TYPE_FOLDERS
    };
}

if (typeof module !== 'undefined') {
    module.exports = {
        toWikiSlug,
        getWikiUrl,
        getLocalImagePath,
        getCardImageData,
        CARD_TYPE_FOLDERS
    };
}

