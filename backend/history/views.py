"""Recently played views."""

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from games.models import Game
from games.serializers import GameListSerializer
from .models import RecentlyPlayed


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recent_list(request):
    """GET /api/history/recent/ — list recently played games."""
    recent = RecentlyPlayed.objects.filter(
        user=request.user
    ).select_related('game', 'game__category').order_by('-played_at')[:20]

    games = [r.game for r in recent if r.game.is_active]
    serializer = GameListSerializer(games, many=True, context={'request': request})
    return Response({'success': True, 'recently_played': serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_recent(request):
    """POST /api/history/recent/ — update recently played when a game is opened."""
    game_id = request.data.get('game_id')
    if not game_id:
        return Response({'success': False, 'message': 'game_id is required.'}, status=400)

    try:
        game = Game.objects.get(id=game_id, is_active=True)
    except Game.DoesNotExist:
        return Response({'success': False, 'message': 'Game not found.'}, status=404)

    recent, created = RecentlyPlayed.objects.get_or_create(
        user=request.user, game=game
    )
    if not created:
        recent.play_count += 1
        recent.save()

    return Response({
        'success': True,
        'message': f'{game.title} added to recently played.'
    })
