import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isAuthModalOpen: false,
    authModalTab: 'login', // 'login' | 'register'
    isMobileMenuOpen: false,
    isSearchOpen: false,
    initialLoading: true,
  },
  reducers: {
    openAuthModal: (state, action) => {
      state.isAuthModalOpen = true;
      state.authModalTab = action.payload || 'login';
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    setInitialLoading: (state, action) => {
      state.initialLoading = action.payload;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  toggleMobileMenu,
  closeMobileMenu,
  toggleSearch,
  closeSearch,
  setInitialLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
