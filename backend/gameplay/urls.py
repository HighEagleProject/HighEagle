from django.urls import path
from . import views

urlpatterns = [
    path('spin/', views.spin_view, name='gameplay-spin'),
    path('history/', views.history_view, name='gameplay-history'),
    path('reset/', views.reset_balance, name='gameplay-reset'),
]
