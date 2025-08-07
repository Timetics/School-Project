import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
      aria-label={`Switch to ${language.code === 'en' ? 'Arabic' : 'English'}`}
    >
      <Globe size={18} />
      <span className="font-medium">
        {language.code === 'en' ? 'عربي' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle;