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
  onUpdateObjetivo: (field: keyof PromptProject['modules']['objetivo'], value: any) => void;
  onUpdatePersona: (field: keyof PromptProject['modules']['persona'], value: any) => void;
  onAddVariavel: () => void;
  onUpdateVariavel: (id: string, field: 'key' | 'description', value: string) => void;
  onRemoveVariavel: (id: string) => void;
  onUpdateAnatomia: (field: keyof PromptProject['modules']['anatomia'], value: any) => void;
  onUpdateRestricoes: (field: keyof PromptProject['modules']['restricoes'], value: any) => void;
  onAddFluxo: () => void;
  onUpdateFluxo: (id: string, field: 'nome' | 'passos', value: string) => void;
  onRemoveFluxo: (id: string) => void;
  onAddFerramenta: () => void;
  onUpdateFerramenta: (id: string, field: 'nome' | 'descricao', value: string) => void;
  onRemoveFerramenta: (id: string) => void;
  onNextLevel: () => void;
  onImproveText: (level: number, field: string, value: string, itemId?: string) => void;
}

const LevelContent: React.FC<LevelContentProps> = (props) => {
  const { project, onNextLevel } = props;

  const renderContent = () => {
    switch (project.currentLevel) {
      case 1:
        return <Level1Objetivo 
          data={project.modules.objetivo} 
          onUpdate={props.onUpdateObjetivo} 
          onNext={onNextLevel} 
          onImprove={(field: keyof ObjetivoModule, value: string) => props.onImproveText(1, field, value)} 
        />;
      case 2:
        return <Level2Persona 
          data={project.modules.persona} 
          onUpdate={props.onUpdatePersona} 
          onNext={onNextLevel} 
          onImprove={(field: keyof PersonaModule, value: string) => props.onImproveText(2, field, value)} 
        />;
      case 3:
        return <Level3Variaveis 
          data={project.modules.variaveis} 
          onAdd={props.onAddVariavel} 
          onUpdate={props.onUpdateVariavel} 
          onRemove={props.onRemoveVariavel} 
          onNext={onNextLevel} 
        />;
      case 4:
        return <Level4Anatomia 
          data={project.modules.anatomia} 
          onUpdate={props.onUpdateAnatomia} 
          onNext={onNextLevel} 
          onImprove={(field: keyof AnatomiaModule, value: string) => props.onImproveText(4, field, value)} 
        />;
      case 5:
        return <Level5Restricoes 
          data={project.modules.restricoes} 
          onUpdate={props.onUpdateRestricoes} 
          onNext={onNextLevel} 
          onImprove={(field: keyof RestricoesModule, value: string) => props.onImproveText(5, field, value)} 
        />;
      case 6:
        return <Level6Fluxos 
          data={project.modules.fluxos} 
          onAdd={props.onAddFluxo} 
          onUpdate={props.onUpdateFluxo} 
          onRemove={props.onRemoveFluxo} 
          onNext={onNextLevel} 
          onImprove={(itemId: string, field: 'passos', value: string) => props.onImproveText(6, field, value, itemId)} 
        />;
      case 7:
        return <Level7Ferramentas 
          data={project.modules.ferramentas} 
          onAdd={props.onAddFerramenta} 
          onUpdate={props.onUpdateFerramenta} 
          onRemove={props.onRemoveFerramenta} 
          onNext={onNextLevel} 
          onImprove={(itemId: string, field: 'descricao', value: string) => props.onImproveText(7, field, value, itemId)} 
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