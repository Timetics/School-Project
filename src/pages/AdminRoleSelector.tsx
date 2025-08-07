import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

const roles = [
  { id: 'student', label: 'Student', dashboard: '/student-dashboard' },
  { id: 'teacher', label: 'Teacher', dashboard: '/teacher-dashboard' },
  { id: 'parent', label: 'Parent', dashboard: '/parent-dashboard' },
  // Add more roles and dashboards as needed
];

const AdminRoleSelector: React.FC = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();

  const handleRoleSelect = (role: string, dashboard: string) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', 'admin');
    navigate(dashboard);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <BackgroundImage />
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 z-10">
        <h1 className="text-2xl font-bold text-purple-900 mb-6 text-center">Admin: Select Role to Access</h1>
        <div className="flex flex-col gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id, role.dashboard)}
              className="w-full bg-gradient-to-r from-pink-600 via-red-600 to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:from-pink-700 hover:via-red-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRoleSelector;
