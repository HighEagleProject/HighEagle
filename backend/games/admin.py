from django.contrib import admin
from .models import Game, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'icon', 'order']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order']


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ['title', 'provider', 'category', 'is_featured', 'is_popular', 'is_new', 'is_active', 'play_count', 'created_at']
    list_filter = ['is_featured', 'is_popular', 'is_new', 'is_active', 'category', 'volatility']
    search_fields = ['title', 'provider', 'slug']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['is_featured', 'is_popular', 'is_new', 'is_active']
    ordering = ['-created_at']
    readonly_fields = ['id', 'play_count', 'created_at', 'updated_at']

    fieldsets = (
        ('Basic Info', {'fields': ('id', 'title', 'slug', 'description', 'provider', 'category')}),
        ('Media', {'fields': ('thumbnail', 'banner')}),
        ('Status', {'fields': ('is_featured', 'is_popular', 'is_new', 'is_active')}),
        ('Game Config', {'fields': ('volatility', 'rtp', 'reels', 'rows', 'min_bet', 'max_bet', 'features')}),
        ('Stats', {'fields': ('play_count', 'created_at', 'updated_at')}),
    )
