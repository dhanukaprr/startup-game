import { ColorScheme, ThemeColors } from './types';

const COMMON_FONTS = {
  '--font-body': "'Inter', sans-serif",
  '--font-heading': "'Orbitron', sans-serif",
};

const DEFAULT_COLORS: ThemeColors = {
  ...COMMON_FONTS,
  '--color-bg-primary': '#0F172A', // slate-900
  '--color-bg-secondary': '#1E293B', // slate-800
  '--color-bg-tertiary': '#334155', // slate-700
  '--color-bg-tertiary-hover': '#475569', // slate-600
  '--color-text-primary': '#F1F5F9', // slate-100
  '--color-text-secondary': '#94A3B8', // slate-400
  '--color-accent-primary': '#38BDF8', // sky-400
  '--color-accent-primary-hover': '#0EA5E9', // sky-500
  '--color-accent-secondary': '#7DD3FC', // sky-300
  '--color-border-primary': '#334155', // slate-700
  '--color-border-secondary': '#475569', // slate-600 for accordion items
  '--color-button-text': '#FFFFFF',
  '--color-button-text-on-accent': '#0F172A',
  '--color-win': '#4ADE80', // green-400
  '--color-loss': '#F87171', // red-400
  '--color-win-bg': 'rgba(74, 222, 128, 0.2)',
  '--color-loss-bg': 'rgba(248, 113, 113, 0.2)',
  '--color-win-border': '#22C55E', // green-500
  '--color-loss-border': '#EF4444', // red-500
  '--color-scrollbar-track': '#1E293B',
  '--color-scrollbar-thumb': '#334155',
  '--color-scrollbar-thumb-hover': '#475569',
};

export const DEFAULT_THEME_ID = 'default';

export const THEMES: ColorScheme[] = [
  {
    id: DEFAULT_THEME_ID,
    name: 'Default (Slate & Sky)',
    settings: DEFAULT_COLORS,
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    settings: {
      ...COMMON_FONTS,
      '--color-bg-primary': '#1A092A',
      '--color-bg-secondary': '#2A0F3F',
      '--color-bg-tertiary': '#3C1F50',
      '--color-bg-tertiary-hover': '#502A6A',
      '--color-text-primary': '#F0E6FF',
      '--color-text-secondary': '#BCA0DC',
      '--color-accent-primary': '#FF00FF', // Magenta
      '--color-accent-primary-hover': '#E600E6',
      '--color-accent-secondary': '#00FFFF', // Cyan
      '--color-border-primary': '#3C1F50',
      '--color-border-secondary': '#502A6A',
      '--color-button-text': '#FFFFFF',
      '--color-button-text-on-accent': '#1A092A',
      '--color-win': '#00FF7F',
      '--color-loss': '#FF4500',
      '--color-win-bg': 'rgba(0, 255, 127, 0.2)',
      '--color-loss-bg': 'rgba(255, 69, 0, 0.2)',
      '--color-win-border': '#00E66B',
      '--color-loss-border': '#E63E00',
      '--color-scrollbar-track': '#2A0F3F',
      '--color-scrollbar-thumb': '#3C1F50',
      '--color-scrollbar-thumb-hover': '#502A6A',
    },
  },
  {
    id: 'forest-harmony',
    name: 'Forest Harmony',
    settings: {
      ...COMMON_FONTS,
      '--color-bg-primary': '#1A2E20',
      '--color-bg-secondary': '#2A3F30',
      '--color-bg-tertiary': '#3D5240',
      '--color-bg-tertiary-hover': '#526F50',
      '--color-text-primary': '#E6F0E8',
      '--color-text-secondary': '#A0BCA5',
      '--color-accent-primary': '#9AE6B4', // Light Mint
      '--color-accent-primary-hover': '#87D0A0',
      '--color-accent-secondary': '#FBD38D', // Soft Orange
      '--color-border-primary': '#3D5240',
      '--color-border-secondary': '#526F50',
      '--color-button-text': '#1A2E20', // Dark text on light accent
      '--color-button-text-on-accent': '#1A2E20',
      '--color-win': '#68D391',
      '--color-loss': '#E53E3E',
      '--color-win-bg': 'rgba(104, 211, 145, 0.2)',
      '--color-loss-bg': 'rgba(229, 62, 62, 0.2)',
      '--color-win-border': '#55B37F',
      '--color-loss-border': '#C53030',
      '--color-scrollbar-track': '#2A3F30',
      '--color-scrollbar-thumb': '#3D5240',
      '--color-scrollbar-thumb-hover': '#526F50',
    },
  },
  {
    id: 'oceanic-depth',
    name: 'Oceanic Depth',
    settings: {
      ...COMMON_FONTS,
      '--color-bg-primary': '#0B2A40',
      '--color-bg-secondary': '#103D59',
      '--color-bg-tertiary': '#1E4966',
      '--color-bg-tertiary-hover': '#2A5B7F',
      '--color-text-primary': '#E0F7FA',
      '--color-text-secondary': '#A0D3E8',
      '--color-accent-primary': '#FF8C69', // Coral
      '--color-accent-primary-hover': '#E67350',
      '--color-accent-secondary': '#F0E68C', // Khaki
      '--color-border-primary': '#1E4966',
      '--color-border-secondary': '#2A5B7F',
      '--color-button-text': '#FFFFFF',
      '--color-button-text-on-accent': '#0B2A40',
      '--color-win': '#34D399',
      '--color-loss': '#F472B6',
      '--color-win-bg': 'rgba(52, 211, 153, 0.2)',
      '--color-loss-bg': 'rgba(244, 114, 182, 0.2)',
      '--color-win-border': '#27B886',
      '--color-loss-border': '#D85CA0',
      '--color-scrollbar-track': '#103D59',
      '--color-scrollbar-thumb': '#1E4966',
      '--color-scrollbar-thumb-hover': '#2A5B7F',
    },
  },
];
