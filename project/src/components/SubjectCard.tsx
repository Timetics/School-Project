import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { iconComponents } from '../data/dashboard';
import type { Subject } from '../data/dashboard';

interface SubjectCardProps {
  subject: Subject;
  onClick?: (subjectId: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();

  const IconComponent = iconComponents[subject.icon as keyof typeof iconComponents];
  const label = language.code === 'en' ? subject.labelEn : subject.labelAr;

  const handleClick = async () => {
    if (onClick) {
      setIsLoading(true);
      localStorage.setItem('mayar-last-subject', subject.id);
      
      // Add a brief loading animation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      onClick(subject.id);
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
      <div className={`relative bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-4 flex flex-col items-center justify-center min-h-[120px] transition-all duration-300 ${
        isHovered ? 'bg-white/25 shadow-xl shadow-purple-500/15' : ''
      } ${isLoading ? 'opacity-50' : ''}`}>
        {/* Gradient background */}
        <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
          isHovered ? `opacity-100 bg-gradient-to-br ${subject.color}/20` : 'opacity-0'
        }`} />
        
        {/* Dark overlay on hover */}
        <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
          isHovered ? 'opacity-15 bg-black' : 'opacity-0'
        }`} />
        
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            <IconComponent size={32} className="text-white" />
          </div>
          
          <span className={`text-white font-semibold text-xs text-center leading-tight ${
            language.code === 'ar' ? 'font-arabic' : ''
          }`}>
            {label.toUpperCase()}
          </span>
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;