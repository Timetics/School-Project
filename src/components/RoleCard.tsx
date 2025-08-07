import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { iconComponents } from '../data/roles';
import type { RoleConfig } from '../types';

interface RoleCardProps {
  role: RoleConfig;
}

const RoleCard: React.FC<RoleCardProps> = ({ role }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { language, translations } = useLanguage();

  const IconComponent = iconComponents[role.icon as keyof typeof iconComponents];
  const label = language.code === 'en' ? role.labelEn : role.labelAr;

  const handleClick = async () => {
    setIsLoading(true);
    localStorage.setItem('mayar-last-role', role.id);
    
    // Add a brief loading animation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    navigate(`/login/${role.id}`);
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
      aria-label={`Login as ${label.toLowerCase()}`}
    >
      <div className={`relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[160px] transition-all duration-300 ${
        isHovered ? 'bg-white/20 shadow-2xl shadow-purple-500/20' : ''
      } ${isLoading ? 'opacity-50' : ''}`}>
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          isHovered ? 'opacity-100 bg-gradient-to-br from-purple-400/10 to-pink-400/10' : 'opacity-0'
        }`} />
        
        {/* Dark overlay on hover */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          isHovered ? 'opacity-20 bg-black' : 'opacity-0'
        }`} />
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            <IconComponent size={48} className="text-white" />
          </div>
          
          <span className={`text-white font-bold text-sm tracking-wider ${
            language.code === 'ar' ? 'font-arabic' : ''
          }`}>
            {label}
          </span>
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleCard;