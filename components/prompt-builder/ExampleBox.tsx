"use client";

import React from 'react';
import { Lightbulb } from 'lucide-react';

interface ExampleBoxProps {
  title?: string;
  children: React.ReactNode;
}

const ExampleBox: React.FC<ExampleBoxProps> = ({ title = "Exemplo Prático", children }) => {
  return (
    <div className="mt-8 bg-gray-900/50 border border-dashed border-gray-600 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} className="text-yellow-400" />
        <h4 className="font-semibold text-sm text-yellow-400">{title}</h4>
      </div>
      <div className="text-sm text-gray-400 space-y-3 prose prose-invert prose-sm">
        {children}
      </div>
    </div>
  );
};

export default ExampleBox;