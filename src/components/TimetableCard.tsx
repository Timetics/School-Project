import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TimetableCardProps {
  type: 'daily' | 'weekly';
}

const TimetableCard: React.FC<TimetableCardProps> = ({ type }) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');
  const { language, translations } = useLanguage();

  const mockSchedule = {
    daily: [
      { time: '08:00 - 08:45', subject: language.code === 'en' ? 'Mathematics' : 'الرياضيات' },
      { time: '08:45 - 09:30', subject: language.code === 'en' ? 'English Language' : 'اللغة الإنجليزية' },
      { time: '09:30 - 10:15', subject: language.code === 'en' ? 'Science' : 'العلوم' },
      { time: '10:15 - 10:30', subject: language.code === 'en' ? 'Break' : 'استراحة' },
      { time: '10:30 - 11:15', subject: language.code === 'en' ? 'Arabic Language' : 'اللغة العربية' },
    ],
    weekly: [
      { day: language.code === 'en' ? 'Sunday' : 'الأحد', subjects: 5 },
      { day: language.code === 'en' ? 'Monday' : 'الاثنين', subjects: 6 },
      { day: language.code === 'en' ? 'Tuesday' : 'الثلاثاء', subjects: 5 },
      { day: language.code === 'en' ? 'Wednesday' : 'الأربعاء', subjects: 6 },
      { day: language.code === 'en' ? 'Thursday' : 'الخميس', subjects: 4 },
    ]
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <Calendar className="text-white" size={24} />
        <h3 className={`text-white text-lg font-semibold ${
          language.code === 'ar' ? 'font-arabic' : ''
        }`}>
          {language.code === 'en' ? 'Timetable' : 'الجدول الزمني'}
        </h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'daily'
              ? 'bg-white/20 text-white'
              : 'bg-white/5 text-white/70 hover:bg-white/10'
          } ${language.code === 'ar' ? 'font-arabic' : ''}`}
        >
          {translations.dailySchedule}
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'weekly'
              ? 'bg-white/20 text-white'
              : 'bg-white/5 text-white/70 hover:bg-white/10'
          } ${language.code === 'ar' ? 'font-arabic' : ''}`}
        >
          {translations.weeklySchedule}
        </button>
      </div>

      {/* Schedule Content */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {activeTab === 'daily' ? (
          mockSchedule.daily.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <Clock size={16} className="text-white/60" />
              <div className="flex-1">
                <div className={`text-white/90 text-sm ${
                  language.code === 'ar' ? 'font-arabic text-right' : ''
                }`}>
                  {item.subject}
                </div>
                <div className="text-white/60 text-xs">
                  {item.time}
                </div>
              </div>
            </div>
          ))
        ) : (
          mockSchedule.weekly.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <span className={`text-white/90 text-sm ${
                language.code === 'ar' ? 'font-arabic' : ''
              }`}>
                {item.day}
              </span>
              <span className="text-white/60 text-xs">
                {item.subjects} {language.code === 'en' ? 'subjects' : 'مواد'}
              </span>
            </div>
          ))
        )}
      </div>

      {mockSchedule[activeTab].length === 0 && (
        <div className="text-center py-8">
          <p className={`text-white/60 ${
            language.code === 'ar' ? 'font-arabic' : ''
          }`}>
            {translations.noDataPlaceholder}
          </p>
        </div>
      )}
    </div>
  );
};

export default TimetableCard;