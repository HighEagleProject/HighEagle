from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User


class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('auth-register')
        self.login_url = reverse('auth-login')
        self.me_url = reverse('auth-me')

        self.user_data = {
            'email': 'testuser@higheagle.com',
            'username': 'testuser',
            'password': 'Password123!',
            'password_confirm': 'Password123!',
        }

    def test_user_registration(self):
        """Test successful registration and initial 10,000 demo coins."""
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertIn('access', response.data)
        self.assertEqual(response.data['user']['demo_balance'], 10000.0)

    def test_user_login(self):
        """Test authentication and JWT token generation."""
        # Create user first
        User.objects.create_user(
            email=self.user_data['email'],
            username=self.user_data['username'],
            password=self.user_data['password']
        )

        response = self.client.post(self.login_url, {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_unauthorized_access(self):
        """Test protected endpoint blocks unauthorized requests."""
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
