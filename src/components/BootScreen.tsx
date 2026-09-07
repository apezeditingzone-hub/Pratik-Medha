import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FastForward } from 'lucide-react';
import { AICore } from './AICore';
import { CoreRings } from './CoreRings';
import { Particles } from './Particles';
import { HUD } from './HUD';
import { BootMessages } from './BootMessages';
import { LoadingProgress } from './LoadingProgress';
import { VoiceSystem } from './VoiceSystem';
import { BootTransition } from './BootTransition';
import { BOOT_CONFIG } from '../config/bootConfig';
import { aiVoice } from '../utils/speech';

interface BootScreenProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

export const BootScreen: React.FC<BootScreenProps> = ({
  onComplete,
  reducedMotion = false
}) => {
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const voiceSpokenRef = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const duration = BOOT_CONFIG.BOOT_DURATION;
    const intervalMs = 25;
    const totalSteps = duration / intervalMs;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentPct = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setProgress(currentPct);

      // Voice triggers at milestones
      if (currentPct >= 5 && !voiceSpokenRef.current['init']) {
        voiceSpokenRef.current['init'] = true;
        aiVoice.speak('Initializing system.');
      } else if (currentPct >= 50 && !voiceSpokenRef.current['loading']) {
        voiceSpokenRef.current['loading'] = true;
        aiVoice.speak('Loading portfolio.');
      } else if (currentPct >= 98 && !voiceSpokenRef.current['online']) {
        voiceSpokenRef.current['online'] = true;
        aiVoice.speak('System online. Welcome.');
      }

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        handleCinematicFinish();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, []);

  const handleCinematicFinish = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  const handleSkip = () => {
    aiVoice.stop();
    setProgress(100);
    handleCinematicFinish();
  };

  return (
    <div className="fixed inset-0 z-50 bg-cyber-dark text-white flex flex-col items-center justify-center overflow-hidden font-sans select-none">
      {/* Background Star Particles */}
      <Particles count={reducedMotion ? 15 : 40} />

      {/* Futuristic HUD Overlay */}
      <HUD progress={progress} />

      {/* Main Central 3D AI Core Container */}
      <motion.div
        animate={
          isTransitioning
            ? { scale: [1, 1.25, 0], opacity: [1, 1, 0] }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="relative flex items-center justify-center w-full max-w-[550px] aspect-square my-auto"
      >
        {/* Concentric HUD Rings */}
        <CoreRings progress={progress} />

        {/* 3D Three.js Interactive Core */}
        <AICore
          progress={progress}
          isCinematicActive={isTransitioning}
          reducedMotion={reducedMotion}
        />

        {/* Core Center Progress Readout */}
        <div className="absolute pointer-events-none">
          <LoadingProgress progress={progress} />
        </div>
      </motion.div>

      {/* Bottom Controls & Diagnostics */}
      <div className="relative z-30 flex flex-col items-center gap-4 w-full pb-8 sm:pb-10">
        {/* Terminal Boot Messages */}
        <BootMessages progress={progress} />

        {/* Voice and Skip Controls */}
        <div className="flex items-center gap-4 mt-2">
          <VoiceSystem />

          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs bg-cyber-panel/60 border border-cyber-border text-gray-300 hover:text-cyber-cyan hover:border-cyber-cyan hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all duration-300 backdrop-blur-md"
            title="Skip directly to portfolio"
          >
            <span>SKIP INTRO</span>
            <FastForward size={14} />
          </button>
        </div>
      </div>

      {/* Cinematic Flash & Implosion Transition */}
      <AnimatePresence>
        {isTransitioning && <BootTransition isActive={isTransitioning} />}
      </AnimatePresence>
    </div>
  );
};
