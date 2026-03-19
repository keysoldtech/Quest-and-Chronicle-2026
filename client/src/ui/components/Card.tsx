import type { BossCard, RoomCard, HeroCard, SpellCard, DungeonRoom } from '../../data/types';

interface CardProps {
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export function BossCardView({ boss, className = '', onClick, selected }: CardProps & { boss: BossCard }) {
  const treasure = Array.isArray(boss.treasure) ? boss.treasure.join('/') : boss.treasure;
  return (
    <div
      className={`card card-boss ${selected ? 'card-selected' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="card-header">
        <span className="card-name">{boss.name}</span>
        <span className="card-xp">XP {boss.xp}</span>
      </div>
      <div className="card-subtitle">{boss.subtitle}</div>
      <div className="card-treasure">
        <TreasureIcon type={treasure} />
      </div>
      <div className="card-ability">{boss.levelUpAbility}</div>
      <div className="card-flavor">{boss.flavorText}</div>
    </div>
  );
}

export function RoomCardView({ room, className = '', onClick, selected, disabled }: CardProps & { room: RoomCard }) {
  const treasure = Array.isArray(room.treasure) ? room.treasure.join('/') : room.treasure;
  return (
    <div
      className={`card card-room card-room-${room.roomType} ${room.isAdvanced ? 'card-advanced' : ''} ${selected ? 'card-selected' : ''} ${disabled ? 'card-disabled' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      role={onClick && !disabled ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      <div className="card-header">
        <span className="card-name">{room.name}</span>
        <span className="card-damage">
          <span className="damage-icon">&#9829;</span> {room.damage}
        </span>
      </div>
      <div className="card-type-badge">
        {room.isAdvanced ? 'Advanced' : ''} {room.roomType === 'monster' ? 'Monster' : 'Trap'}
      </div>
      <div className="card-treasure">
        <TreasureIcon type={treasure} />
      </div>
      {room.ability && (
        <div className="card-ability">{room.ability.description}</div>
      )}
    </div>
  );
}

export function HeroCardView({ hero, className = '', currentHP }: { hero: HeroCard; className?: string; currentHP?: number }) {
  const hp = currentHP ?? hero.health;
  return (
    <div className={`card card-hero card-hero-${hero.heroType} ${className}`}>
      <div className="card-header">
        <span className="card-name">{hero.name}</span>
        <span className="card-hp">
          <span className="hp-icon">&#10084;</span> {hp}/{hero.health}
        </span>
      </div>
      <div className="card-class">
        <TreasureIcon type={hero.class} /> {hero.class}
      </div>
      {hero.heroType === 'epic' && (
        <div className="card-type-badge epic-badge">EPIC</div>
      )}
      {hero.ability && <div className="card-ability">{hero.ability}</div>}
    </div>
  );
}

export function SpellCardView({ spell, className = '', onClick, disabled }: CardProps & { spell: SpellCard }) {
  return (
    <div
      className={`card card-spell ${disabled ? 'card-disabled' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
      role={onClick && !disabled ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      <div className="card-header">
        <span className="card-name">{spell.name}</span>
        <span className="card-phase-icon">{phaseIcon(spell.phase)}</span>
      </div>
      <div className="card-ability">{spell.description}</div>
      <div className="card-flavor">{spell.flavorText}</div>
    </div>
  );
}

export function DungeonRoomView({ room, index }: { room: DungeonRoom; index: number }) {
  const treasure = Array.isArray(room.card.treasure) ? room.card.treasure.join('/') : room.card.treasure;
  const totalDamage = room.card.damage + room.damageCounters;
  return (
    <div className={`dungeon-room ${room.isDeactivated ? 'room-deactivated' : ''}`}>
      <div className="room-position">#{index + 1}</div>
      <div className="room-name">{room.card.name}</div>
      <div className="room-stats">
        <span className="damage-icon">&#9829;</span> {totalDamage}
        <TreasureIcon type={treasure} />
      </div>
      {room.card.ability && (
        <div className="room-ability-hint" title={room.card.ability.description}>
          &#9889;
        </div>
      )}
      {room.attachedMiniboss && (
        <div className="room-miniboss">&#9876; MB</div>
      )}
    </div>
  );
}

export function TreasureIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    fighter: '&#9876;',
    mage: '&#9733;',
    thief: '&#9830;',
    cleric: '&#10010;',
    explorer: '&#9788;',
  };
  const colors: Record<string, string> = {
    fighter: '#e74c3c',
    mage: '#3498db',
    thief: '#2ecc71',
    cleric: '#f1c40f',
    explorer: '#9b59b6',
  };
  return (
    <span
      className="treasure-icon"
      style={{ color: colors[type] || '#888' }}
      dangerouslySetInnerHTML={{ __html: icons[type] || '?' }}
      title={type}
    />
  );
}

function phaseIcon(phase: string): string {
  switch (phase) {
    case 'build': return '&#128296;';
    case 'adventure': return '&#9876;';
    case 'bait': return '&#127775;';
    case 'any': return '&#9733;';
    case 'end': return '&#9200;';
    default: return '&#9733;';
  }
}

export function CardBack({ type = 'room' }: { type?: string }) {
  return (
    <div className={`card card-back card-back-${type}`}>
      <div className="card-back-label">{type.toUpperCase()}</div>
    </div>
  );
}
