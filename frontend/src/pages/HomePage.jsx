import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaPlay,
  FaGamepad,
  FaArrowRight,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaMobileAlt,
  FaBolt,
  FaCheckCircle,
  FaHeadset
} from 'react-icons/fa';
import { gameService } from '../services/gameService';
import { GameGrid } from '../components/GameGrid/GameGrid';
import { CategoryFilter } from '../components/CategoryFilter/CategoryFilter';

const QUICK_PLATFORMS = [
  { name: 'FireKirin', slug: 'firekirin', url: 'https://firekirin.com/', icon: '🔥', color: 'from-orange-500 to-red-600' },
  { name: 'VBLink', slug: 'vblink', url: 'http://www.vblink777.club/', icon: '⚡', color: 'from-cyan-500 to-blue-600' },
  { name: 'OrionStar', slug: 'orionstar', url: 'http://start.orionstars.vip:8580/index.html', icon: '🌟', color: 'from-amber-400 to-yellow-600' },
  { name: 'Juwa', slug: 'juwa', url: 'https://dl.juwa777.com/', icon: '🎰', color: 'from-purple-500 to-violet-700' },
  { name: 'GameVault', slug: 'gamevault', url: 'https://download.gamevault999.com/', icon: '🏦', color: 'from-emerald-500 to-teal-700' },
  { name: 'MilkyWay', slug: 'milkyway', url: 'https://milkywayapp.xyz/', icon: '🌌', color: 'from-fuchsia-500 to-purple-700' },
  { name: 'GameRoom', slug: 'gameroom', url: 'https://www.gameroom777.com/', icon: '🕹️', color: 'from-rose-500 to-red-700' },
  { name: 'UltraPanda', slug: 'ultrapanda', url: 'https://www.ultrapanda.mobi', icon: '🐼', color: 'from-teal-400 to-emerald-600' },
];

