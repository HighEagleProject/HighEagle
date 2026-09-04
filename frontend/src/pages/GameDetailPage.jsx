import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gameService } from '../services/gameService';
import { GameGrid } from '../components/GameGrid/GameGrid';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { useDispatch } from 'react-redux';
import { openAuthModal } from '../store/slices/uiSlice';
import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaExternalLinkAlt,
  FaCopy,
  FaCheck,
  FaMobileAlt,
  FaDesktop,
  FaShieldAlt,
  FaGamepad,
  FaInfoCircle,
  FaHeadset
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const PLATFORM_ICONS = {
  firekirin: { icon: '🔥', theme: 'from-amber-500 via-rose-600 to-red-950', badge: 'Premier Fish Table' },
  vblink: { icon: '⚡', theme: 'from-cyan-500 via-blue-600 to-indigo-950', badge: 'Golden Dragon VIP' },
  orionstar: { icon: '🌟', theme: 'from-amber-400 via-yellow-600 to-ocean-950', badge: 'Direct Web Portal' },
  juwa: { icon: '🎰', theme: 'from-purple-500 via-violet-700 to-indigo-950', badge: 'VIP 777 Slots' },
  gamevault: { icon: '🏦', theme: 'from-emerald-400 via-teal-600 to-slate-950', badge: 'Vault High Limit' },
  milkyway: { icon: '🌌', theme: 'from-fuchsia-500 via-purple-700 to-slate-950', badge: 'Cosmic Arcade' },
  gameroom: { icon: '🕹️', theme: 'from-rose-500 via-red-700 to-stone-950', badge: 'Classic Vegas Lounge' },
  ultrapanda: { icon: '🐼', theme: 'from-teal-400 via-emerald-600 to-slate-950', badge: 'HTML5 Cross-Play' },
};

