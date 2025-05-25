import React from 'react';
import { UserDecision } from '../types';

interface DecisionLogProps {
  decisions: UserDecision[];
}

const DecisionLog: React.FC<DecisionLogProps> = ({ decisions }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-[var(--color-accent-primary)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>Your Journey So Far</h3>
      {decisions.length === 0 ? (
        <p className="text-[var(--color-text-secondary)] italic">No decisions made yet. Your adventure awaits!</p>
      ) : (
        <ul className="space-y-3 pr-1"> {/* Removed max-h and overflow, handled by parent in App.tsx */}
          {decisions.map((decision, index) => (
            <li key={index} className="p-3 bg-[var(--color-bg-tertiary)] rounded-md shadow text-sm">
              <p className="font-semibold text-[var(--color-text-primary)]">
                <span className="text-[var(--color-accent-secondary)]">Scenario {decision.scenarioId}:</span> {decision.scenarioTitle}
              </p>
              <p className="text-[var(--color-text-secondary)] mt-1">
                <span className="font-medium">You chose ({decision.choiceId}):</span> {decision.choiceText}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DecisionLog;
