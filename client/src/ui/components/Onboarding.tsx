import { useState } from 'react';

interface OnboardingProps {
  onDismiss: (dontShowAgain: boolean) => void;
}

export function OnboardingOverlay({ onDismiss }: OnboardingProps) {
  const [dontShow, setDontShow] = useState(false);

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        <div className="onboarding-icon">🏰</div>
        <h2>Welcome to Quest & Chronicle!</h2>
        <p>You are a dungeon Boss. Build rooms, lure heroes, and collect their souls to win.</p>

        <div className="onboarding-steps">
          <div className="onboarding-step">
            <span className="step-num">1</span>
            <span>Choose your Boss — each has unique treasure and a level-up ability</span>
          </div>
          <div className="onboarding-step">
            <span className="step-num">2</span>
            <span>Build rooms each turn to increase your dungeon's damage and treasure</span>
          </div>
          <div className="onboarding-step">
            <span className="step-num">3</span>
            <span>Heroes are lured to the dungeon with the most matching treasure</span>
          </div>
          <div className="onboarding-step">
            <span className="step-num">4</span>
            <span>Kill heroes to gain souls — first to 10 wins!</span>
          </div>
        </div>

        <label className="onboarding-checkbox">
          <input type="checkbox" checked={dontShow} onChange={e => setDontShow(e.target.checked)} />
          Don't show this again
        </label>

        <button className="btn btn-primary btn-large" onClick={() => onDismiss(dontShow)}>
          Let's Play!
        </button>
      </div>
    </div>
  );
}
