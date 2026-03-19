import { useState, useCallback } from 'react';
import type { RoomCard, SpellCard, MinibossCard } from '../../data/types';
import { useGameStore } from '../../store/gameStore';
import { getSpellsInHand } from '../../engine/game-state';
import { DungeonView } from '../components/Dungeon';
import { TownView } from '../components/Town';
import { HandView } from '../components/Hand';
import { AdventureLog } from '../components/AdventureLog';

export function GameBoard() {
  const state = useGameStore(s => s.state);
  const humanPlayer = useGameStore(s => s.getHumanPlayer());
  const phaseLabel = useGameStore(s => s.getPhaseLabel());
  const adventureLog = useGameStore(s => s.adventureLog);
  const buildRoom = useGameStore(s => s.buildRoom);
  const skipBuild = useGameStore(s => s.skipBuild);
  const playSpell = useGameStore(s => s.playSpell);
  const advancePhase = useGameStore(s => s.advancePhase);
  const canBuild = useGameStore(s => s.canBuild);
  const promoteMiniboss = useGameStore(s => s.promoteMiniboss);

  const [selectedRoom, setSelectedRoom] = useState<RoomCard | null>(null);
  const [selectedMiniboss, setSelectedMiniboss] = useState<MinibossCard | null>(null);
  const [showBuildSlots, setShowBuildSlots] = useState(false);

  const handleSelectRoom = useCallback((room: RoomCard) => {
    setSelectedRoom(prev => prev === room ? null : room);
    setShowBuildSlots(true);
  }, []);

  const handleBuildAtSlot = useCallback((position: number | 'new') => {
    if (!selectedRoom) return;
    const error = canBuild(selectedRoom, position);
    if (error) return;
    buildRoom(selectedRoom, position, selectedMiniboss ?? undefined);
    setSelectedRoom(null);
    setSelectedMiniboss(null);
    setShowBuildSlots(false);
  }, [selectedRoom, selectedMiniboss, buildRoom, canBuild]);

  const handleSkipBuild = useCallback(() => {
    skipBuild();
    setSelectedRoom(null);
    setSelectedMiniboss(null);
    setShowBuildSlots(false);
  }, [skipBuild]);

  const handlePlaySpell = useCallback((spell: SpellCard) => {
    playSpell(spell);
  }, [playSpell]);

  if (!state || !humanPlayer) return null;

  const aiPlayers = state.players.filter(p => p.id !== humanPlayer.id);
  const isBuildPhase = state.currentPhase === 'build';
  const isBaitPhase = state.currentPhase === 'bait';
  const isEndPhase = state.currentPhase === 'end';
  const hasMinibosses = state.config.modules.minibosses;
  const hasCoins = state.config.modules.coins;
  const hasItems = state.config.modules.items;
  const humanSpells = getSpellsInHand(humanPlayer);

  return (
    <div className="game-board">
      {/* Phase bar */}
      <div className="phase-bar">
        <div className="round-counter">Round {state.roundNumber + 1}</div>
        <div className="phase-label">{phaseLabel}</div>
        <div className="deck-info">
          🃏 {state.decks.room.length}r | ✨ {state.decks.spell.length}s
          {hasMinibosses && <> | 👹 {state.decks.miniboss.length}mb</>}
          {hasItems && <> | 🗡 {state.decks.item.length}i</>}
        </div>
      </div>

      {/* AI Dungeons */}
      <div className="opponents-area">
        {aiPlayers.map(p => (
          <DungeonView key={p.id} player={p} compact showCoins={hasCoins} showMinibosses={hasMinibosses} />
        ))}
      </div>

      {/* Town */}
      <TownView
        heroes={state.town}
        heroOrdinaryCount={state.decks.heroOrdinary.length}
        heroEpicCount={state.decks.heroEpic.length}
      />

      {/* Adventure Log */}
      {adventureLog.length > 0 && <AdventureLog entries={adventureLog} />}

      {/* Player Dungeon */}
      <div className="player-dungeon-area">
        <DungeonView
          player={humanPlayer}
          isHuman
          showCoins={hasCoins}
          showMinibosses={hasMinibosses}
          showItems={hasItems}
          onPromoteMiniboss={hasMinibosses ? promoteMiniboss : undefined}
        />

        {/* Build slots */}
        {isBuildPhase && showBuildSlots && selectedRoom && (
          <div className="build-slots">
            <div className="build-slots-label">Build {selectedRoom.name} where?</div>

            {/* Miniboss attachment selector */}
            {hasMinibosses && humanPlayer.minibossHand.length > 0 && (
              <div className="miniboss-attach">
                <span className="miniboss-attach-label">Attach miniboss:</span>
                <button
                  className={`btn btn-sm ${!selectedMiniboss ? 'btn-active' : ''}`}
                  onClick={() => setSelectedMiniboss(null)}
                >
                  None
                </button>
                {humanPlayer.minibossHand.map((mb, i) => (
                  <button
                    key={`${mb.id}-${i}`}
                    className={`btn btn-sm ${selectedMiniboss === mb ? 'btn-active' : ''}`}
                    onClick={() => setSelectedMiniboss(mb)}
                  >
                    {mb.name} (+{mb.damage}dmg)
                  </button>
                ))}
              </div>
            )}

            <div className="build-slot-options">
              {humanPlayer.dungeon.map((room, i) => {
                const error = canBuild(selectedRoom, i);
                return (
                  <button
                    key={i}
                    className={`btn build-slot ${error ? 'btn-disabled' : 'btn-build'}`}
                    onClick={() => !error && handleBuildAtSlot(i)}
                    disabled={!!error}
                    title={error || `Replace ${room.card.name}`}
                  >
                    Replace #{i + 1}: {room.card.name}
                  </button>
                );
              })}
              {humanPlayer.dungeon.length < 5 && (
                <button className="btn btn-build" onClick={() => handleBuildAtSlot('new')}>
                  New Slot #{humanPlayer.dungeon.length + 1}
                </button>
              )}
              <button className="btn btn-cancel" onClick={() => { setSelectedRoom(null); setShowBuildSlots(false); setSelectedMiniboss(null); }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Claimed Items */}
      {hasItems && humanPlayer.claimedItems.length > 0 && (
        <div className="claimed-items">
          <h4>Claimed Items</h4>
          <div className="item-list">
            {humanPlayer.claimedItems.map((item, i) => (
              <div key={i} className={`claimed-item ${item.faceUp ? 'item-face-up' : 'item-face-down'}`}>
                <span>{item.card.name}</span>
                {item.faceUp && (
                  <button className="btn btn-sm" onClick={() => useGameStore.getState().useItem(i)}>
                    Use
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Player Hand */}
      <HandView
        player={humanPlayer}
        currentPhase={state.currentPhase}
        onSelectRoom={isBuildPhase ? handleSelectRoom : undefined}
        onPlaySpell={handlePlaySpell}
        selectedRoom={selectedRoom}
      />

      {/* Action buttons */}
      <div className="action-bar">
        {isBuildPhase && !showBuildSlots && (
          <button className="btn btn-secondary" onClick={handleSkipBuild}>
            Skip Build
          </button>
        )}
        {isBaitPhase && (
          <>
            {humanSpells.length > 0 && (
              <span className="action-hint">Play spells before adventure, or:</span>
            )}
            <button className="btn btn-primary" onClick={advancePhase}>
              Start Adventure ⚔
            </button>
          </>
        )}
        {isEndPhase && (
          <button className="btn btn-primary" onClick={advancePhase}>
            Next Round →
          </button>
        )}
        {state.currentPhase === 'town' && (
          <button className="btn btn-primary" onClick={advancePhase}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
