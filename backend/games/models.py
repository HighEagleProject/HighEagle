"""
Game and Category models.
"""

from django.db import models
import uuid


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    icon = models.CharField(max_length=100, blank=True, default='🌊')
    description = models.TextField(blank=True, default='')
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'categories'
        ordering = ['order', 'name']
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Game(models.Model):
    VOLATILITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True, default='')
    thumbnail = models.CharField(max_length=500, blank=True, default='')
    banner = models.CharField(max_length=500, blank=True, default='')
    provider = models.CharField(max_length=200, default='HighEagle Studios')
    play_url = models.URLField(max_length=500, blank=True, default='')
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='games'
    )
    is_featured = models.BooleanField(default=False)
    is_popular = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    volatility = models.CharField(max_length=10, choices=VOLATILITY_CHOICES, default='medium')
    rtp = models.FloatField(default=96.5)
    reels = models.IntegerField(default=5)
    rows = models.IntegerField(default=3)
    min_bet = models.FloatField(default=10.0)
    max_bet = models.FloatField(default=5000.0)
    features = models.JSONField(default=list, blank=True)
    play_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'games'
        ordering = ['-created_at']
        verbose_name = 'Game'
        verbose_name_plural = 'Games'

    def __str__(self):
        return self.title
