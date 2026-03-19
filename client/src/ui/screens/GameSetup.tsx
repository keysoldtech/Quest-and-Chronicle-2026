import { useState, useMemo } from 'react';
import type { GameConfig, BossCard, Expansion } from '../../data/types';
import { CardDatabase } from '../../data/database';
import { BossCardView } from '../components/Card';
import { useGameStore } from '../../store/gameStore';

const ALL_EXPANSIONS: { id: Expansion; label: string }[] = [
  { id: 'base', label: 'Base Game' },
  { id: 'nextLevel', label: 'The Next Level' },
  { id: 'super', label: 'Super Boss Monster' },
  { id: 'minibosses', label: 'Rise of the Minibosses' },
  { id: 'crashLanding', label: 'Crash Landing' },
  { id: 'vault', label: 'Vault of Villains' },
  { id: 'tools', label: 'Tools of Hero-Kind' },
  { id: 'implements', label: 'Implements of Destruction' },
  { id: 'tenthAnniversary', label: '10th Anniversary' },
];

export function GameSetup() {
  const startGame = useGameStore(s => s.startGame);
  const [playerCount, setPlayerCount] = useState(2);
  const [selectedBoss, setSelectedBoss] = useState<BossCard | null>(null);
  const [expansions, setExpansions] = useState<Expansion[]>(['base', 'nextLevel']);
  const [modules, setModules] = useState({
    coins: false,
    minibosses: false,
    minions: false,
    hybridHeroes: false,
    darkHeroes: false,
    explorers: false,
    items: false,
    dice: false,
  });

  const db = useMemo(() => new CardDatabase(expansions), [expansions]);
  const availableBosses = useMemo(() => {
    return db.bosses.sort((a, b) => a.name.localeCompare(b.name));
  }, [db]);

  const toggleExpansion = (exp: Expansion) => {
    setExpansions(prev => {
      if (prev.includes(exp)) {
        if (prev.length <= 1) return prev;
        return prev.filter(e => e !== exp);
      }
      return [...prev, exp];
    });
    setSelectedBoss(null);
  };

  const toggleModule = (key: keyof typeof modules) => {
    setModules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStart = () => {
    if (!selectedBoss) return;

    const aiBosses = db.getRandomBosses(playerCount + 2)
      .filter(b => b.id !== selectedBoss.id)
      .slice(0, playerCount - 1);

    if (aiBosses.length < playerCount - 1) return;

    const config: GameConfig = {
      playerCount,
      heroMode: 'h1',
      expansions,
      modules,
      woundLimit: 5,
      soulTarget: 10,
    };

    startGame(config, selectedBoss, aiBosses);
  };

  return (
    <div className="setup-screen">
      <div className="setup-header">
        <h1>Quest & Chronicle</h1>
        <p className="setup-subtitle">Build your dungeon. Lure heroes. Claim their souls.</p>
      </div>

      <div className="setup-sections">
        {/* Player Count */}
        <div className="setup-section">
          <h3>Players</h3>
          <div className="player-count-buttons">
            {[2, 3, 4].map(n => (
              <button
                key={n}
                className={`btn ${playerCount === n ? 'btn-active' : ''}`}
                onClick={() => setPlayerCount(n)}
              >
                {n}P
              </button>
            ))}
          </div>
        </div>

        {/* Expansions */}
        <div className="setup-section">
          <h3>Expansions</h3>
          <div className="expansion-toggles">
            {ALL_EXPANSIONS.map(exp => (
              <button
                key={exp.id}
                className={`btn btn-sm ${expansions.includes(exp.id) ? 'btn-active' : ''}`}
                onClick={() => toggleExpansion(exp.id)}
              >
                {exp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div className="setup-section">
          <h3>Modules</h3>
          <div className="module-toggles">
            {([
              ['coins', 'Coins', 'Currency for advanced abilities'],
              ['minibosses', 'Minibosses', 'Attach minibosses to rooms for bonus damage'],
              ['items', 'Items', 'Heroes carry items, bosses claim them'],
              ['explorers', 'Explorers', '5th treasure type with alien heroes'],
              ['dice', 'Dice', 'Random damage rolls and rerolls'],
            ] as const).map(([key, label, desc]) => (
              <label key={key} className="module-toggle" title={desc}>
                <input
                  type="checkbox"
                  checked={modules[key]}
                  onChange={() => toggleModule(key)}
                />
                <span className="module-label">{label}</span>
                <span className="module-desc">{desc}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Boss Selection */}
      <div className="setup-boss-select">
        <h2>Select Your Boss ({availableBosses.length} available)</h2>
        <div className="boss-grid">
          {availableBosses.map(boss => (
            <BossCardView
              key={boss.id}
              boss={boss}
              onClick={() => setSelectedBoss(boss)}
              selected={selectedBoss?.id === boss.id}
            />
          ))}
        </div>
      </div>

      <div className="setup-actions">
        <button
          className="btn btn-primary btn-large"
          onClick={handleStart}
          disabled={!selectedBoss}
        >
          {selectedBoss ? `Play as ${selectedBoss.name}` : 'Select a Boss to begin'}
        </button>
      </div>
    </div>
  );
}
