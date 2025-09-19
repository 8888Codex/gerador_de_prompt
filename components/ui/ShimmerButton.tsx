"use client";

import React from 'react';

interface ShimmerButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children, onClick, disabled = false, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex h-14 overflow-hidden rounded-lg p-[2px] 
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900
        transition-transform duration-300 ease-in-out hover:scale-105
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${className}
      `}
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#60a5fa_0%,#3b82f6_50%,#60a5fa_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-gray-900 px-8 py-1 text-lg font-bold text-white backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
};

export default ShimmerButton;