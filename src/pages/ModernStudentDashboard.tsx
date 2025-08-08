import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import BackgroundImage from '../components/BackgroundImage';
import LanguageToggle from '../components/LanguageToggle';
import ThemeCustomizer from '../components/ThemeCustomizer';
import PersonalizedWelcome from '../components/PersonalizedWelcome';
import QuickStatsGrid from '../components/QuickStatsGrid';
import ModernTimetable from '../components/ModernTimetable';
import SubjectsGrid from '../components/SubjectsGrid';
import NotificationsPanel from '../components/NotificationsPanel';
import ShortcutsPanel from '../components/ShortcutsPanel';
import RecentActivity from '../components/RecentActivity';

const ModernStudentDashboard: React.FC = () => {
  const { translations, language } = useLanguage();
  const navigate = useNavigate();
  const [currentLayout, setCurrentLayout] = useState<'grid' | 'list'>('grid');
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('mayar-authenticated');
    if (!isAuthenticated) {
      navigate('/login/student');
    }

    // Load saved preferences
    const savedLayout = localStorage.getItem('mayar-layout') as 'grid' | 'list';
    const savedMode = localStorage.getItem('mayar-mode') as 'light' | 'dark';
    
    if (savedLayout) setCurrentLayout(savedLayout);
    if (savedMode) setCurrentMode(savedMode);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('mayar-authenticated');
    localStorage.removeItem('mayar-last-role');
    navigate('/');
  };

  const handleSubjectClick = (subjectId: string, action?: string) => {
    console.log('Subject clicked:', subjectId, 'Action:', action);
    alert(`Opening ${action || 'main'} for ${subjectId}`);
  };

  const studentName = localStorage.getItem('username') || 'Student';
  const displayName = studentName === 'student' ? 'Ahmed Al-Rashid' : studentName;

  return (
    <div className={`min-h-screen relative ${
      currentMode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {currentMode === 'light' && <BackgroundImage />}
      
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className={`text-white text-2xl md:text-3xl font-bold ${
              language.code === 'ar' ? 'font-arabic' : ''
            }`}>
              {translations.studentDashboard}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeCustomizer 
              onLayoutChange={setCurrentLayout}
              onModeChange={setCurrentMode}
            />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label={translations.logout}
            >
              <LogOut size={18} />
              <span className={`font-medium ${
                language.code === 'ar' ? 'font-arabic' : ''
              }`}>
                {translations.logout}
              </span>
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <PersonalizedWelcome 
          studentName={displayName}
          profilePicture="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
          className="mb-8"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Quick Stats */}
          <QuickStatsGrid />

          {/* Main Dashboard Grid */}
          <div className={`grid gap-8 ${
            currentLayout === 'grid' 
              ? 'grid-cols-1 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            
            {/* Left Column - Timetable and Notifications */}
            <div className={`space-y-8 ${
              currentLayout === 'grid' ? 'lg:col-span-1' : ''
            }`}>
              <ModernTimetable />
              <NotificationsPanel />
            </div>

            {/* Middle Column - Subjects and Shortcuts */}
            <div className={`space-y-8 ${
              currentLayout === 'grid' ? 'lg:col-span-2' : ''
            }`}>
              <SubjectsGrid onSubjectClick={handleSubjectClick} />
              <ShortcutsPanel />
            </div>
          </div>

          {/* Recent Activity - Full Width */}
          <RecentActivity />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 p-6 text-center">
        <p className={`text-sm ${
          currentMode === 'dark' ? 'text-gray-400' : 'text-white/60'
        }`}>
          © 2025 Mayar International Schools. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ModernStudentDashboard;