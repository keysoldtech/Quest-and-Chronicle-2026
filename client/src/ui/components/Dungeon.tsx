import type { PlayerState } from '../../data/types';
import { getSoulCount, getWoundCount } from '../../engine/game-state';
import { DungeonRoomView, BossCardView } from './Card';

interface DungeonProps {
  player: PlayerState;
  isHuman?: boolean;
  compact?: boolean;
}

export function DungeonView({ player, isHuman = false, compact = false }: DungeonProps) {
  const souls = getSoulCount(player);
  const wounds = getWoundCount(player);
  const totalDamage = player.dungeon
    .filter(r => !r.isDeactivated)
    .reduce((s, r) => s + r.card.damage + r.damageCounters, 0);

  return (
    <div className={`dungeon-view ${isHuman ? 'dungeon-human' : 'dungeon-ai'} ${compact ? 'dungeon-compact' : ''}`}>
      <div className="dungeon-header">
        <span className="dungeon-player-name">{player.name}</span>
        <div className="dungeon-scores">
          <span className="score-souls" title="Souls">&#128142; {souls}</span>
          <span className="score-wounds" title="Wounds">&#128148; {wounds}</span>
          {player.coins > 0 && <span className="score-coins" title="Coins">&#9679; {player.coins}</span>}
        </div>
      </div>

      <div className="dungeon-boss">
        {compact ? (
          <div className="boss-compact">
            <span className="boss-name">{player.boss.name}</span>
            <span className="boss-xp">XP {player.boss.xp}</span>
            {player.bossLeveledUp && <span className="boss-leveled">&#11088; LV UP</span>}
          </div>
        ) : (
          <BossCardView boss={player.boss} />
        )}
      </div>

      <div className="dungeon-rooms">
        {player.dungeon.length === 0 ? (
          <div className="dungeon-empty">No rooms built</div>
        ) : (
          player.dungeon.map((room, i) => (
            <DungeonRoomView key={`${room.card.id}-${i}`} room={room} index={i} />
          ))
        )}
      </div>

      <div className="dungeon-stats">
        <span title="Total dungeon damage">&#9876; {totalDamage} total damage</span>
        <span title="Cards in hand">&#9997; {player.hand.length} cards</span>
      </div>
    </div>
  );
}
