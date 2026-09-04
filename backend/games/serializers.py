"""
Serializers for games and categories.
"""

from rest_framework import serializers
from .models import Game, Category


class CategorySerializer(serializers.ModelSerializer):
    game_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'description', 'game_count', 'order']

    def get_game_count(self, obj):
        return obj.games.filter(is_active=True).count()


class GameSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    category_slug = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = [
            'id', 'title', 'slug', 'description', 'thumbnail', 'banner',
            'provider', 'play_url', 'category', 'category_name', 'category_slug',
            'is_featured', 'is_popular', 'is_new', 'is_active',
            'volatility', 'rtp', 'reels', 'rows', 'min_bet', 'max_bet',
            'features', 'play_count', 'is_favorite', 'created_at', 'updated_at'
        ]

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

    def get_category_slug(self, obj):
        return obj.category.slug if obj.category else None

    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.favorited_by.filter(user=request.user).exists()
        return False


class GameListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for game lists."""
    category_name = serializers.SerializerMethodField()
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = [
            'id', 'title', 'slug', 'thumbnail', 'provider', 'play_url',
            'category_name', 'is_featured', 'is_popular', 'is_new',
            'volatility', 'is_favorite'
        ]

    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.favorited_by.filter(user=request.user).exists()
        return False
