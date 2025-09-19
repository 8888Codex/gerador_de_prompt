"use client";

import React from 'react';
import { CheckCircle, Lock, ArrowRightCircle } from 'lucide-react';
import { Level } from '../../types';
import { LEVELS } from '../../data/levels';

interface LevelSidebarProps {
  currentLevel: number;
  completedLevels: number[];
}

const LevelSidebar: React.FC<LevelSidebarProps> = ({ currentLevel, completedLevels }) => {
  const getStatusIcon = (level: Level) => {
    if (level.id === currentLevel) {
      return <ArrowRightCircle className="text-blue-400" size={20} />;
    }
    if (completedLevels.includes(level.id)) {
      return <CheckCircle className="text-green-400" size={20} />;
    }
    // Assuming levels are unlocked sequentially
    if (level.id > currentLevel) {
      return <Lock className="text-gray-500" size={20} />;
    }
    return <span className="w-5 h-5"></span>; // Placeholder for unlocked but not current/completed
  };

  return (
    <nav className="space-y-2">
      {LEVELS.map((level) => (
        <div
          key={level.id}
          className={`flex items-start p-4 rounded-lg transition-all duration-200 border-l-4 ${
            currentLevel === level.id
              ? 'bg-blue-900/50 border-blue-400'
              : 'border-transparent hover:bg-gray-800/60'
          }`}
        >
          <div className="flex-shrink-0 w-8 text-2xl">{level.icon}</div>
          <div className="flex-grow ml-3">
            <p className={`font-bold ${currentLevel === level.id ? 'text-white' : 'text-gray-200'}`}>
              {level.name}
            </p>
            <p className="text-sm text-gray-400">{level.description}</p>
          </div>
          <div className="flex-shrink-0 w-6 flex items-center justify-center h-full">
            {getStatusIcon(level)}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default LevelSidebar;