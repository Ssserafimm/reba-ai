import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, TrendingUp, Calendar, Plus } from 'lucide-react';
import { EmotionScore } from '../types';

const t = {
  en: {
    title: "Emotion Tracking",
    subtitle: "Daily mood and wellbeing rating",
    addEntry: "Add Entry",
    avgScore: "Average Score",
    trend: "Trend",
    entries: "Entries",
    howFeel: "How do you feel today?",
    moodLabel: "Mood rating (1-10)",
    notes: "Notes (optional)",
    notesPlaceholder: "What affected your mood today?",
    triggers: "Triggers (what affected your mood)",
    save: "Save",
    cancel: "Cancel",
    lastEntries: "Recent Entries",
    noEntries: "No entries yet. Start tracking your emotions to get useful statistics.",
    triggersList: [
      "Stress", "Loneliness", "Anxiety", "Fatigue", "Conflict",
      "Finances", "Work", "Relationships", "Health", "Family"
    ]
  },
  ru: {
    title: "Отслеживание эмоций",
    subtitle: "Ежедневная оценка настроения и самочувствия",
    addEntry: "Добавить запись",
    avgScore: "Средний балл",
    trend: "Тенденция",
    entries: "Записей",
    howFeel: "Как ты себя чувствуешь сегодня?",
    moodLabel: "Оценка настроения (1-10)",
    notes: "Заметки (необязательно)",
    notesPlaceholder: "Что повлияло на твое настроение сегодня?",
    triggers: "Триггеры (что повлияло на настроение)",
    save: "Сохранить",
    cancel: "Отмена",
    lastEntries: "Последние записи",
    noEntries: "Пока нет записей. Начни отслеживать свои эмоции для получения полезной статистики.",
    triggersList: [
      "Стресс", "Одиночество", "Тревога", "Усталость", "Конфликт",
      "Финансы", "Работа", "Отношения", "Здоровье", "Семья"
    ]
  }
};

export default function EmotionTracker() {
  const { state, dispatch } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newScore, setNewScore] = useState({
    score: 5,
    notes: '',
    triggers: [] as string[]
  });

  const tr = t[state.language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emotionScore: EmotionScore = {
      id: crypto.randomUUID(),
      score: newScore.score,
      notes: newScore.notes.trim(),
      date: new Date(),
      triggers: newScore.triggers.filter(t => t.trim())
    };

    dispatch({ type: 'ADD_EMOTION_SCORE', payload: emotionScore });
    setNewScore({ score: 5, notes: '', triggers: [] });
    setShowAddForm(false);
  };

  const getScoreColor = (score: number) => {
    if (score <= 3) return 'text-red-600 bg-red-100';
    if (score <= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getScoreEmoji = (score: number) => {
    if (score <= 2) return '😢';
    if (score <= 4) return '😔';
    if (score <= 6) return '😐';
    if (score <= 8) return '🙂';
    return '😊';
  };

  const getAverageScore = () => {
    const scores = state.currentUser?.emotionScores || [];
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((sum, score) => sum + score.score, 0) / scores.length * 10) / 10;
  };

  const getTrendDirection = () => {
    const scores = state.currentUser?.emotionScores || [];
    if (scores.length < 2) return 'neutral';
    
    const recent = scores.slice(-3);
    const older = scores.slice(-6, -3);
    
    if (recent.length === 0 || older.length === 0) return 'neutral';
    
    const recentAvg = recent.reduce((sum, s) => sum + s.score, 0) / recent.length;
    const olderAvg = older.reduce((sum, s) => sum + s.score, 0) / older.length;
    
    if (recentAvg > olderAvg + 0.5) return 'up';
    if (recentAvg < olderAvg - 0.5) return 'down';
    return 'neutral';
  };

  const commonTriggers = [
    'Стресс', 'Одиночество', 'Тревога', 'Усталость', 'Конфликт',
    'Финансы', 'Работа', 'Отношения', 'Здоровье', 'Семья'
  ];

  const addTrigger = (trigger: string) => {
    if (!newScore.triggers.includes(trigger)) {
      setNewScore({
        ...newScore,
        triggers: [...newScore.triggers, trigger]
      });
    }
  };

  const removeTrigger = (trigger: string) => {
    setNewScore({
      ...newScore,
      triggers: newScore.triggers.filter(t => t !== trigger)
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{tr.title}</h2>
              <p className="text-gray-600">{tr.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            {tr.addEntry}
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{tr.avgScore}</p>
                <p className="text-2xl font-bold text-gray-900">{getAverageScore()}/10</p>
              </div>
              <div className="text-2xl">{getScoreEmoji(getAverageScore())}</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{tr.trend}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getTrendDirection() === 'up' ? '↗️' : getTrendDirection() === 'down' ? '↘️' : '→'}
                </p>
              </div>
              <TrendingUp className={`w-6 h-6 ${
                getTrendDirection() === 'up' ? 'text-green-600' : 
                getTrendDirection() === 'down' ? 'text-red-600' : 'text-gray-600'
              }`} />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{tr.entries}</p>
                <p className="text-2xl font-bold text-gray-900">{state.currentUser?.emotionScores.length || 0}</p>
              </div>
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{tr.howFeel}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {tr.moodLabel}
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newScore.score}
                    onChange={(e) => setNewScore({ ...newScore, score: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getScoreEmoji(newScore.score)}</span>
                    <span className="text-lg font-bold">{newScore.score}/10</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  {tr.notes}
                </label>
                <textarea
                  id="notes"
                  value={newScore.notes}
                  onChange={(e) => setNewScore({ ...newScore, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  rows={3}
                  placeholder={tr.notesPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {tr.triggers}
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tr.triggersList.map((trigger) => (
                    <button
                      key={trigger}
                      type="button"
                      onClick={() => addTrigger(trigger)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        newScore.triggers.includes(trigger)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {trigger}
                    </button>
                  ))}
                </div>
                {newScore.triggers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newScore.triggers.map((trigger) => (
                      <span
                        key={trigger}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {trigger}
                        <button
                          type="button"
                          onClick={() => removeTrigger(trigger)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {tr.save}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {tr.cancel}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Recent Scores */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{tr.lastEntries}</h3>
        {state.currentUser?.emotionScores.length === 0 ? (
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {tr.noEntries}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {state.currentUser?.emotionScores
              .slice()
              .reverse()
              .slice(0, 10)
              .map((score) => (
                <div key={score.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="text-2xl">{getScoreEmoji(score.score)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(score.score)}`}>
                        {score.score}/10
                      </span>
                      <span className="text-sm text-gray-500">
                        {score.date.toLocaleDateString()} в {score.date.toLocaleTimeString()}
                      </span>
                    </div>
                    {score.notes && (
                      <p className="text-gray-700 mb-2">{score.notes}</p>
                    )}
                    {score.triggers && score.triggers.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {score.triggers.map((trigger, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                          >
                            {trigger}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}