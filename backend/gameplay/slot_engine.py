"""
Server-side slot engine.
All spin results are generated and validated on the server.
The frontend only animates the result — never generates it.
"""

import random
from typing import List, Dict, Tuple

# ─── Symbol Definitions ──────────────────────────────────────────────────────
# Each symbol has a weight (frequency) and a payout multiplier per match count
SYMBOLS = {
    'wild':     {'weight': 2,  'payouts': {3: 20, 4: 50, 5: 200}},
    'bonus':    {'weight': 3,  'payouts': {3: 15, 4: 30, 5: 100}},
    'diamond':  {'weight': 5,  'payouts': {3: 10, 4: 25, 5: 75}},
    'kraken':   {'weight': 5,  'payouts': {3: 8,  4: 20, 5: 60}},
    'shark':    {'weight': 8,  'payouts': {3: 5,  4: 15, 5: 40}},
    'trident':  {'weight': 10, 'payouts': {3: 4,  4: 10, 5: 30}},
    'treasure': {'weight': 12, 'payouts': {3: 3,  4: 8,  5: 20}},
    'fish':     {'weight': 15, 'payouts': {3: 2,  4: 5,  5: 12}},
    'pearl':    {'weight': 20, 'payouts': {3: 1,  4: 3,  5: 8}},
    'coral':    {'weight': 20, 'payouts': {3: 1,  4: 2,  5: 6}},
}

# Pre-compute the weighted symbol pool
SYMBOL_POOL = []
for symbol, data in SYMBOLS.items():
    SYMBOL_POOL.extend([symbol] * data['weight'])

# ─── Paylines (5 reels × 3 rows) ────────────────────────────────────────────
# Each payline is a list of (reel_index, row_index) positions
PAYLINES = [
    # Horizontal lines
    [(0,1),(1,1),(2,1),(3,1),(4,1)],  # Middle
    [(0,0),(1,0),(2,0),(3,0),(4,0)],  # Top
    [(0,2),(1,2),(2,2),(3,2),(4,2)],  # Bottom
    # V-shapes
    [(0,0),(1,1),(2,2),(3,1),(4,0)],  # V
    [(0,2),(1,1),(2,0),(3,1),(4,2)],  # Inverted V
    # Zigzags
    [(0,0),(1,1),(2,0),(3,1),(4,0)],
    [(0,2),(1,1),(2,2),(3,1),(4,2)],
    [(0,1),(1,0),(2,1),(3,0),(4,1)],
    [(0,1),(1,2),(2,1),(3,2),(4,1)],
    # Diagonals
    [(0,0),(1,0),(2,1),(3,2),(4,2)],
    [(0,2),(1,2),(2,1),(3,0),(4,0)],
    [(0,0),(1,1),(2,1),(3,1),(4,0)],
    [(0,2),(1,1),(2,1),(3,1),(4,2)],
    [(0,1),(1,0),(2,0),(3,0),(4,1)],
    [(0,1),(1,2),(2,2),(3,2),(4,1)],
    [(0,0),(1,0),(2,1),(3,2),(4,1)],  # Extra 1
    [(0,2),(1,2),(2,1),(3,0),(4,1)],  # Extra 2
    [(0,1),(1,1),(2,0),(3,1),(4,1)],  # Extra 3
    [(0,1),(1,1),(2,2),(3,1),(4,1)],  # Extra 4
    [(0,0),(1,2),(2,0),(3,2),(4,0)],  # Extra 5
]


def spin_reels(reels: int = 5, rows: int = 3) -> List[List[str]]:
    """Generate random reel positions."""
    return [
        [random.choice(SYMBOL_POOL) for _ in range(rows)]
        for _ in range(reels)
    ]


def check_paylines(grid: List[List[str]], bet: float) -> Tuple[float, List[Dict]]:
    """
    Check all paylines for wins.
    Returns (total_win, list of winning payline details)
    """
    total_win = 0.0
    winning_lines = []

    for line_idx, payline in enumerate(PAYLINES):
        # Extract symbols along this payline
        symbols = [grid[reel][row] for reel, row in payline]

        # Check for wins from left to right
        first_symbol = symbols[0]
        count = 1

        for i in range(1, len(symbols)):
            if symbols[i] == first_symbol or symbols[i] == 'wild' or first_symbol == 'wild':
                if first_symbol == 'wild' and symbols[i] != 'wild':
                    first_symbol = symbols[i]
                count += 1
            else:
                break

        # Only wins of 3+ count
        if count >= 3 and first_symbol in SYMBOLS and first_symbol != 'wild':
            payout_table = SYMBOLS[first_symbol]['payouts']
            multiplier = payout_table.get(count, 0)
            win_amount = bet * multiplier

            if win_amount > 0:
                total_win += win_amount
                winning_lines.append({
                    'payline': line_idx,
                    'symbol': first_symbol,
                    'count': count,
                    'multiplier': multiplier,
                    'win': win_amount,
                    'positions': payline[:count],
                })

    return round(total_win, 2), winning_lines


def generate_spin(bet: float) -> Dict:
    """
    Main spin function — generates a complete spin result.
    Returns a dict with reels, win, winning_lines.
    """
    grid = spin_reels()
    win, winning_lines = check_paylines(grid, bet)

    return {
        'reels': grid,
        'win': win,
        'winning_lines': winning_lines,
        'is_win': win > 0,
    }
