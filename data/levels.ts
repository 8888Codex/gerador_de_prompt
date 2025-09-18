import { Level } from '../types';

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Objetivo & Missão",
    description: "Defina o propósito do seu assistente",
    icon: "🎯",
    minScore: 60,
  },
  {
    id: 2, 
    name: "Persona & Tom",
    description: "Construa a personalidade do assistente",
    icon: "🎭",
    minScore: 70,
  },
  {
    id: 3,
    name: "Variáveis Persistentes",
    description: "Defina a 'memória' do assistente",
    icon: "🧠",
    minScore: 65,
  },
  {
    id: 4,
    name: "Anatomia de Mensagens",
    description: "Estruture como o assistente responde",
    icon: "💬",
    minScore: 60,
  },
  {
    id: 5,
    name: "Restrições Globais",
    description: "Defina as regras e limites",
    icon: "⚖️",
    minScore: 65,
  },
  {
    id: 6,
    name: "Fluxos de Conversação",
    description: "Crie os caminhos da conversa",
    icon: "🌊",
    minScore: 75,
  },
  {
    id: 7,
    name: "Ferramentas & Integrações",
    description: "Conecte o assistente a outras ferramentas",
    icon: "🛠️",
    minScore: 50,
  },
  {
    id: 8,
    name: "Preview & Export",
    description: "Veja e exporte seu prompt final",
    icon: "🏁",
    minScore: 0,
  },
];