import api from './api';

export const userService = {
  async getProfile() {
    const response = await api.get('/auth/me/');
    return response.data;
  },

  async updateProfile(data) {
    const response = await api.put('/auth/profile/', data);
    return response.data;
  },
};
