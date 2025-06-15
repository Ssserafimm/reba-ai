import React, { useState } from 'react';
import { Heart, Shield, Users, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { User } from '../types';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

export default function WelcomeScreen() {
  const { state, dispatch } = useApp();
  const language = state.language;

  const t = {
    en: {
      title: 'Reba AI',
      subtitle: 'Your personal assistant on the path to recovery',
      rehab: 'Rehab Patient',
      rehabDesc: 'You are in a rehab program and want extra support',
      rehab1: 'Contact with doctors and center',
      rehab2: 'Progress reports',
      self: 'Self-Rescuer',
      selfDesc: 'You are aware of the problem and want to work on recovery yourself',
      self1: 'Emergency help',
      self2: 'Personal goals',
      google: 'Sign in with Google',
      errorGoogle: 'Google sign-in error',
      langEN: 'EN',
      langRU: 'RU',
    },
    ru: {
      title: 'Reba AI',
      subtitle: 'Твой персональный помощник на пути к выздоровлению',
      rehab: 'Пациент Реабилитации',
      rehabDesc: 'Ты проходишь программу в реабилитационном центре и хочешь получить дополнительную поддержку',
      rehab1: 'Связь с врачами и центром',
      rehab2: 'Отчеты о прогрессе',
      self: 'Самоспасатель',
      selfDesc: 'Ты осознаешь проблему и хочешь самостоятельно работать над выздоровлением',
      self1: 'Экстренная помощь',
      self2: 'Самостоятельные цели',
      google: 'Войти через Google',
      errorGoogle: 'Ошибка входа через Google',
      langEN: 'АНГ',
      langRU: 'РУС',
    }
  };
  const tr = t[language];

  // Google Sign-In handler with type
  const handleGoogleSignIn = async (userType: 'rehab-client' | 'self-rescuer') => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch({
        type: 'SET_USER',
        payload: {
          id: user.uid,
          name: user.displayName || 'Google User',
          type: userType,
          values: [],
          goals: [],
          emotionScores: [],
          createdAt: new Date()
        }
      });
      dispatch({ type: 'SET_VIEW', payload: 'initial-check' });
    } catch (error) {
      alert(tr.errorGoogle);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">{tr.title}</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            {tr.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-blue-300 cursor-pointer transition-all duration-300 hover:shadow-xl group flex flex-col items-center">
            <Shield className="w-16 h-16 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{tr.rehab}</h3>
            <p className="text-gray-600 mb-6">{tr.rehabDesc}</p>
            <div className="text-left space-y-2 text-sm text-gray-500 mb-6 w-full">
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                {tr.rehab1}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                {tr.rehab2}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleGoogleSignIn('rehab-client')}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold shadow hover:bg-gray-50 transition-all duration-200"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              {tr.google}
            </button>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-green-300 cursor-pointer transition-all duration-300 hover:shadow-xl group flex flex-col items-center">
            <Heart className="w-16 h-16 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{tr.self}</h3>
            <p className="text-gray-600 mb-6">{tr.selfDesc}</p>
            <div className="text-left space-y-2 text-sm text-gray-500 mb-6 w-full">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                {tr.self1}
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                {tr.self2}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleGoogleSignIn('self-rescuer')}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold shadow hover:bg-gray-50 transition-all duration-200"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              {tr.google}
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-8 gap-2">
          <button onClick={() => dispatch({ type: 'SET_LANGUAGE', payload: 'en' })} className={`px-3 py-1 rounded ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}>{tr.langEN}</button>
          <button onClick={() => dispatch({ type: 'SET_LANGUAGE', payload: 'ru' })} className={`px-3 py-1 rounded ${language === 'ru' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'}`}>{tr.langRU}</button>
        </div>
      </div>
    </div>
  );
}