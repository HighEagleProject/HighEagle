from django.contrib import admin
from .models import RecentlyPlayed


@admin.register(RecentlyPlayed)
class RecentlyPlayedAdmin(admin.ModelAdmin):
    list_display = ['user', 'game', 'play_count', 'played_at']
    search_fields = ['user__username', 'game__title']
    readonly_fields = ['id', 'played_at']
