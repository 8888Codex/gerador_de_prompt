const responses: { keywords: string[]; reply: string[] }[] = [
  {
    keywords: ['ansioso', 'ansiedade', 'preocupado', 'nervoso'],
    reply: [
      'Entendo. A ansiedade pode ser avassaladora. Lembre-se de respirar fundo. Na aba "Bem-estar", temos um conteúdo sobre "Entendendo a Ansiedade" que pode ser útil.',
      'Parece que você está passando por um momento de ansiedade. Falar sobre isso é um bom primeiro passo. O que está causando essa sensação?',
    ],
  },
  {
    keywords: ['triste', 'deprimido', 'pra baixo', 'sozinho'],
    reply: [
      'Sinto muito que você esteja se sentindo assim. É válido se sentir triste. Lembre-se que não está sozinho. Que tal tentar o nosso áudio de "Respiração Diafragmática" para relaxar um pouco?',
      'Obrigado por compartilhar sua tristeza comigo. Falar sobre o que sentimos é importante. O que aconteceu?',
    ],
  },
  {
    keywords: ['feliz', 'bem', 'ótimo', 'contente'],
    reply: [
      'Que ótimo saber que você está se sentindo bem! Fico feliz por você. O que te deixou feliz hoje?',
      'Maravilha! Aproveite esse sentimento. Que tal registrar esse humor na aba "Bem-estar"?',
    ],
  },
  {
    keywords: ['irritado', 'bravo', 'raiva', 'frustrado'],
    reply: [
        'A raiva é uma emoção forte. O que a desencadeou? Às vezes, uma pausa para respirar pode ajudar a clarear a mente.',
        'Entendo sua frustração. Se precisar, temos áudios de relaxamento na aba "Bem-estar" que podem ajudar a acalmar os ânimos.'
    ]
  },
  {
    keywords: ['desabafar', 'conversar'],
    reply: [
        'Claro, estou aqui para ouvir. Pode falar o que estiver em sua mente, sem julgamentos.',
        'Sou todo ouvidos. Sinta-se à vontade para desabafar.'
    ]
  }
];

const defaultReplies = [
  'Entendido. Agradeço por compartilhar. Como você se sente sobre isso?',
  'Obrigado por me contar. Gostaria de explorar mais esse sentimento?',
  'Isso parece importante. Continue, por favor.',
  'Estou aqui para ouvir. O que mais você gostaria de dizer?',
];

export const getBotResponse = (message: string): string => {
  const lowerCaseMessage = message.toLowerCase();

  for (const response of responses) {
    for (const keyword of response.keywords) {
      if (lowerCaseMessage.includes(keyword)) {
        // Return a random reply from the matching category
        return response.reply[Math.floor(Math.random() * response.reply.length)];
      }
    }
  }

  // Return a random default reply if no keywords match
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
};