import React, { useEffect, useState } from 'react';
import { SYSTEM_MESSAGES } from '../config/bootConfig';

interface BootMessagesProps {
  progress: number;
}

export const BootMessages: React.FC<BootMessagesProps> = ({ progress }) => {
  const [displayedIndex, setDisplayedIndex] = useState(0);

  useEffect(() => {
    // Map progress (0-100) to message index (0 to SYSTEM_MESSAGES.length - 1)
    const index = Math.min(
      Math.floor((progress / 100) * SYSTEM_MESSAGES.length),
      SYSTEM_MESSAGES.length - 1
    );
    setDisplayedIndex(index);
  }, [progress]);

  const currentMessage = SYSTEM_MESSAGES[displayedIndex] || SYSTEM_MESSAGES[0];

  return (
    <div className="flex flex-col items-center gap-2 max-w-md w-full px-4 select-none">
      {/* Dynamic Terminal Line */}
      <div className="flex items-center gap-2 bg-cyber-panel/80 border border-cyber-border px-4 py-2 rounded-md backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] w-full justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-cyber-cyan font-mono text-sm tracking-wider font-semibold">
            {currentMessage}
          </span>
          <span className="w-2 h-4 bg-cyber-cyan inline-block animate-pulse" />
        </div>
        <span className="text-[10px] font-mono text-gray-400 shrink-0">
          LOG [{displayedIndex + 1}/{SYSTEM_MESSAGES.length}]
        </span>
      </div>

      {/* Pre-launch Identity & Capability Scanner */}
      {progress > 65 && (
        <div className="w-full grid grid-cols-2 gap-2 text-[10px] font-mono animate-fadeIn">
          <div className="bg-cyber-panel/50 border border-cyber-border/40 p-1.5 rounded flex justify-between">
            <span className="text-gray-400">IDENTITY:</span>
            <span className="text-cyber-cyan font-bold">DEVELOPER</span>
          </div>
          <div className="bg-cyber-panel/50 border border-cyber-border/40 p-1.5 rounded flex justify-between">
            <span className="text-gray-400">PROJECTS:</span>
            <span className="text-emerald-400 font-bold">READY</span>
          </div>
          <div className="bg-cyber-panel/50 border border-cyber-border/40 p-1.5 rounded flex justify-between">
            <span className="text-gray-400">SKILLS:</span>
            <span className="text-cyan-300 font-bold">LOADED</span>
          </div>
          <div className="bg-cyber-panel/50 border border-cyber-border/40 p-1.5 rounded flex justify-between">
            <span className="text-gray-400">EXPERIENCE:</span>
            <span className="text-purple-300 font-bold">VERIFIED</span>
          </div>
        </div>
      )}
    </div>
  );
};
