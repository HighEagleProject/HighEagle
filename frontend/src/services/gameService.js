import api from './api';

export const gameService = {
  async getGames(params = {}) {
    const response = await api.get('/games/', { params });
    return response.data;
  },

  async getGameBySlug(slug) {
    const response = await api.get(`/games/${slug}/`);
    return response.data;
  },

  async getFeaturedGames() {
    const response = await api.get('/games/featured/');
    return response.data;
  },

  async getPopularGames() {
    const response = await api.get('/games/popular/');
    return response.data;
  },

  async getNewGames() {
    const response = await api.get('/games/new/');
    return response.data;
  },

  async getCategories() {
    const response = await api.get('/games/categories/');
    return response.data;
  },

  async searchGames(query) {
    const response = await api.get('/games/', { params: { search: query } });
    return response.data;
  },
};
