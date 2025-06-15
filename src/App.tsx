import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import WelcomeScreen from './components/WelcomeScreen';
import InitialCheck from './components/InitialCheck';
import Dashboard from './components/Dashboard';

function AppContent() {
  const { state } = useApp();

  const renderCurrentView = () => {
    if (!state.currentUser) {
      return <WelcomeScreen />;
    }

    switch (state.currentView) {
      case 'initial-check':
        return <InitialCheck />;
      case 'dashboard':
      case 'overview':
      case 'crisis-chat':
      case 'goals':
      case 'emotions':
      case 'community':
      case 'lessons':
      case 'emergency':
        return <Dashboard />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentView()}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;