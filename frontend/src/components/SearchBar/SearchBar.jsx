import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaSpinner, FaPlay } from 'react-icons/fa';
import { gameService } from '../../services/gameService';
import { motion, AnimatePresence } from 'framer-motion';

export const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Debounced API search call
  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await gameService.searchGames(query);
        setResults(data.results || data || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
        setSearched(true);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectGame = (slug) => {
    handleClose();
    navigate(`/games/${slug}`);
  };

  const displayedResults = query.trim() ? results : [];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-ocean-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl glass-panel rounded-3xl p-6 border border-ocean-700 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-ocean-700/60">
            <div className="flex items-center space-x-3 text-cyan-glow font-bold text-lg">
              <FaSearch />
              <span>Search Games</span>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-ocean-800 text-slate-400 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>

          {/* Input Box */}
          <div className="relative mt-4">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, provider, or category (e.g. ocean, pearl, high)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-ocean-900/90 border border-ocean-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-glow focus:ring-1 focus:ring-cyan-glow text-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            {loading && (
              <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-glow animate-spin" />
            )}
          </div>

          {/* Results List */}
          <div className="mt-4 max-h-80 overflow-y-auto space-y-2 pr-1">
            {loading && (
              <div className="py-8 text-center text-sm font-semibold text-cyan-glow flex items-center justify-center space-x-2">
                <FaSpinner className="animate-spin" />
                <span>Searching catalog...</span>
              </div>
            )}

            {!loading && searched && displayedResults.length === 0 && (
              <div className="py-8 text-center text-slate-400 text-sm">
                No games found matching "{query}"
              </div>
            )}

            {!loading &&
              displayedResults.map((game) => (
                <div
                  key={game.id}
                  onClick={() => handleSelectGame(game.slug)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-ocean-900/60 hover:bg-ocean-800 border border-ocean-800 hover:border-cyan-glow/40 cursor-pointer transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-ocean-800 flex items-center justify-center text-2xl overflow-hidden flex-shrink-0">
                      {game.thumbnail ? (
                        <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
                      ) : (
                        '🎰'
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-glow transition-colors">
                        {game.title}
                      </h4>
                      <p className="text-xs text-slate-400">{game.provider || 'HighEagle Studios'} • {game.category_name || 'Slot'}</p>
                    </div>
                  </div>
                  <button className="p-2.5 rounded-full bg-cyan-500/20 text-cyan-glow group-hover:bg-cyan-500 group-hover:text-ocean-950 transition-all">
                    <FaPlay className="text-xs ml-0.5" />
                  </button>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
