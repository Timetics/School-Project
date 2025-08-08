import React, { useState } from 'react';
import { Bell, AlertCircle, CheckCircle, Info, X, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Notification {
  id: string;
  type: 'announcement' | 'grade' | 'urgent' | 'info';
  titleEn: string;
  titleAr: string;
  messageEn: string;
  messageAr: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationsPanelProps {
  className?: string;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ className = "" }) => {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'urgent',
      titleEn: 'Exam Schedule Updated',
      titleAr: 'تحديث جدول الامتحانات',
      messageEn: 'Mathematics exam has been rescheduled to next Friday.',
      messageAr: 'تم تأجيل امتحان الرياضيات إلى الجمعة القادمة.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'grade',
      titleEn: 'New Grade Available',
      titleAr: 'درجة جديدة متاحة',
      messageEn: 'Your Science assignment grade is now available.',
      messageAr: 'درجة واجب العلوم متاحة الآن.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'announcement',
      titleEn: 'School Event',
      titleAr: 'فعالية مدرسية',
      messageEn: 'Annual Science Fair will be held next month.',
      messageAr: 'معرض العلوم السنوي سيقام الشهر القادم.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'info',
      titleEn: 'Library Hours Extended',
      titleAr: 'تمديد ساعات المكتبة',
      messageEn: 'Library will be open until 8 PM during exam week.',
      messageAr: 'ستكون المكتبة مفتوحة حتى الساعة 8 مساءً خلال أسبوع الامتحانات.',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      isRead: true,
      priority: 'medium'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return AlertCircle;
      case 'grade':
        return Star;
      case 'announcement':
        return Bell;
      case 'info':
        return Info;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'border-red-300 bg-red-50';
    switch (type) {
      case 'urgent':
        return 'border-red-300 bg-red-50';
      case 'grade':
        return 'border-green-300 bg-green-50';
      case 'announcement':
        return 'border-blue-300 bg-blue-50';
      case 'info':
        return 'border-purple-300 bg-purple-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getIconColor = (type: string, priority: string) => {
    if (priority === 'high') return 'text-red-600';
    switch (type) {
      case 'urgent':
        return 'text-red-600';
      case 'grade':
        return 'text-green-600';
      case 'announcement':
        return 'text-blue-600';
      case 'info':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="text-purple-600" size={24} />
            <h3 className={`text-xl font-semibold text-gray-800 ${
              language.code === 'ar' ? 'font-arabic' : ''
            }`}>
              {language.code === 'en' ? 'Notifications' : 'الإشعارات'}
            </h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          
          <button
            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
          >
            {language.code === 'en' ? 'Mark all read' : 'تحديد الكل كمقروء'}
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="mx-auto text-gray-400 mb-4" size={48} />
              <p className={`text-gray-500 ${
                language.code === 'ar' ? 'font-arabic' : ''
              }`}>
                {language.code === 'en' ? 'No notifications' : 'لا توجد إشعارات'}
              </p>
            </div>
          ) : (
            notifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              const title = language.code === 'en' ? notification.titleEn : notification.titleAr;
              const message = language.code === 'en' ? notification.messageEn : notification.messageAr;
              
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    getNotificationColor(notification.type, notification.priority)
                  } ${!notification.isRead ? 'shadow-md' : 'opacity-75'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-white/50 ${
                      getIconColor(notification.type, notification.priority)
                    }`}>
                      <IconComponent size={20} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`font-semibold text-gray-800 ${
                          language.code === 'ar' ? 'font-arabic text-right' : ''
                        }`}>
                          {title}
                          {!notification.isRead && (
                            <span className="ml-2 w-2 h-2 bg-red-500 rounded-full inline-block"></span>
                          )}
                        </h4>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      <p className={`text-sm text-gray-600 mt-1 ${
                        language.code === 'ar' ? 'font-arabic text-right' : ''
                      }`}>
                        {message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        
                        {notification.priority === 'high' && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                            {language.code === 'en' ? 'Urgent' : 'عاجل'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;