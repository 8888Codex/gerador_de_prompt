"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import StyledButton from '../components/StyledButton';
import WavyBackground from '../components/ui/blue-meshy-background';
import LoginModal from '../components/LoginModal';

export default function WelcomeScreen() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <WavyBackground>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center z-10">
        <div className="max-w-2xl">
          <Image
            src="/Codex-Logo.png"
            alt="Codex Logo"
            width={600}
            height={150}
            priority
            className="mx-auto"
          />
          <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl drop-shadow-lg">
            PROMPT COM IA
          </p>
          <div className="mt-10">
            <StyledButton 
              title="Começar agora"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </main>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </WavyBackground>
  );
}