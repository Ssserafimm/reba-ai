export interface User {
  id: string;
  name: string;
  type: 'rehab-client' | 'self-rescuer';
  values: string[];
  goals: Goal[];
  emotionScores: EmotionScore[];
  createdAt: Date;
  rehabCenter?: string;
  assignedDoctor?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: Date;
  completed: boolean;
  steps: GoalStep[];
  createdAt: Date;
}

export interface GoalStep {
  id: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  completedAt?: Date;
}

export interface EmotionScore {
  id: string;
  score: number; // 1-10
  notes: string;
  date: Date;
  triggers?: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'ai' | 'community';
  emotionalTone?: 'positive' | 'neutral' | 'negative' | 'crisis';
  timestamp: Date;
  userId?: string;
  userName?: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: 'mindfulness' | 'time-management' | 'finances' | 'relationships' | 'health';
  content: string;
  duration: number; // minutes
  completed: boolean;
  completedAt?: Date;
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  completedDates: Date[];
}