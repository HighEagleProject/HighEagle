// Symbols definition for High Eagle ocean-themed 5-reel slots

export const SYMBOLS = [
  {
    id: 'wild',
    name: 'Wild Eagle',
    icon: '🦅',
    color: 'from-amber-400 to-yellow-600',
    glow: 'rgba(245, 158, 11, 0.8)',
    payout: { 3: 20, 4: 50, 5: 200 },
    isWild: true,
  },
  {
    id: 'bonus',
    name: 'Ocean Pearl',
    icon: '🔮',
    color: 'from-purple-400 to-indigo-600',
    glow: 'rgba(168, 85, 247, 0.8)',
    payout: { 3: 15, 4: 30, 5: 100 },
    isBonus: true,
  },
  {
    id: 'diamond',
    name: 'Aquamarine',
    icon: '💎',
    color: 'from-cyan-400 to-blue-600',
    glow: 'rgba(0, 240, 255, 0.8)',
    payout: { 3: 10, 4: 25, 5: 75 },
  },
  {
    id: 'kraken',
    name: 'Deep Kraken',
    icon: '🐙',
    color: 'from-red-500 to-pink-700',
    glow: 'rgba(239, 68, 68, 0.8)',
    payout: { 3: 8, 4: 20, 5: 60 },
  },
  {
    id: 'shark',
    name: 'Great Shark',
    icon: '🦈',
    color: 'from-slate-400 to-slate-700',
    glow: 'rgba(148, 163, 184, 0.8)',
    payout: { 3: 5, 4: 15, 5: 40 },
  },
  {
    id: 'trident',
    name: 'Golden Trident',
    icon: '🔱',
    color: 'from-yellow-300 to-amber-500',
    glow: 'rgba(253, 224, 71, 0.8)',
    payout: { 3: 4, 4: 10, 5: 30 },
  },
  {
    id: 'treasure',
    name: 'Sunken Chest',
    icon: '🧰',
    color: 'from-amber-600 to-yellow-800',
    glow: 'rgba(217, 119, 6, 0.8)',
    payout: { 3: 3, 4: 8, 5: 20 },
  },
  {
    id: 'fish',
    name: 'Golden Fish',
    icon: '🐠',
    color: 'from-orange-400 to-amber-500',
    glow: 'rgba(251, 146, 60, 0.8)',
    payout: { 3: 2, 4: 5, 5: 12 },
  },
  {
    id: 'pearl',
    name: 'White Pearl',
    icon: '⚪',
    color: 'from-slate-100 to-slate-300',
    glow: 'rgba(248, 250, 252, 0.8)',
    payout: { 3: 1, 4: 3, 5: 8 },
  },
  {
    id: 'coral',
    name: 'Red Coral',
    icon: '🪸',
    color: 'from-rose-400 to-red-600',
    glow: 'rgba(251, 113, 133, 0.8)',
    payout: { 3: 1, 4: 2, 5: 6 },
  },
];

export const SYMBOL_MAP = SYMBOLS.reduce((acc, sym) => {
  acc[sym.id] = sym;
  return acc;
}, {});
