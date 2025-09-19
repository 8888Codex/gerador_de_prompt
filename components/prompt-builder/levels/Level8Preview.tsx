"use client";

import React, { useState } from 'react';
import { PromptProject } from '../../../types';
import StyledButton from '../../StyledButton';
import { Clipboard, Download } from 'lucide-react';

interface Level8PreviewProps {
  project: PromptProject;
}

const generatePromptText = (project: PromptProject): string => {
  const { objetivo, persona, variaveis, anatomia, restricoes, fluxos, ferramentas } = project.modules;
  
  const sections = [
    `# 🎯 NOME DO ASSISTENTE\n${objetivo.nomeAssistente}`,
    `# 📜 MISSÃO\n${objetivo.missao}`,
    `# 🎭 PERSONA\n- **Postura**: ${persona.postura}\n- **Tom**: ${persona.tom}\n- **Gênero Linguístico**: ${persona.genero}`,
    `# 🧠 VARIÁVEIS PERSISTENTES\n${variaveis.items.map(v => `- **${v.key}**: ${v.description}`).join('\n')}`,
    `# 💬 ANATOMIA DAS MENSAGENS\n- **Tamanho**: ${anatomia.tamanhoMensagem}\n- **Emojis**: ${anatomia.usarEmojis ? 'Sim' : 'Não'}\n- **Markdown**: ${anatomia.usarMarkdown ? 'Sim' : 'Não'}\n- **Regra Customizada**: ${anatomia.regraCustomizada || 'Nenhuma'}`,
    `# ⚖️ RESTRIÇÕES GLOBAIS\n## NUNCA FAZER\n${restricoes.regrasProibidas}\n\n## SEMPRE FAZER\n${restricoes.regrasObrigatorias || 'Nenhuma'}`,
    `# 🌊 FLUXOS DE CONVERSAÇÃO\n${fluxos.items.map(f => `## FLUXO: ${f.nome}\n${f.passos}`).join('\n\n')}`,
    `# 🛠️ FERRAMENTAS\n${ferramentas.items.map(t => `## FERRAMENTA: ${t.nome}\n${t.descricao}`).join('\n\n')}`
  ];

  return sections.join('\n\n' + '-'.repeat(20) + '\n\n');
};

const Level8Preview: React.FC<Level8PreviewProps> = ({ project }) => {
  const [copied, setCopied] = useState(false);
  const promptText = generatePromptText(project);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([promptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '_').toLowerCase()}_prompt.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">🏁 Preview & Exportar</h2>
        <p className="text-gray-400 mt-1">Seu prompt está pronto! Revise, copie ou baixe o resultado final.</p>
      </div>

      <div className="bg-gray-900/70 p-6 rounded-lg border border-gray-700 max-h-[500px] overflow-y-auto">
        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">{promptText}</pre>
      </div>

      <div className="flex justify-end items-center gap-4 pt-4">
        <StyledButton
          title={copied ? "Copiado!" : "Copiar para Área de Transferência"}
          onClick={handleCopy}
          className="flex items-center gap-2"
        >
          <Clipboard size={18} />
          {copied ? "Copiado!" : "Copiar"}
        </StyledButton>
        <StyledButton
          title="Baixar como .txt"
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download size={18} />
          Baixar
        </StyledButton>
      </div>
    </div>
  );
};

export default Level8Preview;