"use client";

import { useState } from 'react';
import { PromptProject, ObjetivoModule, PersonaModule, Achievement } from '../types';
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
        objetivo: {
          ...prev.modules.objetivo,
          [field]: value,
        },
      },
    }));
  };

  const grantAchievement = (id: string, name: string, description: string, icon: string, level: number) => {
    setProject(prev => {
      if (prev.achievements.some(ach => ach.id === id)) {
        return prev; // Achievement already granted
      }
      const newAchievement: Achievement = { id, name, description, icon, unlockedAt: new Date(), level };
      return {
        ...prev,
        achievements: [...prev.achievements, newAchievement],
      };
    });
  };
  
  const completeAndAdvanceLevel = () => {
    setProject(prev => {
      const currentLevelData = LEVELS.find(l => l.id === prev.currentLevel);
      if (!currentLevelData) return prev;

      let score = 0;
      let canAdvance = false;

      // Level 1 Validation Logic
      if (prev.currentLevel === 1) {
        const { nomeAssistente, missao } = prev.modules.objetivo;
        let tempScore = 0;
        if (nomeAssistente.trim() !== '') tempScore += 50;
        if (missao.trim().length >= 20) tempScore += 50;
        score = tempScore;
        canAdvance = score >= currentLevelData.minScore;
      }
      
      // Future levels validation logic will go here

      if (canAdvance) {
        const nextLevel = prev.currentLevel + 1;
        
        // Grant Achievement for Level 1
        if (prev.currentLevel === 1) {
          grantAchievement("primeiro-passo", "Primeiro Passo", "Complete o Objetivo & Missão", "🏆", 1);
        }

        return {
          ...prev,
          currentLevel: nextLevel,
          completedLevels: [...new Set([...prev.completedLevels, prev.currentLevel])],
          levelScores: { ...prev.levelScores, [prev.currentLevel]: score },
          modules: {
            ...prev.modules,
            objetivo: { ...prev.modules.objetivo, isCompleted: true, completionScore: score },
            // Unlock next level's module
            ...(nextLevel === 2 && { persona: { ...prev.modules.persona, isUnlocked: true } }),
          },
        };
      } else {
        // Handle validation failure (e.g., show a message)
        console.log(`Score ${score} is not enough to advance. Minimum required: ${currentLevelData.minScore}`);
        return prev;
      }
    });
  };

  return { project, updateObjetivoField, completeAndAdvanceLevel, setProject };
};