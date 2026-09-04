import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { Modal } from '../components/Modal/Modal';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { useSelector, useDispatch } from 'react-redux';
import { closeAuthModal } from '../store/slices/uiSlice';
import { Toaster } from 'react-hot-toast';

export const MainLayout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthModalOpen, authModalTab } = useSelector((state) => state.ui);

  return (
    <div className="min-h-screen bg-ocean-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-ocean-950 font-sans">
      
      {/* Toast Notification Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f1b38',
            color: '#fff',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          },
        }}
      />

      {/* Global Search Bar Overlay */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Auth Modal Overlay */}
      <Modal
        isOpen={isAuthModalOpen}
        onClose={() => dispatch(closeAuthModal())}
        title={authModalTab === 'login' ? 'Welcome Back' : 'Create Demo Account'}
      >
        {authModalTab === 'login' ? (
          <LoginPage isModal={true} onSuccess={() => dispatch(closeAuthModal())} />
        ) : (
          <RegisterPage isModal={true} onSuccess={() => dispatch(closeAuthModal())} />
        )}
      </Modal>

      {/* Sticky Navigation Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Page Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
