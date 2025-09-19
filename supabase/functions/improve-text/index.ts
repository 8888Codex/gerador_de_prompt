import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Função para gerar texto aprimorado com base na entrada do usuário
const generateImprovedText = (field: string, value: string): string => {
  // Se o campo estiver vazio, retorna uma sugestão padrão
  if (!value || value.trim() === '') {
    switch (field) {
      case 'nomeAssistente': return "Assistente de Engajamento Proativo";
      case 'missao': return "Analisar as necessidades do usuário para fornecer soluções precisas e eficientes.";
      case 'postura': return "Um guia prestativo e paciente, sempre pronto para ajudar.";
      case 'tom': return "Encorajador e amigável, usando uma linguagem clara e acessível.";
      case 'atitude': return "Proativo, curioso e focado em resolver problemas complexos.";
      case 'empatia': return "Reconhecer e validar os sentimentos do usuário antes de oferecer soluções.";
      case 'linguagemModos': return "Capaz de alternar entre linguagem simples, técnica e criativa conforme o contexto.";
      case 'regraCustomizada': return "Sempre finalizar a interação com uma pergunta aberta para incentivar o diálogo.";
      case 'regrasProibidas': return "Nunca fazer promessas que não podem ser cumpridas ou fornecer informações falsas.";
      case 'regrasObrigatorias': return "Sempre me apresentar no início da conversa e agradecer ao final.";
      case 'passos': return "1. Saudar o usuário e perguntar o motivo do contato. 2. Coletar as informações necessárias. 3. Fornecer a solução ou o próximo passo. 4. Confirmar se o problema foi resolvido.";
      case 'descricao': return "Esta ferramenta executa uma busca em tempo real no banco de dados para encontrar informações atualizadas.";
      default: return `Sugestão de IA para ${field}...`;
    }
  }

  // Adiciona prefixos/sufixos para aprimorar o texto do usuário
  switch (field) {
    case 'nomeAssistente':
      return `${value}, Especialista em Soluções Estratégicas`;
    case 'missao':
      return `Minha missão principal é ${value.toLowerCase()}, visando sempre a máxima eficiência, clareza e a satisfação completa do usuário em cada interação.`;
    case 'postura':
      return `Serei um ${value.toLowerCase()}, demonstrando proatividade, conhecimento aprofundado e uma abordagem consultiva para resolver problemas.`;
    case 'tom':
      return `Meu tom será consistentemente ${value.toLowerCase()}, estabelecendo uma comunicação clara, objetiva e empática para construir confiança.`;
    case 'atitude':
      return `Manterei uma atitude de ${value.toLowerCase()}, focado em encontrar a melhor resposta e nunca desistindo de um desafio.`;
    case 'empatia':
        return `Demonstrarei empatia ao ${value.toLowerCase()}, reconhecendo as frustrações do usuário e validando seus sentimentos antes de oferecer uma solução.`;
    case 'linguagemModos':
        return `Além dos modos ${value.toLowerCase()}, serei capaz de me adaptar a contextos formais, técnicos e inspiradores conforme a necessidade.`;
    case 'regraCustomizada':
        return `Uma regra adicional importante é: ${value}. Esta diretriz deve ser seguida para garantir a consistência da comunicação.`;
    case 'regrasProibidas':
        return `É estritamente proibido: ${value}. Violar esta regra compromete a integridade da minha função.`;
    case 'regrasObrigatorias':
        return `É mandatório que eu sempre: ${value}. Esta é uma diretriz fundamental da minha operação.`;
    case 'passos':
        return `Para este fluxo, os passos foram refinados para maior clareza: ${value}. A execução precisa destes passos é crucial.`;
    case 'descricao': // For tools
        return `Esta ferramenta serve para: ${value}. Ela deve ser utilizada exclusivamente para este propósito.`;
    default:
      return `[Versão Aprimorada por IA] ${value}`;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { field, value } = await req.json()

    const improvedText = generateImprovedText(field, value);

    return new Response(
      JSON.stringify({ improvedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})