import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { iconComponents } from '../data/dashboard';
import type { DashboardSection } from '../data/dashboard';

interface DashboardCardProps {
  section: DashboardSection;
  onClick?: (sectionId: string) => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ section, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();

  const IconComponent = iconComponents[section.icon as keyof typeof iconComponents];
  const label = language.code === 'en' ? section.labelEn : section.labelAr;

  const handleClick = async () => {
    if (onClick) {
      setIsLoading(true);
      localStorage.setItem('mayar-last-section', section.id);
      
      // Add a brief loading animation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      onClick(section.id);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 transform ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Access ${label.toLowerCase()}`}
    >
      <div className={`relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[140px] transition-all duration-300 ${
        isHovered ? 'bg-white/20 shadow-2xl shadow-purple-500/20' : ''
      } ${isLoading ? 'opacity-50' : ''}`}>
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          isHovered ? `opacity-100 bg-gradient-to-br ${section.color}/10` : 'opacity-0'
        }`} />
        
        {/* Dark overlay on hover */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          isHovered ? 'opacity-20 bg-black' : 'opacity-0'
        }`} />
        
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            <IconComponent size={40} className="text-white" />
          </div>
          
          <span className={`text-white font-bold text-xs text-center tracking-wider leading-tight ${
            language.code === 'ar' ? 'font-arabic' : ''
          }`}>
            {label.toUpperCase()}
          </span>
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;