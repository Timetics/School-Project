import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import BackgroundImage from '../components/BackgroundImage';
import LanguageToggle from '../components/LanguageToggle';
import { User, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Admin login logic
    if (username === 'admin' && password === '2025') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('mayar-authenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('username', 'admin');
      setTimeout(() => {
        navigate('/admin-role-selector');
        setIsLoading(false);
      }, 800);
      return;
    }

    // Student login logic
    if (username === 'student' && password === '1') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('mayar-authenticated', 'true');
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('username', 'student');
      setTimeout(() => {
        navigate('/student-dashboard');
        setIsLoading(false);
      }, 800);
      return;
    }

    // Simulate normal login process
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('mayar-authenticated', 'true');
      localStorage.setItem('userRole', role || '');
      localStorage.setItem('username', username);

      if (role === 'student') {
        navigate('/student-dashboard');
      } else if (role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (role === 'parent') {
        navigate('/parent-dashboard');
      } else {
        navigate('/');
      }
      setIsLoading(false);
    }, 1000);
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'student':
        return `${translations.roles.student} ${translations.loginSuffix}`;
      case 'teacher':
        return `${translations.roles.teacher} ${translations.loginSuffix}`;
      case 'parent':
        return `${translations.roles.parent} ${translations.loginSuffix}`;
      default:
        return translations.loginSuffix;
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <BackgroundImage />
      
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-900/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-300/30">
            <User className="w-8 h-8 text-purple-800" />
          </div>
          <h1 className="text-2xl font-bold text-purple-900 mb-2">
            {getRoleTitle()}
          </h1>
          <p className="text-purple-700/80">
            {translations.pleaseEnterCredentials}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-purple-900 mb-2">
              {translations.username}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600/60" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-purple-300/50 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm hover:bg-white/90"
                placeholder={translations.enterUsername}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-purple-900 mb-2">
              {translations.password}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600/60" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-purple-300/50 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm hover:bg-white/90"
                placeholder={translations.enterPassword}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-600 via-red-600 to-purple-700 hover:from-pink-700 hover:via-red-700 hover:to-purple-800 disabled:from-pink-400 disabled:via-red-400 disabled:to-purple-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-pink-500/30 hover:shadow-xl transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>{translations.signIn}</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-purple-700 hover:text-pink-600 text-sm font-medium transition-colors duration-300 hover:underline"
          >
            {translations.backToRoles}
          </button>
        </div>
      </div>
    </div>
  );
}