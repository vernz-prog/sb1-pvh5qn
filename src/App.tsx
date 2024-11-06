import React from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { useThemeColors } from './hooks/useThemeColors';

function App() {
  const colors = useThemeColors();

  return (
    <div className={`flex w-full h-screen ${colors.background}`}>
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;