import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Send, Shield, Heart } from 'lucide-react';
import { ChatMessage } from '../types';

const t = {
  en: {
    title: "Support Community",
    subtitle: "A safe space to connect with others on the path to recovery",
    rulesTitle: "Community Rules",
    rules: [
      "Respect other members",
      "Do not give medical advice",
      "Support, don't judge",
      "Report inappropriate behavior"
    ],
    inputPlaceholder: "Share your thoughts with the community...",
    charCount: "characters",
    positiveMsg: "Positive message",
    you: "You",
    sampleMessages: [
      { userName: "Alex", content: "Hi everyone! Today marks 30 days sober. Feeling much better! 💪", emotionalTone: "positive" },
      { userName: "Maria", content: "Alex, that's amazing! I'm also on the recovery journey. How do you handle tough moments?", emotionalTone: "positive" },
      { userName: "Alex", content: "Maria, the main thing is not to be alone. I attend group meetings and chat here. It helps not to feel isolated.", emotionalTone: "positive" },
      { userName: "Dmitry", content: "I'm having a tough day. Really want to relapse. How do you cope with such moments?", emotionalTone: "negative" }
    ],
    aiModerator: "AI Moderator",
    aiSupport: (name: string) => `${name}, thank you for sharing. Remember, you are not alone. The community is here to support you. If you need urgent help, reach out to the crisis chat or a specialist.`,
    moderationNotice: "Messages are moderated by AI for safety."
  },
  ru: {
    title: "Сообщество поддержки",
    subtitle: "Безопасное пространство для общения с другими на пути к выздоровлению",
    rulesTitle: "Правила сообщества",
    rules: [
      "Уважайте других участников",
      "Не давайте медицинских советов",
      "Поддерживайте, не осуждайте",
      "Сообщайте о неподобающем поведении"
    ],
    inputPlaceholder: "Поделитесь своими мыслями с сообществом...",
    charCount: "символов",
    positiveMsg: "Позитивное сообщение",
    you: "Вы",
    sampleMessages: [
      { userName: "Алексей", content: "Привет всем! Сегодня исполнилось 30 дней без употребления. Чувствую себя намного лучше! 💪", emotionalTone: "positive" },
      { userName: "Мария", content: "Алексей, это потрясающе! Я тоже на пути к выздоровлению. Как ты справляешься с трудными моментами?", emotionalTone: "positive" },
      { userName: "Алексей", content: "Мария, главное - не оставаться одной. Я хожу на групповые встречи и здесь общаюсь. Помогает не чувствовать себя изолированным.", emotionalTone: "positive" },
      { userName: "Дмитрий", content: "У меня сегодня сложный день. Очень хочется сорваться. Как вы справляетесь с такими моментами?", emotionalTone: "negative" }
    ],
    aiModerator: "AI-Модератор",
    aiSupport: (name: string) => `${name}, спасибо, что поделился. Помни, что ты не один. Сообщество здесь, чтобы поддержать тебя. Если нужна срочная помощь, обратись к кризисному чату или специалисту.`,
    moderationNotice: "Сообщения модерируются ИИ для безопасности"
  }
};

export default function CommunityChat() {
  const { state, dispatch } = useApp();
  const [message, setMessage] = useState('');
  const [postAnonymous, setPostAnonymous] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tr = t[state.language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.communityMessages]);

  // Sample community messages for demo
  useEffect(() => {
    if (state.communityMessages.length === 0) {
      const sampleMessages: ChatMessage[] = tr.sampleMessages.map(msg => ({
        id: crypto.randomUUID(),
        content: msg.content,
        type: 'community',
        emotionalTone: msg.emotionalTone as 'positive' | 'negative' | 'neutral' | 'crisis',
        timestamp: new Date(),
        userId: 'user1',
        userName: msg.userName
      }));

      sampleMessages.forEach(msg => {
        dispatch({ type: 'ADD_COMMUNITY_MESSAGE', payload: msg });
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: message.trim(),
      type: 'community',
      emotionalTone: 'neutral',
      timestamp: new Date(),
      userId: state.currentUser?.id,
      userName: postAnonymous ? (state.language === 'ru' ? 'Аноним' : 'Anonymous') : (state.currentUser?.name)
    };

    dispatch({ type: 'ADD_COMMUNITY_MESSAGE', payload: newMessage });
    setMessage('');

    // Simulate AI moderation response for supportive messages
    if (message.toLowerCase().includes('помощь') || message.toLowerCase().includes('трудно')) {
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: crypto.randomUUID(),
          content: tr.aiSupport(postAnonymous ? (state.language === 'ru' ? 'Аноним' : 'Anonymous') : (state.currentUser?.name) || ""),
          type: 'community',
          emotionalTone: 'positive',
          timestamp: new Date(),
          userId: 'ai-moderator',
          userName: tr.aiModerator
        };
        dispatch({ type: 'ADD_COMMUNITY_MESSAGE', payload: aiResponse });
      }, 2000);
    }
  };

  const getMessageColor = (emotionalTone: string) => {
    switch (emotionalTone) {
      case 'positive':
        return 'border-l-green-500 bg-green-50';
      case 'negative':
        return 'border-l-red-500 bg-red-50';
      case 'crisis':
        return 'border-l-red-600 bg-red-100';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{tr.title}</h2>
              <p className="text-gray-600">{tr.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 m-6">
          <div className="flex">
            <Shield className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">{tr.rulesTitle}</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc list-inside space-y-1">
                  {tr.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {state.communityMessages.map((msg) => (
            <div key={msg.id} className={`border-l-4 p-4 rounded-lg ${getMessageColor(msg.emotionalTone!)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {msg.userName === tr.aiModerator ? (
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-1 text-blue-600" />
                        {tr.aiModerator}
                      </div>
                    ) : (
                      msg.userName
                    )}
                  </span>
                  {msg.userId === state.currentUser?.id && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{tr.you}</span>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-800">{msg.content}</p>
              {msg.emotionalTone === 'positive' && (
                <div className="flex items-center mt-2 text-green-600">
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-xs">{tr.positiveMsg}</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              placeholder={tr.inputPlaceholder}
              maxLength={500}
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              id="anonymous-toggle"
              checked={postAnonymous}
              onChange={e => setPostAnonymous(e.target.checked)}
              className="accent-purple-600 w-4 h-4 rounded mr-2"
            />
            <label htmlFor="anonymous-toggle" className="text-sm text-gray-700 cursor-pointer select-none">
              {state.language === 'ru' ? 'Писать как Аноним' : 'Post as Anonymous'}
            </label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              {message.length}/{tr.charCount}
            </span>
            <span className="text-xs text-gray-500">
              {tr.moderationNotice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}