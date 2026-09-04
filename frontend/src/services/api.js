import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 & token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });

          if (res.data.success || res.data.access) {
            const newAccess = res.data.access;
            localStorage.setItem('accessToken', newAccess);
            if (res.data.refresh) {
              localStorage.setItem('refreshToken', res.data.refresh);
            }
            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return api(originalRequest);
          }
        } catch {
          // Token refresh failed, clean up local storage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('auth:logout'));
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
