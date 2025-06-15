import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Navigation from './Navigation';
import CrisisChat from './CrisisChat';
import GoalSetting from './GoalSetting';
import EmotionTracker from './EmotionTracker';
import CommunityChat from './CommunityChat';
import Lessons from './Lessons';
import EmergencyHelp from './EmergencyHelp';
import { Heart, Target, BarChart3, Users, BookOpen, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const language = state.language;
  const t = {
    en: {
      welcome: 'Welcome,',
      rehabMsg: 'Continue your recovery journey. You are doing important work.',
      selfMsg: 'You are showing courage by working on yourself. We are here to support you.',
      crisisChat: 'Crisis Chat',
      crisisDesc: 'Talk to AI counselor',
      goals: 'Goals',
      goalsDesc: 'Set and track goals',
      emotions: 'Emotions',
      emotionsDesc: 'Track your mood',
      community: 'Community',
      communityDesc: 'Connect with others',
      lessons: 'Lessons',
      lessonsDesc: 'Micro-lessons and habits',
      emergency: 'Emergency Help',
      emergencyDesc: 'Immediate support',
      lastGoals: 'Latest Goals',
      noGoals: 'No goals set yet. Start by creating your first goal!',
      emotionChart: 'Emotion Chart',
      noEmotions: 'Start tracking your emotions to get useful statistics.',
      completed: 'Completed',
      inProgress: 'In progress',
    },
    ru: {
      welcome: 'Добро пожаловать,',
      rehabMsg: 'Продолжай свой путь восстановления. Ты делаешь важную работу.',
      selfMsg: 'Ты проявляешь смелость, работая над собой. Мы здесь, чтобы поддержать тебя.',
      crisisChat: 'Кризисный чат',
      crisisDesc: 'Поговорить с ИИ-консультантом',
      goals: 'Цели',
      goalsDesc: 'Установить и отслеживать цели',
      emotions: 'Эмоции',
      emotionsDesc: 'Отследить настроение',
      community: 'Сообщество',
      communityDesc: 'Общение с другими',
      lessons: 'Уроки',
      lessonsDesc: 'Микро-уроки и привычки',
      emergency: 'Экстренная помощь',
      emergencyDesc: 'Немедленная поддержка',
      lastGoals: 'Последние цели',
      noGoals: 'Пока нет установленных целей. Начни с создания первой цели!',
      emotionChart: 'График эмоций',
      noEmotions: 'Начни отслеживать свои эмоции для получения полезной статистики.',
      completed: 'Выполнено',
      inProgress: 'В процессе',
    }
  };
  const tr = t[language];
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'crisis-chat':
        return <CrisisChat />;
      case 'goals':
        return <GoalSetting />;
      case 'emotions':
        return <EmotionTracker />;
      case 'community':
        return <CommunityChat />;
      case 'lessons':
        return <Lessons />;
      case 'emergency':
        return <EmergencyHelp />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
}

function DashboardOverview() {
  const { state, dispatch } = useApp();
  const { currentUser } = state;
  const language = state.language;
  const t = {
    en: {
      crisisChat: 'Crisis Chat',
      crisisDesc: 'Talk to AI counselor',
      goals: 'Goals',
      goalsDesc: 'Set and track goals',
      emotions: 'Emotions',
      emotionsDesc: 'Track your mood',
      community: 'Community',
      communityDesc: 'Connect with others',
      lessons: 'Lessons',
      lessonsDesc: 'Micro-lessons and habits',
      emergency: 'Emergency Help',
      emergencyDesc: 'Immediate support',
      lastGoals: 'Latest Goals',
      noGoals: 'No goals set yet. Start by creating your first goal!',
      emotionChart: 'Emotion Chart',
      noEmotions: 'Start tracking your emotions to get useful statistics.',
      completed: 'Completed',
      inProgress: 'In progress',
      welcome: 'Welcome,',
      rehabMsg: 'Continue your recovery journey. You are doing important work.',
      selfMsg: 'You are showing courage by working on yourself. We are here to support you.',
    },
    ru: {
      crisisChat: 'Кризисный чат',
      crisisDesc: 'Поговорить с ИИ-консультантом',
      goals: 'Цели',
      goalsDesc: 'Установить и отслеживать цели',
      emotions: 'Эмоции',
      emotionsDesc: 'Отследить настроение',
      community: 'Сообщество',
      communityDesc: 'Общение с другими',
      lessons: 'Уроки',
      lessonsDesc: 'Микро-уроки и привычки',
      emergency: 'Экстренная помощь',
      emergencyDesc: 'Немедленная поддержка',
      lastGoals: 'Последние цели',
      noGoals: 'Пока нет установленных целей. Начни с создания первой цели!',
      emotionChart: 'График эмоций',
      noEmotions: 'Начни отслеживать свои эмоции для получения полезной статистики.',
      completed: 'Выполнено',
      inProgress: 'В процессе',
      welcome: 'Добро пожаловать,',
      rehabMsg: 'Продолжай свой путь восстановления. Ты делаешь важную работу.',
      selfMsg: 'Ты проявляешь смелость, работая над собой. Мы здесь, чтобы поддержать тебя.',
    }
  };
  const tr = t[language];

  const quickActions = [
    { id: 'crisis-chat', icon: Heart, title: tr.crisisChat, description: tr.crisisDesc, color: 'text-red-600 bg-red-100' },
    { id: 'goals', icon: Target, title: tr.goals, description: tr.goalsDesc, color: 'text-blue-600 bg-blue-100' },
    { id: 'emotions', icon: BarChart3, title: tr.emotions, description: tr.emotionsDesc, color: 'text-green-600 bg-green-100' },
    { id: 'community', icon: Users, title: tr.community, description: tr.communityDesc, color: 'text-purple-600 bg-purple-100' },
    { id: 'lessons', icon: BookOpen, title: tr.lessons, description: tr.lessonsDesc, color: 'text-orange-600 bg-orange-100' },
  ];

  if (currentUser?.type === 'self-rescuer') {
    quickActions.push({
      id: 'emergency', 
      icon: AlertTriangle, 
      title: tr.emergency, 
      description: tr.emergencyDesc, 
      color: 'text-red-600 bg-red-100'
    });
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {tr.welcome} {currentUser?.name}!
        </h1>
        <p className="text-gray-600">
          {currentUser?.type === 'rehab-client' 
            ? tr.rehabMsg
            : tr.selfMsg
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <QuickActionCard key={action.id} action={action} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{tr.lastGoals}</h3>
          {currentUser?.goals.length === 0 ? (
            <p className="text-gray-500">{tr.noGoals}</p>
          ) : (
            <div className="space-y-3">
              {currentUser?.goals.slice(0, 3).map((goal) => (
                <div
                  key={goal.id}
                  className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => dispatch({ type: 'SET_VIEW', payload: 'goals' })}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{goal.title}</h4>
                    <p className="text-sm text-gray-500">{goal.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    goal.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {goal.completed ? tr.completed : tr.inProgress}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{tr.emotionChart}</h3>
          {currentUser?.emotionScores.length === 0 ? (
            <p className="text-gray-500">{tr.noEmotions}</p>
          ) : (
            <div className="space-y-3">
              {currentUser?.emotionScores.slice(-5).map((score, index) => (
                <div key={score.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {score.date.toLocaleDateString()}
                  </span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${score.score * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{score.score}/10</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ action }: { action: any }) {
  const { dispatch } = useApp();
  
  const handleClick = () => {
    dispatch({ type: 'SET_VIEW', payload: action.id });
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <action.icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
      <p className="text-gray-600 text-sm">{action.description}</p>
    </div>
  );
}