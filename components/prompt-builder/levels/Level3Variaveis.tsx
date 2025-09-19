"use client";

import React from 'react';
import { VariaveisModule, Variavel } from '../../../types';
import StyledInput from '../StyledInput';
import StyledButton from '../../StyledButton';
import { PlusCircle, Trash2 } from 'lucide-react';
import ExampleBox from '../ExampleBox';

interface Level3VariaveisProps {
  data: VariaveisModule;
  onAdd: () => void;
  onUpdate: (id: string, field: 'key' | 'description', value: string) => void;
  onRemove: (id: string) => void;
  onNext: () => void;
}

const Level3Variaveis: React.FC<Level3VariaveisProps> = ({ data, onAdd, onUpdate, onRemove, onNext }) => {
  const validItemsCount = data.items.filter(item => item.key.trim() !== '' && item.description.trim() !== '').length;
  const isComplete = validItemsCount >= 2;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">🧠 Nível 3: Variáveis Persistentes</h2>
        <p className="text-gray-400 mt-1">Defina a &quot;memória&quot; do assistente. Estas são informações que ele sempre lembrará.</p>
      </div>

      <div className="space-y-4">
        {data.items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
              <StyledInput
                value={item.key}
                onChange={(e) => onUpdate(item.id, 'key', e.target.value)}
                placeholder={`Chave da Variável ${index + 1} (ex: NOME_CLIENTE)`}
              />
              <StyledInput
                value={item.description}
                onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
                placeholder={`Descrição (ex: O nome do cliente atual)`}
              />
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
              aria-label="Remover Variável"
              disabled={data.items.length <= 1}
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-300 bg-blue-900/30 hover:bg-blue-900/60 rounded-lg transition-colors"
        >
          <PlusCircle size={16} />
          Adicionar Variável
        </button>
      </div>

      <ExampleBox>
        <p>Variáveis são como etiquetas na memória do assistente. Use nomes claros e descrições precisas.</p>
        <ul>
          <li><strong>Chave:</strong> <code>NOME_DO_CLIENTE</code>, <strong>Descrição:</strong> <code>O primeiro nome do cliente com quem estou conversando.</code></li>
          <li><strong>Chave:</strong> <code>NUMERO_DO_PEDIDO</code>, <strong>Descrição:</strong> <code>O número do último pedido feito pelo cliente.</code></li>
        </ul>
      </ExampleBox>

      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-gray-400">
          {validItemsCount} de 2 variáveis necessárias preenchidas.
        </p>
        <StyledButton
          title="Salvar e Avançar"
          onClick={onNext}
          disabled={!isComplete}
        />
      </div>
    </div>
  );
};

export default Level3Variaveis;