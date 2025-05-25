import React from 'react';
import { Scenario } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
  onDecision: (scenario: Scenario, choiceId: string) => void;
  scenarioNumber: number;
  totalScenarios: number;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onDecision, scenarioNumber, totalScenarios }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-4 text-sm text-[var(--color-accent-primary)]">
        Question {scenarioNumber} of {totalScenarios}
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] mb-3">{scenario.title}</h2>
      {scenario.description && (
        <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">{scenario.description}</p>
      )}
      <div className="space-y-4">
        {scenario.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onDecision(scenario, option.id)}
            className="w-full text-left bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-accent-primary-hover)] transition-all duration-200 ease-in-out text-[var(--color-text-primary)] hover:text-[var(--color-button-text)] font-medium py-4 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-opacity-75 group"
            aria-label={`Choose option ${option.id}: ${option.text}`}
          >
            <span className="mr-2 font-bold text-[var(--color-accent-primary)] group-hover:text-[var(--color-button-text)]">{option.id})</span>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

// Add a simple fadeIn animation
// This should ideally be in a global CSS file or managed by Tailwind config,
// but for self-contained component as per constraints:
if (typeof window !== 'undefined') {
  if (!document.getElementById('animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }
}

export default ScenarioCard;
