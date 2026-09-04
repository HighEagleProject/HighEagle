import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { GamesPage } from './pages/GamesPage';
import { GameDetailPage } from './pages/GameDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ResponsiblePlayPage } from './pages/ResponsiblePlayPage';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

function AppContent() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Show polished boot loading screen for 1.8 seconds
    const timer = setTimeout(() => setInitialLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {initialLoading && <LoadingScreen />}
      </AnimatePresence>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="games" element={<GamesPage />} />
            <Route path="games/:slug" element={<GameDetailPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="responsible-play" element={<ResponsiblePlayPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <GameProvider>
          <AppContent />
        </GameProvider>
      </AuthProvider>
    </Provider>
  );
}
