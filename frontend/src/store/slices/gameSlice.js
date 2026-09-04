import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gameService } from '../../services/gameService';
import { favoriteService } from '../../services/favoriteService';
import { gameplayService } from '../../services/gameplayService';

export const fetchGames = createAsyncThunk(
  'game/fetchGames',
  async (params, { rejectWithValue }) => {
    try {
      const data = await gameService.getGames(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch games');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'game/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await gameService.getCategories();
      return data.categories;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const toggleFavoriteGame = createAsyncThunk(
  'game/toggleFavorite',
  async ({ gameId, isFavorite }, { rejectWithValue }) => {
    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(gameId);
      } else {
        await favoriteService.addFavorite(gameId);
      }
      return { gameId, isFavorite: !isFavorite };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update favorite');
    }
  }
);

export const fetchRecentlyPlayed = createAsyncThunk(
  'game/fetchRecentlyPlayed',
  async (_, { rejectWithValue }) => {
    try {
      const data = await gameplayService.getRecentlyPlayed();
      return data.recently_played;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch recently played');
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    games: [],
    categories: [],
    recentlyPlayed: [],
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    loading: false,
    categoriesLoading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'all',
    selectedFilter: 'all',
    selectedSort: 'popular',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
    setSelectedSort: (state, action) => {
      state.selectedSort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Games
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload.results || action.payload;
        state.totalCount = action.payload.count || action.payload.length;
        if (action.payload.count) {
          state.totalPages = Math.ceil(action.payload.count / 20);
        }
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      // Toggle Favorite
      .addCase(toggleFavoriteGame.fulfilled, (state, action) => {
        const { gameId, isFavorite } = action.payload;
        const game = state.games.find((g) => g.id === gameId);
        if (game) {
          game.is_favorite = isFavorite;
        }
      })
      // Fetch Recently Played
      .addCase(fetchRecentlyPlayed.fulfilled, (state, action) => {
        state.recentlyPlayed = action.payload;
      });
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedFilter,
  setSelectedSort,
  setCurrentPage,
} = gameSlice.actions;

export default gameSlice.reducer;
