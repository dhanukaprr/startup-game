import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[var(--color-bg-primary)] bg-opacity-80 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-[var(--color-accent-primary-hover)] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-xl text-[var(--color-text-primary)] font-semibold">Analyzing your journey...</p>
    </div>
  );
};

export default LoadingSpinner;
