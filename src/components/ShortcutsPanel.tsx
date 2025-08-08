import React from 'react';
import { Video, Upload, Calendar, BookOpen, MessageSquare, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Shortcut {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  action: () => void;
}

interface ShortcutsPanelProps {
  className?: string;
}

const ShortcutsPanel: React.FC<ShortcutsPanelProps> = ({ className = "" }) => {
  const { language } = useLanguage();

  const shortcuts: Shortcut[] = [
    {
      id: 'virtual-classroom',
      labelEn: 'Virtual Classrooms',
      labelAr: 'الفصول الافتراضية',
      icon: Video,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      action: () => alert('Opening virtual classrooms...')
    },
    {
      id: 'homework-submission',
      labelEn: 'Submit Homework',
      labelAr: 'تسليم الواجبات',
      icon: Upload,
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100 border-green-200',
      action: () => alert('Opening homework submission...')
    },
    {
      id: 'school-calendar',
      labelEn: 'School Calendar',
      labelAr: 'التقويم المدرسي',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      action: () => alert('Opening school calendar...')
    },
    {
      id: 'library-resources',
      labelEn: 'Library & Resources',
      labelAr: 'المكتبة والمصادر',
      icon: BookOpen,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
      action: () => alert('Opening library resources...')
    },
    {
      id: 'contact-teacher',
      labelEn: 'Contact Teacher',
      labelAr: 'التواصل مع المعلم',
      icon: MessageSquare,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
      action: () => alert('Opening teacher contact...')
    },
    {
      id: 'help-support',
      labelEn: 'Help & Support',
      labelAr: 'المساعدة والدعم',
      icon: HelpCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100 border-red-200',
      action: () => alert('Opening help & support...')
    }
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <h3 className={`text-xl font-semibold text-gray-800 ${
          language.code === 'ar' ? 'font-arabic' : ''
        }`}>
          {language.code === 'en' ? 'Quick Access' : 'الوصول السريع'}
        </h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shortcuts.map((shortcut) => {
            const IconComponent = shortcut.icon;
            const label = language.code === 'en' ? shortcut.labelEn : shortcut.labelAr;
            
            return (
              <button
                key={shortcut.id}
                onClick={shortcut.action}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md hover:scale-105 ${shortcut.bgColor}`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-3 rounded-full bg-white/70 ${shortcut.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <span className={`text-sm font-medium text-gray-800 text-center ${
                    language.code === 'ar' ? 'font-arabic' : ''
                  }`}>
                    {label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShortcutsPanel;