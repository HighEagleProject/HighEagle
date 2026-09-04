"""
Gameplay models — game sessions and spin history.
"""

from django.db import models
from django.conf import settings
import uuid


class GameSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='game_sessions'
    )
    game = models.ForeignKey(
        'games.Game', on_delete=models.CASCADE,
        related_name='sessions'
    )
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    total_spins = models.IntegerField(default=0)
    total_bet = models.FloatField(default=0.0)
    total_win = models.FloatField(default=0.0)

    class Meta:
        db_table = 'game_sessions'
        ordering = ['-started_at']

    def __str__(self):
        return f"{self.user.username} - {self.game.title} @ {self.started_at}"


class SpinHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='spin_history'
    )
    game = models.ForeignKey(
        'games.Game', on_delete=models.CASCADE,
        related_name='spins'
    )
    session = models.ForeignKey(
        GameSession, on_delete=models.CASCADE,
        related_name='spins', null=True, blank=True
    )
    bet = models.FloatField()
    win = models.FloatField(default=0.0)
    balance_before = models.FloatField()
    balance_after = models.FloatField()
    result = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'spin_history'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} bet {self.bet} won {self.win} on {self.game.title}"
