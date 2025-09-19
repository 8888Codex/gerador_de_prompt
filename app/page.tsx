"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import StyledButton from '../components/StyledButton';
import WavyBackground from '../components/ui/blue-meshy-background';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/prompt-builder');
  };

  return (
    <WavyBackground>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-xl">
            Gerador de Prompt com IA
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl drop-shadow-lg">
            Crie, refine e exporte prompts poderosos com nosso guia passo a passo.
          </p>
          <div className="mt-10">
            <StyledButton 
              title="Começar a Construir"
              onClick={handleNavigate}
            />
          </div>
        </div>
      </main>
    </WavyBackground>
  );
}