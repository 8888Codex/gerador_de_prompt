"use client";

import React from 'react';
import { PromptProject } from '../../types';
import Level1Objetivo from './levels/Level1Objetivo';
import Level2Persona from './levels/Level2Persona';

interface LevelContentProps {
  project: PromptProject;
  onUpdateObjetivo: (field: keyof PromptProject['modules']['objetivo'], value: string) => void;
  onUpdatePersona: (field: keyof PromptProject['modules']['persona'], value: any) => void;
  onNextLevel: () => void;
  onImproveText: (level: number, field: string, value: string) => void;
}

const LevelContent: React.FC<LevelContentProps> = ({ project, onUpdateObjetivo, onUpdatePersona, onNextLevel, onImproveText }) => {
  const renderContent = () => {
    switch (project.currentLevel) {
      case 1:
        return (
          <Level1Objetivo 
            data={project.modules.objetivo}
            onUpdate={onUpdateObjetivo}
            onNext={onNextLevel}
            onImprove={(field, value) => onImproveText(1, field, value)}
          />
        );
      case 2:
        return (
          <Level2Persona
            data={project.modules.persona}
            onUpdate={onUpdatePersona}
            onNext={onNextLevel}
            onImprove={(field, value) => onImproveText(2, field, value)}
          />
        );
      // Futuros níveis serão adicionados aqui
      default:
        return <div className="text-center text-gray-400">Nível {project.currentLevel} em construção.</div>;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
      {renderContent()}
    </div>
  );
};

export default LevelContent;