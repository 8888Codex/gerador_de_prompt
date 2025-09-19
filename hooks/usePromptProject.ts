"use client";

import { useState } from 'react';
import { PromptProject, ObjetivoModule, PersonaModule } from '../types';

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
        objetivo: {
          ...prev.modules.objetivo,
          [field]: value,
        },
      },
    }));
  };
  
  const goToNextLevel = () => {
    setProject(prev => {
      const nextLevel = prev.currentLevel + 1;
      return {
        ...prev,
        currentLevel: nextLevel,
        completedLevels: [...prev.completedLevels, prev.currentLevel],
        // Logic to unlock next module can be added here
      };
    });
  };

  return { project, updateObjetivoField, goToNextLevel, setProject };
};