import React, { useState, useEffect, useCallback } from 'react';
import { Scenario, UserDecision, GeminiOutcome, ColorScheme } from './types';
import { GAME_SCENARIOS, GAME_INTRODUCTION, GAME_TITLE } from './constants';
import { THEMES, DEFAULT_THEME_ID } from './themes';
import ScenarioCard from './components/ScenarioCard';
import DecisionLog from './components/DecisionLog';
import GameEndScreen from './components/GameEndScreen';
import LoadingSpinner from './components/LoadingSpinner';
import MainMenu from './components/MainMenu';
import SettingsScreen from './components/SettingsScreen';
import { getGameOutcomeAndFeedback } from './services/geminiService';

type GameState = 'mainMenu' | 'settings' | 'inGame';

const App: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [userDecisions, setUserDecisions] = useState<UserDecision[]>([]);
  const [gameOutcome, setGameOutcome] = useState<GeminiOutcome | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [gameState, setGameState] = useState<GameState>('mainMenu');
  const [activeThemeId, setActiveThemeId] = useState<string>(() => {
    return localStorage.getItem('startupJourneyColorScheme') || DEFAULT_THEME_ID;
  });

  const activeTheme = THEMES.find(theme => theme.id === activeThemeId) || THEMES.find(theme => theme.id === DEFAULT_THEME_ID)!;

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(activeTheme.settings).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    localStorage.setItem('startupJourneyColorScheme', activeThemeId);
  }, [activeThemeId, activeTheme]);
  
  const totalScenarios = GAME_SCENARIOS.length;

  const handleDecision = useCallback((scenario: Scenario, choiceId: string) => {
    if (showIntro) setShowIntro(false);

    const chosenOption = scenario.options.find(opt => opt.id === choiceId);
    if (!chosenOption) return;

    const decision: UserDecision = {
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      choiceId: choiceId,
      choiceText: chosenOption.text,
    };
    const updatedDecisions = [...userDecisions, decision];
    setUserDecisions(updatedDecisions);

    if (currentScenarioIndex < totalScenarios - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
    } else {
      setIsLoading(true);
      setError(null);
      getGameOutcomeAndFeedback(updatedDecisions, GAME_SCENARIOS)
        .then(outcome => {
          setGameOutcome(outcome);
        })
        .catch(err => {
          console.error("Error getting game outcome:", err);
          setError(err.message || "Failed to get game outcome. Please check your API key and network connection.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentScenarioIndex, totalScenarios, userDecisions, showIntro]);

  const startGame = () => {
    setCurrentScenarioIndex(0);
    setUserDecisions([]);
    setGameOutcome(null);
    setIsLoading(false);
    setError(null);
    setShowIntro(true);
    setGameState('inGame');
  };

  const openSettings = () => {
    setGameState('settings');
  };

  const backToMainMenu = () => {
    setGameState('mainMenu');
  };

  const changeTheme = (themeId: string) => {
    setActiveThemeId(themeId);
  };
  
  useEffect(() => {
    if (!process.env.API_KEY && gameState === 'inGame' && currentScenarioIndex === totalScenarios -1 && userDecisions.length === totalScenarios) {
       // Only warn if about to make the API call or if API key is critical for the current view.
      console.warn("Gemini API Key (process.env.API_KEY) is not set. API calls will fail.");
      // setError("Gemini API Key is not configured. The game cannot retrieve feedback."); 
    }
  }, [gameState, currentScenarioIndex, totalScenarios, userDecisions]);

  const currentScenario = GAME_SCENARIOS[currentScenarioIndex];

  const renderContent = () => {
    if (gameState === 'mainMenu') {
      return <MainMenu onStartGame={startGame} onOpenSettings={openSettings} />;
    }
    if (gameState === 'settings') {
      return <SettingsScreen currentThemeId={activeThemeId} onThemeChange={changeTheme} onBack={backToMainMenu} themes={THEMES} />;
    }
    if (gameState === 'inGame') {
      return (
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 md:gap-8">
          <div className="lg:w-2/3 bg-[var(--color-bg-secondary)] p-6 md:p-8 rounded-xl shadow-2xl border border-[var(--color-border-primary)]">
            {error && (
              <div className="mb-4 p-4 bg-[var(--color-loss-bg)] text-[var(--color-text-primary)] border border-[var(--color-loss-border)] rounded-md">
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            )}
            {gameOutcome ? (
              <GameEndScreen outcome={gameOutcome} onRestart={startGame} />
            ) : (
              <>
                {showIntro && currentScenarioIndex === 0 && (
                  <div className="mb-6 p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                    <h2 className="text-2xl font-semibold text-[var(--color-accent-secondary)] mb-3">Welcome, Founder!</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">{GAME_INTRODUCTION}</p>
                  </div>
                )}
                {currentScenario && (
                  <ScenarioCard
                    scenario={currentScenario}
                    onDecision={handleDecision}
                    scenarioNumber={currentScenarioIndex + 1}
                    totalScenarios={totalScenarios}
                  />
                )}
              </>
            )}
          </div>
          <aside className="lg:w-1/3 bg-[var(--color-bg-secondary)] p-6 rounded-xl shadow-2xl border border-[var(--color-border-primary)] self-start max-h-[calc(100vh-200px)] overflow-y-auto">
            <DecisionLog decisions={userDecisions} />
          </aside>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8" style={{ fontFamily: "var(--font-body)" }}>
      <header className="w-full max-w-5xl mb-6 md:mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-accent-primary)]" style={{ fontFamily: "var(--font-heading)" }}>{GAME_TITLE}</h1>
      </header>
      
      {isLoading && <LoadingSpinner />}
      
      <main className="w-full max-w-5xl flex-grow flex flex-col items-center justify-center">
        {renderContent()}
      </main>

      <footer className="w-full max-w-5xl mt-auto pt-8 md:pt-12 text-center text-sm text-[var(--color-text-secondary)]">
        <p>&copy; {new Date().getFullYear()} Startup Journey Game. Developed by Dhanuka Perera.</p>
      </footer>
    </div>
  );
};

export default App;
