import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { roles } from '../data/roles';
import RoleCard from '../components/RoleCard';
import LanguageToggle from '../components/LanguageToggle';
import BackgroundImage from '../components/BackgroundImage';

const RoleSelection: React.FC = () => {
  const { translations, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate to last selected role if available
    const lastRole = localStorage.getItem('mayar-last-role');
    if (lastRole && roles.find(r => r.id === lastRole)) {
      // Optional: uncomment to enable auto-navigation
      // navigate(`/login/${lastRole}`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundImage />
      
      {/* Header - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
        <h1 className={`text-white text-4xl md:text-5xl font-bold mb-2 ${
          language.code === 'ar' ? 'font-arabic' : ''
        }`}>
          {translations.eSchool}
        </h1>
        <p className={`text-pink-200 text-lg md:text-xl ${
          language.code === 'ar' ? 'font-arabic' : ''
        }`}>
          {translations.schoolName}
        </p>
        <div className="mt-4">
          <LanguageToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          <h2 className={`text-white text-2xl md:text-3xl font-semibold text-center mb-12 ${
            language.code === 'ar' ? 'font-arabic' : ''
          }`}>
            {translations.selectRole}
          </h2>
          
          {/* Role Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {roles.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 p-6 text-center">
        <p className="text-white/60 text-sm">
          © 2025 Mayar International Schools. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;