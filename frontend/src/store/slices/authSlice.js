import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

const initialUser = (() => {
  try {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
})();

const parseError = (err, defaultMsg) => {
  if (!err) return defaultMsg;
  const data = err.response?.data;
  if (!data) return err.message || defaultMsg;
  if (typeof data === 'string') return data;
  if (data.message) return data.message;
  if (data.error) return data.error;
  if (data.detail) return data.detail;
  if (data.errors && typeof data.errors === 'object') {
    const firstKey = Object.keys(data.errors)[0];
    const val = data.errors[firstKey];
    const cleanMsg = Array.isArray(val) ? val[0] : String(val);
    return `${firstKey.charAt(0).toUpperCase() + firstKey.slice(1)}: ${cleanMsg}`;
  }
  if (typeof data === 'object') {
    const firstKey = Object.keys(data)[0];
    const val = data[firstKey];
    const cleanMsg = Array.isArray(val) ? val[0] : String(val);
    return `${firstKey.charAt(0).toUpperCase() + firstKey.slice(1)}: ${cleanMsg}`;
  }
  return defaultMsg;
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.login(email, password);
      return data;
    } catch (err) {
      return rejectWithValue(parseError(err, 'Login failed. Please check your credentials.'));
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, username, password, passwordConfirm }, { rejectWithValue }) => {
    try {
      const data = await authService.register(email, username, password, passwordConfirm);
      return data;
    } catch (err) {
      return rejectWithValue(parseError(err, 'Registration failed. Please verify your details.'));
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.getCurrentUser();
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    accessToken: localStorage.getItem('accessToken') || null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateBalance: (state, action) => {
      if (state.user) {
        state.user.demo_balance = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Current User
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, updateBalance, updateUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
