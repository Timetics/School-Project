import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { iconComponents } from '../data/dashboard';

interface QuickStatsCardProps {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: string;
  count: number;
  color: string;
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ 
  labelEn, 
  labelAr, 
  icon, 
  count, 
  color 
}) => {
  const { language } = useLanguage();

  const IconComponent = iconComponents[icon as keyof typeof iconComponents];
  const label = language.code === 'en' ? labelEn : labelAr;

  return (
    <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-white/20`}>
          <IconComponent size={20} className={`${color}`} />
        </div>
        <div className="flex-1">
          <p className={`text-white text-sm font-medium ${
            language.code === 'ar' ? 'font-arabic text-right' : ''
          }`}>
            {label}
          </p>
          <p className="text-white/80 text-xs">
            {count} {language.code === 'ar' ? 'عنصر' : 'items'}
          </p>
        </div>
        <div className="text-white font-bold text-lg">
          {count}
        </div>
      </div>
    </div>
  );
};

export default QuickStatsCard;