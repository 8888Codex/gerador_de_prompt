"use client";

import React from 'react';
import { PersonaModule } from '../../../types';
import StyledTextarea from '../StyledTextarea';
import StyledButton from '../../StyledButton';

interface Level2PersonaProps {
  data: PersonaModule;
  onUpdate: (field: keyof PersonaModule, value: any) => void;
  onNext: () => void;
  onImprove: (field: keyof PersonaModule, value: string) => void;
}

const Level2Persona: React.FC<Level2PersonaProps> = ({ data, onUpdate, onNext, onImprove }) => {
  const isComplete = data.postura.trim() !== '' && data.tom.trim() !== '';

  const genderOptions: { value: 'masculino' | 'feminino' | 'neutro'; label: string }[] = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'neutro', label: 'Neutro' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">🎭 Nível 2: Persona & Tom</h2>
        <p className="text-gray-400 mt-1">Dê uma personalidade única para o seu assistente.</p>
      </div>

      <div className="space-y-6">
        <StyledTextarea
          label="Postura"
          value={data.postura}
          onChange={(e) => onUpdate('postura', e.target.value)}
          placeholder="Ex: Guia prestativo, especialista formal, mentor encorajador..."
          onImprove={() => onImprove('postura', data.postura)}
        />
        <StyledTextarea
          label="Tom de Voz"
          value={data.tom}
          onChange={(e) => onUpdate('tom', e.target.value)}
          placeholder="Ex: Amigável e casual, profissional e direto, inspirador e poético..."
          onImprove={() => onImprove('tom', data.tom)}
        />
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Gênero Linguístico</label>
          <div className="flex space-x-4">
            {genderOptions.map(option => (
              <button
                key={option.value}
                onClick={() => onUpdate('genero', option.value)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  data.genero === option.value
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

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

export default Level2Persona;