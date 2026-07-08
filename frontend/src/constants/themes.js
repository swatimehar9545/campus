import { COLORS } from './colors';

export const THEMES = {
  light: {
    name: 'Light Theme',
    mode: 'light',
    colors: {
      bg: COLORS.background.light,
      surface: COLORS.surface.light,
      text: COLORS.text.light,
      primary: COLORS.primary.DEFAULT,
    }
  },
  dark: {
    name: 'Dark Theme',
    mode: 'dark',
    colors: {
      bg: COLORS.background.dark,
      surface: COLORS.surface.dark,
      text: COLORS.text.dark,
      primary: COLORS.primary.DEFAULT,
    }
  },
  neon: {
    name: 'Neon Cyberpunk',
    mode: 'dark',
    colors: {
      bg: '#000000',
      surface: '#111111',
      text: '#ffffff',
      primary: '#00ff00',
    }
  }
};
