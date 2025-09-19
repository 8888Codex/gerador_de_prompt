"use client";

import { useState } from 'react';
import { PromptProject, ObjetivoModule, PersonaModule } from '../types';
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

  const completeAndAdvanceLevel = () => {
    const currentLevelData = LEVELS.find(l => l.id === project.currentLevel);
    if (!currentLevelData) return;

    let score = 0;
    let canAdvance = false;

    // Validação e Score para cada nível
    switch (project.currentLevel) {
      case 1:
        const { nomeAssistente, missao } = project.modules.objetivo;
        const isNameValid = nomeAssistente.trim() !== '';
        const isMissaoValid = missao.trim().length >= 20;
        if (isNameValid && isMissaoValid) {
          score = 100; // Simples, mas podemos refinar depois
        } else if (isNameValid || isMissaoValid) {
          score = 50;
        }
        canAdvance = score >= currentLevelData.minScore;
        break;
      
      case 2:
        const { postura, tom, genero } = project.modules.persona;
        const isPosturaValid = postura.trim() !== '';
        const isTomValid = tom.trim() !== '';
        const isGeneroValid = genero !== null;
        if (isPosturaValid && isTomValid && isGeneroValid) {
          score = 100;
        } else if (isPosturaValid || isTomValid) {
          score = 60;
        }
        canAdvance = score >= currentLevelData.minScore;
        break;

      // Adicionar validações para outros níveis aqui
    }

    if (canAdvance) {
      setProject(prev => {
        const nextLevel = prev.currentLevel + 1;
        const nextModuleKey = Object.keys(prev.modules)[nextLevel - 1];
        
        return {
          ...prev,
          currentLevel: nextLevel,
          completedLevels: [...new Set([...prev.completedLevels, prev.currentLevel])],
          levelScores: { ...prev.levelScores, [prev.currentLevel]: score },
          modules: {
            ...prev.modules,
            ...(nextModuleKey && { 
              [nextModuleKey]: { ...prev.modules[nextModuleKey as keyof typeof prev.modules], isUnlocked: true }
            })
          }
        };
      });
    } else {
      // Futuramente, podemos adicionar um alerta/toast para o usuário aqui
      console.log(`Validação falhou para o nível ${project.currentLevel}. Score: ${score}`);
    }
  };

  return { project, setProject, updateObjetivoField, updatePersonaField, completeAndAdvanceLevel };
};