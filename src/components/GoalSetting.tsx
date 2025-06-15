import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Target, Plus, CheckCircle, Clock, Calendar } from 'lucide-react';
import { Goal, GoalStep } from '../types';

const t = {
  en: {
    title: "Goal Setting",
    subtitle: "SMART goals with a step-by-step achievement plan",
    newGoal: "New Goal",
    createNewGoal: "Create New Goal",
    goalName: "Goal Name",
    goalNamePlaceholder: "E.g. Improve physical health",
    description: "Description",
    descriptionPlaceholder: "More details about what you want to achieve...",
    category: "Category",
    targetDate: "Target Date",
    create: "Create Goal",
    cancel: "Cancel",
    noGoals: "No goals yet",
    noGoalsDesc: "Start your recovery journey by setting your first SMART goal",
    createFirstGoal: "Create First Goal",
    progress: "Progress",
    plan: "7-day action plan:",
    until: "Until",
    categories: {
      personal: "Personal Development",
      health: "Health",
      relationships: "Relationships",
      career: "Career",
      education: "Education"
    }
  },
  ru: {
    title: "Постановка целей",
    subtitle: "SMART-цели с пошаговым планом достижения",
    newGoal: "Новая цель",
    createNewGoal: "Создать новую цель",
    goalName: "Название цели",
    goalNamePlaceholder: "Например: Улучшить физическое здоровье",
    description: "Описание",
    descriptionPlaceholder: "Подробнее о том, что ты хочешь достичь...",
    category: "Категория",
    targetDate: "Целевая дата",
    create: "Создать цель",
    cancel: "Отмена",
    noGoals: "Пока нет целей",
    noGoalsDesc: "Начни свой путь к выздоровлению с постановки первой SMART-цели",
    createFirstGoal: "Создать первую цель",
    progress: "Прогресс",
    plan: "7-дневный план действий:",
    until: "До",
    categories: {
      personal: "Личное развитие",
      health: "Здоровье",
      relationships: "Отношения",
      career: "Карьера",
      education: "Образование"
    }
  }
};

export default function GoalSetting() {
  const { state, dispatch } = useApp();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'personal',
    targetDate: ''
  });

  const tr = t[state.language];

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title.trim()) return;

    // Generate SMART goal steps
    const generateSteps = (title: string, category: string): GoalStep[] => {
      const baseSteps = [
        { description: 'Определить конкретные действия для достижения цели', dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
        { description: 'Разбить цель на еженедельные задачи', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
        { description: 'Найти поддержку или ресурсы для достижения цели', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
        { description: 'Создать план действий на первую неделю', dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) },
        { description: 'Начать выполнение запланированных действий', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        { description: 'Провести первую оценку прогресса', dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
        { description: 'Скорректировать план при необходимости', dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) }
      ];

      return baseSteps.map(step => ({
        id: crypto.randomUUID(),
        description: step.description,
        completed: false,
        dueDate: step.dueDate
      }));
    };

    const goal: Goal = {
      id: crypto.randomUUID(),
      title: newGoal.title.trim(),
      description: newGoal.description.trim(),
      category: newGoal.category,
      targetDate: new Date(newGoal.targetDate),
      completed: false,
      steps: generateSteps(newGoal.title, newGoal.category),
      createdAt: new Date()
    };

    dispatch({ type: 'ADD_GOAL', payload: goal });
    setNewGoal({ title: '', description: '', category: 'personal', targetDate: '' });
    setShowCreateForm(false);
  };

  const toggleStepCompleted = (goalId: string, stepId: string) => {
    const goal = state.currentUser?.goals.find(g => g.id === goalId);
    if (!goal) return;

    const updatedSteps = goal.steps.map(step => 
      step.id === stepId 
        ? { ...step, completed: !step.completed, completedAt: !step.completed ? new Date() : undefined }
        : step
    );

    const updatedGoal = {
      ...goal,
      steps: updatedSteps,
      completed: updatedSteps.every(step => step.completed)
    };

    dispatch({ type: 'UPDATE_GOAL', payload: updatedGoal });
  };

  const getGoalProgress = (goal: Goal) => {
    const completedSteps = goal.steps.filter(step => step.completed).length;
    return Math.round((completedSteps / goal.steps.length) * 100);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      personal: 'bg-blue-100 text-blue-800',
      health: 'bg-green-100 text-green-800',
      relationships: 'bg-purple-100 text-purple-800',
      career: 'bg-orange-100 text-orange-800',
      education: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{tr.title}</h2>
              <p className="text-gray-600">{tr.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            {tr.newGoal}
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{tr.createNewGoal}</h3>
            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  {tr.goalName}
                </label>
                <input
                  type="text"
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder={tr.goalNamePlaceholder}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  {tr.description}
                </label>
                <textarea
                  id="description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  rows={3}
                  placeholder={tr.descriptionPlaceholder}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    {tr.category}
                  </label>
                  <select
                    id="category"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="personal">{tr.categories.personal}</option>
                    <option value="health">{tr.categories.health}</option>
                    <option value="relationships">{tr.categories.relationships}</option>
                    <option value="career">{tr.categories.career}</option>
                    <option value="education">{tr.categories.education}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-2">
                    {tr.targetDate}
                  </label>
                  <input
                    type="date"
                    id="targetDate"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {tr.create}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {tr.cancel}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {state.currentUser?.goals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 mr-3">{goal.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                  </span>
                </div>
                {goal.description && (
                  <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                )}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  До {goal.targetDate.toLocaleDateString()}
                </div>
              </div>
              {goal.completed && (
                <CheckCircle className="w-6 h-6 text-green-600" />
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>{tr.progress}</span>
                <span>{getGoalProgress(goal)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getGoalProgress(goal)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900 mb-3">{tr.plan}</h4>
              {goal.steps.slice(0, 7).map((step) => (
                <div key={step.id} className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleStepCompleted(goal.id, step.id)}
                    className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      step.completed
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {step.completed && <CheckCircle className="w-3 h-3" />}
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm ${step.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {step.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.dueDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {state.currentUser?.goals.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{tr.noGoals}</h3>
          <p className="text-gray-600 mb-6">
            {tr.noGoalsDesc}
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {tr.createFirstGoal}
          </button>
        </div>
      )}
    </div>
  );
}