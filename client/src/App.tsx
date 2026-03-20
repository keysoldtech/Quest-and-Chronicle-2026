import { useState } from 'react';
import { useGameStore } from './store/gameStore';
import { GameSetup } from './ui/screens/GameSetup';
import { GameBoard } from './ui/screens/GameBoard';
import { GameOver } from './ui/screens/GameOver';
import { ToastContainer } from './ui/components/Toast';
import { HelpGuide } from './ui/components/HelpGuide';
import { OnboardingOverlay } from './ui/components/Onboarding';
import { useOnboarding } from './ui/hooks/useOnboarding';
import { SoundManager } from './utils/sound';
import './App.css';

function App() {
  const screen = useGameStore(s => s.screen);
  const [showGuide, setShowGuide] = useState(false);
  const { showOnboarding, dismissOnboarding } = useOnboarding();
  const [soundEnabled, setSoundEnabled] = useState(SoundManager.isEnabled());

  const toggleSound = () => {
    const enabled = SoundManager.toggle();
    setSoundEnabled(enabled);
  };

  return (
    <div className="app">
      <ToastContainer />

      {showOnboarding && screen === 'setup' && (
        <OnboardingOverlay onDismiss={dismissOnboarding} />
      )}

      {showGuide && <HelpGuide onClose={() => setShowGuide(false)} />}

      {/* Global settings bar */}
      <div className="global-bar">
        <div className="settings-bar">
          <button className="btn" onClick={() => setShowGuide(true)} title="Game Guide">
            📖 Guide
          </button>
          <button className="btn" onClick={toggleSound} title="Toggle Sound">
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <input
            type="range"
            className="volume-slider"
            min="0"
            max="100"
            value={SoundManager.getVolume() * 100}
            onChange={e => SoundManager.setVolume(Number(e.target.value) / 100)}
            title="Volume"
          />
        </div>
      </div>

      {screen === 'setup' && <GameSetup />}
      {screen === 'playing' && <GameBoard />}
      {screen === 'gameover' && <GameOver />}
    </div>
  );
}

export default App;
