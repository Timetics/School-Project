import React from 'react';
import { BookOpen, FileText, Award, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { subjects, iconComponents } from '../data/dashboard';

interface SubjectAction {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

interface SubjectsGridProps {
  className?: string;
  onSubjectClick?: (subjectId: string, action?: string) => void;
}

const SubjectsGrid: React.FC<SubjectsGridProps> = ({ 
  className = "",
  onSubjectClick 
}) => {
  const { language } = useLanguage();

  const subjectActions: SubjectAction[] = [
    {
      id: 'resources',
      labelEn: 'Resources',
      labelAr: 'المصادر',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      id: 'assignments',
      labelEn: 'Assignments',
      labelAr: 'الواجبات',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      id: 'grades',
      labelEn: 'Grades',
      labelAr: 'الدرجات',
      icon: Award,
      color: 'text-green-600'
    },
    {
      id: 'discussions',
      labelEn: 'Discussions',
      labelAr: 'المناقشات',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  const handleSubjectClick = (subjectId: string, action?: string) => {
    if (onSubjectClick) {
      onSubjectClick(subjectId, action);
    } else {
      alert(`Opening ${action || 'main'} for ${subjectId}`);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <h3 className={`text-xl font-semibold text-gray-800 ${
          language.code === 'ar' ? 'font-arabic' : ''
        }`}>
          {language.code === 'en' ? 'My Subjects' : 'موادي الدراسية'}
        </h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((subject) => {
            const IconComponent = iconComponents[subject.icon as keyof typeof iconComponents];
            const label = language.code === 'en' ? subject.labelEn : subject.labelAr;
            
            return (
              <div
                key={subject.id}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div 
                  onClick={() => handleSubjectClick(subject.id)}
                  className="text-center mb-4"
                >
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${subject.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <h4 className={`font-semibold text-gray-800 text-sm ${
                    language.code === 'ar' ? 'font-arabic' : ''
                  }`}>
                    {label}
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {subjectActions.map((action) => {
                    const ActionIcon = action.icon;
                    const actionLabel = language.code === 'en' ? action.labelEn : action.labelAr;
                    
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleSubjectClick(subject.id, action.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 ${action.color}`}
                      >
                        <ActionIcon size={16} />
                        <span className={`text-xs font-medium text-gray-700 ${
                          language.code === 'ar' ? 'font-arabic' : ''
                        }`}>
                          {actionLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubjectsGrid;