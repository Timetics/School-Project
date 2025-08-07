import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, Translations } from '../types';

const languages: Language[] = [
  { code: 'en', name: 'EN', dir: 'ltr' },
  { code: 'ar', name: 'عربي', dir: 'rtl' }
];

const translations: Record<string, Translations> = {
  en: {
    eSchool: 'E-School',
    schoolName: 'Mayar International Schools',
    selectRole: 'Select Your Role',
    login: 'LOGIN',
    username: 'Username or Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    backToRoles: 'Back to Role Selection',
    loading: 'Loading...',
    studentDashboard: 'Student Dashboard',
    dashboard: 'Dashboard',
    logout: 'Logout',
    schoolMessages: 'School Messages',
    studentAffairs: 'Student Affairs',
    academicAffairs: 'Academic Affairs',
    marksReport: 'Marks Report',
    tickets: 'Tickets',
    lms: 'LMS',
    virtualClassrooms: 'Virtual Classrooms',
    platforms: 'Platforms',
    mail: 'Mail',
    newMail: 'New Mail',
    upcomingExams: 'Upcoming Exams',
    classWorks: 'Class Works',
    availableHomeworks: 'Available Homeworks',
    schoolNotifications: 'School Notifications',
    dailySchedule: 'Daily Schedule',
    weeklySchedule: 'Weekly Schedule',
    noDataPlaceholder: 'No data available at the moment',
    pleaseEnterCredentials: 'Please enter your credentials to continue',
    enterUsername: 'Enter your username',
    enterPassword: 'Enter your password',
    signIn: 'Sign In',
    loginSuffix: 'Login',
    subjects: {
      islamicEducation: 'Islamic Education',
      arabicLanguage: 'Arabic Language',
      englishLanguage: 'English Language',
      mathematics: 'Mathematics',
      socialEducation: 'Social & National Education',
      science: 'Science',
      artEducation: 'Art Education',
      physicalEducation: 'Physical Education',
      computerStudies: 'Computer Studies',
      frenchLanguage: 'French Language'
    },
    roles: {
      parent: 'PARENT',
      teacher: 'TEACHER',
      student: 'STUDENT',
      supervisor: 'SUPERVISOR',
      employee: 'EMPLOYEE',
      advisor: 'ADVISOR'
    }
  },
  ar: {
    eSchool: 'المدرسة الإلكترونية',
    schoolName: 'مدارس ميار الدولية',
    selectRole: 'اختر دورك',
    login: 'تسجيل الدخول',
    username: 'اسم المستخدم أو البريد الإلكتروني',
    password: 'كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    backToRoles: 'العودة لاختيار الدور',
    loading: 'جاري التحميل...',
    studentDashboard: 'لوحة تحكم الطالب',
    dashboard: 'لوحة التحكم',
    logout: 'تسجيل الخروج',
    schoolMessages: 'رسائل المدرسة',
    studentAffairs: 'شؤون الطلاب',
    academicAffairs: 'الشؤون الأكاديمية',
    marksReport: 'تقرير الدرجات',
    tickets: 'التذاكر',
    lms: 'نظام إدارة التعلم',
    virtualClassrooms: 'الفصول الافتراضية',
    platforms: 'المنصات',
    mail: 'البريد',
    newMail: 'بريد جديد',
    upcomingExams: 'الامتحانات القادمة',
    classWorks: 'أعمال الفصل',
    availableHomeworks: 'الواجبات المتاحة',
    schoolNotifications: 'إشعارات المدرسة',
    dailySchedule: 'الجدول اليومي',
    weeklySchedule: 'الجدول الأسبوعي',
    noDataPlaceholder: 'لا توجد بيانات متاحة في الوقت الحالي',
    pleaseEnterCredentials: 'يرجى إدخال بيانات الاعتماد للمتابعة',
    enterUsername: 'أدخل اسم المستخدم',
    enterPassword: 'أدخل كلمة المرور',
    signIn: 'تسجيل الدخول',
    loginSuffix: 'تسجيل الدخول',
    subjects: {
      islamicEducation: 'التربية الإسلامية',
      arabicLanguage: 'اللغة العربية',
      englishLanguage: 'اللغة الإنجليزية',
      mathematics: 'الرياضيات',
      socialEducation: 'التربية الاجتماعية والوطنية',
      science: 'العلوم',
      artEducation: 'التربية الفنية',
      physicalEducation: 'التربية البدنية',
      computerStudies: 'دراسات الحاسوب',
      frenchLanguage: 'اللغة الفرنسية'
    },
    roles: {
      parent: 'ولي الأمر',
      teacher: 'المعلم',
      student: 'الطالب',
      supervisor: 'المشرف',
      employee: 'الموظف',
      advisor: 'المستشار'
    }
  }
};

interface LanguageContextType {
  language: Language;
  translations: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const savedLang = localStorage.getItem('mayar-language');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) setCurrentLanguage(lang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = currentLanguage.dir;
    document.documentElement.lang = currentLanguage.code;
    localStorage.setItem('mayar-language', currentLanguage.code);
  }, [currentLanguage]);

  const toggleLanguage = () => {
    setCurrentLanguage(prev => 
      prev.code === 'en' ? languages[1] : languages[0]
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language: currentLanguage,
        translations: translations[currentLanguage.code],
        toggleLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};