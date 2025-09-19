"use client";

import React from 'react';
import { PromptProject, ObjetivoModule, PersonaModule, AnatomiaModule, RestricoesModule } from '../../types';
import Level1Objetivo from './levels/Level1Objetivo';
import Level2Persona from './levels/Level2Persona';
import Level3Variaveis from './levels/Level3Variaveis';
import Level4Anatomia from './levels/Level4Anatomia';
import Level5Restricoes from './levels/Level5Restricoes';
import Level6Fluxos from './levels/Level6Fluxos';
import Level7Ferramentas from './levels/Level7Ferramentas';
import Level8Preview from './levels/Level8Preview';

interface LevelContentProps {
  project: PromptProject;
  dispatch: React.Dispatch<any>; // Simplificado para o exemplo, pode ser mais específico
  onImproveText: (level: number, field: string, value: string, itemId?: string) => void;
}

const LevelContent: React.FC<LevelContentProps> = (props) => {
  const { project, dispatch, onImproveText } = props;

  const onNextLevel = () => dispatch({ type: 'COMPLETE_AND_ADVANCE_LEVEL' });

  const renderContent = () => {
    switch (project.currentLevel) {
      case 1:
        return <Level1Objetivo 
          data={project.modules.objetivo} 
          dispatch={dispatch}
          onNext={onNextLevel} 
          onImprove={(field: keyof ObjetivoModule, value: string) => onImproveText(1, field, value)} 
        />;
      case 2:
        return <Level2Persona 
          data={project.modules.persona} 
          dispatch={dispatch}
          onNext={onNextLevel} 
          onImprove={(field: keyof PersonaModule, value: string) => onImproveText(2, field, value)} 
        />;
      case 3:
        return <Level3Variaveis 
          data={project.modules.variaveis} 
          dispatch={dispatch}
          onNext={onNextLevel} 
        />;
      case 4:
        return <Level4Anatomia 
          data={project.modules.anatomia} 
          dispatch={dispatch}
          onNext={onNextLevel} 
          onImprove={(field: keyof AnatomiaModule, value: string) => onImproveText(4, field, value)} 
        />;
      case 5:
        return <Level5Restricoes 
          data={project.modules.restricoes} 
          dispatch={dispatch}
          onNext={onNextLevel} 
          onImprove={(field: keyof RestricoesModule, value: string) => onImproveText(5, field, value)} 
        />;
      case 6:
        return <Level6Fluxos 
          data={project.modules.fluxos} 
          dispatch={dispatch}
          onNext={onNextLevel} 
          onImprove={(itemId: string, field: 'passos', value: string) => onImproveText(6, field, value, itemId)} 
        />;
      case 7:
        return <Level7Ferramentas 
          data={project.modules.ferramentas} 
          dispatch={dispatch}
          onNext={onNextLevel} 
          onImprove={(itemId: string, field: 'descricao', value: string) => onImproveText(7, field, value, itemId)} 
        />;
      case 8:
        return <Level8Preview project={project} />;
      default:
        return <div className="text-center text-gray-400">Parabéns, você concluiu!</div>;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
      {renderContent()}
    </div>
  );
};

export default LevelContent;