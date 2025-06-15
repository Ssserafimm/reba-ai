import React, { useState } from 'react';
import { AlertTriangle, Heart, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';

export default function InitialCheck() {
  const { state, dispatch } = useApp();
  const language = state.language;
  const t = {
    en: {
      hello: 'Hi',
      howFeel: 'How are you feeling right now?',
      placeholder: 'Share your feelings... This is a safe place for your thoughts.',
      share: 'Share',
      crisisTitle: 'We noticed you are having a very hard time',
      crisisDesc: 'Your safety is our top priority. Choose how we can help:',
      emergency: 'Emergency help',
      chat: 'Talk to AI counselor',
      continue: 'Continue as usual',
      aiResponse: (name: string) => `Thank you for sharing your feelings, ${name}. I understand things may be hard right now. Let's set your goals together and find ways to improve your state. You are not alone on this journey.`,
    },
    ru: {
      hello: 'Привет',
      howFeel: 'Как ты себя сейчас чувствуешь?',
      placeholder: 'Расскажи о своих чувствах... Это безопасное место для твоих мыслей.',
      share: 'Поделиться',
      crisisTitle: 'Мы заметили, что тебе сейчас очень тяжело',
      crisisDesc: 'Твоя безопасность для нас самое важное. Выбери, как мы можем помочь:',
      emergency: 'Экстренная помощь',
      chat: 'Поговорить с ИИ-консультантом',
      continue: 'Продолжить обычный режим',
      aiResponse: (name: string) => `Спасибо, что поделился своими чувствами, ${name}. Понимаю, что сейчас может быть трудно. Давай вместе определим твои цели и найдем способы улучшить твое состояние. Ты не один в этом пути.`,
    }
  };
  const tr = t[language];
  const [feeling, setFeeling] = useState('');
  const [showCrisisOptions, setShowCrisisOptions] = useState(false);

  const handleFeelingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeling.trim()) return;

    // Simple crisis detection based on keywords
    const crisisKeywords = ['суицид', 'убить', 'покончить', 'умереть', 'боль', 'невыносимо', 'помощь', 'спасите'];
    const isCrisis = crisisKeywords.some(keyword => feeling.toLowerCase().includes(keyword));

    const message: ChatMessage = {
      id: crypto.randomUUID(),
      content: feeling,
      type: 'user',
      emotionalTone: isCrisis ? 'crisis' : 'neutral',
      timestamp: new Date()
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: message });

    if (isCrisis) {
      dispatch({ type: 'SET_CRISIS_STATE', payload: true });
      setShowCrisisOptions(true);
    } else {
      // Add AI response
      const aiResponse: ChatMessage = {
        id: crypto.randomUUID(),
        content: tr.aiResponse(state.currentUser?.name || ''),
        type: 'ai',
        emotionalTone: 'positive',
        timestamp: new Date()
      };
      
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiResponse });
      
      setTimeout(() => {
        dispatch({ type: 'SET_VIEW', payload: 'dashboard' });
      }, 2000);
    }
  };

  const handleCrisisAction = (action: 'emergency' | 'chat' | 'continue') => {
    if (action === 'emergency') {
      dispatch({ type: 'SET_VIEW', payload: 'emergency' });
    } else if (action === 'chat') {
      dispatch({ type: 'SET_VIEW', payload: 'crisis-chat' });
    } else {
      dispatch({ type: 'SET_CRISIS_STATE', payload: false });
      dispatch({ type: 'SET_VIEW', payload: 'dashboard' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {tr.hello}, {state.currentUser?.name}!
            </h2>
            <p className="text-gray-600">
              {tr.howFeel}
            </p>
          </div>

          {!showCrisisOptions ? (
            <form onSubmit={handleFeelingSubmit}>
              <div className="mb-6">
                <textarea
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                  rows={4}
                  placeholder={tr.placeholder}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {tr.share}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-semibold text-red-900">
                    {tr.crisisTitle}
                  </h3>
                </div>
                <p className="text-red-800 mb-6">
                  {tr.crisisDesc}
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleCrisisAction('emergency')}
                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    {tr.emergency}
                  </button>
                  
                  <button
                    onClick={() => handleCrisisAction('chat')}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {tr.chat}
                  </button>
                  
                  <button
                    onClick={() => handleCrisisAction('continue')}
                    className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    {tr.continue}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}