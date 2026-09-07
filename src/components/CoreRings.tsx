import React from 'react';

interface CoreRingsProps {
  progress: number;
}

export const CoreRings: React.FC<CoreRingsProps> = ({ progress }) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* Outer Rotating HUD SVG Ring */}
      <svg
        className="w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] animate-spin-slow opacity-40"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="0.8"
          strokeDasharray="4 8"
        />
        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="0.5"
          strokeDasharray="1 6"
        />
      </svg>

      {/* Counter-rotating Segmented Ring */}
      <svg
        className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] animate-spin-reverse opacity-60"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="76"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="1.5"
          strokeDasharray="30 40 10 40"
        />
        <circle
          cx="100"
          cy="100"
          r="68"
          fill="none"
          stroke="rgba(0, 240, 255, 0.3)"
          strokeWidth="0.75"
        />
      </svg>

      {/* Target Reticle Brackets */}
      <div className="absolute w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] pointer-events-none">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan opacity-80" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan opacity-80" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-cyan opacity-80" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan opacity-80" />
      </div>

      {/* Glowing Energy Aura */}
      <div
        className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full bg-cyber-cyan/10 blur-xl pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0.3 + (progress / 100) * 0.5 }}
      />
    </div>
  );
};
