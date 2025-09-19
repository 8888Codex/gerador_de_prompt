"use client";

import React from 'react';
import { usePromptProject } from '../../hooks/usePromptProject';
import LevelContent from '../../components/prompt-builder/LevelContent';
import WavyBackground from '../../components/ui/WavyBackground';
import { supabase } from '../../src/integrations/supabase/client';

export default function PromptBuilderPage() {
  const { project, dispatch } = usePromptProject();

  const handleImproveText = async (level: number, field: string, value: string, itemId?: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('improve-text', {
        body: { field, value },
      });

      if (error) throw error;

      if (data.improvedText) {
        switch (level) {
          case 1:
            dispatch({ type: 'UPDATE_FIELD', payload: { module: 'objetivo', field, value: data.improvedText } });
            break;
          case 2:
            dispatch({ type: 'UPDATE_FIELD', payload: { module: 'persona', field, value: data.improvedText } });
            break;
          case 4:
            dispatch({ type: 'UPDATE_FIELD', payload: { module: 'anatomia', field, value: data.improvedText } });
            break;
          case 5:
            dispatch({ type: 'UPDATE_FIELD', payload: { module: 'restricoes', field, value: data.improvedText } });
            break;
          case 6:
            if (itemId) {
              dispatch({ type: 'UPDATE_ITEM', payload: { module: 'fluxos', id: itemId, field, value: data.improvedText } });
            }
            break;
          case 7:
            if (itemId) {
              dispatch({ type: 'UPDATE_ITEM', payload: { module: 'ferramentas', id: itemId, field, value: data.improvedText } });
            }
            break;
        }
      }
    } catch (error) {
      console.error("Error improving text:", error);
    }
  };

  return (
    <WavyBackground>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 h-full overflow-y-auto">
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
              dispatch={dispatch}
              onImproveText={handleImproveText}
            />
          </section>
        </main>
      </div>
    </WavyBackground>
  );
}