import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { aiVoice } from '../utils/speech';

interface VoiceSystemProps {
  onToggle?: (enabled: boolean) => void;
}

export const VoiceSystem: React.FC<VoiceSystemProps> = ({ onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(aiVoice.getEnabled());

  const toggleVoice = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    aiVoice.setEnabled(newState);
    if (newState) {
      aiVoice.speak('Voice assistant activated.');
    }
    if (onToggle) onToggle(newState);
  };

  return (
    <button
      onClick={toggleVoice}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs transition-all duration-300 backdrop-blur-md border ${
        isEnabled
          ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.4)]'
          : 'bg-cyber-panel/60 border-cyber-border/60 text-gray-400 hover:text-white hover:border-gray-400'
      }`}
      title="Toggle AI Voice Assistance"
      aria-label="Toggle AI Voice Assistance"
    >
      {isEnabled ? <Volume2 size={14} className="animate-pulse" /> : <VolumeX size={14} />}
      <span className="tracking-wider">AI VOICE: {isEnabled ? 'ON' : 'OFF'}</span>
    </button>
  );
};
