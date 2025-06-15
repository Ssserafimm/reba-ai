import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Heart, 
  Target, 
  BarChart3, 
  Users, 
  BookOpen, 
  AlertTriangle,
  LogOut
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const { state, dispatch } = useApp();
  const { currentUser } = state;
  const language = state.language;
  const t = {
    en: {
      home: 'Home',
      crisis: 'Crisis Chat',
      goals: 'Goals',
      emotions: 'Emotions',
      community: 'Community',
      lessons: 'Lessons',
      emergency: 'Emergency Help',
      logout: 'Logout',
    },
    ru: {
      home: 'Главная',
      crisis: 'Кризисный чат',
      goals: 'Цели',
      emotions: 'Эмоции',
      community: 'Сообщество',
      lessons: 'Уроки',
      emergency: 'Экстренная помощь',
      logout: 'Выйти',
    }
  };
  const tr = t[language];

  const navigationItems = [
    { id: 'overview', icon: Home, label: tr.home },
    { id: 'crisis-chat', icon: Heart, label: tr.crisis },
    { id: 'goals', icon: Target, label: tr.goals },
    { id: 'emotions', icon: BarChart3, label: tr.emotions },
    { id: 'community', icon: Users, label: tr.community },
    { id: 'lessons', icon: BookOpen, label: tr.lessons },
  ];

  if (currentUser?.type === 'self-rescuer') {
    navigationItems.push({ id: 'emergency', icon: AlertTriangle, label: tr.emergency });
  }

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null as any });
    dispatch({ type: 'SET_VIEW', payload: 'welcome' });
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-blue-600 mr-3" />
            <span className="text-xl font-bold text-gray-900">Reba AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {currentUser?.name}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {tr.logout}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex overflow-x-auto py-2 px-4 space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4 mb-1" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}