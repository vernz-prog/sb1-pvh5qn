import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme } from '../types/theme';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'whatsapp-theme',
    }
  )
);