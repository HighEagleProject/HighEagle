import { SYMBOL_MAP } from './symbols';
import { PAYLINES } from './paylines';

export function calculateWin(reels, betAmount) {
  let totalWin = 0;
  const winningLines = [];

  PAYLINES.forEach((payline) => {
    const symbolsOnLine = payline.coords.map(([reel, row]) => reels[reel][row]);
    
    let matchSymbol = symbolsOnLine[0];
    let matchCount = 1;

    for (let i = 1; i < symbolsOnLine.length; i++) {
      const current = symbolsOnLine[i];
      if (current === matchSymbol || current === 'wild' || matchSymbol === 'wild') {
        if (matchSymbol === 'wild' && current !== 'wild') {
          matchSymbol = current;
        }
        matchCount++;
      } else {
        break;
      }
    }

    if (matchCount >= 3 && matchSymbol !== 'wild' && SYMBOL_MAP[matchSymbol]) {
      const payoutTable = SYMBOL_MAP[matchSymbol].payout;
      const multiplier = payoutTable[matchCount] || 0;
      const win = betAmount * multiplier;

      if (win > 0) {
        totalWin += win;
        winningLines.push({
          paylineId: payline.id,
          name: payline.name,
          color: payline.color,
          symbol: matchSymbol,
          matchCount,
          multiplier,
          win,
          positions: payline.coords.slice(0, matchCount),
        });
      }
    }
  });

  return {
    totalWin: Math.round(totalWin * 100) / 100,
    winningLines,
    isWin: totalWin > 0,
  };
}
