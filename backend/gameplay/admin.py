from django.contrib import admin
from .models import SpinHistory, GameSession


@admin.register(GameSession)
class GameSessionAdmin(admin.ModelAdmin):
    list_display = ['user', 'game', 'total_spins', 'total_bet', 'total_win', 'started_at']
    list_filter = ['game']
    search_fields = ['user__username', 'game__title']
    readonly_fields = ['id', 'started_at']


@admin.register(SpinHistory)
class SpinHistoryAdmin(admin.ModelAdmin):
    list_display = ['user', 'game', 'bet', 'win', 'balance_before', 'balance_after', 'created_at']
    list_filter = ['game']
    search_fields = ['user__username', 'game__title']
    readonly_fields = ['id', 'created_at']
