import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ocean-950 text-white overflow-hidden"
    >
      {/* Background Animated Glow Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl animate-pulse-slow" />

      {/* Main Container */}
      <div className="relative z-10 text-center flex flex-col items-center px-4">
        
        {/* Logo Emblem */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-glow via-blue-600 to-indigo-600 p-[3px] shadow-glow-cyan mb-6"
        >
          <div className="w-full h-full bg-ocean-900 rounded-full flex items-center justify-center">
            <span className="text-5xl">🦅</span>
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-black tracking-wider text-gradient-cyan uppercase">
          HIGH EAGLE
        </h1>
        <p className="text-xs font-bold text-amber-400 tracking-widest uppercase mt-1 mb-8">
          SLOT ENTERTAINMENT
        </p>

        {/* Status Text */}
        <p className="text-sm font-semibold text-slate-300 mb-4">
          Loading your lobby...
        </p>

        {/* Ocean Wave Animated Dots */}
        <div className="flex items-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
              className="w-3 h-3 rounded-full bg-cyan-glow shadow-glow-cyan"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
