"""
Views for game catalog and categories.
"""

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

from .models import Game, Category
from .serializers import GameSerializer, GameListSerializer, CategorySerializer


class GamePagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


@api_view(['GET'])
@permission_classes([AllowAny])
def games_list(request):
    """
    List all active games with optional filtering, searching, and sorting.
    GET /api/games/?search=ocean&category=ocean&sort=popular&page=1
    """
    queryset = Game.objects.filter(is_active=True)

    # Search
    search = request.query_params.get('search', '')
    if search:
        queryset = queryset.filter(
            Q(title__icontains=search) |
            Q(provider__icontains=search) |
            Q(category__name__icontains=search) |
            Q(description__icontains=search)
        )

    # Category filter
    category = request.query_params.get('category', '')
    if category:
        queryset = queryset.filter(
            Q(category__slug=category) | Q(category__name__icontains=category)
        )

    # Special filters
    filter_type = request.query_params.get('filter', '')
    if filter_type == 'popular':
        queryset = queryset.filter(is_popular=True)
    elif filter_type == 'new':
        queryset = queryset.filter(is_new=True)
    elif filter_type == 'featured':
        queryset = queryset.filter(is_featured=True)
    elif filter_type == 'favorites' and request.user.is_authenticated:
        favorite_game_ids = request.user.favorites.values_list('game_id', flat=True)
        queryset = queryset.filter(id__in=favorite_game_ids)
    elif filter_type == 'recent' and request.user.is_authenticated:
        recent_game_ids = request.user.recently_played.order_by('-played_at').values_list('game_id', flat=True)[:20]
        queryset = queryset.filter(id__in=recent_game_ids)

    # Sorting
    sort = request.query_params.get('sort', '')
    if sort == 'a-z':
        queryset = queryset.order_by('title')
    elif sort == 'z-a':
        queryset = queryset.order_by('-title')
    elif sort == 'popular':
        queryset = queryset.order_by('-play_count')
    elif sort == 'newest':
        queryset = queryset.order_by('-created_at')
    else:
        queryset = queryset.order_by('-is_featured', '-is_popular', '-created_at')

    paginator = GamePagination()
    page = paginator.paginate_queryset(queryset, request)

    serializer = GameListSerializer(page, many=True, context={'request': request})
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def game_detail(request, slug):
    """Get single game by slug."""
    try:
        game = Game.objects.get(slug=slug, is_active=True)
        # Increment play count view
        Game.objects.filter(pk=game.pk).update(play_count=game.play_count + 1)
        serializer = GameSerializer(game, context={'request': request})
        return Response({
            'success': True,
            'game': serializer.data
        })
    except Game.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Game not found.'
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
def featured_games(request):
    """Get featured games."""
    games = Game.objects.filter(is_featured=True, is_active=True).order_by('-play_count')[:12]
    serializer = GameListSerializer(games, many=True, context={'request': request})
    return Response({'success': True, 'games': serializer.data})


@api_view(['GET'])
@permission_classes([AllowAny])
def popular_games(request):
    """Get popular games."""
    games = Game.objects.filter(is_popular=True, is_active=True).order_by('-play_count')[:12]
    serializer = GameListSerializer(games, many=True, context={'request': request})
    return Response({'success': True, 'games': serializer.data})


@api_view(['GET'])
@permission_classes([AllowAny])
def new_games(request):
    """Get new games."""
    games = Game.objects.filter(is_new=True, is_active=True).order_by('-created_at')[:12]
    serializer = GameListSerializer(games, many=True, context={'request': request})
    return Response({'success': True, 'games': serializer.data})


@api_view(['GET'])
@permission_classes([AllowAny])
def categories_list(request):
    """Get all categories."""
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response({'success': True, 'categories': serializer.data})


# ─── Admin-only Game Management ──────────────────────────────────────────────

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_game(request):
    """Admin: Create a new game."""
    serializer = GameSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'message': 'Game created successfully.',
            'game': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAdminUser])
def manage_game(request, slug):
    """Admin: Update or delete a game."""
    try:
        game = Game.objects.get(slug=slug)
    except Game.DoesNotExist:
        return Response({'success': False, 'message': 'Game not found.'}, status=404)

    if request.method == 'DELETE':
        game.delete()
        return Response({'success': True, 'message': 'Game deleted.'})

    serializer = GameSerializer(game, data=request.data, partial=True, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'game': serializer.data})
    return Response({'success': False, 'errors': serializer.errors}, status=400)
