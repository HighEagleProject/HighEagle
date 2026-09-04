from django.urls import path
from . import views

urlpatterns = [
    path('', views.games_list, name='games-list'),
    path('featured/', views.featured_games, name='games-featured'),
    path('popular/', views.popular_games, name='games-popular'),
    path('new/', views.new_games, name='games-new'),
    path('categories/', views.categories_list, name='categories-list'),
    path('<slug:slug>/', views.game_detail, name='game-detail'),
    path('<slug:slug>/manage/', views.manage_game, name='game-manage'),
]
