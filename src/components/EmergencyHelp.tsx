import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, Phone, MessageCircle, MapPin, Clock, Heart } from 'lucide-react';

export default function EmergencyHelp() {
  const { state } = useApp();
  const [emergencyType, setEmergencyType] = useState<'crisis' | 'relapse' | 'medical' | null>(null);
  const [helpSent, setHelpSent] = useState(false);

  const handleEmergencyAction = (type: 'crisis' | 'relapse' | 'medical') => {
    setEmergencyType(type);
    // Simulate sending help request
    setTimeout(() => {
      setHelpSent(true);
    }, 1000);
  };

  const t = {
    en: {
      title: "Emergency Help",
      subtitle: "Immediate support in crisis situations",
      danger: "If you feel in danger",
      crisisThoughts: "Suicidal thoughts",
      crisisHelp: "Immediate help",
      relapseRisk: "Relapse risk",
      urgentSupport: "Urgent support",
      medicalHelp: "Medical help",
      ambulance: "Ambulance",
      back: "Go back",
      helpOnWay: "Help is on the way",
      helpSent: "We've sent a help signal. Specialists and volunteers in your area have been notified.",
      whatHappens: "What happens now:",
      notificationsSent: "Notifications sent to local specialists",
      locationShared: "Your approximate location shared with help services",
      contactSoon: "Someone will contact you within 15 minutes",
      tryTechniques: "While help is on the way, try one of these techniques:",
      contactsTitle: "Emergency contacts",
      coping: [
        { title: "4-7-8 Breathing Technique", description: "Inhale for 4, hold for 7, exhale for 8", icon: "��", urgent: true },
        { title: "5-4-3-2-1 Grounding", description: "5 things you see, 4 you hear, 3 you feel, 2 smells, 1 taste", icon: "🌍", urgent: true },
        { title: "Cold Water", description: "Splash cold water on your face or hold ice", icon: "❄️", urgent: true },
        { title: "Call a loved one", description: "Reach out to someone in your support network", icon: "📞", urgent: false },
        { title: "Leave the situation", description: "If possible, leave the triggering environment", icon: "🚪", urgent: false },
        { title: "Journal", description: "Write down all your thoughts and feelings", icon: "📝", urgent: false }
      ],
      contacts: [
        { name: "Crisis Line", phone: "1-800-273-8255", description: "24/7 psychological help", type: "crisis" },
        { name: "Addiction Help", phone: "1-800-662-4357", description: "Emergency addiction help", type: "addiction" },
        { name: "Ambulance", phone: "911", description: "Emergency medical help", type: "medical" },
        { name: "Rescue Service", phone: "112", description: "General emergency number", type: "emergency" }
      ]
    },
    ru: {
      title: "Экстренная помощь",
      subtitle: "Немедленная поддержка в кризисных ситуациях",
      danger: "Если ты чувствуешь себя в опасности",
      crisisThoughts: "Суицидальные мысли",
      crisisHelp: "Немедленная помощь",
      relapseRisk: "Риск срыва",
      urgentSupport: "Срочная поддержка",
      medicalHelp: "Медицинская помощь",
      ambulance: "Скорая помощь",
      back: "Вернуться назад",
      helpOnWay: "Помощь уже в пути",
      helpSent: "Мы отправили сигнал о помощи. Специалисты и волонтёры в твоём районе уведомлены.",
      whatHappens: "Что происходит сейчас:",
      notificationsSent: "Уведомления отправлены местным специалистам",
      locationShared: "Твоё примерное местоположение передано службам помощи",
      contactSoon: "Кто-то свяжется с тобой в течение 15 минут",
      tryTechniques: "Пока помощь в пути, попробуй одну из этих техник:",
      contactsTitle: "Телефоны экстренной помощи",
      coping: [
        { title: "Техника дыхания 4-7-8", description: "Вдох на 4 счёта, задержка на 7, выдох на 8", icon: "🫁", urgent: true },
        { title: "Заземление 5-4-3-2-1", description: "5 вещей которые видишь, 4 которые слышишь, 3 которые чувствуешь, 2 запаха, 1 вкус", icon: "��", urgent: true },
        { title: "Холодная вода", description: "Умойся холодной водой или подержи лёд", icon: "❄️", urgent: true },
        { title: "Позвони близкому", description: "Свяжись с кем-то из твоей сети поддержки", icon: "📞", urgent: false },
        { title: "Покинь ситуацию", description: "Если возможно, уйди из триггерной обстановки", icon: "🚪", urgent: false },
        { title: "Напиши в дневник", description: "Выпиши все мысли и чувства на бумагу", icon: "📝", urgent: false }
      ],
      contacts: [
        { name: "Кризисная служба", phone: "8-800-2000-122", description: "Круглосуточная психологическая помощь", type: "crisis" },
        { name: "Наркологическая помощь", phone: "8-800-200-0200", description: "Экстренная наркологическая помощь", type: "addiction" },
        { name: "Скорая помощь", phone: "103", description: "Экстренная медицинская помощь", type: "medical" },
        { name: "Служба спасения", phone: "112", description: "Единый номер экстренных служб", type: "emergency" }
      ]
    }
  };
  const tr = t[state.language];

  const emergencyContacts = tr.contacts;

  const copingStrategies = tr.coping;

  if (helpSent) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Помощь уже в пути</h2>
          <p className="text-gray-600 mb-6">
            Мы отправили сигнал о помощи. Специалисты и волонтёры в твоём районе уведомлены.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Что происходит сейчас:</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Уведомления отправлены местным специалистам
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Твоё примерное местоположение передано службам помощи
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Кто-то свяжется с тобой в течение 15 минут
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">
              Пока помощь в пути, попробуй одну из этих техник:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {copingStrategies.filter(s => s.urgent).map((strategy, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-left">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{strategy.icon}</span>
                    <h4 className="font-semibold text-gray-900">{strategy.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{strategy.description}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setHelpSent(false);
              setEmergencyType(null);
            }}
            className="mt-6 bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Экстренная помощь</h2>
              <p className="text-gray-600">Немедленная поддержка в кризисных ситуациях</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Если ты чувствуешь себя в опасности</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleEmergencyAction('crisis')}
                className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors flex flex-col items-center"
              >
                <AlertTriangle className="w-8 h-8 mb-2" />
                <span className="font-semibold">Суицидальные мысли</span>
                <span className="text-sm opacity-90">Немедленная помощь</span>
              </button>
              
              <button
                onClick={() => handleEmergencyAction('relapse')}
                className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors flex flex-col items-center"
              >
                <Heart className="w-8 h-8 mb-2" />
                <span className="font-semibold">Риск срыва</span>
                <span className="text-sm opacity-90">Срочная поддержка</span>
              </button>
              
              <button
                onClick={() => handleEmergencyAction('medical')}
                className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex flex-col items-center"
              >
                <Phone className="w-8 h-8 mb-2" />
                <span className="font-semibold">Медицинская помощь</span>
                <span className="text-sm opacity-90">Скорая помощь</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-blue-600" />
            Телефоны экстренной помощи
          </h3>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                  <a
                    href={`tel:${contact.phone}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Позвонить
                  </a>
                </div>
                <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                <p className="text-lg font-mono text-blue-600">{contact.phone}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-green-600" />
            Техники самопомощи
          </h3>
          <div className="space-y-4">
            {copingStrategies.map((strategy, index) => (
              <div key={index} className={`border rounded-lg p-4 ${
                strategy.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'
              }`}>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{strategy.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {strategy.title}
                      {strategy.urgent && (
                        <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          Срочно
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600">{strategy.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Твоя сеть поддержки</h3>
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            Добавь контакты людей, которые могут поддержать тебя в трудную минуту
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Добавить контакт поддержки
          </button>
        </div>
      </div>
    </div>
  );
}