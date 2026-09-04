from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from users.models import User
from games.models import Game, Category


class GameplayAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='player@higheagle.com',
            username='player1',
            password='Password123!',
            demo_balance=10000.0
        )
        self.client.force_authenticate(user=self.user)

        self.category = Category.objects.create(name='Ocean', slug='ocean')
        self.game = Game.objects.create(
            title='Ocean Fortune',
            slug='ocean-fortune',
            provider='HighEagle Studios',
            category=self.category,
            min_bet=10.0,
            max_bet=5000.0
        )

        self.spin_url = reverse('gameplay-spin')

    def test_successful_spin(self):
        """Test valid spin request updates balance and returns 5x3 reels."""
        response = self.client.post(self.spin_url, {
            'game_id': str(self.game.id),
            'bet': 100.0
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertIn('reels', response.data['result'])
        self.assertEqual(len(response.data['result']['reels']), 5)
        self.assertIn('balance', response.data)

    def test_invalid_bet_amount(self):
        """Test bet below minimum is rejected."""
        response = self.client.post(self.spin_url, {
            'game_id': str(self.game.id),
            'bet': 1.0  # Min bet is 10.0
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data['success'])

    def test_insufficient_balance(self):
        """Test bet exceeding user demo balance is rejected."""
        self.user.demo_balance = 50.0
        self.user.save()

        response = self.client.post(self.spin_url, {
            'game_id': str(self.game.id),
            'bet': 100.0
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Insufficient coins balance', response.data['message'])
