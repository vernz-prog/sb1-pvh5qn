import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GreenAPIConfig } from '../types/chat';

interface ConfigStore {
  config: GreenAPIConfig | null;
  setConfig: (config: GreenAPIConfig) => void;
  clearConfig: () => void;
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      config: null,
      setConfig: (config) => set({ config }),
      clearConfig: () => set({ config: null }),
    }),
    {
      name: 'whatsapp-config',
    }
  )
);