import React, { createContext, useContext, useState } from 'react';

type AuthMode = 'login' | 'register';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  // Modal state
  isModalOpen: boolean;
  modalMode: AuthMode;
  openModal: (mode?: AuthMode) => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AuthMode>('login');

  const login = () => {
    setIsAuthenticated(true);
    closeModal();
  };
  
  const logout = () => {
    setIsAuthenticated(false);
  };

  const openModal = (mode: AuthMode = 'login') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout,
      isModalOpen,
      modalMode,
      openModal,
      closeModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};