"use client";

import React from 'react';
import { ObjetivoModule } from '../../../types';
import StyledTextarea from '../StyledTextarea';
import StyledButton from '../../StyledButton';

interface Level1ObjetivoProps {
  data: ObjetivoModule;
  onUpdate: (field: keyof ObjetivoModule, value: string) => void;
  onNext: () => void;
  onImprove: (field: keyof ObjetivoModule, value: string) => void;
}

const Level1Objetivo: React.FC<Level1ObjetivoProps> = ({ data, onUpdate, onNext, onImprove }) => {
  // Updated validation logic based on the new rules
  const isComplete = data.nomeAssistente.trim() !== '' && data.missao.trim().length >= 20;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">🎯 Nível 1: Objetivo & Missão</h2>
        <p className="text-gray-400 mt-1">Defina o propósito fundamental do seu assistente.</p>
      </div>

      <div className="space-y-6">
        <StyledTextarea
          label="Nome do Assistente"
          value={data.nomeAssistente}
          onChange={(e) => onUpdate('nomeAssistente', e.target.value)}
          placeholder="Ex: Assistente de Vendas Proativo, Guia de Suporte Técnico Nível 1, etc."
          onImprove={() => onImprove('nomeAssistente', data.nomeAssistente)}
        />
        <div>
          <StyledTextarea
            label="Missão Principal"
            value={data.missao}
            onChange={(e) => onUpdate('missao', e.target.value)}
            placeholder="Descreva em uma ou duas frases o que o assistente deve fazer. Ex: 'Minha missão é ajudar os clientes a encontrarem o produto certo, entendendo suas necessidades e oferecendo recomendações personalizadas.'"
            onImprove={() => onImprove('missao', data.missao)}
          />
          <p className={`text-xs mt-2 ${data.missao.trim().length >= 20 ? 'text-green-400' : 'text-gray-400'}`}>
            {data.missao.trim().length}/20 caracteres mínimos
          </p>
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

export default Level1Objetivo;