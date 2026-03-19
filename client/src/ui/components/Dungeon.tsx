import type { PlayerState } from '../../data/types';
import { getSoulCount, getWoundCount } from '../../engine/game-state';
import { DungeonRoomView, BossCardView } from './Card';

interface DungeonProps {
  player: PlayerState;
  isHuman?: boolean;
  compact?: boolean;
  showCoins?: boolean;
  showMinibosses?: boolean;
  showItems?: boolean;
  onPromoteMiniboss?: (roomIndex: number) => void;
}

export function DungeonView({
  player, isHuman = false, compact = false,
  showCoins = false, showMinibosses = false, showItems = false,
  onPromoteMiniboss,
}: DungeonProps) {
  const souls = getSoulCount(player);
  const wounds = getWoundCount(player);
  const totalDamage = player.dungeon
    .filter(r => !r.isDeactivated)
    .reduce((s, r) => s + r.card.damage + r.damageCounters + (r.attachedMiniboss?.card.damage ?? 0), 0);

  return (
    <div className={`dungeon-view ${isHuman ? 'dungeon-human' : 'dungeon-ai'} ${compact ? 'dungeon-compact' : ''}`}>
      <div className="dungeon-header">
        <span className="dungeon-player-name">{player.name}</span>
        <div className="dungeon-scores">
          <span className="score-souls" title="Souls">💎 {souls}</span>
          <span className="score-wounds" title="Wounds">💔 {wounds}</span>
          {showCoins && <span className="score-coins" title="Coins">🪙 {player.coins}</span>}
          {showMinibosses && player.minibossHand.length > 0 && (
            <span className="score-miniboss" title="Minibosses in hand">👹 {player.minibossHand.length}</span>
          )}
        </div>
      </div>

      <div className="dungeon-boss">
        {compact ? (
          <div className="boss-compact">
            <span className="boss-name">{player.boss.name}</span>
            <span className="boss-xp">XP {player.boss.xp}</span>
            {player.bossLeveledUp && <span className="boss-leveled">⭐ LV UP</span>}
          </div>
        ) : (
          <>
            <BossCardView boss={player.boss} />
            {player.bossLeveledUp && <div className="boss-leveled-banner">⭐ LEVELED UP — {player.boss.levelUpAbility}</div>}
          </>
        )}
      </div>

      <div className="dungeon-rooms">
        {player.dungeon.length === 0 ? (
          <div className="dungeon-empty">No rooms built</div>
        ) : (
          player.dungeon.map((room, i) => (
            <div key={`${room.card.id}-${i}`} className="dungeon-room-wrapper">
              <DungeonRoomView room={room} index={i} />
              {showMinibosses && room.attachedMiniboss && (
                <div className="miniboss-badge">
                  👹 {room.attachedMiniboss.card.name} (Lv{room.attachedMiniboss.currentLevel}, +{room.attachedMiniboss.card.damage}dmg)
                  {isHuman && onPromoteMiniboss && room.attachedMiniboss.currentLevel < 3 && (
                    <button
                      className="btn btn-sm btn-promote"
                      onClick={() => onPromoteMiniboss(i)}
                      title={`Promote for ${room.attachedMiniboss!.currentLevel * 2} coins`}
                    >
                      ↑ ({room.attachedMiniboss.currentLevel * 2}🪙)
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Claimed items */}
      {showItems && player.claimedItems.length > 0 && !isHuman && (
        <div className="dungeon-items">
          {player.claimedItems.map((item, i) => (
            <span key={i} className={`item-badge ${item.faceUp ? 'item-up' : 'item-down'}`}>
              🗡 {item.faceUp ? item.card.name : '???'}
            </span>
          ))}
        </div>
      )}

      <div className="dungeon-stats">
        <span title="Total dungeon damage">💀 {totalDamage} dmg</span>
        <span title="Cards in hand">✋ {player.hand.length} cards</span>
        <span title="Rooms">{player.dungeon.length}/5 rooms</span>
      </div>
    </div>
  );
}
