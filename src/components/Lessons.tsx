import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Play, CheckCircle, Clock, Target } from 'lucide-react';
import { Lesson, Habit } from '../types';

const t = {
  en: {
    title: "Recovery Journey",
    subtitle: "Track your progress and learn essential skills",
    habitsTitle: "Daily Habits",
    lessonsTitle: "Recovery Lessons",
    habits: [
      "Practice mindfulness for 10 minutes",
      "Attend a support group meeting",
      "Journal your thoughts and feelings",
      "Exercise for 30 minutes",
      "Connect with a recovery buddy"
    ],
    lessons: [
      {
        title: "Understanding Triggers",
        content: "Learn to identify and manage your personal triggers effectively.",
        duration: "15 min",
        completed: false
      },
      {
        title: "Building Support Network",
        content: "Develop and maintain healthy relationships that support your recovery.",
        duration: "20 min",
        completed: false
      },
      {
        title: "Coping Strategies",
        content: "Master healthy coping mechanisms for dealing with stress and cravings.",
        duration: "25 min",
        completed: false
      }
    ],
    startLesson: "Start Lesson",
    markComplete: "Mark as Complete",
    completed: "Completed",
    inProgress: "In Progress"
  },
  ru: {
    title: "Путь к выздоровлению",
    subtitle: "Отслеживайте свой прогресс и изучайте важные навыки",
    habitsTitle: "Ежедневные привычки",
    lessonsTitle: "Уроки выздоровления",
    habits: [
      "Практикуйте осознанность 10 минут",
      "Посетите встречу группы поддержки",
      "Ведите дневник мыслей и чувств",
      "Занимайтесь спортом 30 минут",
      "Общайтесь с напарником по выздоровлению"
    ],
    lessons: [
      {
        title: "Понимание триггеров",
        content: "Научитесь определять и эффективно управлять своими личными триггерами.",
        duration: "15 мин",
        completed: false
      },
      {
        title: "Построение сети поддержки",
        content: "Развивайте и поддерживайте здоровые отношения, способствующие выздоровлению.",
        duration: "20 мин",
        completed: false
      },
      {
        title: "Стратегии преодоления",
        content: "Освойте здоровые механизмы преодоления стресса и тяги.",
        duration: "25 мин",
        completed: false
      }
    ],
    startLesson: "Начать урок",
    markComplete: "Отметить как завершенный",
    completed: "Завершено",
    inProgress: "В процессе"
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
        },
        {
          id: '4',
          title: state.language === 'ru' ? 'Мотивация на каждый день' : 'Daily Motivation',
          category: 'motivation',
          content: state.language === 'ru'
            ? `# Мотивация на каждый день\n\nКаждый день — новый шанс стать лучше.\n\n## Как поддерживать мотивацию?\n- Ставь маленькие цели и отмечай успехи\n- Вдохновляйся историями других\n- Помни, зачем ты начал\n\n**Задание:** Напиши, ради чего ты хочешь выздороветь.`
            : `# Daily Motivation\n\nEvery day is a new chance to get better.\n\n## How to stay motivated?\n- Set small goals and celebrate wins\n- Get inspired by others' stories\n- Remember your "why"\n\n**Action:** Write down why you want to recover.`,
          duration: 7,
          completed: false
        },
        {
          id: '5',
          title: state.language === 'ru' ? 'Забота о себе' : 'Self-care Basics',
          category: 'selfcare',
          content: state.language === 'ru'
            ? `# Забота о себе\n\nЗабота о себе — это не эгоизм, а необходимость.\n\n## Простые практики\n- Сон не менее 7-8 часов\n- Вкусная и полезная еда\n- Прогулки на свежем воздухе\n- Время для отдыха и хобби\n\n**Задание:** Выбери одну практику и внедри сегодня.`
            : `# Self-care Basics\n\nSelf-care is not selfish, it's essential.\n\n## Simple practices\n- Sleep at least 7-8 hours\n- Eat tasty and healthy food\n- Walk outside\n- Make time for rest and hobbies\n\n**Action:** Pick one practice and do it today.`,
          duration: 8,
          completed: false
        }
      ];

      initialLessons.forEach(lesson => {
        dispatch({ type: 'UPDATE_LESSON', payload: lesson });
      });
    }
  }, [state.language]);

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
        },
        {
          id: '5',
          title: state.language === 'ru' ? 'Гидратация' : 'Hydration',
          description: state.language === 'ru' ? 'Выпить минимум 6-8 стаканов воды за день' : 'Drink at least 6-8 glasses of water today',
          frequency: 'daily',
          streak: 0,
          completedDates: []
        },
        {
          id: '6',
          title: state.language === 'ru' ? 'Диджитал-детокс' : 'Digital Detox',
          description: state.language === 'ru' ? 'Сделать 1-часовой перерыв от экранов перед сном' : 'Take a 1-hour break from screens before bed',
          frequency: 'daily',
          streak: 0,
          completedDates: []
        }
      ];

      initialHabits.forEach(habit => {
        dispatch({ type: 'UPDATE_HABIT', payload: habit });
      });
    }
  }, [state.language]);

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
      health: 'bg-orange-100 text-orange-800',
      motivation: 'bg-teal-100 text-teal-800',
      selfcare: 'bg-lime-100 text-lime-800'
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
      case 'motivation': return '🌟';
      case 'selfcare': return '💆';
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
                  {tr.completed}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{tr.title}</h1>
        <p className="text-gray-600 mt-2">{tr.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Habits Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <Target className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">{tr.habitsTitle}</h2>
          </div>
          <ul className="space-y-4">
            {tr.habits.map((habit, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <span className="ml-3 text-gray-700">{habit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lessons Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <BookOpen className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">{tr.lessonsTitle}</h2>
          </div>
          <div className="space-y-4">
            {tr.lessons.map((lesson, index) => (
              <div key={index} className="bg-purple-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-purple-900">{lesson.title}</h3>
                  <span className="text-sm text-purple-600">{lesson.duration}</span>
                </div>
                <p className="text-sm text-purple-800 mb-3">{lesson.content}</p>
                <div className="flex justify-between items-center">
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    {tr.startLesson}
                  </button>
                  <div className="flex items-center">
                    {lesson.completed ? (
                      <span className="text-sm text-green-600 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {tr.completed}
                      </span>
                    ) : (
                      <button className="text-sm text-purple-600 hover:text-purple-700">
                        {tr.markComplete}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}