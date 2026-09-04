import React from 'react';
import { GameCard } from '../GameCard/GameCard';
import { SkeletonCard } from '../SkeletonCard/SkeletonCard';
import { motion } from 'framer-motion';

export const GameGrid = ({ games = [], loading = false, skeletonCount = 8 }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="w-full py-16 text-center glass-panel rounded-3xl my-6 border border-ocean-700/60">
        <span className="text-5xl mb-4 block">🌊</span>
        <h3 className="text-xl font-bold text-white mb-2">No Games Found</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          We couldn't find any games matching your current filters or search query. Try choosing a different category or clearing search terms.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
    >
      {games.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          title={game.title}
          slug={game.slug}
          thumbnail={game.thumbnail}
          play_url={game.play_url}
          provider={game.provider}
          category_name={game.category_name}
          isNew={game.is_new}
          isPopular={game.is_popular}
          isFavorite={game.is_favorite}
        />
      ))}
    </motion.div>
  );
};
