class VoiceAssistant {
  private synth: SpeechSynthesis | null = null;
  private isEnabled: boolean = false;
  private selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Look for clear English / futuristic sounding voices (e.g. Google UK English, Samantha, Daniel, Natural)
    this.selectedVoice = 
      voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Enhanced'))) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0] ||
      null;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled && this.synth) {
      this.synth.cancel();
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public speak(text: string, options: { pitch?: number; rate?: number } = {}) {
    if (!this.isEnabled || !this.synth) return;

    try {
      this.synth.cancel(); // Stop any overlapping utterances
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }
      utterance.pitch = options.pitch ?? 1.05;
      utterance.rate = options.rate ?? 0.95;
      utterance.volume = 0.85;

      this.synth.speak(utterance);
    } catch (e) {
      console.warn("SpeechSynthesis error:", e);
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const aiVoice = new VoiceAssistant();
