import React from 'react';
import { FaShieldAlt, FaCoins, FaBan, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export const ResponsiblePlayPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-10 pb-16">
      
      {/* Title Header */}
      <div className="text-center glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center text-3xl mx-auto">
          <FaShieldAlt />
        </div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          RESPONSIBLE ENTERTAINMENT & VIRTUAL PLAY
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto">
          High Eagle is strictly a free social casino simulation platform designed for entertainment purposes only.
        </p>
      </div>

      {/* Core Disclaimers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="glass-panel p-6 rounded-2xl border border-ocean-700 space-y-3">
          <div className="flex items-center space-x-3 text-cyan-glow font-bold text-base">
            <FaCoins />
            <span>Virtual Credits Only</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All players receive 10,000 free demo coins upon account registration. Demo coins have zero monetary value and cannot be exchanged, transferred, or redeemed for real money.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-ocean-700 space-y-3">
          <div className="flex items-center space-x-3 text-rose-400 font-bold text-base">
            <FaBan />
            <span>No Deposits or Withdrawals</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            There are no payment gateways, deposit methods, or cashout facilities. High Eagle does not store credit card or payment information of any kind.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-ocean-700 space-y-3">
          <div className="flex items-center space-x-3 text-amber-400 font-bold text-base">
            <FaExclamationTriangle />
            <span>No Real-Money Gambling</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            This application is purely a software simulation of slot mechanics. Success in virtual demo games does not imply future success in real-money gambling environments.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-ocean-700 space-y-3">
          <div className="flex items-center space-x-3 text-emerald-400 font-bold text-base">
            <FaCheckCircle />
            <span>Fair Server Simulation</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our backend uses transparent weighted probability engines to simulate realistic slot reel spins, payline calculations, and return-to-player (RTP) statistics.
          </p>
        </div>
      </div>

      {/* Principles Section */}
      <div className="glass-panel p-8 rounded-3xl border border-ocean-700 space-y-4">
        <h3 className="text-lg font-bold text-white">Entertainment Best Practices</h3>
        <ul className="space-y-3 text-xs text-slate-300 list-disc list-inside leading-relaxed">
          <li>Play strictly for fun and relaxation.</li>
          <li>Never treat virtual slot gaming as a source of income.</li>
          <li>Take regular breaks to enjoy real-world activities.</li>
          <li>If you feel your gaming habits are becoming unmanageable, consider taking a break from gaming platforms.</li>
        </ul>
      </div>
    </div>
  );
};
