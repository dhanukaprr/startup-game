
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { UserDecision, GeminiOutcome, Scenario } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API Key (process.env.API_KEY) is not set. API calls will fail.");
  // For a real app, you might throw an error here or ensure App.tsx handles this case by not calling the service.
  // However, instructions say "Assume this variable is pre-configured".
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Non-null assertion as per instructions

function buildPrompt(decisions: UserDecision[], allScenarios: Scenario[]): string {
  const decisionText = decisions.map(d => {
    const scenario = allScenarios.find(s => s.id === d.scenarioId);
    return `Scenario ${d.scenarioId}: ${d.scenarioTitle}\nPlayer chose option ${d.choiceId}: "${d.choiceText}"`;
  }).join('\n\n');

  return `
You are an expert startup advisor and game master. Analyze the following decisions made by a player in "The Startup Journey" game.

Game Introduction:
The player is the founder of a tech startup. Their journey begins now. Their decisions at each crossroads will determine the fate of their venture.

Player's Decisions:
${decisionText}

Winning Condition:
The player "wins" if the decisions made align with creating a sustainable, profitable business that either becomes a significant independent entity or is successfully sold if that aligns with the player's goals.

Losing Conditions (any of these can lead to a loss):
- Financial Insolvency: Running out of money due to high burn rates, inadequate funding, poor financial management.
- Market Disconnect: Product fails to meet market needs or gain traction.
- Operational Challenges: Inability to scale due to operational inefficiencies or lack of infrastructure.
- Competitive Overrun: Outcompeted by more agile or better-resourced companies.
- Legal or Regulatory Issues: Crippling legal challenges or failure to navigate regulatory requirements.
- Co-founder or Team Conflict: Internal disputes leading to operational breakdown.
- Failure to Pivot: Sticking too rigidly to an initial idea despite negative feedback or changing market conditions.

Based on the player's decisions and these conditions, provide the following in JSON format:
1.  "outcome": A string, either "win" or "loss".
2.  "overallFeedback": A paragraph summarizing the player's strategy and its likely success or failure.
3.  "reasoning": A brief explanation for the win/loss outcome, referencing specific losing conditions if applicable.
4.  "decisionFeedback": An array of objects, one for each scenario the player made a decision on. Each object should have:
    - "scenarioTitle": The title of the scenario (e.g., "Choosing a Co-founder").
    - "choiceMade": The letter of the choice made by the player (e.g., "A" or "B").
    - "choiceText": The text of the choice made by the player.
    - "feedback": A detailed explanation of the pros and cons of the player's specific choice for that scenario, and how it contributes to the overall journey. Provide constructive advice.

Example JSON structure:
{
  "outcome": "win",
  "overallFeedback": "Your balanced approach to funding and product development, combined with a strong focus on market research, sets you up for success.",
  "reasoning": "You successfully navigated key startup challenges, avoiding major pitfalls like financial insolvency or market disconnect.",
  "decisionFeedback": [
    {
      "scenarioTitle": "Choosing a Co-founder",
      "choiceMade": "A",
      "choiceText": "Partner with a friend who lacks experience but shares your vision.",
      "feedback": "While risky, a shared vision can be powerful. However, lack of experience could pose challenges later. Ensure you have a plan to mitigate this by supplementing their skills or providing mentorship."
    }
  ]
}

Ensure your response is ONLY the JSON object described above, without any surrounding text or markdown.
  `;
}

export async function getGameOutcomeAndFeedback(decisions: UserDecision[], allScenarios: Scenario[]): Promise<GeminiOutcome> {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured. Cannot fetch feedback.");
  }
  
  const prompt = buildPrompt(decisions, allScenarios);
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17", // Using the specified model
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // No thinkingConfig specified to use default (enabled for higher quality)
      },
    });

    let jsonStr = response.text.trim();
    
    // Remove markdown fences if present
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData: GeminiOutcome = JSON.parse(jsonStr);
    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    let errorMessage = "Failed to get feedback from AI. ";
    if (error instanceof Error) {
      errorMessage += error.message;
    } else {
      errorMessage += "An unknown error occurred.";
    }
    // Check for common API key related errors if possible (though Gemini SDK might obscure this)
    if (errorMessage.toLowerCase().includes("api key") || errorMessage.toLowerCase().includes("permission denied")) {
        errorMessage = "API Key invalid or missing permissions. Please check your Gemini API Key configuration.";
    }
    throw new Error(errorMessage);
  }
}
