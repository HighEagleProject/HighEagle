"""Favorites model."""

from django.db import models
from django.conf import settings
import uuid


class Favorite(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='favorites'
    )
    game = models.ForeignKey(
        'games.Game', on_delete=models.CASCADE,
        related_name='favorited_by'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'favorites'
        unique_together = [['user', 'game']]
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} ❤ {self.game.title}"
