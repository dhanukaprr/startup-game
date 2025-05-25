export interface GameOption {
  id: string; // 'A' or 'B'
  text: string;
}

export interface Scenario {
  id: number;
  title: string;
  description?: string;
  options: GameOption[];
}

export interface UserDecision {
  scenarioId: number;
  scenarioTitle: string;
  choiceId: string; // 'A' or 'B'
  choiceText: string;
}

// Based on the desired Gemini response structure
export interface DecisionFeedbackItem {
  scenarioTitle: string;
  choiceMade: string; // 'A' or 'B'
  choiceText: string;
  feedback: string;
}

export interface GeminiOutcome {
  outcome: 'win' | 'loss';
  overallFeedback: string;
  reasoning: string;
  decisionFeedback: DecisionFeedbackItem[];
}

export interface ThemeColors {
  '--font-body': string;
  '--font-heading': string;
  '--color-bg-primary': string;
  '--color-bg-secondary': string;
  '--color-bg-tertiary': string;
  '--color-bg-tertiary-hover': string;
  '--color-text-primary': string;
  '--color-text-secondary': string;
  '--color-accent-primary': string;
  '--color-accent-primary-hover': string;
  '--color-accent-secondary': string;
  '--color-border-primary': string;
  '--color-border-secondary': string;
  '--color-button-text': string;
  '--color-button-text-on-accent': string;
  '--color-win': string;
  '--color-loss': string;
  '--color-win-bg': string;
  '--color-loss-bg': string;
  '--color-win-border': string;
  '--color-loss-border': string;
  '--color-scrollbar-track': string;
  '--color-scrollbar-thumb': string;
  '--color-scrollbar-thumb-hover': string;
}

export interface ColorScheme {
  id: string;
  name: string;
  settings: ThemeColors;
}
