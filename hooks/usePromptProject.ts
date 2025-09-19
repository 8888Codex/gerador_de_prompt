"use client";

import { useState } from 'react';
import { PromptProject, ObjetivoModule, PersonaModule, Variavel, AnatomiaModule, RestricoesModule, FluxosModule, Fluxo } from '../types';
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
      items: [{ id: 'initial-var-1', key: '', description: '' }],
      isUnlocked: false,
      isCompleted: false,
      completionScore: 0,
    },
    anatomia: {
      tamanhoMensagem: null,
      usarEmojis: false,
      usarMarkdown: false,
      regraCustomizada: '',
      isUnlocked: false,
      isCompleted: false,
      completionScore: 0,
    },
    restricoes: {
      regrasProibidas: '',
      regrasObrigatorias: '',
      isUnlocked: false,
      isCompleted: false,
      completionScore: 0,
    },
    fluxos: {
      items: [{ id: 'initial-flow-1', nome: '', passos: '' }],
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
      modules: { ...prev.modules, objetivo: { ...prev.modules.objetivo, [field]: value } },
    }));
  };

  const updatePersonaField = (field: keyof PersonaModule, value: any) => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, persona: { ...prev.modules.persona, [field]: value } },
    }));
  };

  const addVariavel = () => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, variaveis: { ...prev.modules.variaveis, items: [...prev.modules.variaveis.items, { id: new Date().toISOString(), key: '', description: '' }] } }
    }));
  };

  const updateVariavel = (id: string, field: 'key' | 'description', value: string) => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, variaveis: { ...prev.modules.variaveis, items: prev.modules.variaveis.items.map(item => item.id === id ? { ...item, [field]: value } : item) } }
    }));
  };

  const removeVariavel = (id: string) => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, variaveis: { ...prev.modules.variaveis, items: prev.modules.variaveis.items.filter(item => item.id !== id) } }
    }));
  };

  const updateAnatomiaField = (field: keyof AnatomiaModule, value: any) => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, anatomia: { ...prev.modules.anatomia, [field]: value } },
    }));
  };

  const updateRestricoesField = (field: keyof RestricoesModule, value: string) => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, restricoes: { ...prev.modules.restricoes, [field]: value } },
    }));
  };

  const addFluxo = () => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, fluxos: { ...prev.modules.fluxos, items: [...prev.modules.fluxos.items, { id: new Date().toISOString(), nome: '', passos: '' }] } }
    }));
  };

  const updateFluxo = (id: string, field: 'nome' | 'passos', value: string) => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, fluxos: { ...prev.modules.fluxos, items: prev.modules.fluxos.items.map(item => item.id === id ? { ...item, [field]: value } : item) } }
    }));
  };

  const removeFluxo = (id: string) => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, fluxos: { ...prev.modules.fluxos, items: prev.modules.fluxos.items.filter(item => item.id !== id) } }
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
        if (nomeAssistente.trim() !== '' && missao.trim().length >= 20) score = 100;
        else if (nomeAssistente.trim() !== '' || missao.trim().length >= 20) score = 50;
        canAdvance = score >= currentLevelData.minScore;
        break;
      
      case 2:
        const { postura, tom } = project.modules.persona;
        if (postura.trim() !== '' && tom.trim() !== '') score = 100;
        else if (postura.trim() !== '' || tom.trim() !== '') score = 60;
        canAdvance = score >= currentLevelData.minScore;
        break;

      case 3:
        const validItems = project.modules.variaveis.items.filter(item => item.key.trim() !== '' && item.description.trim() !== '');
        if (validItems.length >= 2) score = 100;
        else if (validItems.length === 1) score = 50;
        canAdvance = score >= currentLevelData.minScore;
        break;

      case 4:
        const { tamanhoMensagem, usarEmojis, usarMarkdown, regraCustomizada } = project.modules.anatomia;
        const isSizeSelected = tamanhoMensagem !== null;
        const isRuleDefined = usarEmojis || usarMarkdown || regraCustomizada.trim() !== '';
        if (isSizeSelected && isRuleDefined) score = 100;
        else if (isSizeSelected || isRuleDefined) score = 50;
        canAdvance = score >= currentLevelData.minScore;
        break;
      
      case 5:
        const { regrasProibidas } = project.modules.restricoes;
        if (regrasProibidas.trim() !== '') score = 100;
        canAdvance = score >= currentLevelData.minScore;
        break;

      case 6:
        const validFlows = project.modules.fluxos.items.filter(item => item.nome.trim() !== '' && item.passos.trim() !== '');
        if (validFlows.length >= 1) score = 100;
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

  return { project, updateObjetivoField, updatePersonaField, addVariavel, updateVariavel, removeVariavel, updateAnatomiaField, updateRestricoesField, addFluxo, updateFluxo, removeFluxo, completeAndAdvanceLevel };
};