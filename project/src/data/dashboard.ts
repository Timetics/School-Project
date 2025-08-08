import { 
  MessageSquare, 
  Users, 
  GraduationCap, 
  FileText, 
  Ticket, 
  BookOpen, 
  Video, 
  Globe, 
  Mail,
  Bell,
  Calendar,
  ClipboardList,
  BookMarked,
  Star,
  Languages,
  Calculator,
  MapPin,
  Microscope,
  Palette,
  Dumbbell,
  Monitor
} from 'lucide-react';

export interface DashboardSection {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: string;
  color: string;
}

export interface Subject {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: string;
  color: string;
}

export const dashboardSections: DashboardSection[] = [
  {
    id: 'school-messages',
    labelEn: 'School Messages',
    labelAr: 'رسائل المدرسة',
    icon: 'MessageSquare',
    color: 'from-purple-600 to-purple-700'
  },
  {
    id: 'student-affairs',
    labelEn: 'Student Affairs',
    labelAr: 'شؤون الطلاب',
    icon: 'Users',
    color: 'from-pink-600 to-pink-700'
  },
  {
    id: 'academic-affairs',
    labelEn: 'Academic Affairs',
    labelAr: 'الشؤون الأكاديمية',
    icon: 'GraduationCap',
    color: 'from-indigo-600 to-indigo-700'
  },
  {
    id: 'marks-report',
    labelEn: 'Marks Report',
    labelAr: 'تقرير الدرجات',
    icon: 'FileText',
    color: 'from-emerald-600 to-emerald-700'
  },
  {
    id: 'tickets',
    labelEn: 'Tickets',
    labelAr: 'التذاكر',
    icon: 'Ticket',
    color: 'from-orange-600 to-orange-700'
  },
  {
    id: 'lms',
    labelEn: 'LMS',
    labelAr: 'نظام إدارة التعلم',
    icon: 'BookOpen',
    color: 'from-blue-600 to-blue-700'
  },
  {
    id: 'virtual-classrooms',
    labelEn: 'Virtual Classrooms',
    labelAr: 'الفصول الافتراضية',
    icon: 'Video',
    color: 'from-teal-600 to-teal-700'
  },
  {
    id: 'platforms',
    labelEn: 'Platforms',
    labelAr: 'المنصات',
    icon: 'Globe',
    color: 'from-cyan-600 to-cyan-700'
  },
  {
    id: 'mail',
    labelEn: 'Mail',
    labelAr: 'البريد',
    icon: 'Mail',
    color: 'from-red-600 to-red-700'
  }
];

export const quickStats = [
  {
    id: 'new-mail',
    labelEn: 'New Mail',
    labelAr: 'بريد جديد',
    icon: 'Mail',
    count: 3,
    color: 'text-red-600'
  },
  {
    id: 'upcoming-exams',
    labelEn: 'Upcoming Exams',
    labelAr: 'الامتحانات القادمة',
    icon: 'Calendar',
    count: 2,
    color: 'text-orange-600'
  },
  {
    id: 'class-works',
    labelEn: 'Class Works',
    labelAr: 'أعمال الفصل',
    icon: 'ClipboardList',
    count: 5,
    color: 'text-blue-600'
  },
  {
    id: 'available-homeworks',
    labelEn: 'Available Homeworks',
    labelAr: 'الواجبات المتاحة',
    icon: 'BookMarked',
    count: 4,
    color: 'text-green-600'
  },
  {
    id: 'school-notifications',
    labelEn: 'School Notifications',
    labelAr: 'إشعارات المدرسة',
    icon: 'Bell',
    count: 7,
    color: 'text-purple-600'
  }
];

export const subjects: Subject[] = [
  {
    id: 'islamic-education',
    labelEn: 'Islamic Education',
    labelAr: 'التربية الإسلامية',
    icon: 'Star',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'arabic-language',
    labelEn: 'Arabic Language',
    labelAr: 'اللغة العربية',
    icon: 'Languages',
    color: 'from-amber-500 to-amber-600'
  },
  {
    id: 'english-language',
    labelEn: 'English Language',
    labelAr: 'اللغة الإنجليزية',
    icon: 'Globe',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'mathematics',
    labelEn: 'Mathematics',
    labelAr: 'الرياضيات',
    icon: 'Calculator',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'social-education',
    labelEn: 'Social & National Education',
    labelAr: 'التربية الاجتماعية والوطنية',
    icon: 'MapPin',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'science',
    labelEn: 'Science',
    labelAr: 'العلوم',
    icon: 'Microscope',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'art-education',
    labelEn: 'Art Education',
    labelAr: 'التربية الفنية',
    icon: 'Palette',
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'physical-education',
    labelEn: 'Physical Education',
    labelAr: 'التربية البدنية',
    icon: 'Dumbbell',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'computer-studies',
    labelEn: 'Computer Studies',
    labelAr: 'دراسات الحاسوب',
    icon: 'Monitor',
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'french-language',
    labelEn: 'French Language',
    labelAr: 'اللغة الفرنسية',
    icon: 'Languages',
    color: 'from-teal-500 to-teal-600'
  }
];

export const iconComponents = {
  MessageSquare,
  Users,
  GraduationCap,
  FileText,
  Ticket,
  BookOpen,
  Video,
  Globe,
  Mail,
  Bell,
  Calendar,
  ClipboardList,
  BookMarked,
  Star,
  Languages,
  Calculator,
  MapPin,
  Microscope,
  Palette,
  Dumbbell,
  Monitor
};