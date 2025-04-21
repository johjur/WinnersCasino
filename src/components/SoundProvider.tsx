import React, { useEffect } from 'react';
import { soundManager } from '../utils/sounds';

interface SoundProviderProps {
  children: React.ReactNode;
  shouldPlay?: boolean;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children, shouldPlay = false }) => {
  useEffect(() => {
    if (shouldPlay) {
      soundManager.startAmbientSound();
    }

    return () => {
      soundManager.stopAmbientSound();
    };
  }, [shouldPlay]);

  return <>{children}</>;
}; 