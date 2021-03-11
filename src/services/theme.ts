import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

const grid = 16;

export const constants = {
  grid,
  smallGrid: grid / 2,
  bigGrid: grid * 2,
  darkOverlay: 'rgba(0,0,0,0.3)',
};

export const darkTheme: Theme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    border: '#393939',
    card: '#262626',
    notification: '#e24545',
    primary: '#e24545',
    text: '#cccccc',
  },
};

export const lightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#f2f2f2',
    border: '#d8d8d8',
    card: '#ffffff',
    notification: '#e24545',
    primary: '#e24545',
    text: '#1c1c1e',
  },
};
