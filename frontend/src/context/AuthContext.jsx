import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateBalance, fetchCurrentUser } from '../store/slices/authSlice';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, accessToken, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (accessToken && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [accessToken, user, dispatch]);

  // Listen for global logout events triggered by Axios 401 interceptor
  useEffect(() => {
    const handleLogout = () => {
      dispatch(logout());
    };
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, [dispatch]);

  const setBalance = (newBalance) => {
    dispatch(updateBalance(newBalance));
  };

  const value = {
    user,
    accessToken,
    isAuthenticated,
    loading,
    error,
    balance: user?.demo_balance || 10000,
    setBalance,
    logout: () => dispatch(logout()),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
