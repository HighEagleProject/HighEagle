from django.contrib import admin
from .models import Favorite


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ['user', 'game', 'created_at']
    search_fields = ['user__username', 'game__title']
    readonly_fields = ['id', 'created_at']
