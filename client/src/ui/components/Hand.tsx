import type { RoomCard, SpellCard, PlayerState } from '../../data/types';
import { getRoomsInHand, getSpellsInHand } from '../../engine/game-state';
import { RoomCardView, SpellCardView } from './Card';

interface HandProps {
  player: PlayerState;
  currentPhase: string;
  onSelectRoom?: (room: RoomCard) => void;
  onPlaySpell?: (spell: SpellCard) => void;
  selectedRoom?: RoomCard | null;
}

export function HandView({ player, currentPhase, onSelectRoom, onPlaySpell, selectedRoom }: HandProps) {
  const rooms = getRoomsInHand(player);
  const spells = getSpellsInHand(player);
  const isBuildPhase = currentPhase === 'build';

  return (
    <div className="hand-view">
      <div className="hand-header">
        <h3>Your Hand ({player.hand.length})</h3>
      </div>
      <div className="hand-sections">
        <div className="hand-section">
          <h4>Rooms ({rooms.length})</h4>
          <div className="hand-cards">
            {rooms.map((room, i) => (
              <RoomCardView
                key={`${room.id}-${i}`}
                room={room}
                onClick={isBuildPhase && onSelectRoom ? () => onSelectRoom(room) : undefined}
                selected={selectedRoom === room}
                disabled={!isBuildPhase}
              />
            ))}
          </div>
        </div>
        <div className="hand-section">
          <h4>Spells ({spells.length})</h4>
          <div className="hand-cards">
            {spells.map((spell, i) => (
              <SpellCardView
                key={`${spell.id}-${i}`}
                spell={spell}
                onClick={onPlaySpell ? () => onPlaySpell(spell) : undefined}
                disabled={spell.phase !== 'any' && spell.phase !== currentPhase}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
