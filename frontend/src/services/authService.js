import api from './api';

export const authService = {
  async register(email, username, password, passwordConfirm) {
    const response = await api.post('/auth/register/', {
      email,
      username,
      password,
      password_confirm: passwordConfirm,
    });
    if (response.data.access) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/auth/login/', { email, password });
    if (response.data.access) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me/');
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await api.put('/auth/profile/', profileData);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },
};
