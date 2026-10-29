/**
 * Vietnamese Speech Service & Preschool Audio Synthesizer
 * 100% Vietnamese voice priority, Web Speech API + Gemini AI fallback,
 * text normalization, and teacher voice settings for Dien Bien Preschool.
 */

import { normalizeVietnameseForSpeech } from './speechNormalizer';

export interface SpeechSegment {
  lang: 'vi' | 'en';
  text: string;
}

export type TtsEngine = 'auto' | 'webspeech' | 'gemini';

export interface SoundState {
  isSpeaking: boolean;
  isPaused: boolean;
  isMuted: boolean;
  speechRate: number;
  speechPitch: number;
  speechVolume: number;
  selectedVoiceURI: string;
  ttsEngine: TtsEngine;
  hasVietnameseVoice: boolean;
  lastSpokenText: string;
  activeLanguage: 'vi' | 'en' | null;
}

type StateListener = (state: SoundState) => void;

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isCurrentlySpeaking: boolean = false;
  private isCurrentlyPaused: boolean = false;
  private speechQueue: SpeechSegment[] = [];
  private lastSpokenText: string = '';
  private lastSpokenLang: 'vi' | 'en' = 'vi';

  // Teacher-configurable speech parameters (stored in localStorage)
  private speechRate: number = 0.88; // Default 0.88 - calm, clear for 5-6 yo
  private speechPitch: number = 1.05; // Slightly cheerful, gentle
  private speechVolume: number = 1.0;
  private selectedVoiceURI: string = '';
  private ttsEngine: TtsEngine = 'auto';

  private listeners: Set<StateListener> = new Set();

  constructor() {
    this.restoreSettings();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
        this.notifyState();
      };
    }
  }

  private restoreSettings() {
    if (typeof window === 'undefined') return;
    try {
      const savedRate = localStorage.getItem('dienbien_speech_rate');
      if (savedRate) this.speechRate = Math.min(1.5, Math.max(0.5, parseFloat(savedRate)));

      const savedPitch = localStorage.getItem('dienbien_speech_pitch');
      if (savedPitch) this.speechPitch = Math.min(1.5, Math.max(0.7, parseFloat(savedPitch)));

      const savedVol = localStorage.getItem('dienbien_speech_volume');
      if (savedVol) this.speechVolume = Math.min(1.0, Math.max(0.0, parseFloat(savedVol)));

      const savedVoice = localStorage.getItem('dienbien_selected_voice');
      if (savedVoice) this.selectedVoiceURI = savedVoice;

      const savedEngine = localStorage.getItem('dienbien_tts_engine');
      if (savedEngine && ['auto', 'webspeech', 'gemini'].includes(savedEngine)) {
        this.ttsEngine = savedEngine as TtsEngine;
      }
    } catch {
      // Ignore storage errors
    }
  }

  private saveSettings() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('dienbien_speech_rate', String(this.speechRate));
      localStorage.setItem('dienbien_speech_pitch', String(this.speechPitch));
      localStorage.setItem('dienbien_speech_volume', String(this.speechVolume));
      localStorage.setItem('dienbien_selected_voice', this.selectedVoiceURI);
      localStorage.setItem('dienbien_tts_engine', this.ttsEngine);
    } catch {
      // Ignore storage errors
    }
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notifyState() {
    const state = this.getState();
    this.listeners.forEach((fn) => {
      try {
        fn(state);
      } catch {
        // Safe dispatch
      }
    });
  }

  public getState(): SoundState {
    return {
      isSpeaking: this.isCurrentlySpeaking,
      isPaused: this.isCurrentlyPaused,
      isMuted: this.isMuted,
      speechRate: this.speechRate,
      speechPitch: this.speechPitch,
      speechVolume: this.speechVolume,
      selectedVoiceURI: this.selectedVoiceURI,
      ttsEngine: this.ttsEngine,
      hasVietnameseVoice: this.isVietnameseVoiceAvailable(),
      lastSpokenText: this.lastSpokenText,
      activeLanguage: this.isCurrentlySpeaking ? this.lastSpokenLang : null,
    };
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      this.cachedVoices = window.speechSynthesis.getVoices() || [];
    } catch {
      this.cachedVoices = [];
    }
  }

  /**
   * Strictly filters installed voices that are genuinely Vietnamese (vi-VN / vi_*).
   * NEVER returns English voices!
   */
  public getAvailableVietnameseVoices(): SpeechSynthesisVoice[] {
    if (!this.cachedVoices.length && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
    }
    const voices = this.cachedVoices;
    if (!voices || voices.length === 0) return [];

    return voices.filter((v) => {
      const lang = (v.lang || '').toLowerCase();
      const name = (v.name || '').toLowerCase();

      // Check language code
      if (lang === 'vi-vn' || lang === 'vi_vn' || lang.startsWith('vi-') || lang.startsWith('vi_') || lang === 'vi') {
        return true;
      }

      // Check name indicators for Vietnamese synthesis
      if (
        name.includes('vietnam') ||
        name.includes('tiếng việt') ||
        name.includes('vietnamese') ||
        name.includes('hoaimy') ||
        name.includes('namminh') ||
        name.includes('mai') && lang.includes('vi') ||
        name.includes('an') && lang.includes('vi') ||
        name.includes('linh') && lang.includes('vi')
      ) {
        return true;
      }

      return false;
    });
  }

  public isVietnameseVoiceAvailable(): boolean {
    return this.getAvailableVietnameseVoices().length > 0;
  }

  public getBestVietnameseVoice(): SpeechSynthesisVoice | null {
    const viVoices = this.getAvailableVietnameseVoices();
    if (!viVoices.length) return null;

    // 1. If teacher manually selected a voice and it's in Vietnamese list
    if (this.selectedVoiceURI) {
      const userChoice = viVoices.find((v) => v.voiceURI === this.selectedVoiceURI);
      if (userChoice) return userChoice;
    }

    // 2. High-quality natural voices (Google, Microsoft Online, Apple natural)
    const preferredOrder = [
      (v: SpeechSynthesisVoice) => v.name.includes('Google') && v.lang.startsWith('vi'),
      (v: SpeechSynthesisVoice) => v.name.includes('Natural') || v.name.includes('Online'),
      (v: SpeechSynthesisVoice) => v.name.includes('HoaiMy') || v.name.includes('Linh') || v.name.includes('Mai'),
      (v: SpeechSynthesisVoice) => v.lang.toLowerCase() === 'vi-vn',
    ];

    for (const matcher of preferredOrder) {
      const match = viVoices.find(matcher);
      if (match) return match;
    }

    return viVoices[0];
  }

  public getBestEnglishVoice(): SpeechSynthesisVoice | null {
    if (!this.cachedVoices.length && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
    }
    const voices = this.cachedVoices;
    if (!voices || voices.length === 0) return null;

    // Prioritize natural standard voices
    const enMatch =
      voices.find((v) => v.lang.toLowerCase() === 'en-us') ||
      voices.find((v) => v.lang.toLowerCase() === 'en-gb') ||
      voices.find((v) => v.lang.toLowerCase().startsWith('en'));

    return enMatch || null;
  }

  // --- AUDIO CONTEXT SOUND SYNTHESIS ---
  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopSpeaking();
    }
    this.notifyState();
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  public playSuccessChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  public playEncouragingChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(261.63, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Ignore
    }
  }

  public playCelebrationFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.5);
      });
    } catch {
      // Ignore
    }
  }

  public playCelebration() {
    this.playCelebrationFanfare();
  }

  public playStarChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Ignore
    }
  }

  // --- VIETNAMESE SPEECH SYNTHESIS ENGINE ---

  /**
   * Main Vietnamese speech method.
   * Strict guarantee: NEVER reads Vietnamese text using an English voice.
   * Normalizes text, selects real Vietnamese voice, or uses server-side Gemini TTS.
   */
  public speakVietnamese(
    rawText: string,
    onEnd?: () => void,
    onError?: (errMessage: string) => void
  ): boolean {
    if (this.isMuted) {
      if (onEnd) onEnd();
      return false;
    }

    const normalizedText = normalizeVietnameseForSpeech(rawText);
    if (!normalizedText.trim()) {
      if (onEnd) onEnd();
      return false;
    }

    this.stopSpeaking();
    this.lastSpokenText = normalizedText;
    this.lastSpokenLang = 'vi';

    // Check teacher engine preference
    if (this.ttsEngine === 'gemini') {
      this.speakViaGeminiTTS(normalizedText, onEnd, onError);
      return true;
    }

    // Try Web Speech API if device has Vietnamese voice
    const viVoice = this.getBestVietnameseVoice();

    if (viVoice && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(normalizedText);
        utterance.voice = viVoice;
        utterance.lang = viVoice.lang || 'vi-VN';
        utterance.rate = this.speechRate;
        utterance.pitch = this.speechPitch;
        utterance.volume = this.speechVolume;

        utterance.onstart = () => {
          this.isCurrentlySpeaking = true;
          this.isCurrentlyPaused = false;
          this.notifyState();
        };

        utterance.onend = () => {
          this.isCurrentlySpeaking = false;
          this.isCurrentlyPaused = false;
          this.currentUtterance = null;
          this.notifyState();
          if (onEnd) onEnd();
        };

        utterance.onerror = (e) => {
          console.warn('Web Speech synthesis error, trying Gemini fallback:', e);
          this.currentUtterance = null;
          // Fallback to Gemini TTS if available
          this.speakViaGeminiTTS(normalizedText, onEnd, onError);
        };

        this.currentUtterance = utterance;
        this.isCurrentlySpeaking = true;
        this.isCurrentlyPaused = false;
        this.notifyState();

        window.speechSynthesis.speak(utterance);
        return true;
      } catch (err) {
        console.warn('SpeechSynthesis exception, attempting Gemini TTS:', err);
      }
    }

    // CRITICAL: Device has no Vietnamese voice!
    // NEVER use default English voice to speak Vietnamese! Fallback to server Gemini TTS.
    return this.speakViaGeminiTTS(normalizedText, onEnd, onError);
  }

  /**
   * Server-Side Gemini Vietnamese TTS fallback (/api/ai/tts)
   */
  private speakViaGeminiTTS(
    text: string,
    onEnd?: () => void,
    onError?: (errMessage: string) => void
  ): boolean {
    this.isCurrentlySpeaking = true;
    this.isCurrentlyPaused = false;
    this.notifyState();

    fetch('/api/ai/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.available && data.audioData) {
          const audio = new Audio(`data:${data.mimeType || 'audio/wav'};base64,${data.audioData}`);
          audio.volume = this.speechVolume;
          this.currentAudioElement = audio;

          audio.onended = () => {
            this.isCurrentlySpeaking = false;
            this.isCurrentlyPaused = false;
            this.currentAudioElement = null;
            this.notifyState();
            if (onEnd) onEnd();
          };

          audio.onerror = () => {
            this.isCurrentlySpeaking = false;
            this.isCurrentlyPaused = false;
            this.currentAudioElement = null;
            this.notifyState();
            const msg = 'Không thể phát âm thanh từ dịch vụ đọc tiếng Việt.';
            if (onError) onError(msg);
            if (onEnd) onEnd();
          };

          audio.play().catch((playErr) => {
            console.warn('Audio play failed (autoplay restriction):', playErr);
            this.isCurrentlySpeaking = false;
            this.currentAudioElement = null;
            this.notifyState();
            if (onEnd) onEnd();
          });
        } else {
          // Device has no Vietnamese voice and AI TTS returned no audio
          this.isCurrentlySpeaking = false;
          this.isCurrentlyPaused = false;
          this.notifyState();
          const msg =
            'Thiết bị chưa có giọng đọc tiếng Việt. Cô vui lòng kiểm tra cài đặt âm thanh trong Góc Giáo Viên.';
          if (onError) onError(msg);
          if (onEnd) onEnd();
        }
      })
      .catch((err) => {
        console.warn('Gemini TTS network error:', err);
        this.isCurrentlySpeaking = false;
        this.isCurrentlyPaused = false;
        this.notifyState();
        const msg = 'Lỗi kết nối âm thanh tiếng Việt.';
        if (onError) onError(msg);
        if (onEnd) onEnd();
      });

    return true;
  }

  /**
   * Speak English using verified English voice (for English Corner learning only)
   */
  public speakEnglish(text: string, onEnd?: () => void): boolean {
    if (this.isMuted) {
      if (onEnd) onEnd();
      return false;
    }
    this.stopSpeaking();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return false;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // Slower pace for young learners
      utterance.pitch = 1.1;
      utterance.volume = this.speechVolume;

      const enVoice = this.getBestEnglishVoice();
      if (enVoice) {
        utterance.voice = enVoice;
      }

      utterance.onstart = () => {
        this.isCurrentlySpeaking = true;
        this.lastSpokenLang = 'en';
        this.notifyState();
      };

      utterance.onend = () => {
        this.isCurrentlySpeaking = false;
        this.notifyState();
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isCurrentlySpeaking = false;
        this.notifyState();
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      this.isCurrentlySpeaking = true;
      this.lastSpokenLang = 'en';
      this.notifyState();

      window.speechSynthesis.speak(utterance);
      return true;
    } catch {
      this.isCurrentlySpeaking = false;
      this.notifyState();
      if (onEnd) onEnd();
      return false;
    }
  }

  /**
   * Bilingual sequential speech
   */
  public speakSegments(segments: SpeechSegment[], onEnd?: () => void) {
    if (this.isMuted) {
      if (onEnd) onEnd();
      return;
    }
    this.stopSpeaking();
    if (!segments || segments.length === 0) {
      if (onEnd) onEnd();
      return;
    }

    this.speechQueue = [...segments];
    this.playNextSegment(onEnd);
  }

  private playNextSegment(finalCallback?: () => void) {
    if (this.speechQueue.length === 0) {
      this.isCurrentlySpeaking = false;
      this.notifyState();
      if (finalCallback) finalCallback();
      return;
    }

    const current = this.speechQueue.shift()!;
    if (current.lang === 'en') {
      this.speakEnglish(current.text, () => {
        setTimeout(() => this.playNextSegment(finalCallback), 250);
      });
    } else {
      this.speakVietnamese(current.text, () => {
        setTimeout(() => this.playNextSegment(finalCallback), 250);
      });
    }
  }

  // --- PLAYBACK CONTROLS ---

  public stopSpeaking() {
    this.speechQueue = [];
    this.isCurrentlySpeaking = false;
    this.isCurrentlyPaused = false;
    this.currentUtterance = null;

    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentAudioElement = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }

    this.notifyState();
  }

  public pauseSpeaking() {
    if (!this.isCurrentlySpeaking) return;

    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.isCurrentlyPaused = true;
      this.notifyState();
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.pause();
        this.isCurrentlyPaused = true;
        this.notifyState();
      } catch {
        // Ignore
      }
    }
  }

  public resumeSpeaking() {
    if (!this.isCurrentlyPaused) return;

    if (this.currentAudioElement) {
      this.currentAudioElement.play().catch(() => {});
      this.isCurrentlyPaused = false;
      this.notifyState();
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        this.isCurrentlyPaused = false;
        this.notifyState();
      } catch {
        // Ignore
      }
    }
  }

  public replaySpeech(onEnd?: () => void) {
    if (!this.lastSpokenText) return;
    if (this.lastSpokenLang === 'en') {
      this.speakEnglish(this.lastSpokenText, onEnd);
    } else {
      this.speakVietnamese(this.lastSpokenText, onEnd);
    }
  }

  public isSpeaking(): boolean {
    return this.isCurrentlySpeaking;
  }

  public isPaused(): boolean {
    return this.isCurrentlyPaused;
  }

  // --- SETTINGS ACCESSORS ---

  public setSpeechRate(rate: number) {
    this.speechRate = Math.min(1.5, Math.max(0.5, rate));
    this.saveSettings();
    this.notifyState();
  }

  public getSpeechRate(): number {
    return this.speechRate;
  }

  public setSpeechPitch(pitch: number) {
    this.speechPitch = Math.min(1.5, Math.max(0.7, pitch));
    this.saveSettings();
    this.notifyState();
  }

  public getSpeechPitch(): number {
    return this.speechPitch;
  }

  public setSpeechVolume(vol: number) {
    this.speechVolume = Math.min(1.0, Math.max(0.0, vol));
    this.saveSettings();
    this.notifyState();
  }

  public getSpeechVolume(): number {
    return this.speechVolume;
  }

  public setSelectedVoice(voiceURI: string) {
    this.selectedVoiceURI = voiceURI;
    this.saveSettings();
    this.notifyState();
  }

  public getSelectedVoiceURI(): string {
    return this.selectedVoiceURI;
  }

  public setTtsEngine(engine: TtsEngine) {
    this.ttsEngine = engine;
    this.saveSettings();
    this.notifyState();
  }

  public getTtsEngine(): TtsEngine {
    return this.ttsEngine;
  }
}

export const soundManager = new SoundController();
