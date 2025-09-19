import React from 'react';

const AnimatedGradientBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,_#111827_0%,_#3B82F6_50%,_#4F46E5_100%)] bg-[length:200%_200%] animate-[gradient-animation]"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedGradientBackground;