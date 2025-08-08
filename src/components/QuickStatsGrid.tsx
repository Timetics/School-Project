import React from 'react';
import { Mail, Calendar, BookOpen, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StatCard {
  id: string;
  labelEn: string;
  labelAr: string;
  value: number | string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgColor: string;
  trend?: number;
}

interface QuickStatsGridProps {
  className?: string;
}

const QuickStatsGrid: React.FC<QuickStatsGridProps> = ({ className = "" }) => {
  const { language } = useLanguage();

  const stats: StatCard[] = [
    {
      id: 'unread-messages',
      labelEn: 'Unread Messages',
      labelAr: 'الرسائل غير المقروءة',
      value: 5,
      icon: Mail,
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      trend: 2
    },
    {
      id: 'upcoming-exams',
      labelEn: 'Upcoming Exams',
      labelAr: 'الامتحانات القادمة',
      value: 3,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      trend: 1
    },
    {
      id: 'assignments-due',
      labelEn: 'Assignments Due',
      labelAr: 'الواجبات المستحقة',
      value: 7,
      icon: BookOpen,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200',
      trend: -1
    },
    {
      id: 'attendance',
      labelEn: 'Attendance',
      labelAr: 'نسبة الحضور',
      value: '94%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      trend: 2
    },
    {
      id: 'average-grade',
      labelEn: 'Average Grade',
      labelAr: 'المعدل العام',
      value: 'A-',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      trend: 5
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${className}`}>
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        const label = language.code === 'en' ? stat.labelEn : stat.labelAr;
        
        return (
          <div
            key={stat.id}
            className={`${stat.bgColor} border rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-white/50 ${stat.color}`}>
                <IconComponent size={20} />
              </div>
              {stat.trend && (
                <div className={`text-xs px-2 py-1 rounded-full ${
                  stat.trend > 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {stat.trend > 0 ? '+' : ''}{stat.trend}
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-800">
                {stat.value}
              </div>
              <div className={`text-sm text-gray-600 ${
                language.code === 'ar' ? 'font-arabic text-right' : ''
              }`}>
                {label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStatsGrid;