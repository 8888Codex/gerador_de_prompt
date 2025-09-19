"use client";

import { useState } from 'react';
import { PromptProject, ObjetivoModule, PersonaModule, Variavel } from '../types';
import { LEVELS } from '../data/levels';

const initialProjectState: PromptProject = {
  id: new Date().toISOString(),
  name: "Novo Projeto de Prompt",
  currentLevel: 1,
  completedLevels: [],
  levelScores: {},
  achievements: [],
  totalProgress: 0,
  modules: {
    objetivo: {
      nomeAssistente: '',
      missao: '',
      isUnlocked: true,
      isCompleted: false,
      completionScore: 0,
    },
    persona: {
      postura: '',
      tom: '',
      atitude: '',
      empatia: '',
      genero: 'neutro',
      linguagemModos: '',
      isUnlocked: false,
      isCompleted: false,
      completionScore: 0,
    },
    variaveis: {
      items: [],
      isUnlocked: false,
      isCompleted: false,
      completionScore: 0,
    }
  },
};

export const usePromptProject = () => {
  const [project, setProject] = useState<PromptProject>(initialProjectState);

  const updateObjetivoField = (field: keyof ObjetivoModule, value: string) => {
    setProject(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        objetivo: { ...prev.modules.objetivo, [field]: value },
      },
    }));
  };

  const updatePersonaField = (field: keyof PersonaModule, value: string | 'neutro' | 'feminino' | 'masculino') => {
    setProject(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        persona: { ...prev.modules.persona, [field]: value },
      },
    }));
  };

  const addVariavel = () => {
    setProject(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        variaveis: {
          ...prev.modules.variaveis,
          items: [...prev.modules.variaveis.items, { id: new Date().toISOString(), key: '', description: '' }]
        }
      }
    }));
  };

  const updateVariavel = (id: string, field: 'key' | 'description', value: string) => {
    setProject(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        variaveis: {
          ...prev.modules.variaveis,
          items: prev.modules.variaveis.items.map(item => 
            item.id === id ? { ...item, [field]: value } : item
          )
        }
      }
    }));
  };

  const removeVariavel = (id: string) => {
    setProject(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        variaveis: {
          ...prev.modules.variaveis,
          items: prev.modules.variaveis.items.filter(item => item.id !== id)
        }
      }
    }));
  };

  const completeAndAdvanceLevel = () => {
    const currentLevelData = LEVELS.find(l => l.id === project.currentLevel);
    if (!currentLevelData) return;

    let score = 0;
    let canAdvance = false;

    switch (project.currentLevel) {
      case 1:
        const { nomeAssistente, missao } = project.modules.objetivo;
        const isNameValid = nomeAssistente.trim() !== '';
        const isMissaoValid = missao.trim().length >= 20;
        if (isNameValid && isMissaoValid) score = 100;
        else if (isNameValid || isMissaoValid) score = 50;
        canAdvance = score >= currentLevelData.minScore;
        break;
      
      case 2:
        const { postura, tom, genero } = project.modules.persona;
        const isPosturaValid = postura.trim() !== '';
        const isTomValid = tom.trim() !== '';
        if (isPosturaValid && isTomValid && genero) score = 100;
        else if (isPosturaValid || isTomValid) score = 60;
        canAdvance = score >= currentLevelData.minScore;
        break;

      case 3:
        const { items } = project.modules.variaveis;
        const validItems = items.filter(item => item.key.trim() !== '' && item.description.trim() !== '');
        if (validItems.length >= 2) score = 100;
        else if (validItems.length === 1) score = 50;
        canAdvance = score >= currentLevelData.minScore;
        break;
    }

    if (canAdvance) {
      setProject(prev => {
        const nextLevel = prev.currentLevel + 1;
        const nextModuleKey = Object.keys(prev.modules)[nextLevel - 1] as keyof typeof prev.modules;
        
        return {
          ...prev,
          currentLevel: nextLevel,
          completedLevels: [...new Set([...prev.completedLevels, prev.currentLevel])],
          levelScores: { ...prev.levelScores, [prev.currentLevel]: score },
          modules: {
            ...prev.modules,
            ...(nextModuleKey && { 
              [nextModuleKey]: { ...prev.modules[nextModuleKey], isUnlocked: true }
            })
          }
        };
      });
    } else {
      console.log(`Validação falhou para o nível ${project.currentLevel}. Score: ${score}`);
    }
  };

  return { project, updateObjetivoField, updatePersonaField, addVariavel, updateVariavel, removeVariavel, completeAndAdvanceLevel };
};