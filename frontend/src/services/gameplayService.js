import api from './api';

export const gameplayService = {
  async spin(gameId, bet) {
    const response = await api.post('/gameplay/spin/', { game_id: gameId, bet });
    return response.data;
  },

  async getHistory(params = {}) {
    const response = await api.get('/gameplay/history/', { params });
    return response.data;
  },

  async resetBalance() {
    const response = await api.post('/gameplay/reset/');
    return response.data;
  },

  async getRecentlyPlayed() {
    const response = await api.get('/history/recent/');
    return response.data;
  },

  async recordRecentlyPlayed(gameId) {
    const response = await api.post('/history/recent/update/', { game_id: gameId });
    return response.data;
  },
};
