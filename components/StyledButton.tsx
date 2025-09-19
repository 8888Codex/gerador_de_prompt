"use client";

import React from 'react';

interface StyledButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({ title, onClick, disabled = false, className = '' }) => {
  const baseClasses = "px-8 py-3.5 rounded-lg font-bold text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300";
  const enabledClasses = "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl";
  const disabledClasses = "bg-gray-400 text-gray-200 cursor-not-allowed";

  const buttonClasses = `${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${className}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {title}
    </button>
  );
};

export default StyledButton;