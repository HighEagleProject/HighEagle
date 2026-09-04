"""
Management command to seed official sweepstakes game data.
Includes the 8 verified player platforms from checkmysweep.com:
- FireKirin (https://firekirin.com/)
- OrionStar (http://start.orionstars.vip:8580/index.html)
- Juwa (https://dl.juwa777.com/)
- GameVault (https://download.gamevault999.com/)
- MilkyWay (https://milkywayapp.xyz/)
- GameRoom (https://www.gameroom777.com/)
- UltraPanda (https://www.ultrapanda.mobi)
- VBLink (http://www.vblink777.club/)

Run: py manage.py seed_games
"""

from django.core.management.base import BaseCommand
from django.utils.text import slugify
from games.models import Game, Category


CATEGORIES = [
    {'name': 'Sweepstakes', 'slug': 'sweepstakes', 'icon': '👑', 'description': 'Premier sweepstakes player platforms', 'order': 1},
    {'name': 'Fish Games', 'slug': 'fish-games', 'icon': '🐟', 'description': 'Arcade ocean shooting & fish tables', 'order': 2},
    {'name': 'Slots', 'slug': 'slots', 'icon': '🎰', 'description': 'High-payout sweepstakes slot cabinets', 'order': 3},
    {'name': 'Popular', 'slug': 'popular', 'icon': '🔥', 'description': 'Most requested player portals', 'order': 4},
    {'name': 'New', 'slug': 'new', 'icon': '✨', 'description': 'Recently updated gaming platforms', 'order': 5},
]

SWEEPSTAKES_GAMES = [
    {
        'title': 'FireKirin',
        'slug': 'firekirin',
        'play_url': 'https://firekirin.com/',
        'description': 'The premier arcade fish hunting and sweepstakes slot platform. Experience fast-paced multiplayer ocean combat, legendary sea boss raids, and high-payout sweepstakes arcade cabinets directly on your browser or mobile app.',
        'provider': 'FireKirin Gaming',
        'category_slug': 'fish-games',
        'is_featured': True,
        'is_popular': True,
        'is_new': False,
        'volatility': 'high',
        'rtp': 97.2,
        'features': ['Fish Shooting Arcade', 'Ocean Monster Raids', 'Direct Web Play', 'Multiplayer Tables', 'Mobile APK Support'],
    },
    {
        'title': 'VBLink',
        'slug': 'vblink',
        'play_url': 'http://www.vblink777.club/',
        'description': 'One of the most demanded sweepstakes platforms in the country. Featuring iconic player favorites like Golden Dragon, King Kong, and Buffalo slots with instantaneous direct web browser access.',
        'provider': 'VBLink 777',
        'category_slug': 'sweepstakes',
        'is_featured': True,
        'is_popular': True,
        'is_new': False,
        'volatility': 'high',
        'rtp': 97.5,
        'features': ['Direct Browser Portal', 'Golden Dragon Battle', 'Buffalo Run Slots', 'High Multiplier Pots', 'VIP Lounge'],
    },
    {
        'title': 'OrionStar',
        'slug': 'orionstar',
        'play_url': 'http://start.orionstars.vip:8580/index.html',
        'description': 'A heavyweight online sweepstakes suite featuring high-definition fish hunters, dynamic reel slot machines, and keno. Play seamlessly via web browser on desktop and mobile.',
        'provider': 'Orion Stars VIP',
        'category_slug': 'sweepstakes',
        'is_featured': True,
        'is_popular': True,
        'is_new': False,
        'volatility': 'medium',
        'rtp': 96.8,
        'features': ['Instant Web Portal', 'Fish Hunter Deluxe', 'Multi-Line Reels', 'Community Jackpots', 'No Install Needed'],
    },
    {
        'title': 'Juwa',
        'slug': 'juwa',
        'play_url': 'https://dl.juwa777.com/',
        'description': 'Juwa 777 delivers high-volatility sweepstakes slots and underwater arcade shooters. Renowned for intense bonus rounds, crisp soundscapes, and lightning-fast spin action.',
        'provider': 'Juwa 777',
        'category_slug': 'slots',
        'is_featured': True,
        'is_popular': True,
        'is_new': False,
        'volatility': 'high',
        'rtp': 96.5,
        'features': ['VIP 777 Slots', 'Underwater Boss Combat', 'Rapid Spin Bonuses', 'Cross-Platform Player App'],
    },
    {
        'title': 'GameVault',
        'slug': 'gamevault',
        'play_url': 'https://download.gamevault999.com/',
        'description': 'Unlock the vault of top-tier sweepstakes gaming. GameVault 999 combines legendary fish table adventures with high-limit slot jackpots in an ultra-secure environment.',
        'provider': 'GameVault 999',
        'category_slug': 'sweepstakes',
        'is_featured': True,
        'is_popular': True,
        'is_new': True,
        'volatility': 'medium',
        'rtp': 96.9,
        'features': ['Massive Game Library', 'Vault Progressive Jackpots', 'High-End Graphics', 'Instant Player Portal'],
    },
    {
        'title': 'MilkyWay',
        'slug': 'milkyway',
        'play_url': 'https://milkywayapp.xyz/',
        'description': 'Blast off into cosmic sweepstakes entertainment. MilkyWay combines galaxy-themed arcade fish catching with modern multi-line slot cabinets for interstellar payouts.',
        'provider': 'MilkyWay App',
        'category_slug': 'fish-games',
        'is_featured': False,
        'is_popular': True,
        'is_new': True,
        'volatility': 'medium',
        'rtp': 96.6,
        'features': ['Cosmic Fish Battles', 'Interstellar Slots', 'Daily Spin Rewards', 'Lightweight Web App'],
    },
    {
        'title': 'GameRoom',
        'slug': 'gameroom',
        'play_url': 'https://www.gameroom777.com/',
        'description': 'The classic sweepstakes gaming parlor reimagined online. Enjoy nostalgic Vegas-style reel spinners, interactive arcade fish games, and huge community prize pools.',
        'provider': 'GameRoom 777',
        'category_slug': 'slots',
        'is_featured': False,
        'is_popular': False,
        'is_new': True,
        'volatility': 'medium',
        'rtp': 96.2,
        'features': ['777 Vegas Cabinets', 'Arcade Fish Hunter', 'Bonus Wheels', 'Browser & Mobile'],
    },
    {
        'title': 'UltraPanda',
        'slug': 'ultrapanda',
        'play_url': 'https://www.ultrapanda.mobi',
        'description': 'Ultra Panda brings fast HTML5 mobile and desktop sweepstakes action with fan-favorite oriental reels, vibrant wildlife adventures, and exciting fish shooting tables.',
        'provider': 'Ultra Panda Mobi',
        'category_slug': 'sweepstakes',
        'is_featured': True,
        'is_popular': True,
        'is_new': True,
        'volatility': 'high',
        'rtp': 97.0,
        'features': ['Mobile-First HTML5', 'Panda Fortune Slots', 'Interactive Shooting', 'Instant Play'],
    },
]


