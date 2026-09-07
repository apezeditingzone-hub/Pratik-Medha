import React from 'react';

interface LoadingProgressProps {
  progress: number;
}

export const LoadingProgress: React.FC<LoadingProgressProps> = ({ progress }) => {
  const getPhaseLabel = (pct: number) => {
    if (pct < 25) return 'INITIALIZING...';
    if (pct < 50) return 'LOADING SYSTEM...';
    if (pct < 75) return 'LOADING PORTFOLIO...';
    if (pct < 100) return 'PREPARING INTERFACE...';
    return 'SYSTEM ONLINE';
  };

  const phase = getPhaseLabel(progress);
  const isOnline = progress >= 100;

  return (
    <div className="flex flex-col items-center justify-center select-none pointer-events-none z-10">
      {/* Large Digital Percentage */}
      <div className="flex items-baseline gap-1 font-display font-black text-3xl sm:text-5xl text-white tracking-widest drop-shadow-[0_0_20px_rgba(0,240,255,0.8)]">
        <span>{progress}</span>
        <span className="text-cyber-cyan text-xl sm:text-2xl font-mono">%</span>
      </div>

      {/* Phase Status Subtitle */}
      <div
        className={`mt-1 font-mono text-xs sm:text-sm tracking-[0.25em] font-semibold transition-colors duration-300 ${
          isOnline ? 'text-emerald-400 drop-shadow-[0_0_8px_#34d399]' : 'text-cyber-cyan drop-shadow-[0_0_8px_#00f0ff]'
        }`}
      >
        {phase}
      </div>

      {/* Progress Track Rail */}
      <div className="w-48 sm:w-64 h-1.5 bg-cyber-dark/80 border border-cyber-border rounded-full mt-3 p-0.5 overflow-hidden backdrop-blur-sm shadow-[0_0_10px_rgba(0,240,255,0.2)]">
        <div
          className="h-full bg-gradient-to-r from-cyber-blue via-cyber-cyan to-white rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_#00f0ff]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
