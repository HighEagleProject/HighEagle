"""Recently played model."""

from django.db import models
from django.conf import settings
import uuid


class RecentlyPlayed(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name='recently_played'
    )
    game = models.ForeignKey(
        'games.Game', on_delete=models.CASCADE,
        related_name='recently_played_by'
    )
    played_at = models.DateTimeField(auto_now=True)
    play_count = models.IntegerField(default=1)

    class Meta:
        db_table = 'recently_played'
        unique_together = [['user', 'game']]
        ordering = ['-played_at']

    def __str__(self):
        return f"{self.user.username} played {self.game.title} at {self.played_at}"
