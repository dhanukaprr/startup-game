import React from 'react';
import { ColorScheme } from '../types';

interface SettingsScreenProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
  onBack: () => void;
  themes: ColorScheme[];
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ currentThemeId, onThemeChange, onBack, themes }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-[var(--color-bg-secondary)] p-8 md:p-10 rounded-xl shadow-2xl border border-[var(--color-border-primary)] animate-fadeIn">
      <h2 className="text-3xl font-bold text-[var(--color-accent-secondary)] mb-8 text-center" style={{ fontFamily: "var(--font-heading)" }}>
        Display Settings
      </h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">Color Scheme</h3>
        <div className="space-y-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
                currentThemeId === theme.id
                  ? 'bg-[var(--color-accent-primary)] text-[var(--color-button-text)] shadow-lg ring-[var(--color-accent-primary)]'
                  : 'bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary-hover)] text-[var(--color-text-primary)] ring-[var(--color-accent-secondary)]'
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onBack}
        className="w-full mt-10 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary-hover)] text-[var(--color-text-primary)] font-medium py-3 px-6 rounded-lg shadow-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-secondary)] focus:ring-opacity-50"
      >
        Back to Main Menu
      </button>
    </div>
  );
};

export default SettingsScreen;
