import { SYMBOLS } from './symbols';
import { calculateWin } from './calculateWin';

const WEIGHTED_POOL = [];
SYMBOLS.forEach((sym) => {
  const weightMap = {
    wild: 2,
    bonus: 3,
    diamond: 5,
    kraken: 5,
    shark: 8,
    trident: 10,
    treasure: 12,
    fish: 15,
    pearl: 20,
    coral: 20,
  };
  const count = weightMap[sym.id] || 10;
  for (let i = 0; i < count; i++) {
    WEIGHTED_POOL.push(sym.id);
  }
});

export function generateRandomGrid(reelsCount = 5, rowsCount = 3) {
  const grid = [];
  for (let r = 0; r < reelsCount; r++) {
    const reel = [];
    for (let row = 0; row < rowsCount; row++) {
      const randomIndex = Math.floor(Math.random() * WEIGHTED_POOL.length);
      reel.push(WEIGHTED_POOL[randomIndex]);
    }
    grid.push(reel);
  }
  return grid;
}

export function simulateSpin(betAmount) {
  const grid = generateRandomGrid();
  const winResult = calculateWin(grid, betAmount);
  return {
    reels: grid,
    ...winResult,
  };
}
