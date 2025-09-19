"use client";

import React from 'react';
import { FluxosModule } from '../../../types';
import StyledInput from '../StyledInput';
import StyledTextarea from '../StyledTextarea';
import StyledButton from '../../StyledButton';
import { PlusCircle, Trash2 } from 'lucide-react';
import ExampleBox from '../ExampleBox';

interface Level6FluxosProps {
  data: FluxosModule;
  onAdd: () => void;
  onUpdate: (id: string, field: 'nome' | 'passos', value: string) => void;
  onRemove: (id: string) => void;
  onNext: () => void;
  onImprove: (id: string, field: 'passos', value: string) => void;
}

const Level6Fluxos: React.FC<Level6FluxosProps> = ({ data, onAdd, onUpdate, onRemove, onNext, onImprove }) => {
  const isComplete = data.items.some(item => item.nome.trim() !== '' && item.passos.trim() !== '');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">🌊 Nível 6: Fluxos de Conversação</h2>
        <p className="text-gray-400 mt-1">Crie os roteiros e caminhos que a conversa pode seguir.</p>
      </div>

      <div className="space-y-6">
        {data.items.map((item) => (
          <div key={item.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 space-y-4">
            <div className="flex items-center gap-4">
              <StyledInput
                value={item.nome}
                onChange={(e) => onUpdate(item.id, 'nome', e.target.value)}
                placeholder="Nome do Fluxo (ex: Boas-vindas, Suporte Técnico)"
                className="flex-grow"
              />
              <button
                onClick={() => onRemove(item.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
                aria-label="Remover Fluxo"
                disabled={data.items.length <= 1}
              >
                <Trash2 size={20} />
              </button>
            </div>
            <StyledTextarea
              label="Passos do Fluxo"
              value={item.passos}
              onChange={(e) => onUpdate(item.id, 'passos', e.target.value)}
              placeholder="Descreva os passos. Ex: 1. Saudar o usuário. 2. Perguntar como posso ajudar. 3. Se for sobre o pedido, pedir o NOME_DO_CLIENTE..."
              onImprove={() => onImprove(item.id, 'passos', item.passos)}
            />
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-300 bg-blue-900/30 hover:bg-blue-900/60 rounded-lg transition-colors"
        >
          <PlusCircle size={16} />
          Adicionar Fluxo
        </button>
      </div>

      <ExampleBox>
        <p>Pense nos principais cenários de conversa. O que o usuário pode querer? Crie um fluxo para cada um.</p>
        <ul>
          <li><strong>Nome do Fluxo:</strong> <code>Consulta de Status de Pedido</code></li>
          <li><strong>Passos:</strong> <code>1. Peço o NUMERO_DO_PEDIDO. 2. Verifico o status no sistema. 3. Informo o status atual (Ex: &lsquo;Em preparação&rsquo;, &lsquo;Enviado&rsquo;). 4. Pergunto se posso ajudar com mais alguma coisa.</code></li>
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

export default Level6Fluxos;