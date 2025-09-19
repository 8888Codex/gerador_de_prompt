"use client";

import React from 'react';
import { RestricoesModule, PromptProject, ModuleProgress } from '../../../types';
import StyledTextarea from '../StyledTextarea';
import StyledButton from '../../StyledButton';
import ExampleBox from '../ExampleBox';

interface Level5RestricoesProps {
  data: PromptProject['modules']['restricoes'];
  onUpdate: (field: keyof PromptProject['modules']['restricoes'], value: any) => void;
  onNext: () => void;
  onImprove: (field: keyof RestricoesModule, value: string) => void;
}

const Level5Restricoes: React.FC<Level5RestricoesProps> = ({ data, onUpdate, onNext, onImprove }) => {
  const isComplete = data.regrasProibidas.trim() !== '';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">⚖️ Nível 5: Restrições Globais</h2>
        <p className="text-gray-400 mt-1">Defina as regras e limites que o assistente deve sempre seguir.</p>
      </div>

      <div className="space-y-6">
        <StyledTextarea
          label="Regras Proibidas (O que o assistente NUNCA deve fazer)"
          value={data.regrasProibidas}
          onChange={(e) => onUpdate('regrasProibidas', e.target.value)}
          placeholder="Ex: Nunca prometa descontos. Não use gírias. Não forneça informações de contato pessoais."
          onImprove={() => onImprove('regrasProibidas', data.regrasProibidas)}
        />
        <StyledTextarea
          label="Regras Obrigatórias (O que o assistente SEMPRE deve fazer - Opcional)"
          value={data.regrasObrigatorias}
          onChange={(e) => onUpdate('regrasObrigatorias', e.target.value)}
          placeholder="Ex: Sempre se apresentar no início da conversa. Sempre tratar o cliente por 'senhor' ou 'senhora'."
          onImprove={() => onImprove('regrasObrigatorias', data.regrasObrigatorias)}
        />
      </div>

      <ExampleBox>
        <p>As restrições são as &ldquo;leis&rdquo; do seu assistente. Elas garantem consistência e segurança.</p>
        <ul>
          <li><strong>Regra Proibida:</strong> <code>Nunca devo afirmar que sou humano. Sou uma IA.</code></li>
          <li><strong>Regra Obrigatória:</strong> <code>Sempre que eu não souber a resposta, devo dizer &lsquo;Não tenho essa informação no momento, mas posso buscar para você&rsquo;.</code></li>
        </ul>
      </ExampleBox>

      <div className="flex justify-end pt-4">
        <StyledButton
          title="Salvar e Avançar"
          onClick={onNext}
          disabled={!isComplete}
        />
      </div>
    </div>
  );
};

export default Level5Restricoes;