import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGames,
  fetchCategories,
  toggleFavoriteGame,
  fetchRecentlyPlayed,
} from '../store/slices/gameSlice';

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const dispatch = useDispatch();
  const gameStore = useSelector((state) => state.game);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchRecentlyPlayed());
    }
  }, [isAuthenticated, dispatch]);

  const toggleFavorite = (gameId, isFavorite) => {
    dispatch(toggleFavoriteGame({ gameId, isFavorite }));
  };

  const value = {
    ...gameStore,
    toggleFavorite,
    reloadGames: (params) => dispatch(fetchGames(params)),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
