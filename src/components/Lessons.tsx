import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Play, CheckCircle, Clock, Target } from 'lucide-react';
import { Lesson, Habit } from '../types';

const t = {
  en: {
    title: "Micro-lessons & Habits",
    subtitle: "Short lessons and daily habits to support recovery",
    lessonsTab: "Lessons",
    habitsTab: "Habits",
    completed: "Completed",
    startLesson: "Start Lesson",
    finishLesson: "Finish Lesson",
    duration: "min",
    streak: "days in a row",
    frequency: "Frequency",
    daily: "Daily",
    weekly: "Weekly",
    done: "Done",
    category: {
      mindfulness: "Mindfulness",
      "time-management": "Time Management",
      finances: "Finances",
      relationships: "Relationships",
      health: "Health"
    },
    habits: [
      { title: "Morning Meditation", description: "5-10 minutes of mindful breathing after waking up" },
      { title: "Gratitude Journal", description: "Write down 3 things you're grateful for today" },
      { title: "Physical Activity", description: "At least 30 minutes of movement (walk, exercise, sport)" },
      { title: "Read a Book", description: "Read at least 10 pages of useful literature" }
    ]
  },
  ru: {
    title: "Микро-уроки и привычки",
    subtitle: "Короткие уроки и ежедневные привычки для поддержки выздоровления",
    lessonsTab: "Уроки",
    habitsTab: "Привычки",
    completed: "Пройдено",
    startLesson: "Начать урок",
    finishLesson: "Завершить урок",
    duration: "мин",
    streak: "дней подряд",
    frequency: "Частота",
    daily: "Ежедневно",
    weekly: "Еженедельно",
    done: "Выполнено",
    category: {
      mindfulness: "Осознанность",
      "time-management": "Тайм-менеджмент",
      finances: "Финансы",
      relationships: "Отношения",
      health: "Здоровье"
    },
    habits: [
      { title: "Утренняя медитация", description: "5-10 минут осознанного дыхания после пробуждения" },
      { title: "Дневник благодарности", description: "Записать 3 вещи, за которые благодарен сегодня" },
      { title: "Физическая активность", description: "Минимум 30 минут движения (прогулка, зарядка, спорт)" },
      { title: "Чтение книги", description: "Прочитать минимум 10 страниц полезной литературы" }
    ]
  }
};

