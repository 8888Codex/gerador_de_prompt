"use client";

import React from 'react';
import { usePromptProject } from '../../hooks/usePromptProject';
import LevelContent from '../../components/prompt-builder/LevelContent';
import AnimatedGradientBackground from '../../components/ui/AnimatedGradientBackground';
import { supabase } from '../../src/integrations/supabase/client';
import { ObjetivoModule, PersonaModule, AnatomiaModule, RestricoesModule } from '../../types';

export default function PromptBuilderPage() {
  const { 
    project, 
    updateObjetivoField, 
    updatePersonaField, 
    addVariavel,
    updateVariavel,
    removeVariavel,
    updateAnatomiaField,
    updateRestricoesField,
    addFluxo,
    updateFluxo,
    removeFluxo,
    addFerramenta,
    updateFerramenta,
    removeFerramenta,
    completeAndAdvanceLevel 
  } = usePromptProject();

  const handleImproveText = async (level: number, field: string, value: string, itemId?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('improve-text', {
        body: { field, value },
      });

      if (error) throw error;

      if (data.improvedText) {
        switch (level) {
          case 1:
            updateObjetivoField(field as keyof ObjetivoModule, data.improvedText);
            break;
          case 2:
            updatePersonaField(field as keyof PersonaModule, data.improvedText);
            break;
          case 4:
            updateAnatomiaField(field as keyof AnatomiaModule, data.improvedText);
            break;
          case 5:
            updateRestricoesField(field as keyof RestricoesModule, data.improvedText);
            break;
          case 6:
            if (itemId) {
              updateFluxo(itemId, field as 'passos', data.improvedText);
            }
            break;
          case 7:
            if (itemId) {
              updateFerramenta(itemId, field as 'descricao', data.improvedText);
            }
            break;
        }
      }
    } catch (error) {
      console.error("Error improving text:", error);
    }
  };

  return (
    <AnimatedGradientBackground>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Construtor de Prompt
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Siga os níveis para construir um prompt poderoso e eficaz.
          </p>
        </header>

        <main className="flex justify-center items-start py-10">
          <section className="w-full max-w-4xl">
            <LevelContent 
              project={project}
              onUpdateObjetivo={updateObjetivoField}
              onUpdatePersona={updatePersonaField}
              onAddVariavel={addVariavel}
              onUpdateVariavel={updateVariavel}
              onRemoveVariavel={removeVariavel}
              onUpdateAnatomia={updateAnatomiaField}
              onUpdateRestricoes={updateRestricoesField}
              onAddFluxo={addFluxo}
              onUpdateFluxo={updateFluxo}
              onRemoveFluxo={removeFluxo}
              onAddFerramenta={addFerramenta}
              onUpdateFerramenta={updateFerramenta}
              onRemoveFerramenta={removeFerramenta}
              onNextLevel={completeAndAdvanceLevel}
              onImproveText={handleImproveText}
            />
          </section>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}