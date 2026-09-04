"""
Views for user authentication and profile management.
"""

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError

from .models import User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ProfileUpdateSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """Register a new user and return JWT tokens."""
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response({
            'success': True,
            'message': 'Account created successfully!',
            **tokens,
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

    # Format first error message clearly
    error_msg = 'Registration failed.'
    if serializer.errors:
        first_field = next(iter(serializer.errors))
        errors_list = serializer.errors[first_field]
        if isinstance(errors_list, list) and len(errors_list) > 0:
            error_msg = f"{first_field.capitalize()}: {errors_list[0]}"
        elif isinstance(errors_list, str):
            error_msg = errors_list

    return Response({
        'success': False,
        'message': error_msg,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Authenticate user and return JWT tokens."""
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        tokens = get_tokens_for_user(user)
        return Response({
            'success': True,
            'message': 'Login successful.',
            **tokens,
            'user': UserSerializer(user).data
        }, status=status.HTTP_200_OK)

    return Response({
        'success': False,
        'message': 'Invalid credentials.',
        'errors': serializer.errors
    }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_view(request):
    """Refresh access token using refresh token."""
    refresh_token = request.data.get('refresh')
    if not refresh_token:
        return Response({
            'success': False,
            'message': 'Refresh token is required.'
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        refresh = RefreshToken(refresh_token)
        return Response({
            'success': True,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_200_OK)
    except TokenError as e:
        return Response({
            'success': False,
            'message': 'Invalid or expired refresh token.'
        }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    """Get current authenticated user's data."""
    serializer = UserSerializer(request.user)
    return Response({
        'success': True,
        'user': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    """Update user profile."""
    serializer = ProfileUpdateSerializer(
        request.user,
        data=request.data,
        partial=True,
        context={'request': request}
    )
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'message': 'Profile updated successfully.',
            'user': UserSerializer(request.user).data
        }, status=status.HTTP_200_OK)

    return Response({
        'success': False,
        'message': 'Profile update failed.',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)
