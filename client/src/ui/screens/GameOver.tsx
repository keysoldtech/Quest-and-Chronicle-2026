import { useGameStore } from '../../store/gameStore';
import { getSoulCount, getWoundCount, getNetScore } from '../../engine/game-state';

export function GameOver() {
  const state = useGameStore(s => s.state);

  if (!state) return null;

  const sortedPlayers = [...state.players].sort((a, b) => getNetScore(b) - getNetScore(a));
  const winner = state.winner ? state.players.find(p => p.id === state.winner) : null;
  const winnerEntry = state.log.find(e => e.action === 'game_over');

  return (
    <div className="gameover-screen">
      <div className="gameover-header">
        <h1>Game Over</h1>
        {winner && (
          <div className="winner-announcement">
            <div className="winner-crown">&#128081;</div>
            <h2>{winner.name} Wins!</h2>
            <p className="winner-boss">{winner.boss.name} — {winner.boss.subtitle}</p>
          </div>
        )}
        {winnerEntry && <p className="win-reason">{winnerEntry.details}</p>}
      </div>

      <div className="scoreboard">
        <h3>Final Scores</h3>
        <table className="score-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Boss</th>
              <th>Souls</th>
              <th>Wounds</th>
              <th>Net</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((p, i) => (
              <tr key={p.id} className={p.id === state.winner ? 'winner-row' : ''}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.boss.name}</td>
                <td className="score-souls">{getSoulCount(p)}</td>
                <td className="score-wounds">{getWoundCount(p)}</td>
                <td className="score-net">{getNetScore(p)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="game-stats">
        <p>Rounds played: {state.roundNumber}</p>
        <p>Total events: {state.log.length}</p>
      </div>

      <div className="gameover-actions">
        <button
          className="btn btn-primary btn-large"
          onClick={() => window.location.reload()}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
