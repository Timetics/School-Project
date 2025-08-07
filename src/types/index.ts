export type Role = 'parent' | 'teacher' | 'student' | 'supervisor' | 'employee' | 'advisor';

export interface RoleConfig {
  id: Role;
  labelEn: string;
  labelAr: string;
  icon: string;
}

export interface Language {
  code: 'en' | 'ar';
  name: string;
  dir: 'ltr' | 'rtl';
}

export interface Translations {
  eSchool: string;
  schoolName: string;
  selectRole: string;
  login: string;
  username: string;
  password: string;
  forgotPassword: string;
  backToRoles: string;
  loading: string;
  studentDashboard: string;
  dashboard: string;
  logout: string;
  schoolMessages: string;
  studentAffairs: string;
  academicAffairs: string;
  marksReport: string;
  tickets: string;
  lms: string;
  virtualClassrooms: string;
  platforms: string;
  mail: string;
  newMail: string;
  upcomingExams: string;
  classWorks: string;
  availableHomeworks: string;
  schoolNotifications: string;
  dailySchedule: string;
  weeklySchedule: string;
  noDataPlaceholder: string;
  pleaseEnterCredentials: string;
  enterUsername: string;
  enterPassword: string;
  signIn: string;
  loginSuffix: string;
  subjects: {
    islamicEducation: string;
    arabicLanguage: string;
    englishLanguage: string;
    mathematics: string;
    socialEducation: string;
    science: string;
    artEducation: string;
    physicalEducation: string;
    computerStudies: string;
    frenchLanguage: string;
  };
  roles: {
    parent: string;
    teacher: string;
    student: string;
    supervisor: string;
    employee: string;
    advisor: string;
  };
}