import React, { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Grid, List, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Theme {
  id: string;
  name: string;
  nameAr: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

interface ThemeCustomizerProps {
  className?: string;
  onThemeChange?: (theme: Theme) => void;
  onLayoutChange?: (layout: 'grid' | 'list') => void;
  onModeChange?: (mode: 'light' | 'dark') => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ 
  className = "",
  onThemeChange,
  onLayoutChange,
  onModeChange
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [currentLayout, setCurrentLayout] = useState<'grid' | 'list'>('grid');
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>('light');

  const themes: Theme[] = [
    {
      id: 'default',
      name: 'Default',
      nameAr: 'افتراضي',
      colors: {
        primary: 'from-purple-600 to-pink-600',
        secondary: 'from-red-500 to-orange-500',
        accent: 'from-blue-500 to-cyan-500',
        background: 'bg-gray-50'
      }
    },
    {
      id: 'maroon',
      name: 'Maroon Classic',
      nameAr: 'كستنائي كلاسيكي',
      colors: {
        primary: 'from-red-800 to-red-600',
        secondary: 'from-purple-800 to-purple-600',
        accent: 'from-pink-600 to-red-500',
        background: 'bg-red-50'
      }
    },
    {
      id: 'purple',
      name: 'Purple Dream',
      nameAr: 'حلم بنفسجي',
      colors: {
        primary: 'from-purple-800 to-purple-600',
        secondary: 'from-indigo-600 to-purple-500',
        accent: 'from-pink-500 to-purple-400',
        background: 'bg-purple-50'
      }
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      nameAr: 'الوضع المظلم',
      colors: {
        primary: 'from-gray-800 to-black',
        secondary: 'from-red-600 to-purple-600',
        accent: 'from-pink-500 to-red-500',
        background: 'bg-gray-900'
      }
    }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('mayar-theme');
    const savedLayout = localStorage.getItem('mayar-layout') as 'grid' | 'list';
    const savedMode = localStorage.getItem('mayar-mode') as 'light' | 'dark';
    
    if (savedTheme) setCurrentTheme(savedTheme);
    if (savedLayout) setCurrentLayout(savedLayout);
    if (savedMode) setCurrentMode(savedMode);
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme.id);
    localStorage.setItem('mayar-theme', theme.id);
    if (onThemeChange) onThemeChange(theme);
  };

  const handleLayoutChange = (layout: 'grid' | 'list') => {
    setCurrentLayout(layout);
    localStorage.setItem('mayar-layout', layout);
    if (onLayoutChange) onLayoutChange(layout);
  };

  const handleModeChange = (mode: 'light' | 'dark') => {
    setCurrentMode(mode);
    localStorage.setItem('mayar-mode', mode);
    if (onModeChange) onModeChange(mode);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        aria-label={language.code === 'en' ? 'Customize theme' : 'تخصيص المظهر'}
      >
        <Settings size={18} />
        <span className={`font-medium ${
          language.code === 'ar' ? 'font-arabic' : ''
        }`}>
          {language.code === 'en' ? 'Customize' : 'تخصيص'}
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute top-full mt-2 ${
            language.code === 'ar' ? 'left-0' : 'right-0'
          } w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden`}>
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Palette className="text-purple-600" size={24} />
                <h3 className={`text-lg font-semibold text-gray-800 ${
                  language.code === 'ar' ? 'font-arabic' : ''
                }`}>
                  {language.code === 'en' ? 'Customization' : 'التخصيص'}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Theme Selection */}
              <div>
                <h4 className={`text-sm font-semibold text-gray-700 mb-3 ${
                  language.code === 'ar' ? 'font-arabic' : ''
                }`}>
                  {language.code === 'en' ? 'Color Theme' : 'لون المظهر'}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => {
                    const name = language.code === 'en' ? theme.name : theme.nameAr;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeChange(theme)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          currentTheme === theme.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${theme.colors.primary} mb-2`} />
                        <span className={`text-xs font-medium text-gray-700 ${
                          language.code === 'ar' ? 'font-arabic' : ''
                        }`}>
                          {name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Layout Selection */}
              <div>
                <h4 className={`text-sm font-semibold text-gray-700 mb-3 ${
                  language.code === 'ar' ? 'font-arabic' : ''
                }`}>
                  {language.code === 'en' ? 'Layout Style' : 'نمط التخطيط'}
                </h4>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleLayoutChange('grid')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                      currentLayout === 'grid'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <Grid size={18} />
                    <span className={`text-sm font-medium ${
                      language.code === 'ar' ? 'font-arabic' : ''
                    }`}>
                      {language.code === 'en' ? 'Grid' : 'شبكة'}
                    </span>
                  </button>
                  <button
                    onClick={() => handleLayoutChange('list')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                      currentLayout === 'list'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <List size={18} />
                    <span className={`text-sm font-medium ${
                      language.code === 'ar' ? 'font-arabic' : ''
                    }`}>
                      {language.code === 'en' ? 'List' : 'قائمة'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Mode Selection */}
              <div>
                <h4 className={`text-sm font-semibold text-gray-700 mb-3 ${
                  language.code === 'ar' ? 'font-arabic' : ''
                }`}>
                  {language.code === 'en' ? 'Display Mode' : 'وضع العرض'}
                </h4>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleModeChange('light')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                      currentMode === 'light'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <Sun size={18} />
                    <span className={`text-sm font-medium ${
                      language.code === 'ar' ? 'font-arabic' : ''
                    }`}>
                      {language.code === 'en' ? 'Light' : 'فاتح'}
                    </span>
                  </button>
                  <button
                    onClick={() => handleModeChange('dark')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                      currentMode === 'dark'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <Moon size={18} />
                    <span className={`text-sm font-medium ${
                      language.code === 'ar' ? 'font-arabic' : ''
                    }`}>
                      {language.code === 'en' ? 'Dark' : 'مظلم'}
                    </span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeCustomizer;