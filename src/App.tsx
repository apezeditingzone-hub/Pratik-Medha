import React, { useState, useEffect } from 'react';
import { BootScreen } from './components/BootScreen';
import { Portfolio } from './components/Portfolio';
import { BOOT_CONFIG } from './config/bootConfig';

export const App: React.FC = () => {
  const [isBootComplete, setIsBootComplete] = useState<boolean>(() => {
    if (!BOOT_CONFIG.BOOT_ENABLED) return true;
    if (typeof window !== 'undefined' && !BOOT_CONFIG.SHOW_EVERY_VISIT) {
      const hasBooted = sessionStorage.getItem('ai_boot_completed');
      return hasBooted === 'true';
    }
    return false;
  });

  const handleBootComplete = () => {
    sessionStorage.setItem('ai_boot_completed', 'true');
    setIsBootComplete(true);
  };

  const handleReplayBoot = () => {
    setIsBootComplete(false);
  };

  return (
    <main className="w-full min-h-screen bg-cyber-dark overflow-x-hidden">
      {!isBootComplete ? (
        <BootScreen onComplete={handleBootComplete} />
      ) : (
        <Portfolio onReplayBoot={handleReplayBoot} />
      )}
    </main>
  );
};

export default App;
