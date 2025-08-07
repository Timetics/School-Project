import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { dashboardSections, quickStats, subjects } from '../data/dashboard';
import DashboardCard from '../components/DashboardCard';
import SubjectCard from '../components/SubjectCard';
import QuickStatsCard from '../components/QuickStatsCard';
import TimetableCard from '../components/TimetableCard';
import LanguageToggle from '../components/LanguageToggle';
import BackgroundImage from '../components/BackgroundImage';

const StudentDashboard: React.FC = () => {
  const { translations, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated (in a real app, you'd check auth state)
    const isAuthenticated = localStorage.getItem('mayar-authenticated');
    if (!isAuthenticated) {
      navigate('/login/student');
    }
  }, [navigate]);

  const handleSectionClick = (sectionId: string) => {
    console.log('Navigating to section:', sectionId);
    // In a real app, you'd navigate to the specific section
    alert(`Navigating to ${sectionId} section`);
  };

  const handleSubjectClick = (subjectId: string) => {
    console.log('Navigating to subject:', subjectId);
    // In a real app, you'd navigate to the specific subject
    alert(`Opening ${subjectId} subject`);
  };

  const handleLogout = () => {
    localStorage.removeItem('mayar-authenticated');
    localStorage.removeItem('mayar-last-role');
    navigate('/');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundImage />
      
      {/* Header - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
        <h1 className={`text-white text-3xl md:text-4xl font-bold mb-2 ${
          language.code === 'ar' ? 'font-arabic' : ''
        }`}>
          {translations.studentDashboard}
        </h1>
        <p className={`text-pink-200 text-lg ${
          language.code === 'ar' ? 'font-arabic' : ''
        }`}>
          {translations.schoolName}
        </p>
        <div className="mt-4 flex items-center gap-4 justify-center">
          <LanguageToggle />
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

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickStats.map((stat) => (
              <QuickStatsCard key={stat.id} {...stat} />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Dashboard Sections */}
            <div className="lg:col-span-2">
              <h2 className={`text-white text-xl font-semibold mb-6 ${
                language.code === 'ar' ? 'font-arabic' : ''
              }`}>
                {translations.dashboard}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dashboardSections.map((section) => (
                  <DashboardCard 
                    key={section.id} 
                    section={section} 
                    onClick={handleSectionClick}
                  />
                ))}
              </div>
            </div>

            {/* Timetable */}
            <div className="lg:col-span-1">
              <TimetableCard type="daily" />
            </div>
          </div>

          {/* Subjects Grid */}
          <div>
            <h2 className={`text-white text-xl font-semibold mb-6 ${
              language.code === 'ar' ? 'font-arabic' : ''
            }`}>
              {language.code === 'en' ? 'Subjects' : 'المواد الدراسية'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {subjects.map((subject) => (
                <SubjectCard 
                  key={subject.id} 
                  subject={subject} 
                  onClick={handleSubjectClick}
                />
              ))}
            </div>
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

export default StudentDashboard;