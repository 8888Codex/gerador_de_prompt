"use client";

import React from 'react';
import { usePromptProject } from '../../hooks/usePromptProject';
import LevelContent from '../../components/prompt-builder/LevelContent';
import AnimatedGradientBackground from '../../components/AnimatedGradientBackground';
import { supabase } from '../../src/integrations/supabase/client';
import { ObjetivoModule, PersonaModule } from '../../types';

export default function PromptBuilderPage() {
  const { 
    project, 
    updateObjetivoField, 
    updatePersonaField, 
    addVariavel,
    updateVariavel,
    removeVariavel,
    completeAndAdvanceLevel 
  } = usePromptProject();

  const handleImproveText = async (level: number, field: string, value: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('improve-text', {
        body: { field, value },
      });

      if (error) throw error;

      if (data.improvedText) {
        if (level === 1) {
          updateObjetivoField(field as keyof ObjetivoModule, data.improvedText);
        } else if (level === 2) {
          updatePersonaField(field as keyof PersonaModule, data.improvedText);
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
              onNextLevel={completeAndAdvanceLevel}
              onImproveText={handleImproveText}
            />
          </section>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}