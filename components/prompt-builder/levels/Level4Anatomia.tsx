"use client";

import React from 'react';
import { AnatomiaModule, MessageSize, PromptProject, ModuleProgress } from '../../../types';
import StyledTextarea from '../StyledTextarea';
import StyledButton from '../../StyledButton';
import ExampleBox from '../ExampleBox';

interface Level4AnatomiaProps {
  data: PromptProject['modules']['anatomia'];
  onUpdate: (field: keyof (AnatomiaModule & ModuleProgress), value: any) => void;
  onNext: () => void;
  onImprove: (field: keyof AnatomiaModule, value: string) => void;
}

const Level4Anatomia: React.FC<Level4AnatomiaProps> = ({ data, onUpdate, onNext, onImprove }) => {
  const isComplete = data.tamanhoMensagem !== null && (data.usarEmojis || data.usarMarkdown || data.regraCustomizada.trim() !== '');

  const sizeOptions: { value: MessageSize; label: string; description: string }[] = [
    { value: 'curta', label: 'Curta', description: 'Respostas diretas e concisas.' },
    { value: 'media', label: 'Média', description: 'Respostas detalhadas, mas sem excessos.' },
    { value: 'longa', label: 'Longa', description: 'Respostas completas e aprofundadas.' },
  ];

  const ToggleButton = ({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) => (
    <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
      <span className="font-medium text-white">{label}</span>
      <button
        onClick={onToggle}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
          value ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
        }`}
      >
        {value ? 'Ativado' : 'Desativado'}
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">💬 Nível 4: Anatomia de Mensagens</h2>
        <p className="text-gray-400 mt-1">Estruture como o assistente deve se comunicar e formatar suas respostas.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Tamanho Padrão das Respostas</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {sizeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => onUpdate('tamanhoMensagem', option.value)}
                className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                  data.tamanhoMensagem === option.value
                    ? 'bg-blue-900/50 border-blue-500'
                    : 'bg-gray-800 border-gray-700 hover:border-gray-500'
                }`}
              >
                <h3 className="font-bold text-white">{option.label}</h3>
                <p className="text-sm text-gray-400 mt-1">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Regras de Formatação</label>
          <div className="space-y-4">
            <ToggleButton label="Usar emojis para ilustrar" value={data.usarEmojis} onToggle={() => onUpdate('usarEmojis', !data.usarEmojis)} />
            <ToggleButton label="Usar Markdown para formatação (negrito, listas)" value={data.usarMarkdown} onToggle={() => onUpdate('usarMarkdown', !data.usarMarkdown)} />
          </div>
        </div>

        <StyledTextarea
          label="Outra Regra de Formatação (Opcional)"
          value={data.regraCustomizada}
          onChange={(e) => onUpdate('regraCustomizada', e.target.value)}
          placeholder="Ex: Sempre termine a resposta com uma pergunta para o usuário."
          onImprove={() => onImprove('regraCustomizada', data.regraCustomizada)}
        />
      </div>

      <ExampleBox>
        <p>Defina o estilo da comunicação. Como as respostas devem ser estruturadas?</p>
        <ul>
          <li><strong>Tamanho:</strong> <code>Médio</code> (respostas claras, mas sem serem curtas demais).</li>
          <li><strong>Formatação:</strong> Ativar <code>Emojis</code> e <code>Markdown</code> para destacar informações importantes.</li>
          <li><strong>Regra Customizada:</strong> <code>Sempre que possível, use listas para organizar as informações.</code></li>
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

export default Level4Anatomia;