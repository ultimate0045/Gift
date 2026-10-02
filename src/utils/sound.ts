// Synthesized Kawaii Audio Effects using Web Audio API

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Cute bubble pop sound
  playPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Audio error ignored
    }
  }

  // Playful boop sound (for dodging 'No' button)
  playBoop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.12);
      
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Audio error ignored
    }
  }

  // Twinkling sparkle sound (for stars and hearts)
  playSparkle() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const freqs = [784, 987, 1174, 1567]; // G5, B5, D6, G6
      const now = ctx.currentTime;
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        
        gain.gain.setValueAtTime(0.12, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.04 + 0.14);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.14);
      });
    } catch {
      // Audio error ignored
    }
  }

  // Joyful celebratory harp chime arpeggio (for 'Yes' accepted)
  playVictory() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51]; // C5, E5, G5, B5, C6, E6
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const startTime = now + idx * 0.07;
        
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.005, startTime + 0.35);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {
      // Audio error ignored
    }
  }

  // Playful dramatic sad slide sound (for 'Why did you click NO!')
  playWhimper() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.28);
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.55);
      
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.55);
    } catch {
      // Audio error ignored
    }
  }

  // Sweet gentle forgiveness chime when clicking "I'm sorry"
  playForgive() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const freqs = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
      const now = ctx.currentTime;
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const startTime = now + idx * 0.08;
        
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.005, startTime + 0.3);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // Audio error ignored
    }
  }

  // Romantic melody player for "Love Me Like You Do"
  private songTimer: number | null = null;
  public isSongPlaying: boolean = false;

  playSongMusic(onBeat?: (step: number) => void) {
    const ctx = this.getContext();
    if (!ctx) return;
    this.stopSongMusic();
    this.isSongPlaying = true;

    // Melody notes for "Love Me Like You Do":
    // "You're the light, you're the night..."
    // G4, B4, D5, D5, C5, B4, A4, G4, A4, B4...
    // Chord progression: G - Em - C - D
    const melody: { note: number; dur: number; bass: number }[] = [
      { note: 392.00, dur: 0.35, bass: 196.00 }, // G4 / G3
      { note: 493.88, dur: 0.35, bass: 196.00 }, // B4
      { note: 587.33, dur: 0.5, bass: 196.00 },  // D5
      { note: 587.33, dur: 0.35, bass: 196.00 }, // D5
      { note: 523.25, dur: 0.35, bass: 164.81 }, // C5 / E3
      { note: 493.88, dur: 0.4, bass: 164.81 },  // B4
      { note: 440.00, dur: 0.35, bass: 164.81 }, // A4
      { note: 392.00, dur: 0.5, bass: 164.81 },  // G4
      { note: 440.00, dur: 0.35, bass: 130.81 }, // A4 / C3
      { note: 493.88, dur: 0.4, bass: 130.81 },  // B4
      { note: 523.25, dur: 0.35, bass: 130.81 }, // C5
      { note: 493.88, dur: 0.35, bass: 130.81 }, // B4
      { note: 440.00, dur: 0.5, bass: 146.83 },  // A4 / D3
      { note: 392.00, dur: 0.4, bass: 146.83 },  // G4
      { note: 440.00, dur: 0.4, bass: 146.83 },  // A4
      { note: 392.00, dur: 0.7, bass: 196.00 },  // G4 / G3
    ];

    let step = 0;
    const playNext = () => {
      if (!this.isSongPlaying || !this.enabled) return;
      const cur = melody[step % melody.length];
      if (onBeat) onBeat(step % melody.length);

      try {
        const now = ctx.currentTime;
        // Lead melody tone (gentle music-box / rhodes sine)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(cur.note, now);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.002, now + cur.dur + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + cur.dur + 0.1);

        // Warm harmonic sub-tone
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(cur.bass, now);
        subGain.gain.setValueAtTime(0.1, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + cur.dur + 0.2);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + cur.dur + 0.2);
      } catch {
        // Audio error ignored
      }

      const nextInterval = (cur.dur + 0.08) * 1000;
      step++;
      this.songTimer = window.setTimeout(playNext, nextInterval);
    };

    playNext();
  }

  stopSongMusic() {
    this.isSongPlaying = false;
    if (this.songTimer !== null) {
      clearTimeout(this.songTimer);
      this.songTimer = null;
    }
  }
}

export const sound = new SoundEffects();
