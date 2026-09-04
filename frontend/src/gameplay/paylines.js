// 20 Paylines configuration for 5x3 reels grid

export const PAYLINES = [
  // 1: Center line
  { id: 1, name: 'Center Row', color: '#00f0ff', coords: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]] },
  // 2: Top line
  { id: 2, name: 'Top Row', color: '#3b82f6', coords: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]] },
  // 3: Bottom line
  { id: 3, name: 'Bottom Row', color: '#f59e0b', coords: [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]] },
  // 4: V shape
  { id: 4, name: 'V-Shape', color: '#ec4899', coords: [[0, 0], [1, 1], [2, 2], [3, 1], [4, 0]] },
  // 5: Inverted V shape
  { id: 5, name: 'Inverted V', color: '#10b981', coords: [[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]] },
  // 6: Top-Bottom Zigzag
  { id: 6, name: 'Zigzag Down', color: '#8b5cf6', coords: [[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]] },
  // 7: Bottom-Top Zigzag
  { id: 7, name: 'Zigzag Up', color: '#f97316', coords: [[0, 2], [1, 1], [2, 2], [3, 1], [4, 2]] },
  // 8: Center-Top Wave
  { id: 8, name: 'Center-Top Wave', color: '#06b6d4', coords: [[0, 1], [1, 0], [2, 1], [3, 0], [4, 1]] },
  // 9: Center-Bottom Wave
  { id: 9, name: 'Center-Bottom Wave', color: '#eab308', coords: [[0, 1], [1, 2], [2, 1], [3, 2], [4, 1]] },
  // 10: Diagonal Down
  { id: 10, name: 'Diagonal Down', color: '#a855f7', coords: [[0, 0], [1, 0], [2, 1], [3, 2], [4, 2]] },
  // 11: Diagonal Up
  { id: 11, name: 'Diagonal Up', color: '#ef4444', coords: [[0, 2], [1, 2], [2, 1], [3, 0], [4, 0]] },
  // 12: Big Dip
  { id: 12, name: 'Big Dip', color: '#14b8a6', coords: [[0, 0], [1, 1], [2, 1], [3, 1], [4, 0]] },
  // 13: Big Peak
  { id: 13, name: 'Big Peak', color: '#6366f1', coords: [[0, 2], [1, 1], [2, 1], [3, 1], [4, 2]] },
  // 14: Top Arc
  { id: 14, name: 'Top Arc', color: '#84cc16', coords: [[0, 1], [1, 0], [2, 0], [3, 0], [4, 1]] },
  // 15: Bottom Arc
  { id: 15, name: 'Bottom Arc', color: '#d946ef', coords: [[0, 1], [1, 2], [2, 2], [3, 2], [4, 1]] },
  // 16: Top Drop
  { id: 16, name: 'Top Drop', color: '#22c55e', coords: [[0, 0], [1, 0], [2, 1], [3, 2], [4, 1]] },
  // 17: Bottom Rise
  { id: 17, name: 'Bottom Rise', color: '#38bdf8', coords: [[0, 2], [1, 2], [2, 1], [3, 0], [4, 1]] },
  // 18: Middle Bump Top
  { id: 18, name: 'Mid Bump Top', color: '#f43f5e', coords: [[0, 1], [1, 1], [2, 0], [3, 1], [4, 1]] },
  // 19: Middle Bump Bottom
  { id: 19, name: 'Mid Bump Bottom', color: '#e11d48', coords: [[0, 1], [1, 1], [2, 2], [3, 1], [4, 1]] },
  // 20: Cross Bow
  { id: 20, name: 'Cross Bow', color: '#0284c7', coords: [[0, 0], [1, 2], [2, 0], [3, 2], [4, 0]] },
];
