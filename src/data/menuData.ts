import { BiAward, BiCreditCard, BiHome } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FcSettings } from "react-icons/fc";
import { FiFilePlus, FiFileText } from "react-icons/fi";


export const menuData = {
  admin: [
    { id: 'dashboard', icon: BiHome, label: 'Dashboard', path: '/dashboard' }, 
    { id: 'subscription', icon: BiCreditCard, label: 'Subscription', path: '/subscription' },
    { id: 'users', icon: BiCreditCard, label: 'Users', path: '/users' },
    { id: 'examgen', icon: BiCreditCard, label: 'Examboard', path: '/examboard' },
    { id: 'modules', icon: BiCreditCard, label: 'Modules', path: '/modules' },
    { id: 'courses', icon: BiCreditCard, label: 'Courses', path: '/courses' },
    { id: 'chapters', icon: BiCreditCard, label: 'Chapters', path: '/chapters' },
    { id: 'settings', icon: FcSettings, label: 'Settings', path: '/settings' }
    
  ],
  user: [
    { id: 'dashboard', icon: BiHome, label: 'Dashboard', path: '/dashboard' },
    { id: 'Create Paper', icon: FiFilePlus, label: 'Create Paper', path: '/paper' },
    { id: 'exams', icon: FiFileText, label: 'Exams', path: '/exams' },
    { id: 'results', icon: BiAward, label: 'Results', path: '/results' },
    { id: 'settings', icon: CiSettings, label: 'Settings', path: '/settings' }
  ]
};
