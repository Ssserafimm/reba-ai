import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Goal, EmotionScore, ChatMessage, Lesson, Habit } from '../types';

interface AppState {
  currentUser: User | null;
  chatMessages: ChatMessage[];
  isInCrisis: boolean;
  currentView: string;
  communityMessages: ChatMessage[];
  lessons: Lesson[];
  habits: Habit[];
  language: 'en' | 'ru';
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_CRISIS_STATE'; payload: boolean }
  | { type: 'SET_VIEW'; payload: string }
  | { type: 'ADD_GOAL'; payload: Goal }
  | { type: 'UPDATE_GOAL'; payload: Goal }
  | { type: 'ADD_EMOTION_SCORE'; payload: EmotionScore }
  | { type: 'ADD_COMMUNITY_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_LESSON'; payload: Lesson }
  | { type: 'UPDATE_HABIT'; payload: Habit }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'ru' };

const initialState: AppState = {
  currentUser: null,
  chatMessages: [],
  isInCrisis: false,
  currentView: 'welcome',
  communityMessages: [],
  lessons: [],
  habits: [],
  language: 'en',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'SET_CRISIS_STATE':
      return { ...state, isInCrisis: action.payload };
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'ADD_GOAL':
      return {
        ...state,
        currentUser: state.currentUser ? {
          ...state.currentUser,
          goals: [...state.currentUser.goals, action.payload]
        } : state.currentUser
      };
    case 'UPDATE_GOAL':
      return {
        ...state,
        currentUser: state.currentUser ? {
          ...state.currentUser,
          goals: state.currentUser.goals.map(goal => 
            goal.id === action.payload.id ? action.payload : goal
          )
        } : state.currentUser
      };
    case 'ADD_EMOTION_SCORE':
      return {
        ...state,
        currentUser: state.currentUser ? {
          ...state.currentUser,
          emotionScores: [...state.currentUser.emotionScores, action.payload]
        } : state.currentUser
      };
    case 'ADD_COMMUNITY_MESSAGE':
      return { ...state, communityMessages: [...state.communityMessages, action.payload] };
    case 'UPDATE_LESSON':
      return { ...state, lessons: state.lessons.map(lesson => 
        lesson.id === action.payload.id ? action.payload : lesson
      )};
    case 'UPDATE_HABIT':
      return { ...state, habits: state.habits.map(habit => 
        habit.id === action.payload.id ? action.payload : habit
      )};
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}