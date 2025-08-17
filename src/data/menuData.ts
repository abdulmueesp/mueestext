import {
    Home,
    Users,
    BookOpen,
    FileText,
    BarChart3,
    Settings,
    FilePlus,
    CreditCard,
    UserCheck,
    Award,
    GraduationCap,
    TrendingUp,
    Bell,
    LogOut
} from 'lucide-react';

export const menuData = {
  admin: [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
   
    { id: 'subscription', icon: CreditCard, label: 'Create Subscription', path: '/subscription' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
  ],
  user: [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
    { id: 'Create Paper', icon: FilePlus, label: 'Create Paper', path: '/paper' },
    { id: 'exams', icon: FileText, label: 'Exams', path: '/exams' },
    { id: 'results', icon: Award, label: 'Results', path: '/results' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' }
  ]
};
