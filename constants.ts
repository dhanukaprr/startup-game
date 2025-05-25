
import { Scenario } from './types';

export const GAME_TITLE = "The Startup Journey";

export const GAME_INTRODUCTION = "You are the founder of a tech startup. Your journey begins now. Choose wisely at each crossroads, as your decisions will determine the fate of your venture.";

export const GAME_SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "Choosing a Co-founder",
    options: [
      { id: "A", text: "Partner with a friend who lacks experience but shares your vision." },
      { id: "B", text: "Partner with an experienced entrepreneur who doesn't share your vision entirely." },
    ],
  },
  {
    id: 2,
    title: "Initial Funding",
    options: [
      { id: "A", text: "Bootstrap with personal savings." },
      { id: "B", text: "Seek external investors early." },
    ],
  },
  {
    id: 3,
    title: "Product Development",
    options: [
      { id: "A", text: "Develop a minimum viable product (MVP) quickly and cheaply." },
      { id: "B", text: "Spend more time and resources developing a fully-featured product." },
    ],
  },
  {
    id: 4,
    title: "Market Research",
    options: [
      { id: "A", text: "Conduct extensive market research before launch." },
      { id: "B", text: "Launch early and iterate based on customer feedback." },
    ],
  },
  {
    id: 5,
    title: "Hiring Your First Employee",
    options: [
      { id: "A", text: "Hire a versatile generalist who can wear multiple hats." },
      { id: "B", text: "Hire a specialist for a critical role." },
    ],
  },
  {
    id: 6,
    title: "Marketing Strategy",
    options: [
      { id: "A", text: "Focus on viral marketing and social media." },
      { id: "B", text: "Invest in paid advertising." },
    ],
  },
  {
    id: 7,
    title: "Handling Competition",
    options: [
      { id: "A", text: "Differentiate aggressively from competitors." },
      { id: "B", text: "Focus on quietly building a superior product." },
    ],
  },
  {
    id: 8,
    title: "Scaling Up",
    options: [
      { id: "A", text: "Scale up quickly to capture market share." },
      { id: "B", text: "Scale up slowly and sustainably." },
    ],
  },
  {
    id: 9,
    title: "Pivoting",
    description: "After receiving customer feedback, it's clear your initial concept isn't working.",
    options: [
      { id: "A", text: "Pivot to a new product based on feedback." },
      { id: "B", text: "Refine and improve the original product." },
    ],
  },
  {
    id: 10,
    title: "Exit Strategy",
    description: "Your startup has attracted interest from bigger companies.",
    options: [
      { id: "A", text: "Sell the company." },
      { id: "B", text: "Reject the offers and aim to grow independently." },
    ],
  },
];
