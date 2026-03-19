import { useGameStore } from './store/gameStore';
import { GameSetup } from './ui/screens/GameSetup';
import { GameBoard } from './ui/screens/GameBoard';
import { GameOver } from './ui/screens/GameOver';
import './App.css';

function App() {
  const screen = useGameStore(s => s.screen);

  return (
    <div className="app">
      {screen === 'setup' && <GameSetup />}
      {screen === 'playing' && <GameBoard />}
      {screen === 'gameover' && <GameOver />}
    </div>
  );
}

export default App;
