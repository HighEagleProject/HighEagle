"""
Gameplay views — spin endpoint and history.
"""

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from games.models import Game
from .models import SpinHistory, GameSession
from .serializers import SpinHistorySerializer, SpinRequestSerializer
from .slot_engine import generate_spin


class HistoryPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def spin_view(request):
    """
    POST /api/gameplay/spin/
    Validate bet, generate spin on server, update balance, record history.
    """
    serializer = SpinRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({
            'success': False,
            'message': 'Invalid spin request.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    game_id = serializer.validated_data['game_id']
    bet = serializer.validated_data['bet']
    user = request.user

    # ── Validate game ──────────────────────────────────────────────────────
    try:
        game = Game.objects.get(id=game_id, is_active=True)
    except Game.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Game not found or unavailable.'
        }, status=status.HTTP_404_NOT_FOUND)

    # ── Validate bet range ─────────────────────────────────────────────────
    if bet < game.min_bet or bet > game.max_bet:
        return Response({
            'success': False,
            'message': f'Bet must be between {game.min_bet} and {game.max_bet} coins.'
        }, status=status.HTTP_400_BAD_REQUEST)

    # ── Validate balance ───────────────────────────────────────────────────
    if user.demo_balance < bet:
        return Response({
            'success': False,
            'message': 'Insufficient coins balance.'
        }, status=status.HTTP_400_BAD_REQUEST)

    # ── Generate spin result (server-side only) ────────────────────────────
    spin_result = generate_spin(bet)
    win_amount = spin_result['win']

    # ── Update balance ─────────────────────────────────────────────────────
    balance_before = user.demo_balance
    balance_after = round(balance_before - bet + win_amount, 2)

    # Update user stats
    user.demo_balance = balance_after
    user.total_spins += 1
    if win_amount > 0:
        user.total_wins += win_amount
    user.save(update_fields=['demo_balance', 'total_spins', 'total_wins'])

    # Update game play count
    Game.objects.filter(pk=game.pk).update(play_count=game.play_count + 1)

    # ── Record spin history ────────────────────────────────────────────────
    SpinHistory.objects.create(
        user=user,
        game=game,
        bet=bet,
        win=win_amount,
        balance_before=balance_before,
        balance_after=balance_after,
        result=spin_result,
    )

    # Update games_played count (count distinct games)
    distinct_games = SpinHistory.objects.filter(user=user).values('game').distinct().count()
    user.games_played = distinct_games
    user.save(update_fields=['games_played'])

    return Response({
        'success': True,
        'result': {
            'reels': spin_result['reels'],
            'win': win_amount,
            'bet': bet,
            'winning_lines': spin_result['winning_lines'],
            'is_win': spin_result['is_win'],
        },
        'balance': balance_after,
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def history_view(request):
    """GET /api/gameplay/history/ — paginated spin history for the user."""
    spins = SpinHistory.objects.filter(user=request.user).order_by('-created_at')

    # Optional filter by game
    game_slug = request.query_params.get('game', '')
    if game_slug:
        spins = spins.filter(game__slug=game_slug)

    paginator = HistoryPagination()
    page = paginator.paginate_queryset(spins, request)
    serializer = SpinHistorySerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reset_balance(request):
    """POST /api/gameplay/reset/ — Reset demo balance to 10,000 coins."""
    user = request.user
    user.demo_balance = 10000.0
    user.save(update_fields=['demo_balance'])
    return Response({
        'success': True,
        'message': 'Demo balance reset to 10,000 coins.',
        'balance': 10000.0
    })
