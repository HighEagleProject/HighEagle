import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md glass-panel rounded-3xl p-6 border border-ocean-700 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-ocean-700/60 mb-4">
            <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-ocean-800 text-slate-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div>{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
