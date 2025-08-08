import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PersonalizedWelcomeProps {
  studentName: string;
  profilePicture?: string;
  className?: string;
}

const PersonalizedWelcome: React.FC<PersonalizedWelcomeProps> = ({ 
  studentName, 
  profilePicture,
  className = ""
}) => {
  const { language, translations } = useLanguage();
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (language.code === 'ar') {
      if (hour < 12) return 'صباح الخير';
      if (hour < 17) return 'مساء الخير';
      return 'مساء الخير';
    } else {
      if (hour < 12) return 'Good Morning';
      if (hour < 17) return 'Good Afternoon';
      return 'Good Evening';
    }
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString(language.code === 'ar' ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString(language.code === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`bg-gradient-to-br from-purple-600 via-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          {profilePicture ? (
            <img 
              src={profilePicture} 
              alt={studentName}
              className="w-16 h-16 rounded-full border-3 border-white/30 object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/20 border-3 border-white/30 flex items-center justify-center">
              <User size={32} className="text-white/80" />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex-1">
          <h1 className={`text-2xl font-bold mb-1 ${
            language.code === 'ar' ? 'font-arabic text-right' : ''
          }`}>
            {getGreeting()}, {studentName}!
          </h1>
          <p className={`text-white/80 text-sm ${
            language.code === 'ar' ? 'font-arabic text-right' : ''
          }`}>
            {language.code === 'ar' ? 'مرحباً بك في لوحة التحكم' : 'Welcome to your dashboard'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-white/70" />
          <span className={`text-white/90 ${
            language.code === 'ar' ? 'font-arabic' : ''
          }`}>
            {formatDate()}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-white/70" />
          <span className="text-white/90 font-mono">
            {formatTime()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedWelcome;