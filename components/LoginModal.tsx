"use client";

import React from 'react';
import LoginPage from './ui/gaming-login';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const handleLogin = (email: string, password: string, remember: boolean) => {
    console.log('Login attempt:', { email, password, remember });
    // Após o login, chama a função de sucesso para redirecionar.
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
      <div className="relative z-20 w-full max-w-md animate-fadeIn">
        <LoginPage.LoginForm onSubmit={handleLogin} />
      </div>
      
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-30"
        aria-label="Close modal"
      >
        <X size={24} />
      </button>
    </div>
  );
};

export default LoginModal;