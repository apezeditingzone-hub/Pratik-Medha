import React from 'react';
import { motion } from 'framer-motion';

interface BootTransitionProps {
  isActive: boolean;
}

export const BootTransition: React.FC<BootTransitionProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
    >
      {/* High-intensity Energy Shockwave */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: [0.2, 2.5, 40], opacity: [0.9, 1, 0] }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="absolute w-40 h-40 rounded-full bg-radial from-white via-cyber-cyan to-transparent shadow-[0_0_80px_#00f0ff]"
      />

      {/* Screen Flash Curtain */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.95, 0] }}
        transition={{ duration: 0.75, ease: 'easeInOut' }}
        className="absolute inset-0 bg-white"
      />

      {/* Warp Grid Lines Distortion */}
      <motion.div
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="absolute inset-0 border-4 border-cyber-cyan rounded-full"
      />
    </motion.div>
  );
};
