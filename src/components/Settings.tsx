import React, { useState } from 'react';
import { X, Sun, Moon } from 'lucide-react';
import { useConfigStore } from '../store/configStore';
import { useThemeStore } from '../store/themeStore';
import { useThemeColors } from '../hooks/useThemeColors';
import { Theme } from '../types/theme';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const colors = useThemeColors();
  const { config, setConfig } = useConfigStore();
  const { theme, setTheme } = useThemeStore();
  const [idInstance, setIdInstance] = useState(config?.idInstance || '');
  const [apiTokenInstance, setApiTokenInstance] = useState(config?.apiTokenInstance || '');

  const handleSave = () => {
    if (idInstance && apiTokenInstance) {
      setConfig({ idInstance, apiTokenInstance });
      onClose();
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${colors.surface} rounded-lg p-6 w-96 ${colors.text}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className={`p-1 ${colors.hover} rounded`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Theme</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex-1 p-3 rounded-lg border ${
                  theme === 'light'
                    ? 'border-green-500'
                    : `border-${colors.border}`
                } ${colors.hover} transition-colors flex items-center justify-center space-x-2`}
              >
                <Sun className="w-5 h-5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex-1 p-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'border-green-500'
                    : `border-${colors.border}`
                } ${colors.hover} transition-colors flex items-center justify-center space-x-2`}
              >
                <Moon className="w-5 h-5" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Green API Configuration</h3>
            <div>
              <label className={`block text-sm font-medium ${colors.textSecondary} mb-1`}>
                ID Instance
              </label>
              <input
                type="text"
                value={idInstance}
                onChange={(e) => setIdInstance(e.target.value)}
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent ${colors.surface} ${colors.text} ${colors.border}`}
                placeholder="Enter your ID Instance"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${colors.textSecondary} mb-1`}>
                API Token Instance
              </label>
              <input
                type="text"
                value={apiTokenInstance}
                onChange={(e) => setApiTokenInstance(e.target.value)}
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent ${colors.surface} ${colors.text} ${colors.border}`}
                placeholder="Enter your API Token Instance"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={!idInstance || !apiTokenInstance}
            className={`w-full ${colors.primary} text-white py-2 rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};