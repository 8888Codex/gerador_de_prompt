"use client";

import { useState } from 'react';
import { PromptProject, ObjetivoModule, PersonaModule, Variavel, AnatomiaModule, RestricoesModule, FluxosModule, Fluxo, FerramentasModule } from '../types';
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
    objetivo: { nomeAssistente: '', missao: '', isUnlocked: true, isCompleted: false, completionScore: 0 },
    persona: { postura: '', tom: '', atitude: '', empatia: '', genero: 'neutro', linguagemModos: '', isUnlocked: false, isCompleted: false, completionScore: 0 },
    variaveis: { items: [{ id: 'initial-var-1', key: '', description: '' }], isUnlocked: false, isCompleted: false, completionScore: 0 },
    anatomia: { tamanhoMensagem: null, usarEmojis: false, usarMarkdown: false, regraCustomizada: '', isUnlocked: false, isCompleted: false, completionScore: 0 },
    restricoes: { regrasProibidas: '', regrasObrigatorias: '', isUnlocked: false, isCompleted: false, completionScore: 0 },
    fluxos: { items: [{ id: 'initial-flow-1', nome: '', passos: '' }], isUnlocked: false, isCompleted: false, completionScore: 0 },
    ferramentas: { items: [{ id: 'initial-tool-1', nome: '', descricao: '' }], isUnlocked: false, isCompleted: false, completionScore: 0 }
  },
};

