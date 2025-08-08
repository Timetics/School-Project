import React from 'react';
import { Clock, FileText, MessageSquare, Award, Upload } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Activity {
  id: string;
  type: 'submission' | 'feedback' | 'grade' | 'message';
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  timestamp: Date;
  subject: string;
  subjectAr: string;
  status?: 'completed' | 'pending' | 'reviewed';
}

interface RecentActivityProps {
  className?: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ className = "" }) => {
  const { language } = useLanguage();

  const activities: Activity[] = [
    {
      id: '1',
      type: 'grade',
      titleEn: 'Grade Received',
      titleAr: 'تم استلام الدرجة',
      descriptionEn: 'Mathematics Quiz - Grade: A',
      descriptionAr: 'اختبار الرياضيات - الدرجة: ممتاز',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      subject: 'Mathematics',
      subjectAr: 'الرياضيات',
      status: 'completed'
    },
    {
      id: '2',
      type: 'submission',
      titleEn: 'Assignment Submitted',
      titleAr: 'تم تسليم الواجب',
      descriptionEn: 'Science Lab Report submitted successfully',
      descriptionAr: 'تم تسليم تقرير مختبر العلوم بنجاح',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      subject: 'Science',
      subjectAr: 'العلوم',
      status: 'pending'
    },
    {
      id: '3',
      type: 'feedback',
      titleEn: 'Teacher Feedback',
      titleAr: 'تعليق المعلم',
      descriptionEn: 'Great work on your English essay!',
      descriptionAr: 'عمل رائع في مقالة اللغة الإنجليزية!',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      subject: 'English',
      subjectAr: 'اللغة الإنجليزية',
      status: 'reviewed'
    },
    {
      id: '4',
      type: 'message',
      titleEn: 'New Message',
      titleAr: 'رسالة جديدة',
      descriptionEn: 'Message from Mr. Ahmed about upcoming exam',
      descriptionAr: 'رسالة من الأستاذ أحمد حول الامتحان القادم',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      subject: 'Mathematics',
      subjectAr: 'الرياضيات',
      status: 'pending'
    },
    {
      id: '5',
      type: 'submission',
      titleEn: 'Assignment Submitted',
      titleAr: 'تم تسليم الواجب',
      descriptionEn: 'History research paper submitted',
      descriptionAr: 'تم تسليم بحث التاريخ',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      subject: 'History',
      subjectAr: 'التاريخ',
      status: 'completed'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return Upload;
      case 'feedback':
        return MessageSquare;
      case 'grade':
        return Award;
      case 'message':
        return MessageSquare;
      default:
        return FileText;
    }
  };

  const getActivityColor = (type: string, status?: string) => {
    if (status === 'completed') return 'text-green-600 bg-green-50 border-green-200';
    if (status === 'pending') return 'text-orange-600 bg-orange-50 border-orange-200';
    if (status === 'reviewed') return 'text-blue-600 bg-blue-50 border-blue-200';
    
    switch (type) {
      case 'submission':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'feedback':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'grade':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'message':
        return 'text-pink-600 bg-pink-50 border-pink-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return language.code === 'en' ? `${days}d ago` : `منذ ${days} أيام`;
    } else if (hours > 0) {
      return language.code === 'en' ? `${hours}h ago` : `منذ ${hours} ساعات`;
    } else {
      return language.code === 'en' ? 'Just now' : 'الآن';
    }
  };

  const getStatusLabel = (status?: string) => {
    if (!status) return '';
    
    switch (status) {
      case 'completed':
        return language.code === 'en' ? 'Completed' : 'مكتمل';
      case 'pending':
        return language.code === 'en' ? 'Pending' : 'قيد الانتظار';
      case 'reviewed':
        return language.code === 'en' ? 'Reviewed' : 'تمت المراجعة';
      default:
        return '';
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Clock className="text-purple-600" size={24} />
          <h3 className={`text-xl font-semibold text-gray-800 ${
            language.code === 'ar' ? 'font-arabic' : ''
          }`}>
            {language.code === 'en' ? 'Recent Activity' : 'النشاط الأخير'}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity) => {
            const IconComponent = getActivityIcon(activity.type);
            const title = language.code === 'en' ? activity.titleEn : activity.titleAr;
            const description = language.code === 'en' ? activity.descriptionEn : activity.descriptionAr;
            const subject = language.code === 'en' ? activity.subject : activity.subjectAr;
            const colorClasses = getActivityColor(activity.type, activity.status);
            
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                <div className={`p-2 rounded-lg border ${colorClasses}`}>
                  <IconComponent size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className={`font-semibold text-gray-800 ${
                        language.code === 'ar' ? 'font-arabic text-right' : ''
                      }`}>
                        {title}
                      </h4>
                      <p className={`text-sm text-gray-600 mt-1 ${
                        language.code === 'ar' ? 'font-arabic text-right' : ''
                      }`}>
                        {description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs text-gray-500 ${
                          language.code === 'ar' ? 'font-arabic' : ''
                        }`}>
                          {subject}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    {activity.status && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        activity.status === 'completed' 
                          ? 'bg-green-100 text-green-700'
                          : activity.status === 'pending'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-blue-700'
                      } ${language.code === 'ar' ? 'font-arabic' : ''}`}>
                        {getStatusLabel(activity.status)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;