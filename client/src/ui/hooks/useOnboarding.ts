import { useState } from 'react';
import * as storage from '../../utils/storage';

const ONBOARDING_KEY = 'onboarding_seen_v1';

export function useOnboarding() {
  const [show, setShow] = useState(() => !storage.exists(ONBOARDING_KEY));

  const dismiss = (dontShowAgain: boolean) => {
    if (dontShowAgain) {
      storage.save(ONBOARDING_KEY, true);
    }
    setShow(false);
  };

  return { showOnboarding: show, dismissOnboarding: dismiss };
}
