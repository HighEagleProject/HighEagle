"""
Serializers for gameplay.
"""

from rest_framework import serializers
from .models import SpinHistory, GameSession


class SpinHistorySerializer(serializers.ModelSerializer):
    game_title = serializers.CharField(source='game.title', read_only=True)
    game_slug = serializers.CharField(source='game.slug', read_only=True)

    class Meta:
        model = SpinHistory
        fields = [
            'id', 'game_title', 'game_slug', 'bet', 'win',
            'balance_before', 'balance_after', 'result', 'created_at'
        ]
        read_only_fields = fields


class SpinRequestSerializer(serializers.Serializer):
    game_id = serializers.UUIDField()
    bet = serializers.FloatField(min_value=1.0)
