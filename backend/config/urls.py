"""
URL configuration for High Eagle project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from games import views as games_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/games/', include('games.urls')),
    path('api/categories/', games_views.categories_list, name='root-categories'),
    path('api/gameplay/', include('gameplay.urls')),
    path('api/favorites/', include('favorites.urls')),
    path('api/history/', include('history.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
