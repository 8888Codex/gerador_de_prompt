import { MaterialCommunityIcons } from '@expo/vector-icons';

export type WellnessContent = {
  id: string;
  type: 'audio' | 'text' | 'podcast';
  title: string;
  category: string;
  duration?: string;
  content?: string;
  audioUrl?: string;
  relatedMoods?: string[];
};

export const wellnessContent: WellnessContent[] = [
  {
    id: '1',
    type: 'audio',
    title: 'Respiração Diafragmática',
    category: 'Respiração',
    duration: '3 min',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    content: 'Sente-se confortavelmente. Coloque uma mão no peito e a outra na barriga. Respire fundo pelo nariz, sentindo sua barriga se expandir. Solte o ar lentamente pela boca. Repita por 3 minutos.',
    relatedMoods: ['Triste', 'Irritado', 'Relaxado'],
  },
  {
    id: '2',
    type: 'audio',
    title: 'Meditação para Foco',
    category: 'Meditação',
    duration: '5 min',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    content: 'Encontre uma posição confortável. Feche os olhos e concentre-se na sua respiração. Observe o ar entrando e saindo. Se sua mente divagar, gentilmente traga o foco de volta para a respiração.',
    relatedMoods: ['Irritado', 'Neutro'],
  },
  {
    id: '3',
    type: 'text',
    title: 'Entendendo a Ansiedade',
    category: 'Ansiedade',
    content: 'A ansiedade é uma resposta natural do corpo ao estresse. É um sentimento de medo ou apreensão sobre o que está por vir. A ansiedade pode ser benéfica em algumas situações, como alertá-lo para o perigo. No entanto, quando os sentimentos de ansiedade são extremos, duram mais de seis meses e interferem na sua vida, você pode ter um transtorno de ansiedade.',
    relatedMoods: ['Triste', 'Irritado'],
  },
  {
    id: '4',
    type: 'podcast',
    title: 'Pílula de Calma #1',
    category: 'Relaxamento',
    duration: '2 min',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    content: 'Nesta primeira pílula de calma, vamos explorar uma técnica simples para acalmar a mente em momentos de estresse. Apenas respire.',
    relatedMoods: ['Triste', 'Irritado', 'Relaxado'],
  },
  {
    id: '5',
    type: 'text',
    title: 'Construindo sua Autoestima',
    category: 'Autoestima',
    content: 'Autoestima é a sua opinião geral sobre si mesmo. Quando você tem uma autoestima saudável, você se sente bem consigo mesmo e se vê como merecedor do respeito dos outros. Quando você tem baixa autoestima, você coloca pouco valor em suas opiniões e ideias. Você pode se preocupar constantemente que não é bom o suficiente.',
    relatedMoods: ['Triste'],
  },
  {
    id: '6',
    type: 'audio',
    title: 'Relaxamento Progressivo',
    category: 'Relaxamento',
    duration: '7 min',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    content: 'Esta técnica envolve tensionar e relaxar diferentes grupos musculares do corpo. Deite-se confortavelmente e siga as instruções para relaxar da cabeça aos pés.',
    relatedMoods: ['Irritado', 'Relaxado'],
  },
  {
    id: '7',
    type: 'text',
    title: 'Dicas para Manter o Foco',
    category: 'Foco',
    content: '1. Elimine distrações: Desligue notificações e encontre um lugar tranquilo.\n2. Técnica Pomodoro: Trabalhe por 25 minutos e faça uma pausa de 5 minutos.\n3. Defina metas claras: Saiba exatamente o que você quer alcançar.\n4. Faça uma coisa de cada vez: Evite multitarefas.',
    relatedMoods: ['Neutro'],
  },
  {
    id: '8',
    type: 'text',
    title: 'Praticando a Gratidão',
    category: 'Bem-estar',
    content: 'A gratidão é uma emoção poderosa que pode melhorar seu humor e bem-estar geral. Tente pensar em três coisas pelas quais você é grato hoje. Pode ser algo grande ou pequeno. Anote-as ou apenas reflita sobre elas por um momento.',
    relatedMoods: ['Feliz', 'Neutro'],
  }
];

export const getContentIcon = (type: 'audio' | 'text' | 'podcast'): keyof typeof MaterialCommunityIcons.glyphMap => {
  switch (type) {
    case 'audio':
      return 'headphones';
    case 'text':
      return 'book-open-variant';
    case 'podcast':
      return 'podcast';
    default:
      return 'star-outline';
  }
};