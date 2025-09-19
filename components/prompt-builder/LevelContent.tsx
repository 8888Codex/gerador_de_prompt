"use client";

import React from 'react';
import { PromptProject } from '../../types';
import Level1Objetivo from './levels/Level1Objetivo';
import Level2Persona from './levels/Level2Persona';
import Level3Variaveis from './levels/Level3Variaveis';
import Level4Anatomia from './levels/Level4Anatomia';
import Level5Restricoes from './levels/Level5Restricoes';

interface LevelContentProps {
  project: PromptProject;
  onUpdateObjetivo: (field: keyof PromptProject['modules']['objetivo'], value: string) => void;
  onUpdatePersona: (field: keyof PromptProject['modules']['persona'], value: any) => void;
  onAddVariavel: () => void;
  onUpdateVariavel: (id: string, field: 'key' | 'description', value: string) => void;
  onRemoveVariavel: (id: string) => void;
  onUpdateAnatomia: (field: keyof PromptProject['modules']['anatomia'], value: any) => void;
  onUpdateRestricoes: (field: keyof PromptProject['modules']['restricoes'], value: string) => void;
  onNextLevel: () => void;
  onImproveText: (level: number, field: string, value: string) => void;
}

const LevelContent: React.FC<LevelContentProps> = (props) => {
  const { 
    project, 
    onUpdateObjetivo, 
    onUpdatePersona, 
    onAddVariavel, 
    onUpdateVariavel, 
    onRemoveVariavel,
    onUpdateAnatomia,
    onUpdateRestricoes,
    onNextLevel, 
    onImproveText 
  } = props;

  const renderContent = () => {
    switch (project.currentLevel) {
      case 1:
        return <Level1Objetivo data={project.modules.objetivo} onUpdate={onUpdateObjetivo} onNext={onNextLevel} onImprove={(field, value) => onImproveText(1, field, value)} />;
      case 2:
        return <Level2Persona data={project.modules.persona} onUpdate={onUpdatePersona} onNext={onNextLevel} onImprove={(field, value) => onImproveText(2, field, value)} />;
      case 3:
        return <Level3Variaveis data={project.modules.variaveis} onAdd={onAddVariavel} onUpdate={onUpdateVariavel} onRemove={onRemoveVariavel} onNext={onNextLevel} />;
      case 4:
        return <Level4Anatomia data={project.modules.anatomia} onUpdate={onUpdateAnatomia} onNext={onNextLevel} />;
      case 5:
        return <Level5Restricoes data={project.modules.restricoes} onUpdate={onUpdateRestricoes} onNext={onNextLevel} />;
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