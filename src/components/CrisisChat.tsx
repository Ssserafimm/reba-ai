import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Send, AlertTriangle, Heart, Shield } from 'lucide-react';
import { ChatMessage } from '../types';

export default function CrisisChat() {
  const { state, dispatch } = useApp();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatMessages]);

  const analyzeEmotionalTone = (text: string): 'positive' | 'neutral' | 'negative' | 'crisis' => {
    const crisisWords = ['суицид', 'убить', 'покончить', 'умереть', 'боль', 'невыносимо', 'помощь', 'спасите'];
    const negativeWords = ['плохо', 'грустно', 'депрессия', 'тревога', 'страх', 'одиночество'];
    const positiveWords = ['хорошо', 'лучше', 'спасибо', 'помогло', 'надежда', 'сильный'];

    const lowerText = text.toLowerCase();
    
    if (crisisWords.some(word => lowerText.includes(word))) return 'crisis';
    if (negativeWords.some(word => lowerText.includes(word))) return 'negative';
    if (positiveWords.some(word => lowerText.includes(word))) return 'positive';
    
    return 'neutral';
  };

  const generateAIResponse = (userMessage: string, tone: 'positive' | 'neutral' | 'negative' | 'crisis'): string => {
    const responses = {
      crisis: [
        "I understand things are very hard for you right now. Your life is valuable and important. Let's find ways to cope with this pain together. You are not alone.",
        "Thank you for trusting me. I sense you are going through a very difficult time. Remember—these feelings are temporary, and help is always available.",
        "Your pain is real, and I understand that. But you have already shown strength by reaching out for support. That's an important step. Let's talk about what might help right now."
      ],
      negative: [
        "I understand things are tough. These feelings are natural in recovery. Remember, every day is a new opportunity for growth.",
        "Sad and hard days are part of the journey. It's important that you keep moving forward. What would you like to change about your day?",
        "I hear your pain. Recovery isn't a straight line, but a process with ups and downs. You're doing better than you think."
      ],
      positive: [
        "Glad to hear some positive notes! This shows your work on yourself is paying off. Keep it up!",
        "Wonderful! Positive changes are the result of your efforts. What helped you feel better today?",
        "I feel your strength and determination. It's important to notice and appreciate these moments. You're on the right path!"
      ],
      neutral: [
        "Thank you for sharing. What do you think could help you today?",
        "I understand. Sometimes it's important just to speak out. I'm here to listen and support you.",
        "Every conversation matters for your process. Is there anything specific you'd like to talk about?"
      ]
    };

    const responseArray = responses[tone];
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: message.trim(),
      type: 'user',
      emotionalTone: analyzeEmotionalTone(message.trim()),
      timestamp: new Date()
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: crypto.randomUUID(),
        content: generateAIResponse(userMessage.content, userMessage.emotionalTone!),
        type: 'ai',
        emotionalTone: 'positive',
        timestamp: new Date()
      };

      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiResponse });
      setIsTyping(false);

      // Check if crisis intervention is needed
      if (userMessage.emotionalTone === 'crisis') {
        dispatch({ type: 'SET_CRISIS_STATE', payload: true });
      }
    }, 1000 + Math.random() * 2000);
  };

  const t = {
    en: {
      title: "Crisis Chat",
      subtitle: "A safe space to talk. I'm here to listen and support you.",
      empty: "This is a safe place for your thoughts and feelings. Start the conversation when you're ready.",
      crisisSupport: "Crisis Support",
      aiResponses: {
        crisis: [
          "I understand things are very hard for you right now. Your life is valuable and important. Let's find ways to cope with this pain together. You are not alone.",
          "Thank you for trusting me. I sense you are going through a very difficult time. Remember—these feelings are temporary, and help is always available.",
          "Your pain is real, and I understand that. But you have already shown strength by reaching out for support. That's an important step. Let's talk about what might help right now."
        ],
        negative: [
          "I understand things are tough. These feelings are natural in recovery. Remember, every day is a new opportunity for growth.",
          "Sad and hard days are part of the journey. It's important that you keep moving forward. What would you like to change about your day?",
          "I hear your pain. Recovery isn't a straight line, but a process with ups and downs. You're doing better than you think."
        ],
        positive: [
          "Glad to hear some positive notes! This shows your work on yourself is paying off. Keep it up!",
          "Wonderful! Positive changes are the result of your efforts. What helped you feel better today?",
          "I feel your strength and determination. It's important to notice and appreciate these moments. You're on the right path!"
        ],
        neutral: [
          "Thank you for sharing. What do you think could help you today?",
          "I understand. Sometimes it's important just to speak out. I'm here to listen and support you.",
          "Every conversation matters for your process. Is there anything specific you'd like to talk about?"
        ]
      },
      inputPlaceholder: "Share your thoughts...",
    },
    ru: {
      title: "Кризисный чат",
      subtitle: "Безопасное пространство для разговора. Я здесь, чтобы выслушать и поддержать.",
      empty: "Это безопасное место для твоих мыслей и чувств. Начни разговор, когда будешь готов.",
      crisisSupport: "Кризисная поддержка",
      aiResponses: {
        crisis: [
          "Я понимаю, что тебе сейчас очень тяжело. Твоя жизнь ценна и важна. Давай вместе найдем способы справиться с этой болью. Ты не один.",
          "Спасибо, что доверился мне. Чувствую, что ты проходишь через очень сложный период. Помни - эти чувства временны, а помощь всегда доступна.",
          "Твоя боль реальна, и я это понимаю. Но ты уже проявил силу, обратившись за поддержкой. Это важный шаг. Давай поговорим о том, что может помочь прямо сейчас."
        ],
        negative: [
          "Понимаю, что сейчас трудно. Эти чувства естественны в процессе восстановления. Помни, что каждый день - это новая возможность для роста.",
          "Грустные и тяжелые дни - часть пути. Важно, что ты продолжаешь идти вперед. Что бы ты хотел изменить в своем дне?",
          "Я слышу твою боль. Восстановление - это не прямая линия, а процесс с подъемами и спадами. Ты справляешься лучше, чем думаешь."
        ],
        positive: [
          "Рад слышать позитивные ноты! Это признак того, что твоя работа над собой приносит результаты. Продолжай в том же духе!",
          "Замечательно! Позитивные изменения - это результат твоих усилий. Что именно помогло тебе почувствовать себя лучше?",
          "Я чувствую твою силу и решимость. Эти моменты важно замечать и ценить. Ты на правильном пути!"
        ],
        neutral: [
          "Спасибо, что поделился. Как ты думаешь, что могло бы помочь тебе сегодня?",
          "Понимаю. Иногда важно просто высказаться. Я здесь, чтобы выслушать и поддержать.",
          "Каждый разговор важен для твоего процесса. Есть ли что-то конкретное, о чем ты хотел бы поговорить?"
        ]
      },
      inputPlaceholder: "Поделись своими мыслями...",
    }
  };
  const tr = t[state.language];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{tr.title}</h2>
              <p className="text-gray-600">{tr.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {state.chatMessages.length === 0 && (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">
                {tr.empty}
              </p>
            </div>
          )}

          {state.chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : msg.emotionalTone === 'crisis'
                    ? 'bg-red-100 text-red-900 border border-red-200'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {msg.type === 'ai' && msg.emotionalTone === 'crisis' && (
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span className="text-xs font-medium">{tr.crisisSupport}</span>
                  </div>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder={tr.inputPlaceholder}
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!message.trim() || isTyping}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}