import React, { useState } from 'react';
import { GeminiOutcome, DecisionFeedbackItem } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronUpIcon } from './icons/ChevronUpIcon';


interface AccordionItemProps {
  item: DecisionFeedbackItem;
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(index < 2); // Open first few by default

  return (
    <div className="border border-[var(--color-border-secondary)] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary-hover)] transition-colors focus:outline-none"
        aria-expanded={isOpen}
        aria-controls={`feedback-details-${index}`}
      >
        <span className="font-medium text-[var(--color-text-primary)] text-left">
          <span className="text-[var(--color-accent-secondary)]">Scenario:</span> {item.scenarioTitle}
          <br />
          <span className="text-xs text-[var(--color-text-secondary)]">You chose ({item.choiceMade}): {item.choiceText}</span>
        </span>
        {isOpen ? <ChevronUpIcon className="w-5 h-5 text-[var(--color-accent-primary)]" /> : <ChevronDownIcon className="w-5 h-5 text-[var(--color-accent-primary)]" />}
      </button>
      {isOpen && (
        <div id={`feedback-details-${index}`} className="p-4 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-secondary)]">
          <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed">{item.feedback}</p>
        </div>
      )}
    </div>
  );
};


interface GameEndScreenProps {
  outcome: GeminiOutcome;
  onRestart: () => void;
}

const GameEndScreen: React.FC<GameEndScreenProps> = ({ outcome, onRestart }) => {
  const isWin = outcome.outcome === 'win';
  const outcomeColor = isWin ? 'text-[var(--color-win)]' : 'text-[var(--color-loss)]';
  const outcomeBgColor = isWin ? 'bg-[var(--color-win-bg)]' : 'bg-[var(--color-loss-bg)]';
  const outcomeBorderColor = isWin ? 'border-[var(--color-win-border)]' : 'border-[var(--color-loss-border)]';

  return (
    <div className="animate-fadeIn space-y-6">
      <div className={`p-6 rounded-xl border ${outcomeBgColor} ${outcomeBorderColor}`}>
        <h2 className={`text-4xl font-bold mb-3 text-center ${outcomeColor}`} style={{ fontFamily: "var(--font-heading)" }}>
          You {isWin ? 'Won! 🎉' : 'Lost 😟'}
        </h2>
        <p className="text-[var(--color-text-primary)] text-lg text-center mb-2">{outcome.reasoning}</p>
      </div>

      <div className="p-6 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border-primary)]">
        <h3 className="text-2xl font-semibold text-[var(--color-accent-secondary)] mb-3">Overall Feedback:</h3>
        <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed">{outcome.overallFeedback}</p>
      </div>
      
      <div>
        <h3 className="text-2xl font-semibold text-[var(--color-accent-secondary)] mb-4">Detailed Decision Breakdown:</h3>
        <div className="space-y-3">
          {outcome.decisionFeedback.map((item, index) => (
            <AccordionItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full mt-8 bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary-hover)] transition-colors text-[var(--color-button-text)] font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-opacity-75"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameEndScreen;
