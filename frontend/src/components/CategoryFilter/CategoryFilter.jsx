import React from 'react';

export const CategoryFilter = ({
  categories = [],
  selectedCategory = 'all',
  onSelectCategory,
}) => {
  const defaultCategories = [
    { name: 'All Games', slug: 'all', icon: '🌟' },
    { name: 'Popular', slug: 'popular', icon: '🔥' },
    { name: 'New', slug: 'new', icon: '✨' },
    { name: 'Ocean', slug: 'ocean', icon: '🌊' },
    { name: 'Adventure', slug: 'adventure', icon: '⚓' },
    { name: 'Fantasy', slug: 'fantasy', icon: '🧜' },
    { name: 'Jackpot', slug: 'jackpot', icon: '💰' },
    { name: 'Classic', slug: 'classic', icon: '🎰' },
    { name: 'Treasure', slug: 'treasure', icon: '💎' },
    { name: 'Sea Creatures', slug: 'sea-creatures', icon: '🐙' },
    { name: 'Bonus Games', slug: 'bonus-games', icon: '🎁' },
  ];

  const filterList = categories.length > 0 ? [{ name: 'All Games', slug: 'all', icon: '🌟' }, ...categories] : defaultCategories;

  return (
    <div className="w-full overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
      <div className="flex items-center space-x-2.5 min-w-max">
        {filterList.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400/50 shadow-glow-cyan scale-105'
                  : 'glass-panel text-slate-300 border-ocean-700/60 hover:border-cyan-glow/40 hover:text-cyan-glow hover:bg-ocean-800/80'
              }`}
            >
              <span className="text-sm">{cat.icon || '🌊'}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
