import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gameService } from '../services/gameService';
import { GameGrid } from '../components/GameGrid/GameGrid';
import { CategoryFilter } from '../components/CategoryFilter/CategoryFilter';
import { FaSearch, FaSortAmountDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const GamesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filter params from URL query
  const categoryParam = searchParams.get('category') || 'all';
  const filterParam = searchParams.get('filter') || 'all';
  const sortParam = searchParams.get('sort') || 'popular';
  const searchParam = searchParams.get('search') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(searchParam);

  // Sync search input with URL
  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  // Load categories once
  useEffect(() => {
    gameService.getCategories().then((catRes) => {
      if (catRes.categories) {
        setCategories(catRes.categories);
      }
    }).catch(() => {});
  }, []);

  // Fetch games when query parameters change
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const params = {
          page: pageParam,
          sort: sortParam,
        };
        if (categoryParam !== 'all') params.category = categoryParam;
        if (filterParam !== 'all') params.filter = filterParam;
        if (searchParam) params.search = searchParam;

        const gamesRes = await gameService.getGames(params);
        const resultsList = gamesRes.results || gamesRes || [];
        setGames(resultsList);
        setTotalCount(gamesRes.count || resultsList.length);
        if (gamesRes.count) {
          setTotalPages(Math.ceil(gamesRes.count / 20));
        }
      } catch (err) {
        console.error('Failed to load games lobby', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [categoryParam, filterParam, sortParam, searchParam, pageParam]);

  // Helper to update query param
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    // Reset to page 1 on filter change
    if (key !== 'page') {
      newParams.set('page', '1');
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam('search', searchInput);
  };

  const mainFilters = [
    { label: 'All Games', value: 'all' },
    { label: 'Popular', value: 'popular' },
    { label: 'New', value: 'new' },
    { label: 'Favorites', value: 'favorites' },
    { label: 'Recently Played', value: 'recent' },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-ocean-700/80">
        <h1 className="text-3xl font-black text-white uppercase tracking-wide flex items-center gap-3">
          <span>👑 SWEEPSTAKES LOUNGE</span>
          <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-glow border border-cyan-400/40 font-bold">
            {totalCount} Verified Platforms
          </span>
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Explore official verified sweepstakes player platforms including FireKirin, VBLink, OrionStar, Juwa, GameVault, MilkyWay, GameRoom, and UltraPanda. Launch directly into any web client.
        </p>

        {/* Filter Controls Bar */}
        <div className="mt-6 flex flex-col lg:flex-row items-center justify-between gap-4 pt-6 border-t border-ocean-700/60">
          
          {/* Main Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {mainFilters.map((tab) => (
              <button
                key={tab.value}
                onClick={() => updateParam('filter', tab.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterParam === tab.value
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
                    : 'bg-ocean-900 text-slate-300 hover:text-cyan-glow hover:bg-ocean-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Right Group */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search lobby..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-ocean-900 border border-ocean-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-glow"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            </form>

            {/* Sort Select */}
            <div className="flex items-center space-x-2 bg-ocean-900 border border-ocean-700 rounded-xl px-3 py-2 text-xs">
              <FaSortAmountDown className="text-cyan-glow" />
              <select
                value={sortParam}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-bold"
              >
                <option value="popular" className="bg-ocean-900">Most Popular</option>
                <option value="newest" className="bg-ocean-900">Newest First</option>
                <option value="a-z" className="bg-ocean-900">A - Z</option>
                <option value="z-a" className="bg-ocean-900">Z - A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <CategoryFilter
        categories={categories}
        selectedCategory={categoryParam}
        onSelectCategory={(slug) => updateParam('category', slug)}
      />

      {/* Games Grid */}
      <GameGrid games={games} loading={loading} skeletonCount={12} />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-3 pt-8">
          <button
            onClick={() => updateParam('page', (pageParam - 1).toString())}
            disabled={pageParam <= 1}
            className="p-3 rounded-xl bg-ocean-900 border border-ocean-700 text-slate-300 hover:text-cyan-glow disabled:opacity-40 disabled:hover:text-slate-300 flex items-center space-x-2 text-xs font-bold"
          >
            <FaChevronLeft />
            <span>Previous</span>
          </button>

          <span className="text-xs font-extrabold text-white px-4 py-2 rounded-xl bg-ocean-800 border border-ocean-700">
            Page {pageParam} of {totalPages}
          </span>

          <button
            onClick={() => updateParam('page', (pageParam + 1).toString())}
            disabled={pageParam >= totalPages}
            className="p-3 rounded-xl bg-ocean-900 border border-ocean-700 text-slate-300 hover:text-cyan-glow disabled:opacity-40 disabled:hover:text-slate-300 flex items-center space-x-2 text-xs font-bold"
          >
            <span>Next</span>
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};