export const usePromptProject = () => {
  const [project, setProject] = useState<PromptProject>(initialProjectState);

  // Corrigindo os tipos para aceitar TODOS os campos dos módulos (incluindo ModuleProgress)
  const updateObjetivoField = (field: keyof (ObjetivoModule & import('../types').ModuleProgress), value: any) => {
    setProject(prev => ({ 
      ...prev, 
      modules: { 
        ...prev.modules, 
        objetivo: { ...prev.modules.objetivo, [field]: value } 
      } 
    }));
  };

  const updatePersonaField = (field: keyof (PersonaModule & import('../types').ModuleProgress), value: any) => {
    setProject(prev => ({ 
      ...prev, 
      modules: { 
        ...prev.modules, 
        persona: { ...prev.modules.persona, [field]: value } 
      } 
    }));
  };

  const updateAnatomiaField = (field: keyof (AnatomiaModule & import('../types').ModuleProgress), value: any) => {
    setProject(prev => ({ 
      ...prev, 
      modules: { 
        ...prev.modules, 
        anatomia: { ...prev.modules.anatomia, [field]: value } 
      } 
    }));
  };

  const updateRestricoesField = (field: keyof (RestricoesModule & import('../types').ModuleProgress), value: any) => {
    setProject(prev => ({ 
      ...prev, 
      modules: { 
        ...prev.modules, 
        restricoes: { ...prev.modules.restricoes, [field]: value } 
      } 
    }));
  };

  const addVariavel = () => setProject(prev => ({ ...prev, modules: { ...prev.modules, variaveis: { ...prev.modules.variaveis, items: [...prev.modules.variaveis.items, { id: new Date().toISOString(), key: '', description: '' }] } } }));
  const updateVariavel = (id: string, field: 'key' | 'description', value: string) => setProject(prev => ({ ...prev, modules: { ...prev.modules, variaveis: { ...prev.modules.variaveis, items: prev.modules.variaveis.items.map(item => item.id === id ? { ...item, [field]: value } : item) } } }));
  const removeVariavel = (id: string) => setProject(prev => ({ ...prev, modules: { ...prev.modules, variaveis: { ...prev.modules.variaveis, items: prev.modules.variaveis.items.filter(item => item.id !== id) } } }));
  
  const addFluxo = () => setProject(prev => ({ ...prev, modules: { ...prev.modules, fluxos: { ...prev.modules.fluxos, items: [...prev.modules.fluxos.items, { id: new Date().toISOString(), nome: '', passos: '' }] } } }));
  const updateFluxo = (id: string, field: 'nome' | 'passos', value: string) => setProject(prev => ({ ...prev, modules: { ...prev.modules, fluxos: { ...prev.modules.fluxos, items: prev.modules.fluxos.items.map(item => item.id === id ? { ...item, [field]: value } : item) } } }));
  const removeFluxo = (id: string) => setProject(prev => ({ ...prev, modules: { ...prev.modules, fluxos: { ...prev.modules.fluxos, items: prev.modules.fluxos.items.filter(item => item.id !== id) } } }));

  const addFerramenta = () => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, ferramentas: { ...prev.modules.ferramentas, items: [...prev.modules.ferramentas.items, { id: new Date().toISOString(), nome: '', descricao: '' }] } }
    }));
  };

  const updateFerramenta = (id: string, field: 'nome' | 'descricao', value: string) => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, ferramentas: { ...prev.modules.ferramentas, items: prev.modules.ferramentas.items.map(item => item.id === id ? { ...item, [field]: value } : item) } }
    }));
  };

  const removeFerramenta = (id: string) => {
    setProject(prev => ({
      ...prev,
      modules: { ...prev.modules, ferramentas: { ...prev.modules.ferramentas, items: prev.modules.ferramentas.items.filter(item => item.id !== id) } }
    }));
  };

  const completeAndAdvanceLevel = () => {
    const currentLevelData = LEVELS.find(l => l.id === project.currentLevel);
    if (!currentLevelData) return;

    let score = 0;
    let canAdvance = false;

    switch (project.currentLevel) {
      case 1:
        canAdvance = project.modules.objetivo.nomeAssistente.trim() !== '' && project.modules.objetivo.missao.trim().length >= 20;
        score = canAdvance ? 100 : 50;
        break;
      case 2:
        canAdvance = project.modules.persona.postura.trim() !== '' && project.modules.persona.tom.trim() !== '';
        score = canAdvance ? 100 : 50;
        break;
      case 3:
        const validVars = project.modules.variaveis.items.filter(i => i.key.trim() !== '' && i.description.trim() !== '').length;
        canAdvance = validVars >= 2;
        score = validVars >= 2 ? 100 : (validVars === 1 ? 50 : 0);
        break;
      case 4:
        const { tamanhoMensagem, usarEmojis, usarMarkdown, regraCustomizada } = project.modules.anatomia;
        canAdvance = tamanhoMensagem !== null && (usarEmojis || usarMarkdown || regraCustomizada.trim() !== '');
        score = canAdvance ? 100 : 50;
        break;
      case 5:
        canAdvance = project.modules.restricoes.regrasProibidas.trim() !== '';
        score = canAdvance ? 100 : 0;
        break;
      case 6:
        const validFlows = project.modules.fluxos.items.filter(i => i.nome.trim() !== '' && i.passos.trim() !== '').length;
        canAdvance = validFlows >= 1;
        score = canAdvance ? 100 : 0;
        break;
      case 7:
        const validTools = project.modules.ferramentas.items.filter(i => i.nome.trim() !== '' && i.descricao.trim() !== '').length;
        canAdvance = validTools >= 1;
        score = canAdvance ? 100 : 0;
        break;
      case 8:
        canAdvance = true; // Nível final, sempre pode "avançar" (concluir)
        score = 100;
        break;
    }

    if (canAdvance || score >= currentLevelData.minScore) {
      setProject(prev => {
        const nextLevel = prev.currentLevel + 1;
        const nextModuleKey = Object.keys(prev.modules)[nextLevel - 2] as keyof typeof prev.modules;
        
        return {
          ...prev,
          currentLevel: nextLevel > LEVELS.length ? prev.currentLevel : nextLevel,
          completedLevels: [...new Set([...prev.completedLevels, prev.currentLevel])],
          levelScores: { ...prev.levelScores, [prev.currentLevel]: score },
          modules: {
            ...prev.modules,
            ...(nextModuleKey && nextLevel <= Object.keys(prev.modules).length + 1 && { 
              [nextModuleKey]: { ...prev.modules[nextModuleKey], isUnlocked: true }
            })
          }
        };
      });
    } else {
      console.log(`Validação falhou para o nível ${project.currentLevel}. Score: ${score}`);
    }
  };

  return { project, updateObjetivoField, updatePersonaField, addVariavel, updateVariavel, removeVariavel, updateAnatomiaField, updateRestricoesField, addFluxo, updateFluxo, removeFluxo, addFerramenta, updateFerramenta, removeFerramenta, completeAndAdvanceLevel };
};