export default function Lessons() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'lessons' | 'habits'>('lessons');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const tr = t[state.language];

  // Initialize lessons on first load
  useEffect(() => {
    if (state.lessons.length === 0) {
      const initialLessons: Lesson[] = [
        {
          id: '1',
          title: 'Основы осознанности',
          category: 'mindfulness',
          content: `
            # Основы осознанности

            Осознанность - это практика полного присутствия в настоящем моменте без осуждения.

            ## Что такое осознанность?
            - Состояние активного, открытого внимания к настоящему
            - Наблюдение за своими мыслями и чувствами без попыток их изменить
            - Принятие момента таким, какой он есть

            ## Простое упражнение "5-4-3-2-1"
            1. **5 вещей**, которые ты видишь
            2. **4 вещи**, которые ты слышишь  
            3. **3 вещи**, которые ты чувствуешь телом
            4. **2 запаха**, которые ты ощущаешь
            5. **1 вкус** во рту

            ## Практика на сегодня
            Выбери один момент в день (например, утренний кофе) и проведи его в полной осознанности.

            **Помни:** Осознанность - это не попытка остановить мысли, а умение их наблюдать.
          `,
          duration: 10,
          completed: false
        },
        {
          id: '2',
          title: 'Управление временем при выздоровлении',
          category: 'time-management',
          content: `
            # Управление временем при выздоровлении

            Структурированный день помогает избежать скуки и негативных триггеров.

            ## Принципы здорового планирования
            - **Структура без жёсткости** - план должен быть гибким
            - **Баланс активности и отдыха**
            - **Приоритет восстановлению**

            ## Техника "Энергетического планирования"
            1. **Утро** - время для важных дел (высокая энергия)
            2. **День** - социальные активности и работа
            3. **Вечер** - расслабление и подготовка ко сну

            ## Создай свой идеальный день
            - 7:00 - Подъём и утренняя рутина
            - 8:00 - Завтрак и планирование дня
            - 9:00-12:00 - Продуктивная работа
            - 12:00-13:00 - Обед и отдых
            - 13:00-17:00 - Основные дела дня
            - 17:00-19:00 - Физическая активность
            - 19:00-21:00 - Ужин и социальное время
            - 21:00-22:00 - Подготовка ко сну

            **Задание:** Создай свой распорядок дня с учётом твоих потребностей в восстановлении.
          `,
          duration: 15,
          completed: false
        },
        {
          id: '3',
          title: 'Основы финансовой грамотности',
          category: 'finances',
          content: `
            # Основы финансовой грамотности

            Финансовая стабильность - важная часть общего благополучия в выздоровлении.

            ## Простые принципы
            1. **Доходы > Расходы** - основное правило
            2. **Сначала себе** - откладывай 10% от дохода
            3. **Экстренный фонд** - 3-6 месяцев расходов

            ## Составление бюджета 50/30/20
            - **50%** - обязательные расходы (жильё, еда, транспорт)
            - **30%** - желания (развлечения, хобби)
            - **20%** - сбережения и погашение долгов

            ## Отслеживание расходов
            - Записывай все траты в течение недели
            - Используй приложения для учёта финансов
            - Анализируй, на что тратишь больше всего

            ## Постановка финансовых целей
            - **Краткосрочные** (1-3 месяца): экстренный фонд $1000
            - **Среднесрочные** (6-12 месяцев): погашение долгов
            - **Долгосрочные** (1+ год): крупные покупки, инвестиции

            **Действие:** Запиши все свои расходы за завтрашний день.
          `,
          duration: 12,
          completed: false
        }
      ];

      initialLessons.forEach(lesson => {
        dispatch({ type: 'UPDATE_LESSON', payload: lesson });
      });
    }
  }, []);

  // Initialize habits
  useEffect(() => {
    if (state.habits.length === 0) {
      const initialHabits: Habit[] = [
        {
          id: '1',
          title: 'Утренняя медитация',
          description: '5-10 минут осознанного дыхания после пробуждения',
          frequency: 'daily',
          streak: 0,
          completedDates: []
        },
        {
          id: '2',
          title: 'Дневник благодарности',
          description: 'Записать 3 вещи, за которые благодарен сегодня',
          frequency: 'daily',
          streak: 0,
          completedDates: []
        },
        {
          id: '3',
          title: 'Физическая активность',
          description: 'Минимум 30 минут движения (прогулка, зарядка, спорт)',
          frequency: 'daily',
          streak: 0,
          completedDates: []
        },
        {
          id: '4',
          title: 'Чтение книги',
          description: 'Прочитать минимум 10 страниц полезной литературы',
          frequency: 'daily',
          streak: 0,
          completedDates: []
        }
      ];

      initialHabits.forEach(habit => {
        dispatch({ type: 'UPDATE_HABIT', payload: habit });
      });
    }
  }, []);

  const completeLesson = (lessonId: string) => {
    const lesson = state.lessons.find(l => l.id === lessonId);
    if (lesson) {
      const updatedLesson = {
        ...lesson,
        completed: true,
        completedAt: new Date()
      };
      dispatch({ type: 'UPDATE_LESSON', payload: updatedLesson });
      setSelectedLesson(null);
    }
  };

  const toggleHabitComplete = (habitId: string) => {
    const habit = state.habits.find(h => h.id === habitId);
    if (!habit) return;

    const today = new Date().toDateString();
    const alreadyCompletedToday = habit.completedDates.some(date => 
      date.toDateString() === today
    );

    let updatedHabit;
    if (alreadyCompletedToday) {
      // Remove today's completion
      updatedHabit = {
        ...habit,
        completedDates: habit.completedDates.filter(date => date.toDateString() !== today),
        streak: Math.max(0, habit.streak - 1)
      };
    } else {
      // Add today's completion
      updatedHabit = {
        ...habit,
        completedDates: [...habit.completedDates, new Date()],
        streak: habit.streak + 1
      };
    }

    dispatch({ type: 'UPDATE_HABIT', payload: updatedHabit });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      mindfulness: 'bg-purple-100 text-purple-800',
      'time-management': 'bg-blue-100 text-blue-800',
      finances: 'bg-green-100 text-green-800',
      relationships: 'bg-pink-100 text-pink-800',
      health: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mindfulness': return '🧘';
      case 'time-management': return '⏰';
      case 'finances': return '💰';
      case 'relationships': return '❤️';
      case 'health': return '🏃';
      default: return '📚';
    }
  };

  const isHabitCompletedToday = (habit: Habit) => {
    const today = new Date().toDateString();
    return habit.completedDates.some(date => date.toDateString() === today);
  };

  if (selectedLesson) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getCategoryIcon(selectedLesson.category)}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedLesson.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedLesson.duration} {tr.duration}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedLesson.category)}`}>
                      {tr.category[selectedLesson.category as keyof typeof tr.category]}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedLesson(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="prose max-w-none">
              {selectedLesson.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-2xl font-bold text-gray-900 mb-4">{line.substring(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-semibold text-gray-900 mb-3 mt-6">{line.substring(3)}</h2>;
                }
                if (line.startsWith('- ')) {
                  return <li key={index} className="text-gray-700 mb-1">{line.substring(2)}</li>;
                }
                if (line.match(/^\d+\./)) {
                  return <li key={index} className="text-gray-700 mb-1">{line}</li>;
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={index} className="font-semibold text-gray-900 mb-2">{line.slice(2, -2)}</p>;
                }
                if (line.trim() === '') {
                  return <br key={index} />;
                }
                return <p key={index} className="text-gray-700 mb-2">{line}</p>;
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Урок займёт примерно {selectedLesson.duration} {tr.duration}
                </div>
                <button
                  onClick={() => completeLesson(selectedLesson.id)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {tr.finishLesson}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{tr.title}</h2>
              <p className="text-gray-600">{tr.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'lessons'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tr.lessonsTab}
            </button>
            <button
              onClick={() => setActiveTab('habits')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'habits'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tr.habitsTab}
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'lessons' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.lessons.map((lesson) => (
                <div key={lesson.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{getCategoryIcon(lesson.category)}</div>
                    {lesson.completed && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {lesson.duration} {tr.duration}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(lesson.category)}`}>
                      {tr.category[lesson.category as keyof typeof tr.category]}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                      lesson.completed
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {lesson.completed ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {tr.completed}
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        {tr.startLesson}
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {state.habits.map((habit, index) => (
                <div key={habit.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{tr.habits[index].title}</h3>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-orange-600">
                            {habit.streak} {tr.streak}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{tr.habits[index].description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{tr.frequency}: {habit.frequency === 'daily' ? tr.daily : tr.weekly}</span>
                        <span>{tr.done}: {habit.completedDates.length} раз</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleHabitComplete(habit.id)}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isHabitCompletedToday(habit)
                          ? 'bg-green-600 border-green-600 text-white'
                          : 'border-gray-300 hover:border-green-500 text-gray-400 hover:text-green-500'
                      }`}
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
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