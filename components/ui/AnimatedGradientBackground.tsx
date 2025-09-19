"use client";

import React from 'react';

const AnimatedGradientBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#020413] overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#020413] via-[#0b0213] to-[#020413] animate-gradient-animation bg-[length:200%_200%]"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedGradientBackground;