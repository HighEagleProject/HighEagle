from django.urls import path
from . import views

urlpatterns = [
    path('recent/', views.recent_list, name='history-recent-list'),
    path('recent/update/', views.update_recent, name='history-recent-update'),
]
