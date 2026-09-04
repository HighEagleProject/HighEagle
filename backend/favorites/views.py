"""Favorites views."""

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from games.models import Game
from games.serializers import GameListSerializer
from .models import Favorite


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def favorites_list(request):
    """GET /api/favorites/ — list user's favorite games."""
    favorites = Favorite.objects.filter(user=request.user).select_related('game', 'game__category')
    games = [fav.game for fav in favorites if fav.game.is_active]
    serializer = GameListSerializer(games, many=True, context={'request': request})
    return Response({'success': True, 'favorites': serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_favorite(request, game_id):
    """POST /api/favorites/:game_id/ — add game to favorites."""
    try:
        game = Game.objects.get(id=game_id, is_active=True)
    except Game.DoesNotExist:
        return Response({'success': False, 'message': 'Game not found.'}, status=404)

    fav, created = Favorite.objects.get_or_create(user=request.user, game=game)

    if created:
        return Response({'success': True, 'message': f'{game.title} added to favorites.'}, status=201)
    return Response({'success': False, 'message': f'{game.title} is already in your favorites.'}, status=200)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_favorite(request, game_id):
    """DELETE /api/favorites/:game_id/ — remove game from favorites."""
    try:
        fav = Favorite.objects.get(user=request.user, game__id=game_id)
        fav.delete()
        return Response({'success': True, 'message': 'Removed from favorites.'})
    except Favorite.DoesNotExist:
        return Response({'success': False, 'message': 'Favorite not found.'}, status=404)