class Command(BaseCommand):
    help = 'Seeds official sweepstakes game platforms from checkmysweep.com'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Starting sweepstakes platform seeding...'))

        # Create or update categories
        cat_map = {}
        for cdata in CATEGORIES:
            cat, created = Category.objects.update_or_create(
                slug=cdata['slug'],
                defaults={
                    'name': cdata['name'],
                    'icon': cdata['icon'],
                    'description': cdata['description'],
                    'order': cdata['order'],
                }
            )
            cat_map[cdata['slug']] = cat
            status = 'Created' if created else 'Updated'
            self.stdout.write(f"  Category: {status} '{cat.name}'")

        # Clean out old mock games not in the verified list
        allowed_slugs = [g['slug'] for g in SWEEPSTAKES_GAMES]
        deleted_count, _ = Game.objects.exclude(slug__in=allowed_slugs).delete()
        if deleted_count:
            self.stdout.write(self.style.WARNING(f"  Removed {deleted_count} outdated mock games."))

        # Create or update the 8 sweepstakes games
        for gdata in SWEEPSTAKES_GAMES:
            cat = cat_map.get(gdata['category_slug'])
            game, created = Game.objects.update_or_create(
                slug=gdata['slug'],
                defaults={
                    'title': gdata['title'],
                    'play_url': gdata['play_url'],
                    'description': gdata['description'],
                    'provider': gdata['provider'],
                    'category': cat,
                    'is_featured': gdata['is_featured'],
                    'is_popular': gdata['is_popular'],
                    'is_new': gdata['is_new'],
                    'is_active': True,
                    'volatility': gdata['volatility'],
                    'rtp': gdata['rtp'],
                    'features': gdata['features'],
                }
            )
            status = 'Created' if created else 'Updated'
            self.stdout.write(f"  Game: {status} '{game.title}' -> {game.play_url}")

        self.stdout.write(self.style.SUCCESS(
            f"\n[OK] Successfully populated {len(SWEEPSTAKES_GAMES)} sweepstakes player platforms!"
        ))
