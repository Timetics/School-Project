import { UserIcon, GraduationCapIcon, BookOpenIcon, EyeIcon, BriefcaseIcon, MessageSquareIcon } from 'lucide-react';
import type { RoleConfig } from '../types';

export const roles: RoleConfig[] = [
  {
    id: 'parent',
    labelEn: 'PARENT',
    labelAr: 'ولي الأمر',
    icon: 'UserIcon'
  },
  {
    id: 'teacher',
    labelEn: 'TEACHER',
    labelAr: 'المعلم',
    icon: 'GraduationCapIcon'
  },
  {
    id: 'student',
    labelEn: 'STUDENT',
    labelAr: 'الطالب',
    icon: 'BookOpenIcon'
  },
  {
    id: 'supervisor',
    labelEn: 'SUPERVISOR',
    labelAr: 'المشرف',
    icon: 'EyeIcon'
  },
  {
    id: 'employee',
    labelEn: 'EMPLOYEE',
    labelAr: 'الموظف',
    icon: 'BriefcaseIcon'
  },
  {
    id: 'advisor',
    labelEn: 'ADVISOR',
    labelAr: 'المستشار',
    icon: 'MessageSquareIcon'
  }
];

export const iconComponents = {
  UserIcon,
  GraduationCapIcon,
  BookOpenIcon,
  EyeIcon,
  BriefcaseIcon,
  MessageSquareIcon
};