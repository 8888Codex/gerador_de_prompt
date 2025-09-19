"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ShimmerButton from '../components/ui/ShimmerButton';
import LoginModal from '../components/auth/LoginModal';
import WavyBackground from '../components/ui/WavyBackground';

export default function WelcomeScreen() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    router.push('/prompt-builder');
  };

  return (
    <WavyBackground>
      <main className="flex h-full flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl">
          <Image
            src="/Codex-Logo.png"
            alt="Codex Logo"
            width={400}
            height={100}
            priority
            className="mx-auto"
          />
          <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl drop-shadow-lg">
            PROMPT COM IA
          </p>
          <div className="mt-10">
            <ShimmerButton 
              onClick={() => setIsModalOpen(true)}
            >
              Começar agora
            </ShimmerButton>
          </div>
        </div>
      </main>
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </WavyBackground>
  );
}