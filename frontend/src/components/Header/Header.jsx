import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCoins,
  FaSearch,
  FaBars,
  FaTimes,
  FaUser,
  FaHeart,
  FaGamepad,
  FaHome,
  FaFire,
  FaStar,
  FaSignOutAlt,
  FaShieldAlt,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { openAuthModal } from '../../store/slices/uiSlice';

export const Header = ({ onOpenSearch }) => {
  const { user, isAuthenticated, balance, logout } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: 'Home', path: '/', icon: FaHome },
    { label: 'Games', path: '/games', icon: FaGamepad },
    { label: 'Popular', path: '/games?filter=popular', icon: FaFire },
    { label: 'New', path: '/games?filter=new', icon: FaStar },
    { label: 'Favorites', path: '/games?filter=favorites', icon: FaHeart },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-ocean-700/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-glow to-blue-600 p-[2px] shadow-glow-cyan">
              <div className="w-full h-full bg-ocean-900 rounded-full flex items-center justify-center">
                <span className="text-xl font-black text-cyan-glow group-hover:scale-110 transition-transform">🦅</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-gradient-cyan uppercase">
                HIGH EAGLE
              </span>
              <span className="text-[9px] font-bold text-gold-400 tracking-widest uppercase -mt-1">
                SLOT ENTERTAINMENT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-ocean-900/60 p-1.5 rounded-full border border-ocean-700/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
                      : 'text-slate-300 hover:text-cyan-glow hover:bg-ocean-800/80'
                  }`}
                >
                  <Icon className="text-xs" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full bg-ocean-800/80 border border-ocean-700 hover:border-cyan-glow/50 text-slate-300 hover:text-cyan-glow transition-all"
              title="Search Games"
            >
              <FaSearch className="text-sm" />
            </button>

            {/* Balance Badge */}
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-600/20 border border-amber-500/40 shadow-glow-gold">
              <FaCoins className="text-gold-400 animate-pulse-slow text-sm" />
              <div className="flex flex-col text-right">
                <span className="text-[9px] font-bold text-gold-400 uppercase tracking-widest leading-none">
                  BALANCE
                </span>
                <span className="text-sm font-extrabold text-amber-300 leading-tight">
                  {balance.toLocaleString()}
                </span>
              </div>
            </div>

            {/* User Profile / Auth Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full bg-ocean-800 border border-ocean-700 hover:border-cyan-glow transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 glass-panel rounded-2xl p-2 shadow-2xl border border-ocean-700 z-50"
                    >
                      <div className="px-3 py-2 border-b border-ocean-700/60">
                        <p className="text-sm font-bold text-white">{user?.username}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-cyan-glow hover:bg-ocean-800/60 rounded-xl"
                        >
                          <FaUser className="text-xs" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/responsible-play"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:text-cyan-glow hover:bg-ocean-800/60 rounded-xl"
                        >
                          <FaShieldAlt className="text-xs" />
                          <span>Responsible Play</span>
                        </Link>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                        >
                          <FaSignOutAlt className="text-xs" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => dispatch(openAuthModal('login'))}
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-cyan-glow transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => dispatch(openAuthModal('register'))}
                  className="px-4 py-2 text-sm font-extrabold text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-ocean-800 border border-ocean-700 text-slate-300 hover:text-cyan-glow"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden glass-panel border-t border-ocean-700/60 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:bg-ocean-800 hover:text-cyan-glow"
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-ocean-700/60 flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      dispatch(openAuthModal('login'));
                    }}
                    className="w-full py-3 text-center font-bold text-slate-200 bg-ocean-800 rounded-xl"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      dispatch(openAuthModal('register'));
                    }}
                    className="w-full py-3 text-center font-extrabold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
