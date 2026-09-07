import React from 'react';

interface HUDProps {
  progress: number;
}

export const HUD: React.FC<HUDProps> = ({ progress }) => {
  return (
    <div className="absolute inset-0 pointer-events-none p-4 sm:p-8 flex flex-col justify-between z-20 font-mono text-xs text-cyber-cyan select-none">
      {/* Subtle CRT Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />

      {/* Moving Laser Scan Bar */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent shadow-[0_0_12px_#00f0ff] opacity-40 animate-scanline pointer-events-none" />

      {/* --- TOP HUD BAR --- */}
      <div className="flex justify-between items-start">
        {/* Top Left */}
        <div className="flex flex-col gap-1 border-l-2 border-cyber-cyan pl-3 py-1 bg-cyber-panel/60 backdrop-blur-md rounded-r border-t border-b border-r border-cyber-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse shadow-[0_0_6px_#00f0ff]" />
            <span className="font-display font-bold tracking-widest text-sm text-white">
              PORTFOLIO.OS
            </span>
          </div>
          <span className="text-[10px] text-cyber-cyan/70 tracking-wider">
            SYSTEM BOOTING // v2.4
          </span>
          <div className="flex gap-2 text-[9px] text-gray-400 mt-1">
            <span>MEM: 64.2%</span>
            <span>•</span>
            <span>CYCLE: 120Hz</span>
          </div>
        </div>

        {/* Top Right */}
        <div className="flex flex-col items-end gap-1 border-r-2 border-cyber-cyan pr-3 py-1 bg-cyber-panel/60 backdrop-blur-md rounded-l border-t border-b border-l border-cyber-border text-right">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-cyber-cyan/70 tracking-wider">
              CORE STATUS
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          </div>
          <span className="font-display font-bold tracking-widest text-sm text-emerald-400">
            ONLINE
          </span>
          <div className="text-[9px] text-gray-400 mt-1">
            TEMP: 24.8°C | FLUX: 98.4%
          </div>
        </div>
      </div>

      {/* --- CORNER GEOMETRIC ACCENTS --- */}
      <div className="hidden md:flex justify-between items-center text-[10px] text-cyber-cyan/40 px-2">
        <div className="flex items-center gap-2">
          <span>LAT 19.0760° N</span>
          <div className="w-12 h-[1px] bg-cyber-cyan/30" />
          <span>LON 72.8777° E</span>
        </div>
        <div className="flex items-center gap-2">
          <span>QUANTUM BUFFER: SYNCED</span>
          <div className="w-12 h-[1px] bg-cyber-cyan/30" />
          <span>FREQ: 432.08 MHz</span>
        </div>
      </div>

      {/* --- BOTTOM HUD BAR --- */}
      <div className="flex justify-between items-end">
        {/* Bottom Left */}
        <div className="flex flex-col gap-1 border-l-2 border-cyber-cyan pl-3 py-1 bg-cyber-panel/60 backdrop-blur-md rounded-r border-t border-b border-r border-cyber-border">
          <div className="text-[10px] text-cyber-cyan/70 tracking-wider">
            NETWORK
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xs text-white tracking-widest">
              CONNECTED
            </span>
            <span className="text-[9px] text-emerald-400 bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-500/30">
              0.12ms
            </span>
          </div>
        </div>

        {/* Bottom Right */}
        <div className="flex flex-col items-end gap-1 border-r-2 border-cyber-cyan pr-3 py-1 bg-cyber-panel/60 backdrop-blur-md rounded-l border-t border-b border-l border-cyber-border text-right">
          <div className="text-[10px] text-cyber-cyan/70 tracking-wider">
            SYSTEM
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xs text-white tracking-widest">
              STABLE
            </span>
            <span className="text-[9px] text-cyan-400 bg-cyan-950/60 px-1 py-0.5 rounded border border-cyan-500/30">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
