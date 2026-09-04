from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Game, Category


class GameAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name='Ocean', slug='ocean')
        self.game = Game.objects.create(
            title='Ocean Fortune',
            slug='ocean-fortune',
            provider='HighEagle Studios',
            category=self.category,
            is_featured=True,
            is_popular=True,
            min_bet=10.0,
            max_bet=5000.0
        )

    def test_games_list(self):
        """Test retrieving game list."""
        url = reverse('games-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_game_detail(self):
        """Test game detail endpoint by slug."""
        url = reverse('game-detail', kwargs={'slug': 'ocean-fortune'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['game']['title'], 'Ocean Fortune')

    def test_game_search(self):
        """Test game search by title query."""
        url = reverse('games-list') + '?search=Ocean'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