export const GameDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAuth();
  const { toggleFavorite } = useGame();

  const [game, setGame] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [embedMode, setEmbedMode] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await gameService.getGameBySlug(slug);
        if (data.success) {
          setGame(data.game);

          // Fetch other sweepstakes games
          const allRes = await gameService.getGames({});
          const list = (allRes.results || allRes || []).filter((g) => g.id !== data.game.id).slice(0, 4);
          setRelated(list);
        }
      } catch (err) {
        console.error('Failed to load game detail', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      dispatch(openAuthModal('login'));
      return;
    }
    if (game) {
      toggleFavorite(game.id, game.is_favorite);
      setGame({ ...game, is_favorite: !game.is_favorite });
    }
  };

  const handleLaunchGame = () => {
    if (game?.play_url) {
      window.open(game.play_url, '_blank', 'noopener,noreferrer');
      toast.success(`Opening ${game.title} official player portal...`);
    } else {
      toast.error('Player link not found for this platform.');
    }
  };

  const handleCopyLink = () => {
    if (game?.play_url) {
      navigator.clipboard.writeText(game.play_url);
      setCopied(true);
      toast.success('Player website URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-cyan-glow font-bold animate-pulse space-y-3">
        <div className="text-4xl animate-bounce">🦅</div>
        <p className="text-base font-black">Connecting to High Eagle Sweepstakes Portal...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="py-20 text-center glass-panel rounded-3xl my-8 max-w-xl mx-auto border border-ocean-700">
        <span className="text-5xl mb-4 block">⚠️</span>
        <h2 className="text-2xl font-bold text-white mb-2">Game Platform Not Found</h2>
        <p className="text-xs text-slate-400 mb-6">The requested sweepstakes platform is not listed or has moved.</p>
        <button
          onClick={() => navigate('/games')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-glow-cyan"
        >
          Explore All Games
        </button>
      </div>
    );
  }

  const pConfig = PLATFORM_ICONS[game.slug?.toLowerCase()] || {
    icon: '🎰',
    theme: 'from-cyan-600 via-blue-800 to-ocean-950',
    badge: 'Verified Player Portal',
  };

  return (
    <div className="space-y-10 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Top Navigation & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-cyan-glow bg-ocean-900 border border-ocean-700 px-4 py-2 rounded-full transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Game Lounge</span>
        </button>

        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Official Player Server: Verified Online</span>
        </div>
      </div>

      {/* Main Portal Launch Cabinet */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-ocean-700/80 shadow-2xl p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Visual Icon / Platform Hero */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br ${pConfig.theme} flex items-center justify-center shadow-2xl border border-white/20 relative group mb-6`}>
              <span className="text-7xl sm:text-8xl drop-shadow-2xl">{pConfig.icon}</span>
              <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-ocean-950 border border-cyan-400/40 text-[10px] font-black uppercase tracking-wider text-cyan-glow shadow-md">
                {pConfig.badge}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              {game.title}
            </h1>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Provider: <span className="text-white">{game.provider}</span> • Category: <span className="text-cyan-400">{game.category_name || 'Sweepstakes'}</span>
            </p>
          </div>

          {/* Right Action & Launch Console */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-cyan-glow">
                Verified Sweepstakes Player Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                Direct Browser Access & Mobile Launcher
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {game.description}
              </p>
            </div>

            {/* Official Link Display Box */}
            <div className="p-3.5 rounded-2xl bg-ocean-950/80 border border-ocean-700/80 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                  Official Player Link (CheckMySweep Verified)
                </span>
                <p className="text-xs sm:text-sm font-mono text-cyan-300 truncate font-semibold">
                  {game.play_url || 'https://checkmysweep.com/'}
                </p>
              </div>
              <button
                onClick={handleCopyLink}
                className="shrink-0 px-3 py-2 rounded-xl bg-ocean-800 hover:bg-ocean-700 text-slate-200 text-xs font-bold border border-ocean-600 flex items-center gap-1.5 transition-colors"
                title="Copy Link"
              >
                {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleLaunchGame}
                className="flex-1 min-w-[200px] py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-ocean-950 font-black text-sm uppercase tracking-wider shadow-glow-cyan flex items-center justify-center gap-2.5 transform hover:scale-102 active:scale-98 transition-all"
              >
                <FaGamepad className="text-lg" />
                <span>Launch {game.title} Website</span>
                <FaExternalLinkAlt className="text-xs ml-1" />
              </button>

              <button
                onClick={handleFavoriteToggle}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-center ${
                  game.is_favorite
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-ocean-900/90 text-slate-300 border-ocean-700 hover:text-rose-400'
                }`}
                title={game.is_favorite ? 'Favorited' : 'Add to Favorites'}
              >
                {game.is_favorite ? <FaHeart className="text-rose-500 text-lg" /> : <FaRegHeart className="text-lg" />}
              </button>
            </div>

            {/* Platform Compatibility Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ocean-900 border border-ocean-700">
                <FaDesktop className="text-cyan-glow" /> Desktop Web Browser
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ocean-900 border border-ocean-700">
                <FaMobileAlt className="text-emerald-400" /> Mobile & Tablet (iOS & Android)
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ocean-900 border border-ocean-700">
                <FaShieldAlt className="text-amber-400" /> 100% Encrypted Player Link
              </span>
            </div>
          </div>
        </div>

        {/* Embedded Browser Option Toggle */}
        <div className="mt-8 pt-6 border-t border-ocean-800 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Want to test viewing the web client directly inside this portal?
          </p>
          <button
            onClick={() => setEmbedMode(!embedMode)}
            className="text-xs font-bold text-cyan-glow hover:underline border border-cyan-500/30 px-3 py-1.5 rounded-xl bg-ocean-900"
          >
            {embedMode ? '✕ Close Embedded View' : '🖥️ Toggle Embedded Web Client'}
          </button>
        </div>

        {/* Optional Embedded Frame */}
        {embedMode && (
          <div className="mt-6 rounded-2xl overflow-hidden border border-ocean-700 bg-black p-2">
            <div className="flex items-center justify-between p-2 bg-ocean-950 text-xs text-slate-400 mb-2 rounded-xl">
              <span className="truncate">Loading: {game.play_url}</span>
              <button
                onClick={handleLaunchGame}
                className="text-cyan-glow font-bold hover:underline flex items-center gap-1 ml-4"
              >
                Open in Full Window <FaExternalLinkAlt className="text-[10px]" />
              </button>
            </div>
            <iframe
              src={game.play_url}
              title={`${game.title} Player Portal`}
              className="w-full h-[600px] rounded-xl border border-ocean-800"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
            <p className="text-[10px] text-slate-500 text-center mt-2">
              Note: If the game platform restricts iframe embedding, click "Open in Full Window" above to launch directly.
            </p>
          </div>
        )}
      </div>

      {/* Sweepstakes Player Instructions & Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Step 1 */}
        <div className="glass-panel p-6 rounded-3xl border border-ocean-700 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-glow flex items-center justify-center font-black text-sm">
            1
          </div>
          <h3 className="text-base font-black text-white">Click "Launch Website"</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Click the launch button above or copy the verified player URL to open {game.title} directly in any modern web browser or mobile phone.
          </p>
        </div>

        {/* Step 2 */}
        <div className="glass-panel p-6 rounded-3xl border border-ocean-700 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h3 className="text-base font-black text-white">Enter Your Player ID & PIN</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Use your personal player credentials on the game screen to sign in. These credentials connect your balance across all arcade fish tables and slot reels.
          </p>
        </div>

        {/* Step 3 */}
        <div className="glass-panel p-6 rounded-3xl border border-ocean-700 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h3 className="text-base font-black text-white">Play & Win Prizes</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Play high-paying fish boss raids, multiplayer ocean battles, and slot jackpots with instant payouts and full mobile compatibility.
          </p>
        </div>
      </div>

      {/* Platform Features & Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Features Column */}
        <div className="md:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-ocean-700 space-y-6">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <FaInfoCircle className="text-cyan-glow" /> Platform Features & Game Modes
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {game.description}
          </p>

          {game.features && game.features.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                Supported Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {game.features.map((feature, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-ocean-900 border border-cyan-500/30 text-cyan-glow text-xs font-bold"
                  >
                    ✨ {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Specifications Column */}
        <div className="glass-panel p-6 rounded-3xl border border-ocean-700 space-y-4">
          <h3 className="text-base font-black text-white border-b border-ocean-800 pb-3 flex items-center gap-2">
            <FaShieldAlt className="text-cyan-glow" /> System Details
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-ocean-800/80">
              <span className="text-slate-400">Platform Type</span>
              <span className="font-bold text-white">Player Web Client</span>
            </div>
            <div className="flex justify-between py-1 border-b border-ocean-800/80">
              <span className="text-slate-400">Verification</span>
              <span className="font-bold text-emerald-400">CheckMySweep Verified</span>
            </div>
            <div className="flex justify-between py-1 border-b border-ocean-800/80">
              <span className="text-slate-400">Volatility</span>
              <span className="font-bold text-amber-400 uppercase">{game.volatility || 'High'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-ocean-800/80">
              <span className="text-slate-400">Estimated RTP</span>
              <span className="font-bold text-cyan-glow">{game.rtp || 97.0}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-ocean-800/80">
              <span className="text-slate-400">Access Mode</span>
              <span className="font-bold text-white">Direct URL / HTML5</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleLaunchGame}
              className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-glow font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <span>Direct Access</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Related Sweepstakes Games */}
      {related.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-ocean-800 pb-3">
            <h3 className="text-xl font-black text-white tracking-tight">
              Other Popular Sweepstakes Platforms
            </h3>
            <button
              onClick={() => navigate('/games')}
              className="text-xs font-bold text-cyan-glow hover:underline flex items-center gap-1"
            >
              View All 8 Platforms →
            </button>
          </div>
          <GameGrid games={related} skeletonCount={4} />
        </section>
      )}
    </div>
  );
};
