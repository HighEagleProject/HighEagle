import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaGamepad, FaLock, FaCoins } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-ocean-950 border-t border-ocean-800 text-slate-400 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsible Gaming Banner */}
        <div className="mb-12 p-6 rounded-2xl glass-panel border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl flex-shrink-0">
              <FaShieldAlt />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <span>VIRTUAL CREDITS ONLY</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-extrabold uppercase">
                  No Real Money
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                High Eagle is a free-to-play slot game simulation platform for entertainment purposes only. Demo coins have zero monetary value, and no deposits, withdrawals, or real-money payouts are supported.
              </p>
            </div>
          </div>
          <Link
            to="/responsible-play"
            className="px-5 py-2.5 rounded-xl bg-ocean-800 hover:bg-ocean-700 text-cyan-glow text-xs font-bold whitespace-nowrap transition-colors border border-cyan-glow/20"
          >
            Learn More
          </Link>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🦅</span>
              <span className="text-xl font-black text-gradient-cyan uppercase tracking-wider">
                HIGH EAGLE
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore an immersive ocean-inspired slot gaming experience with stunning visuals, exciting features, and zero risk.
            </p>
            <div className="flex items-center space-x-3 text-cyan-glow text-lg">
              <FaGamepad />
              <FaCoins />
              <FaLock />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-cyan-glow transition-colors">Home Lobby</Link></li>
              <li><Link to="/games" className="hover:text-cyan-glow transition-colors">All Slot Games</Link></li>
              <li><Link to="/games?filter=popular" className="hover:text-cyan-glow transition-colors">Popular Titles</Link></li>
              <li><Link to="/games?filter=new" className="hover:text-cyan-glow transition-colors">New Releases</Link></li>
              <li><Link to="/games?filter=favorites" className="hover:text-cyan-glow transition-colors">My Favorites</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/games?category=ocean" className="hover:text-cyan-glow transition-colors">Ocean Slots</Link></li>
              <li><Link to="/games?category=fantasy" className="hover:text-cyan-glow transition-colors">Fantasy & Magic</Link></li>
              <li><Link to="/games?category=jackpot" className="hover:text-cyan-glow transition-colors">Progressive Jackpot</Link></li>
              <li><Link to="/games?category=treasure" className="hover:text-cyan-glow transition-colors">Treasure Hunt</Link></li>
              <li><Link to="/games?category=adventure" className="hover:text-cyan-glow transition-colors">Deep Sea Adventure</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Information</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/responsible-play" className="hover:text-cyan-glow transition-colors">Responsible Gaming</Link></li>
              <li><Link to="/profile" className="hover:text-cyan-glow transition-colors">Account Dashboard</Link></li>
              <li><a href="#privacy" className="hover:text-cyan-glow transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-cyan-glow transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-ocean-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} High Eagle Slot Entertainment. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Fictional Demo Gaming Platform — No Real Money Involved</p>
        </div>
      </div>
    </footer>
  );
};
