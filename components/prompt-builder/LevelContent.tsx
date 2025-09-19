"use client";

import React from 'react';
import { PromptProject } from '../../types';
import Level1Objetivo from './levels/Level1Objetivo';

interface LevelContentProps {
  project: PromptProject;
  onUpdateObjetivo: (field: keyof PromptProject['modules']['objetivo'], value: string) => void;
  onNextLevel: () => void;
  onImproveText: (field: string, value: string) => void;
}

const LevelContent: React.FC<LevelContentProps> = ({ project, onUpdateObjetivo, onNextLevel, onImproveText }) => {
  const renderContent = () => {
    switch (project.currentLevel) {
      case 1:
        return (
          <Level1Objetivo 
            data={project.modules.objetivo}
            onUpdate={onUpdateObjetivo}
            onNext={onNextLevel}
            onImprove={(field, value) => onImproveText(field, value)}
          />
        );
      // Futuros níveis serão adicionados aqui
      default:
        return <div className="text-center text-gray-400">Selecione um nível para começar.</div>;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
      {renderContent()}
    </div>
  );
};

export default LevelContent;