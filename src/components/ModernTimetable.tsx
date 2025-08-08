import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ClassEntry {
  id: string;
  subject: string;
  subjectAr: string;
  time: string;
  endTime: string;
  room: string;
  teacher: string;
  teacherAr: string;
  type: 'physical' | 'virtual';
  isActive?: boolean;
  isNext?: boolean;
}

interface ModernTimetableProps {
  className?: string;
}

const ModernTimetable: React.FC<ModernTimetableProps> = ({ className = "" }) => {
  const [activeView, setActiveView] = useState<'daily' | 'weekly'>('daily');
  const { language, translations } = useLanguage();

  const mockClasses: ClassEntry[] = [
    {
      id: '1',
      subject: 'Mathematics',
      subjectAr: 'الرياضيات',
      time: '08:00',
      endTime: '08:45',
      room: 'Room 101',
      teacher: 'Mr. Ahmed',
      teacherAr: 'الأستاذ أحمد',
      type: 'physical',
      isActive: true
    },
    {
      id: '2',
      subject: 'English Language',
      subjectAr: 'اللغة الإنجليزية',
      time: '08:45',
      endTime: '09:30',
      room: 'Room 102',
      teacher: 'Ms. Sarah',
      teacherAr: 'الأستاذة سارة',
      type: 'physical',
      isNext: true
    },
    {
      id: '3',
      subject: 'Science',
      subjectAr: 'العلوم',
      time: '09:30',
      endTime: '10:15',
      room: 'Virtual Room',
      teacher: 'Dr. Hassan',
      teacherAr: 'الدكتور حسان',
      type: 'virtual'
    },
    {
      id: '4',
      subject: 'Break',
      subjectAr: 'استراحة',
      time: '10:15',
      endTime: '10:30',
      room: '-',
      teacher: '-',
      teacherAr: '-',
      type: 'physical'
    },
    {
      id: '5',
      subject: 'Arabic Language',
      subjectAr: 'اللغة العربية',
      time: '10:30',
      endTime: '11:15',
      room: 'Room 103',
      teacher: 'Mr. Omar',
      teacherAr: 'الأستاذ عمر',
      type: 'physical'
    }
  ];

  const handleClassClick = (classEntry: ClassEntry) => {
    if (classEntry.type === 'virtual') {
      // In a real app, this would open the virtual classroom
      alert(`Opening virtual classroom for ${classEntry.subject}`);
    } else {
      alert(`Class details for ${classEntry.subject}`);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Calendar className="text-purple-600" size={24} />
            <h3 className={`text-xl font-semibold text-gray-800 ${
              language.code === 'ar' ? 'font-arabic' : ''
            }`}>
              {language.code === 'en' ? 'Today\'s Schedule' : 'جدول اليوم'}
            </h3>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('daily')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeView === 'daily'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${language.code === 'ar' ? 'font-arabic' : ''}`}
            >
              {translations.dailySchedule}
            </button>
            <button
              onClick={() => setActiveView('weekly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeView === 'weekly'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${language.code === 'ar' ? 'font-arabic' : ''}`}
            >
              {translations.weeklySchedule}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {mockClasses.map((classEntry) => {
            const subject = language.code === 'en' ? classEntry.subject : classEntry.subjectAr;
            const teacher = language.code === 'en' ? classEntry.teacher : classEntry.teacherAr;
            
            return (
              <div
                key={classEntry.id}
                onClick={() => handleClassClick(classEntry)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                  classEntry.isActive
                    ? 'border-green-300 bg-green-50 shadow-md'
                    : classEntry.isNext
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <Clock size={16} className="text-gray-500 mb-1" />
                      <div className="text-sm font-mono text-gray-700">
                        {classEntry.time}
                      </div>
                      <div className="text-xs text-gray-500">
                        {classEntry.endTime}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className={`font-semibold text-gray-800 mb-1 ${
                        language.code === 'ar' ? 'font-arabic text-right' : ''
                      }`}>
                        {subject}
                      </div>
                      {teacher !== '-' && (
                        <div className={`text-sm text-gray-600 mb-1 ${
                          language.code === 'ar' ? 'font-arabic text-right' : ''
                        }`}>
                          {teacher}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {classEntry.type === 'virtual' ? (
                          <>
                            <Video size={12} />
                            <span>{language.code === 'en' ? 'Virtual Class' : 'فصل افتراضي'}</span>
                          </>
                        ) : classEntry.room !== '-' ? (
                          <>
                            <MapPin size={12} />
                            <span>{classEntry.room}</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  
                  {classEntry.isActive && (
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">
                        {language.code === 'en' ? 'Now' : 'الآن'}
                      </span>
                    </div>
                  )}
                  
                  {classEntry.isNext && (
                    <div className="flex items-center gap-2 text-orange-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-xs font-medium">
                        {language.code === 'en' ? 'Next' : 'التالي'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModernTimetable;