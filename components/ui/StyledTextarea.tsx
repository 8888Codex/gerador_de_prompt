"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';

interface StyledTextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  onImprove?: () => void;
}

const StyledTextarea: React.FC<StyledTextareaProps> = ({ label, value, onChange, placeholder, onImprove }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-32 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${onImprove ? 'pr-28' : ''}`}
        />
        {onImprove && (
          <button 
            onClick={onImprove}
            className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full transition-all duration-300"
          >
            <Sparkles size={14} />
            Melhorar
          </button>
        )}
      </div>
    </div>
  );
};

export default StyledTextarea;