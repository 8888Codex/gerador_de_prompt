"use client";

import React from 'react';
import { FerramentasModule } from '../../../types';
import StyledInput from '../StyledInput';
import StyledTextarea from '../StyledTextarea';
import StyledButton from '../../StyledButton';
import { PlusCircle, Trash2 } from 'lucide-react';
import ExampleBox from '../ExampleBox';

interface Level7FerramentasProps {
  data: FerramentasModule;
  onAdd: () => void;
  onUpdate: (id: string, field: 'nome' | 'descricao', value: string) => void;
  onRemove: (id: string) => void;
  onNext: () => void;
}

const Level7Ferramentas: React.FC<Level7FerramentasProps> = ({ data, onAdd, onUpdate, onRemove, onNext }) => {
  const isComplete = data.items.some(item => item.nome.trim() !== '' && item.descricao.trim() !== '');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">🛠️ Nível 7: Ferramentas & Integrações</h2>
        <p className="text-gray-400 mt-1">Conecte seu assistente a outras capacidades e fontes de dados.</p>
      </div>

      <div className="space-y-6">
        {data.items.map((item) => (
          <div key={item.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 space-y-4">
            <div className="flex items-center gap-4">
              <StyledInput
                value={item.nome}
                onChange={(e) => onUpdate(item.id, 'nome', e.target.value)}
                placeholder="Nome da Ferramenta (ex: buscar_produto)"
                className="flex-grow"
              />
              <button
                onClick={() => onRemove(item.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
                aria-label="Remover Ferramenta"
                disabled={data.items.length <= 1}
              >
                <Trash2 size={20} />
              </button>
            </div>
            <StyledTextarea
              label="Descrição da Ferramenta"
              value={item.descricao}
              onChange={(e) => onUpdate(item.id, 'descricao', e.target.value)}
              placeholder="O que essa ferramenta faz? Ex: 'Busca um produto no nosso catálogo pelo nome e retorna o preço e o link.'"
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
          Adicionar Ferramenta
        </button>
      </div>

      <ExampleBox>
        <p>Ferramentas dão superpoderes ao seu assistente. Descreva o que cada uma faz de forma clara.</p>
        <ul>
          <li><strong>Nome:</strong> <code>verificar_disponibilidade_agenda</code></li>
          <li><strong>Descrição:</strong> <code>Consulta a agenda para encontrar horários livres para uma reunião. Recebe uma data como parâmetro.</code></li>
        </ul>
      </ExampleBox>

      <div className="flex justify-end pt-4">
        <StyledButton
          title="Salvar e Finalizar"
          onClick={onNext}
          disabled={!isComplete}
        />
      </div>
    </div>
  );
};

export default Level7Ferramentas;