"use client";

import React from 'react';
import AuthForm from './AuthForm';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
      <div className="relative z-20 w-full max-w-md animate-fadeIn">
        <AuthForm onSuccess={onLoginSuccess} />
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