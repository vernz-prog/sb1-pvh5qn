import { useThemeStore } from '../store/themeStore';
import { ThemeColors } from '../types/theme';

const lightTheme: ThemeColors = {
  background: 'bg-gray-100',
  surface: 'bg-white',
  text: 'text-gray-900',
  textSecondary: 'text-gray-500',
  primary: 'bg-green-500',
  border: 'border-gray-200',
  hover: 'hover:bg-gray-100',
};

const darkTheme: ThemeColors = {
  background: 'bg-gray-900',
  surface: 'bg-gray-800',
  text: 'text-gray-100',
  textSecondary: 'text-gray-400',
  primary: 'bg-green-600',
  border: 'border-gray-700',
  hover: 'hover:bg-gray-700',
};

export const useThemeColors = () => {
  const { theme } = useThemeStore();
  return theme === 'light' ? lightTheme : darkTheme;
};