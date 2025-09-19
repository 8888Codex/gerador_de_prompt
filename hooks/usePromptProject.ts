"use client";

import { useReducer } from 'react';
import { PromptProject, MessageSize } from '../types';
import { LEVELS } from '../data/levels';

type Action =
  | { type: 'UPDATE_FIELD'; payload: { module: keyof PromptProject['modules']; field: string; value: any } }
  | { type: 'ADD_ITEM'; payload: { module: 'variaveis' | 'fluxos' | 'ferramentas' } }
  | { type: 'UPDATE_ITEM'; payload: { module: 'variaveis' | 'fluxos' | 'ferramentas'; id: string; field: string; value: string } }
  | { type: 'REMOVE_ITEM'; payload: { module: 'variaveis' | 'fluxos' | 'ferramentas'; id: string } }
  | { type: 'COMPLETE_AND_ADVANCE_LEVEL' };

const initialState: PromptProject = {
  id: new Date().toISOString(),
  name: "Novo Projeto de Prompt",
  currentLevel: 1,
  completedLevels: [],
  levelScores: {},
  achievements: [],
  totalProgress: 0,
  modules: {
    objetivo: { nomeAssistente: '', missao: '', isUnlocked: true, isCompleted: false, completionScore: 0 },
    persona: { postura: '', tom: '', atitude: '', empatia: '', genero: 'neutro', linguagemModos: '', isUnlocked: false, isCompleted: false, completionScore: 0 },
    variaveis: { items: [{ id: 'initial-var-1', key: '', description: '' }], isUnlocked: false, isCompleted: false, completionScore: 0 },
    anatomia: { tamanhoMensagem: null, usarEmojis: false, usarMarkdown: false, regraCustomizada: '', isUnlocked: false, isCompleted: false, completionScore: 0 },
    restricoes: { regrasProibidas: '', regrasObrigatorias: '', isUnlocked: false, isCompleted: false, completionScore: 0 },
    fluxos: { items: [{ id: 'initial-flow-1', nome: '', passos: '' }], isUnlocked: false, isCompleted: false, completionScore: 0 },
    ferramentas: { items: [{ id: 'initial-tool-1', nome: '', descricao: '' }], isUnlocked: false, isCompleted: false, completionScore: 0 }
  },
};

const promptProjectReducer = (state: PromptProject, action: Action): PromptProject => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const { module, field, value } = action.payload;
      return {
        ...state,
        modules: {
          ...state.modules,
          [module]: { ...state.modules[module], [field]: value },
        },
      };
    }
    case 'ADD_ITEM': {
      const { module } = action.payload;
      const newItem = module === 'variaveis' 
        ? { id: new Date().toISOString(), key: '', description: '' }
        : { id: new Date().toISOString(), nome: '', [module === 'fluxos' ? 'passos' : 'descricao']: '' };
      
      return {
        ...state,
        modules: {
          ...state.modules,
          [module]: {
            ...state.modules[module],
            items: [...state.modules[module].items, newItem],
          },
        },
      };
    }
    case 'UPDATE_ITEM': {
      const { module, id, field, value } = action.payload;
      return {
        ...state,
        modules: {
          ...state.modules,
          [module]: {
            ...state.modules[module],
            items: state.modules[module].items.map(item =>
              item.id === id ? { ...item, [field]: value } : item
            ),
          },
        },
      };
    }
    case 'REMOVE_ITEM': {
      const { module, id } = action.payload;
      return {
        ...state,
        modules: {
          ...state.modules,
          [module]: {
            ...state.modules[module],
            items: state.modules[module].items.filter(item => item.id !== id),
          },
        },
      };
    }
    case 'COMPLETE_AND_ADVANCE_LEVEL': {
      const currentLevelData = LEVELS.find(l => l.id === state.currentLevel);
      if (!currentLevelData) return state;

      let score = 0;
      let canAdvance = false;

      switch (state.currentLevel) {
        case 1:
          canAdvance = state.modules.objetivo.nomeAssistente.trim() !== '' && state.modules.objetivo.missao.trim().length >= 20;
          score = canAdvance ? 100 : 50;
          break;
        case 2:
          canAdvance = state.modules.persona.postura.trim() !== '' && state.modules.persona.tom.trim() !== '';
          score = canAdvance ? 100 : 50;
          break;
        case 3:
          const validVars = state.modules.variaveis.items.filter(i => i.key.trim() !== '' && i.description.trim() !== '').length;
          canAdvance = validVars >= 2;
          score = validVars >= 2 ? 100 : (validVars === 1 ? 50 : 0);
          break;
        case 4:
          const { tamanhoMensagem, usarEmojis, usarMarkdown, regraCustomizada } = state.modules.anatomia;
          canAdvance = tamanhoMensagem !== null && (usarEmojis || usarMarkdown || regraCustomizada.trim() !== '');
          score = canAdvance ? 100 : 50;
          break;
        case 5:
          canAdvance = state.modules.restricoes.regrasProibidas.trim() !== '';
          score = canAdvance ? 100 : 0;
          break;
        case 6:
          const validFlows = state.modules.fluxos.items.filter(i => i.nome.trim() !== '' && i.passos.trim() !== '').length;
          canAdvance = validFlows >= 1;
          score = canAdvance ? 100 : 0;
          break;
        case 7:
          const validTools = state.modules.ferramentas.items.filter(i => i.nome.trim() !== '' && i.descricao.trim() !== '').length;
          canAdvance = validTools >= 1;
          score = canAdvance ? 100 : 0;
          break;
        case 8:
          canAdvance = true;
          score = 100;
          break;
      }

      if (canAdvance || score >= currentLevelData.minScore) {
        const nextLevel = state.currentLevel + 1;
        const nextModuleKey = Object.keys(state.modules)[nextLevel - 2] as keyof typeof state.modules;
        
        return {
          ...state,
          currentLevel: nextLevel > LEVELS.length ? state.currentLevel : nextLevel,
          completedLevels: [...new Set([...state.completedLevels, state.currentLevel])],
          levelScores: { ...state.levelScores, [state.currentLevel]: score },
          modules: {
            ...state.modules,
            ...(nextModuleKey && nextLevel <= Object.keys(state.modules).length + 1 && { 
              [nextModuleKey]: { ...state.modules[nextModuleKey], isUnlocked: true }
            })
          }
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export const usePromptProject = () => {
  const [project, dispatch] = useReducer(promptProjectReducer, initialState);
  return { project, dispatch };
};