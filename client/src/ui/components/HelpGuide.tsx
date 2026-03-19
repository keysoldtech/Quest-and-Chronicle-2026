import { useState } from 'react';

const GUIDE_PAGES = [
  {
    title: 'Overview',
    content: `You are a dungeon Boss! Build rooms to lure heroes, deal damage, and collect their souls.
    
**Win:** Collect 10 Souls.
**Lose:** Take 5 Wounds (hero survives your dungeon).

Each round has 5 phases: Town → Build → Bait → Adventure → End.`,
  },
  {
    title: 'Building Rooms',
    content: `Each turn, you may build ONE room from your hand.

**Ordinary Rooms** (silver) can go in any empty slot or replace any existing room.
**Advanced Rooms** (gold border) must be built ON TOP of a room that shares a matching treasure type.

Your dungeon can have up to 5 rooms. Position matters — heroes enter Room #1 first and work toward the Boss.`,
  },
  {
    title: 'Treasure & Luring',
    content: `Each room has a treasure icon: ⚔ Fighter, ★ Mage, ◆ Thief, ✚ Cleric, ☀ Explorer.

Heroes are attracted to the dungeon with the MOST matching treasure. If two dungeons tie, the hero stays in town (and you need to out-build your opponent).

Your Boss card also provides 1 treasure of its type. Plan your rooms to match the heroes you want to lure!`,
  },
  {
    title: 'Adventure Phase',
    content: `Heroes enter your dungeon at Room #1 and walk through each room toward the Boss.

Each room deals its damage to the hero. If the hero's HP reaches 0, it DIES and you gain a Soul (or 2 for Epic heroes).

If the hero survives all rooms, you take a Wound (or 2 for Epic heroes).

Room abilities trigger as heroes enter or die in them.`,
  },
  {
    title: 'Spells',
    content: `Spells are instant effects you play from your hand. Each spell has a phase restriction:

🔨 **Build** — play during the build phase
⚔ **Adventure** — play during bait/adventure
🌟 **Bait** — play during the bait phase
★ **Any** — play anytime

Spells resolve in a stack (last played, first resolved). Counterspell can cancel other spells!`,
  },
  {
    title: 'Boss Level-Up',
    content: `When your dungeon reaches 5 rooms for the first time, your Boss levels up!

Each Boss has a unique level-up ability — some are one-time effects, some are permanent passives, and some activate once per turn.

Check your Boss card to plan around their ability.`,
  },
  {
    title: 'Coins (Module)',
    content: `When the Coins module is active:

• Gain 1 coin at the start of each turn
• Some room abilities cost or grant coins
• Spend coins to promote Minibosses
• Some spells grant or steal coins`,
  },
  {
    title: 'Minibosses (Module)',
    content: `When the Miniboss module is active:

• Draw 1 Miniboss card per turn
• Attach a Miniboss to a room when you build it
• Minibosses add bonus damage to their room
• Promote Minibosses by spending coins (Level 1 → 2 → 3)
• Higher levels unlock stronger abilities`,
  },
  {
    title: 'Items (Module)',
    content: `When the Items module is active:

• Items attach to heroes in town
• Heroes carry items through your dungeon (may grant HP, skip rooms, or reduce damage)
• If you KILL a hero with an item, you claim it (face-up, usable once as a spell)
• If a hero SURVIVES, the item goes to your pile face-down (unusable)`,
  },
  {
    title: 'Tips & Strategy',
    content: `• **Diversify treasure** early to lure different hero types
• **Stack damage** in your first rooms to kill heroes before they reach the Boss
• **Save spells** for the adventure phase when they're most impactful
• **Watch your opponent's treasure** — if they have more of a type, those heroes go to them
• **Advanced rooms** are powerful but require treasure matching — plan ahead
• **Boss synergies** — build rooms that match your Boss's level-up ability`,
  },
];

interface HelpGuideProps {
  onClose: () => void;
}

export function HelpGuide({ onClose }: HelpGuideProps) {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPages = searchQuery
    ? GUIDE_PAGES.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : GUIDE_PAGES;

  const currentPage = filteredPages[page] ?? filteredPages[0];
  if (!currentPage) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="guide-modal" onClick={e => e.stopPropagation()}>
        <div className="guide-header">
          <h2>Game Guide</h2>
          <input
            className="guide-search"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(0); }}
          />
          <button className="btn guide-close" onClick={onClose}>✕</button>
        </div>

        <div className="guide-body">
          <div className="guide-sidebar">
            {filteredPages.map((p, i) => (
              <button
                key={p.title}
                className={`guide-toc-item ${i === page ? 'guide-toc-active' : ''}`}
                onClick={() => setPage(i)}
              >
                {p.title}
              </button>
            ))}
          </div>
          <div className="guide-content">
            <h3>{currentPage.title}</h3>
            <div className="guide-text">
              {currentPage.content.split('\n').map((line, i) => (
                <p key={i}>{formatGuideLine(line)}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="guide-footer">
          <button className="btn" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>
            ← Previous
          </button>
          <span className="guide-page-num">{page + 1} / {filteredPages.length}</span>
          <button className="btn" onClick={() => setPage(Math.min(filteredPages.length - 1, page + 1))} disabled={page >= filteredPages.length - 1}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

function formatGuideLine(line: string): React.ReactNode {
  // Bold **text**
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
