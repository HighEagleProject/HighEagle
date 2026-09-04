import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaHeart, FaRegHeart, FaStar, FaFire, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';
import { useDispatch } from 'react-redux';
import { openAuthModal } from '../../store/slices/uiSlice';

// Platform-specific styling & brand themes
const GAME_THEMES = {
  firekirin: {
    gradient: 'from-amber-600 via-rose-700 to-red-950',
    accentColor: '#f97316',
    icon: '🔥',
    tagline: 'Fish Hunting & Ocean Raids',
    badge: 'High Demand',
  },
  vblink: {
    gradient: 'from-cyan-600 via-blue-700 to-indigo-950',
    accentColor: '#06b6d4',
    icon: '⚡',
    tagline: 'Golden Dragon & Buffalo',
    badge: 'VIP Web Portal',
  },
  orionstar: {
    gradient: 'from-amber-500 via-yellow-600 to-ocean-950',
    accentColor: '#eab308',
    icon: '🌟',
    tagline: 'Fish Hunter & Keno Suite',
    badge: 'Instant Play',
  },
  juwa: {
    gradient: 'from-purple-600 via-violet-800 to-slate-950',
    accentColor: '#a855f7',
    icon: '🎰',
    tagline: 'VIP 777 Slots & Arcade',
    badge: 'Hot Jackpot',
  },
  gamevault: {
    gradient: 'from-emerald-500 via-teal-700 to-slate-950',
    accentColor: '#10b981',
    icon: '🏦',
    tagline: 'Vault Jackpots & Fish Tables',
    badge: 'Top Tier',
  },
  milkyway: {
    gradient: 'from-fuchsia-600 via-purple-800 to-slate-950',
    accentColor: '#d946ef',
    icon: '🌌',
    tagline: 'Cosmic Ocean Catching',
    badge: 'Mobile App',
  },
  gameroom: {
    gradient: 'from-rose-600 via-red-800 to-stone-950',
    accentColor: '#f43f5e',
    icon: '🕹️',
    tagline: 'Classic Vegas 777 Cabinets',
    badge: 'Classic Reels',
  },
  ultrapanda: {
    gradient: 'from-teal-500 via-emerald-700 to-slate-950',
    accentColor: '#14b8a6',
    icon: '🐼',
    tagline: 'Oriental Slots & Fishing',
    badge: 'HTML5 Web',
  },
};

export const GameCard = ({
  id,
  title,
  slug,
  thumbnail,
  play_url,
  provider,
  category_name,
  isNew,
  isPopular,
  isFavorite,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { toggleFavorite } = useGame();

  const theme = GAME_THEMES[slug?.toLowerCase()] || {
    gradient: 'from-cyan-900 via-blue-950 to-ocean-950',
    accentColor: '#00f2fe',
    icon: '🎮',
    tagline: 'Sweepstakes Gaming Platform',
    badge: 'Verified',
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      dispatch(openAuthModal('login'));
      return;
    }
    toggleFavorite(id, isFavorite);
  };

  // Direct play opens the verified player link
  const handleDirectLaunch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (play_url) {
      window.open(play_url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(`/games/${slug}`);
    }
  };

  const handleCardClick = () => {
    navigate(`/games/${slug}`);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-2xl overflow-hidden glass-card cursor-pointer border border-ocean-700/60 hover:border-cyan-glow/80 shadow-xl transition-all duration-300 flex flex-col justify-between"
      onClick={handleCardClick}
    >
      {/* Visual Artwork Banner */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ocean-950">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${theme.gradient} flex flex-col items-center justify-center p-4 text-center relative overflow-hidden`}>
            {/* Background ambient decorative shapes */}
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-black/30 blur-lg pointer-events-none" />

            <span className="text-5xl mb-2 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
              {theme.icon}
            </span>
            <span className="text-base font-black text-white tracking-wide uppercase drop-shadow-md px-2">
              {title}
            </span>
            <span className="text-[10px] font-medium text-slate-200/80 mt-1 line-clamp-1">
              {theme.tagline}
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-ocean-950 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE PORTAL
          </span>
          {isPopular && (
            <span className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-ocean-950 shadow-md">
              <FaFire className="text-[8px]" /> HOT
            </span>
          )}
          {isNew && (
            <span className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-cyan-500 text-ocean-950 shadow-md">
              <FaStar className="text-[8px]" /> NEW
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2.5 right-2.5 p-2 rounded-full glass-panel text-slate-300 hover:text-rose-400 transition-colors z-20 shadow-md"
          title={isFavorite ? 'Remove Favorite' : 'Add Favorite'}
        >
          {isFavorite ? (
            <FaHeart className="text-rose-500 text-xs" />
          ) : (
            <FaRegHeart className="text-xs" />
          )}
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-ocean-950/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 gap-2 z-15">
          <button
            onClick={handleDirectLaunch}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-glow-cyan flex items-center justify-center gap-2 transform hover:scale-105 transition-all"
          >
            <FaPlay className="text-[10px]" />
            <span>PLAY NOW</span>
            <FaExternalLinkAlt className="text-[9px] opacity-80" />
          </button>

          <button
            onClick={handleCardClick}
            className="w-full py-2 px-3 rounded-xl bg-ocean-800/90 hover:bg-ocean-700 text-slate-200 text-[11px] font-bold border border-ocean-600 flex items-center justify-center gap-1.5 transition-all"
          >
            <FaInfoCircle className="text-cyan-glow" />
            <span>Portal Details</span>
          </button>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-3.5 bg-ocean-900/90 border-t border-ocean-800/80">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-black text-white group-hover:text-cyan-glow transition-colors truncate">
              {title}
            </h3>
            <p className="text-[11px] font-medium text-slate-400 truncate">
              {provider || 'Sweepstakes VIP'}
            </p>
          </div>
          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md bg-ocean-800 text-cyan-300 border border-ocean-700">
            {category_name || 'Sweepstakes'}
          </span>
        </div>

        {/* Quick Launch Link Bar */}
        <div className="mt-3 pt-2.5 border-t border-ocean-800/60 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Player Link
          </span>
          <button
            onClick={handleDirectLaunch}
            className="text-[11px] font-black text-cyan-glow hover:underline flex items-center gap-1"
          >
            Direct Link <FaExternalLinkAlt className="text-[9px]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
