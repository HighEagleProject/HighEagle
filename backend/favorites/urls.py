from django.urls import path
from . import views

urlpatterns = [
    path('', views.favorites_list, name='favorites-list'),
    path('<uuid:game_id>/', views.add_favorite, name='favorites-add'),
    path('<uuid:game_id>/remove/', views.remove_favorite, name='favorites-remove'),
]
