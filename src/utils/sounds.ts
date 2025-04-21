export enum SoundType {
  AMBIENT_CASINO = 'ambientCasino',
}

class SoundManager {
  private sounds: Map<SoundType, HTMLAudioElement> = new Map();
  private isMuted: boolean = false;
  private ambientSound: HTMLAudioElement | null = null;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    Object.values(SoundType).forEach((soundType) => {
      const audio = new Audio(`/assets/sounds/${soundType}.mp3`);
      audio.volume = 0.5; 
      this.sounds.set(soundType, audio);
    });

    this.ambientSound = new Audio('/assets/sounds/CASINO-backgroundmusic.mp3');
    this.ambientSound.loop = true;
    this.ambientSound.volume = 0.3; 
  }

  public play(soundType: SoundType) {
    if (this.isMuted) return;

    const sound = this.sounds.get(soundType);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((error) => {
        console.warn(`Failed to play sound ${soundType}:`, error);
      });
    }
  }

  public startAmbientSound() {
    if (this.isMuted || !this.ambientSound) return;
    this.ambientSound.play().catch((error) => {
      console.warn('Failed to play ambient sound:', error);
    });
  }

  public stopAmbientSound() {
    if (this.ambientSound) {
      this.ambientSound.pause();
      this.ambientSound.currentTime = 0;
    }
  }

  public setVolume(volume: number) {
    const normalizedVolume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach((sound) => {
      sound.volume = normalizedVolume;
    });
    if (this.ambientSound) {
      this.ambientSound.volume = normalizedVolume * 0.6; // Ambient sound at 60% of main volume
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientSound();
    } else {
      this.startAmbientSound();
    }
    return this.isMuted;
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }
}

export const soundManager = new SoundManager(); 