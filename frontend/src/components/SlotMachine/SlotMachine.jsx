import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaPlay,
  FaRedo,
  FaMinus,
  FaPlus,
  FaCoins,
  FaTrophy,
  FaVolumeMute,
  FaVolumeUp,
  FaUndoAlt,
} from 'react-icons/fa';
import { SYMBOL_MAP } from '../../gameplay/symbols';
import { gameplayService } from '../../services/gameplayService';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const SlotMachine = ({ gameId, gameTitle, minBet = 10, maxBet = 5000 }) => {
  const { balance, setBalance, isAuthenticated } = useAuth();

  const [bet, setBet] = useState(100);
  const [spinning, setSpinning] = useState(false);
  const [autoSpin, setAutoSpin] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [winningLines, setWinningLines] = useState([]);
  const [muted, setMuted] = useState(false);

  // Initial 5x3 Grid (Symbols IDs)
  const [grid, setGrid] = useState([
    ['pearl', 'coral', 'trident'],
    ['coral', 'fish', 'diamond'],
    ['trident', 'pearl', 'kraken'],
    ['fish', 'coral', 'shark'],
    ['pearl', 'diamond', 'wild'],
  ]);

  const autoSpinRef = useRef(autoSpin);
  useEffect(() => {
    autoSpinRef.current = autoSpin;
  }, [autoSpin]);

  const handleBetChange = (delta) => {
    if (spinning) return;
    const newBet = bet + delta;
    if (newBet >= minBet && newBet <= maxBet) {
      setBet(newBet);
    }
  };

  const handleMaxBet = () => {
    if (spinning) return;
    setBet(Math.min(maxBet, balance));
  };

  const handleSpin = async () => {
    if (spinning) return;

    if (!isAuthenticated) {
      toast.error('Please log in or register to play demo slot games.');
      return;
    }

    if (balance < bet) {
      toast.error('Insufficient demo credits! Click reset to get 10,000 coins.');
      setAutoSpin(false);
      return;
    }

    setSpinning(true);
    setWinningLines([]);
    setLastWin(0);

    try {
      // Execute server-side spin calculation & balance update
      const data = await gameplayService.spin(gameId, bet);

      if (data.success) {
        // Animate reel spin for 1.2 seconds
        setTimeout(() => {
          setGrid(data.result.reels);
          setLastWin(data.result.win);
          setWinningLines(data.result.winning_lines || []);
          setBalance(data.balance);
          setSpinning(false);

          if (data.result.win > 0) {
            toast.success(`🎉 WIN! You won ${data.result.win.toLocaleString()} Coins!`, {
              icon: '💰',
              duration: 3000,
            });
          }

          // Trigger next auto-spin if enabled
          if (autoSpinRef.current) {
            setTimeout(() => {
              if (autoSpinRef.current) handleSpin();
            }, 1000);
          }
        }, 1000);
      } else {
        toast.error(data.message || 'Spin failed.');
        setSpinning(false);
        setAutoSpin(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Network error during spin.');
      setSpinning(false);
      setAutoSpin(false);
    }
  };

  const handleResetBalance = async () => {
    try {
      const data = await gameplayService.resetBalance();
      if (data.success) {
        setBalance(10000);
        toast.success('Demo Balance reset to 10,000 coins!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset balance');
    }
  };

  // Helper check if symbol at (reel, row) is part of a winning payline
  const isWinningCell = (reelIdx, rowIdx) => {
    if (!winningLines || winningLines.length === 0) return false;
    return winningLines.some((wl) =>
      wl.positions?.some(([r, row]) => r === reelIdx && row === rowIdx)
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel rounded-3xl p-4 sm:p-8 border border-ocean-700/80 shadow-2xl overflow-hidden relative">
      
      {/* Top Game Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-ocean-700/60">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide flex items-center gap-2">
            <span>{gameTitle || 'Ocean Fortune'}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-glow border border-cyan-400/40 font-bold uppercase">
              5 Reels • 20 Paylines
            </span>
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMuted(!muted)}
            className="p-2.5 rounded-xl bg-ocean-800 border border-ocean-700 text-slate-300 hover:text-cyan-glow transition-colors"
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>

      {/* Main Reels Cabinet Display */}
      <div className="relative my-6 p-4 sm:p-6 rounded-2xl bg-ocean-950 border-2 border-cyan-500/40 shadow-inner overflow-hidden">
        
        {/* Glow ambient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-cyan-500/20 blur-xl rounded-full pointer-events-none" />

        {/* 5 Reels Frame */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4 relative z-10">
          {grid.map((reel, reelIdx) => (
            <div
              key={reelIdx}
              className="flex flex-col gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl bg-ocean-900/90 border border-ocean-800 shadow-md relative overflow-hidden"
            >
              {reel.map((symbolId, rowIdx) => {
                const sym = SYMBOL_MAP[symbolId] || SYMBOL_MAP['pearl'];
                const isWin = isWinningCell(reelIdx, rowIdx);

                return (
                  <motion.div
                    key={`${reelIdx}-${rowIdx}`}
                    animate={
                      spinning
                        ? { y: [0, -100, 0] }
                        : isWin
                        ? { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }
                        : { scale: 1 }
                    }
                    transition={
                      spinning
                        ? { repeat: Infinity, duration: 0.15 + reelIdx * 0.05, ease: 'linear' }
                        : isWin
                        ? { duration: 0.6, repeat: Infinity, repeatType: 'reverse' }
                        : { duration: 0.2 }
                    }
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 text-center transition-all ${
                      isWin
                        ? 'bg-gradient-to-tr from-amber-500/30 to-yellow-600/30 border-2 border-gold-glow shadow-glow-gold z-20'
                        : 'bg-ocean-850/80 border border-ocean-700/60'
                    }`}
                  >
                    <span className="text-2xl sm:text-4xl drop-shadow-md select-none">
                      {sym.icon}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 truncate w-full mt-1">
                      {sym.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3 my-4">
        {/* Balance Display */}
        <div className="p-3 rounded-2xl glass-panel border border-ocean-700 flex flex-col items-center justify-center text-center relative group">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <FaCoins className="text-gold-400" /> Balance
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-lg sm:text-xl font-black text-amber-300">
              {balance.toLocaleString()}
            </span>
            <button
              type="button"
              onClick={handleResetBalance}
              title="Reset / Refill 10,000 demo coins"
              className="text-slate-400 hover:text-cyan-400 p-1 transition-colors"
            >
              <FaUndoAlt className="text-xs" />
            </button>
          </div>
        </div>

        {/* Bet Display */}
        <div className="p-3 rounded-2xl glass-panel border border-cyan-500/40 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-extrabold text-cyan-glow uppercase tracking-widest">
            Current Bet
          </span>
          <span className="text-lg sm:text-xl font-black text-cyan-400 mt-0.5">
            {bet.toLocaleString()}
          </span>
        </div>

        {/* Win Display */}
        <div className={`p-3 rounded-2xl glass-panel border flex flex-col items-center justify-center text-center transition-all ${
          lastWin > 0 ? 'border-amber-400 bg-amber-500/10 shadow-glow-gold' : 'border-ocean-700'
        }`}>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <FaTrophy className="text-gold-400" /> Last Win
          </span>
          <span className={`text-lg sm:text-xl font-black mt-0.5 ${lastWin > 0 ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`}>
            {lastWin > 0 ? `+${lastWin.toLocaleString()}` : '0'}
          </span>
        </div>
      </div>

      {/* Control Dashboard */}
      <div className="p-4 sm:p-6 rounded-2xl glass-panel border border-ocean-700 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Bet Selector */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-center">
          <button
            onClick={() => handleBetChange(-10)}
            disabled={spinning || bet <= minBet}
            className="w-10 h-10 rounded-xl bg-ocean-800 border border-ocean-700 text-slate-300 hover:text-cyan-glow disabled:opacity-40 flex items-center justify-center font-bold"
          >
            <FaMinus />
          </button>
          
          <div className="flex flex-col items-center px-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Bet Amount</span>
            <span className="text-base font-black text-white">{bet}</span>
          </div>

          <button
            onClick={() => handleBetChange(10)}
            disabled={spinning || bet >= maxBet}
            className="w-10 h-10 rounded-xl bg-ocean-800 border border-ocean-700 text-slate-300 hover:text-cyan-glow disabled:opacity-40 flex items-center justify-center font-bold"
          >
            <FaPlus />
          </button>

          <button
            onClick={handleMaxBet}
            disabled={spinning}
            className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/30 to-yellow-600/30 border border-amber-500/50 text-gold-400 hover:text-white text-xs font-black uppercase tracking-wider disabled:opacity-40"
          >
            MAX BET
          </button>
        </div>

        {/* Action Spin Buttons */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-center">
          
          {/* Auto Spin Toggle */}
          <button
            onClick={() => setAutoSpin(!autoSpin)}
            disabled={spinning && !autoSpin}
            className={`px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center space-x-2 border transition-all ${
              autoSpin
                ? 'bg-amber-500 text-ocean-950 border-amber-400 shadow-glow-gold animate-pulse'
                : 'bg-ocean-800 border-ocean-700 text-slate-300 hover:text-cyan-glow'
            }`}
          >
            <FaRedo className={autoSpin ? 'animate-spin' : ''} />
            <span>{autoSpin ? 'STOP AUTO' : 'AUTO SPIN'}</span>
          </button>

          {/* Big Spin Button */}
          <button
            onClick={handleSpin}
            disabled={spinning}
            className={`px-8 py-4 rounded-2xl font-black text-lg text-white uppercase tracking-widest flex items-center space-x-3 shadow-2xl transition-all transform ${
              spinning
                ? 'bg-slate-700 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:shadow-glow-cyan hover:scale-105 active:scale-95'
            }`}
          >
            <FaPlay className="text-base" />
            <span>{spinning ? 'SPINNING...' : 'SPIN'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
