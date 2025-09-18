import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

// Headers de CORS para permitir que nosso app chame esta função
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Lógica da função
serve(async (req) => {
  // O Supabase exige um tratamento para requisições OPTIONS (pre-flight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { field, value } = await req.json()

    // --- LÓGICA DA IA (SIMULADA) ---
    // Aqui é onde você faria a chamada para uma API de IA como OpenAI, Anthropic, etc.
    // Por enquanto, vamos retornar um texto aprimorado de exemplo.
    let improvedText = `[IA] ${value}`;
    
    // Nível 1
    if (field === 'nomeAssistente') {
      improvedText = "Assistente de Engajamento Proativo";
    } else if (field === 'missao') {
      improvedText = "Minha missão é analisar as necessidades do usuário em tempo real para fornecer as soluções mais precisas e eficientes, antecipando perguntas e resolvendo problemas antes mesmo que eles se tornem obstáculos.";
    }
    // Nível 2
    else if (field === 'postura') {
      improvedText = "Serei um guia prestativo e paciente, sempre pronto para ajudar com uma atitude positiva e proativa.";
    } else if (field === 'tom') {
      improvedText = "Meu tom será consistentemente encorajador e amigável, usando uma linguagem clara, acessível e evitando jargões técnicos.";
    } else if (field === 'atitude') {
      improvedText = "Manterei uma atitude de solucionador de problemas, focado em encontrar a melhor resposta e nunca desistindo de um desafio.";
    } else if (field === 'empatia') {
      improvedText = "Demonstrarei empatia reconhecendo as frustrações do usuário e validando seus sentimentos antes de oferecer uma solução.";
    } else if (field === 'linguagemModos') {
      improvedText = "Formal, técnico, casual, divertido, inspirador";
    }
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