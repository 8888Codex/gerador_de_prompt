export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  level: number;
}

export interface ModuleProgress {
  isUnlocked: boolean;
  isCompleted: boolean;
  completionScore: number; // 0-100
  completedAt?: Date;
}

export interface ObjetivoModule {
  nomeAssistente: string;
  missao: string;
}

export interface PersonaModule {
  postura: string;
  tom: string;
  atitude: string;
  empatia: string;
  genero: 'neutro' | 'feminino' | 'masculino';
  linguagemModos: string;
}

export interface Variavel {
  id: string;
  key: string;
  description: string;
}

export interface VariaveisModule {
  items: Variavel[];
}

export interface PromptProject {
  id: string;
  name: string;
  currentLevel: number; // 1-8
  completedLevels: number[];
  levelScores: Record<number, number>; // score 0-100 por nível
  achievements: Achievement[];
  totalProgress: number; // 0-100%
  
  modules: {
    objetivo: ObjetivoModule & ModuleProgress;
    persona: PersonaModule & ModuleProgress;
    variaveis: VariaveisModule & ModuleProgress;
    // Other modules will be added later
  };
}

export interface Level {
  id: number;
  name: string;
  description: string;
  icon: string;
  minScore: number;
}