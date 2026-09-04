import api from './api';

export const favoriteService = {
  async getFavorites() {
    const response = await api.get('/favorites/');
    return response.data;
  },

  async addFavorite(gameId) {
    const response = await api.post(`/favorites/${gameId}/`);
    return response.data;
  },

  async removeFavorite(gameId) {
    const response = await api.delete(`/favorites/${gameId}/remove/`);
    return response.data;
  },
};
