"use client";

import React from 'react';
import { RestricoesModule } from '../../../types';
import StyledTextarea from '../StyledTextarea';
import StyledButton from '../../StyledButton';
import ExampleBox from '../ExampleBox';

interface Level5RestricoesProps {
  data: RestricoesModule;
  onUpdate: (field: keyof RestricoesModule, value: string) => void;
  onNext: () => void;
}

const Level5Restricoes: React.FC<Level5RestricoesProps> = ({ data, onUpdate, onNext }) => {
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
        />
        <StyledTextarea
          label="Regras Obrigatórias (O que o assistente SEMPRE deve fazer - Opcional)"
          value={data.regrasObrigatorias}
          onChange={(e) => onUpdate('regrasObrigatorias', e.target.value)}
          placeholder="Ex: Sempre se apresentar no início da conversa. Sempre tratar o cliente por 'senhor' ou 'senhora'."
        />
      </div>

      <ExampleBox>
        <p>As restrições são as "leis" do seu assistente. Elas garantem consistência e segurança.</p>
        <ul>
          <li><strong>Regra Proibida:</strong> <code>Nunca devo afirmar que sou humano. Sou uma IA.</code></li>
          <li><strong>Regra Obrigatória:</strong> <code>Sempre que eu não souber a resposta, devo dizer 'Não tenho essa informação no momento, mas posso buscar para você'.</code></li>
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