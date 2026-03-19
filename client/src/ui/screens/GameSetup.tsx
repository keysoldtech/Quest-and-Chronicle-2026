import { useState, useMemo } from 'react';
import type { GameConfig, BossCard, Expansion } from '../../data/types';
import { CardDatabase } from '../../data/database';
import { BossCardView } from '../components/Card';
import { useGameStore } from '../../store/gameStore';

const DEFAULT_EXPANSIONS: Expansion[] = ['base', 'nextLevel'];

export function GameSetup() {
  const startGame = useGameStore(s => s.startGame);
  const [playerCount, setPlayerCount] = useState(2);
  const [selectedBoss, setSelectedBoss] = useState<BossCard | null>(null);
  const [expansions] = useState<Expansion[]>(DEFAULT_EXPANSIONS);

  const db = useMemo(() => new CardDatabase(expansions), [expansions]);
  const availableBosses = useMemo(() => {
    return db.bosses.sort((a, b) => a.name.localeCompare(b.name));
  }, [db]);

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
      modules: {
        coins: false,
        minibosses: false,
        minions: false,
        hybridHeroes: false,
        darkHeroes: false,
        explorers: false,
        items: false,
        dice: false,
      },
      woundLimit: 5,
      soulTarget: 10,
    };

    startGame(config, selectedBoss, aiBosses);
  };

  return (
    <div className="setup-screen">
      <div className="setup-header">
        <h1>Quest & Chronicle</h1>
        <p className="setup-subtitle">Choose your Boss and enter the dungeon</p>
      </div>

      <div className="setup-options">
        <div className="setup-option">
          <label>Players</label>
          <div className="player-count-buttons">
            {[2, 3, 4].map(n => (
              <button
                key={n}
                className={`btn ${playerCount === n ? 'btn-active' : ''}`}
                onClick={() => setPlayerCount(n)}
              >
                {n} Players
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="setup-boss-select">
        <h2>Select Your Boss</h2>
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
