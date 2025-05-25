import React from 'react';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenSettings: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onOpenSettings }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-[var(--color-bg-secondary)] p-8 md:p-12 rounded-xl shadow-2xl border border-[var(--color-border-primary)] text-center animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-accent-secondary)] mb-8" style={{ fontFamily: "var(--font-heading)" }}>
        Welcome to the Journey!
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-10 text-lg leading-relaxed">
        Embark on your entrepreneurial adventure. Make critical decisions and shape the destiny of your startup.
      </p>
      <div className="space-y-5">
        <button
          onClick={onStartGame}
          className="w-full bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary-hover)] text-[var(--color-button-text)] font-semibold py-4 px-6 rounded-lg shadow-lg transition-transform duration-150 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-opacity-75 text-xl"
        >
          Start Game
        </button>
        <button
          onClick={onOpenSettings}
          className="w-full bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary-hover)] text-[var(--color-text-primary)] font-medium py-3 px-6 rounded-lg shadow-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-secondary)] focus:ring-opacity-50"
        >
          Settings
        </button>
      </div>
    </div>
  );
};

// FadeIn animation should be globally available or defined in App/index.html
// Assuming it's available from ScenarioCard's style injection or similar.

export default MainMenu;
