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

    // --- LÓGICA DA IA (SIMULADA E MELHORADA) ---
    const improvedText = generateImprovedText(field, value);
    // --- FIM DA LÓGICA DA IA ---

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