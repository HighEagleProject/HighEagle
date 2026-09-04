import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="rounded-2xl overflow-hidden glass-card animate-pulse border border-ocean-800">
      <div className="aspect-[4/3] w-full bg-ocean-800/80" />
      <div className="p-3.5 space-y-2">
        <div className="h-4 bg-ocean-800 rounded w-3/4" />
        <div className="h-3 bg-ocean-800/60 rounded w-1/2" />
        <div className="h-2.5 bg-ocean-800/40 rounded w-1/3 pt-1" />
      </div>
    </div>
  );
};
