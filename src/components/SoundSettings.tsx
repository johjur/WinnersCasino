import React, { useState, useEffect } from 'react';
import { IconButton, Slider, Box } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import { soundManager } from '../utils/sounds';

export const SoundSettings: React.FC = () => {
  const [ambientEnabled, setAmbientEnabled] = useState(true);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (ambientEnabled) {
      soundManager.startAmbientSound();
    } else {
      soundManager.stopAmbientSound();
    }
  }, [ambientEnabled]);

  const handleAmbientToggle = () => {
    setAmbientEnabled(!ambientEnabled);
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    const newVolume = newValue as number;
    setVolume(newVolume);
    soundManager.setVolume(newVolume);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'row-reverse' }}>
      <IconButton 
        onClick={handleAmbientToggle}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }
        }}
      >
        {ambientEnabled ? <MusicNoteIcon /> : <MusicOffIcon />}
      </IconButton>
      <Slider
        value={volume}
        onChange={handleVolumeChange}
        min={0}
        max={1}
        step={0.1}
        size="small"
        sx={{
          width: 100,
          color: 'white',
          '& .MuiSlider-thumb': {
            color: 'white',
            width: 12,
            height: 12,
            '&:hover, &.Mui-focusVisible': {
              boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.16)',
            },
            '&.Mui-active': {
              width: 14,
              height: 14,
            },
          },
          '& .MuiSlider-track': {
            color: 'white',
          },
          '& .MuiSlider-rail': {
            color: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      />
    </Box>
  );
}; 