export const HomePage = () => {
  const navigate = useNavigate();

  const [allGames, setAllGames] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      try {
        const [gamesRes, catRes] = await Promise.all([
          gameService.getGames({}),
          gameService.getCategories(),
        ]);

        const list = gamesRes.results || gamesRes || [];
        setAllGames(list);
        setFeatured(list.filter((g) => g.is_featured));
        setCategories(catRes.categories || []);
      } catch (err) {
        console.error('Failed to load homepage data', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleQuickLaunch = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* VIP Sweepstakes Hero Section */}
      <section className="relative w-full rounded-3xl overflow-hidden glass-panel border border-ocean-700/80 shadow-2xl p-8 sm:p-14 md:p-18 bg-hero-gradient">
        
        {/* Animated Background Ambience */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-indigo-500/10 blur-2xl animate-float" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-glow text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>VERIFIED CHECKMYSWEEP PLAYER PLATFORMS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            HIGH EAGLE VIP <br />
            <span className="text-gradient-cyan">SWEEPSTAKES & FISH LOUNGE</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
            Direct player access to the nation's premier sweepstakes gaming systems: 
            <strong className="text-white"> FireKirin, VBLink, OrionStar, Juwa, GameVault, MilkyWay, GameRoom</strong>, and <strong className="text-white">UltraPanda</strong>. Instant browser play, verified links, and dedicated VIP support.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => handleQuickLaunch('http://www.vblink777.club/')}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-ocean-950 font-black text-sm uppercase tracking-wider shadow-glow-cyan hover:scale-105 transition-all flex items-center space-x-2.5"
            >
              <FaPlay className="text-xs" />
              <span>LAUNCH VBLINK PLAYER LINK</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </button>

            <Link
              to="/games"
              className="px-7 py-3.5 rounded-2xl glass-panel text-slate-200 hover:text-cyan-glow font-bold text-sm border border-ocean-700 hover:border-cyan-glow/50 transition-all flex items-center space-x-2"
            >
              <FaGamepad />
              <span>EXPLORE ALL 8 PLATFORMS</span>
            </Link>
          </div>

          {/* Security & Verification Badges */}
          <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-semibold border-t border-ocean-700/60">
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" /> CheckMySweep Player Links
            </span>
            <span className="flex items-center gap-2">
              <FaShieldAlt className="text-cyan-400" /> Secure Player Credentials
            </span>
            <span className="flex items-center gap-2">
              <FaMobileAlt className="text-purple-400" /> Web, Android APK & iOS Web App
            </span>
          </div>
        </div>
      </section>

      {/* Quick Launch Carousel Strip */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide flex items-center gap-2">
              <FaBolt className="text-amber-400" /> Instant Player Launcher
            </h2>
            <p className="text-xs text-slate-400">Click any platform below to launch its official web client immediately</p>
          </div>
          <span className="text-[11px] font-bold text-cyan-400 hidden sm:inline-block">8 Verified Networks</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {QUICK_PLATFORMS.map((p) => (
            <button
              key={p.slug}
              onClick={() => handleQuickLaunch(p.url)}
              className="group p-3 rounded-2xl glass-panel border border-ocean-700/70 hover:border-cyan-glow/60 flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 shadow-md"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl mb-2 shadow-lg group-hover:scale-110 transition-transform`}>
                {p.icon}
              </div>
              <span className="text-xs font-black text-white group-hover:text-cyan-glow truncate w-full">
                {p.name}
              </span>
              <span className="text-[9px] text-slate-400 flex items-center gap-1 mt-0.5">
                Play <FaExternalLinkAlt className="text-[7px]" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Category Pills Bar */}
      {categories.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Browse by Category</h3>
            <Link to="/games" className="text-xs font-bold text-cyan-400 hover:text-cyan-glow flex items-center gap-1">
              View All <FaArrowRight />
            </Link>
          </div>
          <CategoryFilter
            categories={categories}
            selectedCategory="all"
            onSelectCategory={(slug) => navigate(`/games?category=${slug}`)}
          />
        </section>
      )}

      {/* Featured Sweepstakes Platforms Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-ocean-800 pb-3">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-glow text-lg">👑</span>
            <div>
              <h2 className="text-xl font-black text-white tracking-wide">Featured Player Platforms</h2>
              <p className="text-xs text-slate-400">Direct sweepstakes portals for fish tables and slot cabinets</p>
            </div>
          </div>
          <Link to="/games" className="text-xs font-bold text-cyan-400 hover:text-cyan-glow flex items-center gap-1">
            See All Platforms <FaArrowRight />
          </Link>
        </div>

        <GameGrid games={allGames} loading={loading} skeletonCount={8} />
      </section>

      {/* How to Play Sweepstakes Guide */}
      <section className="rounded-3xl glass-panel border border-ocean-700 p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-cyan-glow uppercase tracking-widest">Player Essentials</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">How Sweepstakes Gaming Works</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            High Eagle provides verified player links to top gaming platforms. Follow these simple steps to start playing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-ocean-950/60 border border-ocean-800 space-y-2">
            <div className="text-2xl mb-1">🔗</div>
            <h4 className="text-sm font-bold text-white">1. Select Your Game</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose from FireKirin, VBLink, OrionStar, Juwa, GameVault, MilkyWay, GameRoom, or UltraPanda.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-ocean-950/60 border border-ocean-800 space-y-2">
            <div className="text-2xl mb-1">🚀</div>
            <h4 className="text-sm font-bold text-white">2. Launch Player Link</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Click "Play Now" to open the official verified player portal directly in your browser without any installation required.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-ocean-950/60 border border-ocean-800 space-y-2">
            <div className="text-2xl mb-1">🔑</div>
            <h4 className="text-sm font-bold text-white">3. Log In to Account</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Input your player account credentials to access your points, game lobbies, and fish shooting arenas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-ocean-950/60 border border-ocean-800 space-y-2">
            <div className="text-2xl mb-1">💬</div>
            <h4 className="text-sm font-bold text-white">4. Concierge & Support</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Contact your High Eagle VIP representative anytime for account setup, credit reloads, and reward redemptions.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
