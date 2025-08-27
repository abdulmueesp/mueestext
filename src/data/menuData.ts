import { BiAward, BiCreditCard, BiHome } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FiFilePlus, FiFileText } from "react-icons/fi";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineProfile,AiOutlineRead,AiOutlineFileText } from "react-icons/ai";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
export const menuData = {
  admin: [
    { id: 'dashboard', icon: BiHome, label: 'Dashboard', path: '/dashboard' }, 
    { id: 'subscription', icon: BiCreditCard, label: 'Subscription', path: '/subscription' },
    { id: 'users', icon: LuUsersRound, label: 'Users', path: '/users' },
    { id: 'examgen', icon: MdOutlineDashboardCustomize, label: 'Examboard', path: '/examboard' },
    { id: 'modules', icon: AiOutlineProfile, label: 'Modules', path: '/modules' },
    { id: 'courses', icon: AiOutlineFileText, label: 'Courses', path: '/courses' },
    { id: 'chapters', icon: AiOutlineRead, label: 'Subjects', path: '/chapters' },
    { id: 'questions', icon: VscGitPullRequestGoToChanges, label: 'Questions', path: '/questions' },
    { id: 'settings', icon: IoSettingsOutline, label: 'Settings', path: '/settings' },
    
    
  ],
  user: [
    { id: 'dashboard', icon: BiHome, label: 'Dashboard', path: '/dashboard' },
    { id: 'Create Paper', icon: FiFilePlus, label: 'Create Paper', path: '/paper' },
    { id: 'exams', icon: FiFileText, label: 'Exams', path: '/exams' },
    { id: 'results', icon: BiAward, label: 'Results', path: '/results' },
    { id: 'settings', icon: CiSettings, label: 'Settings', path: '/settings' }
  ]
};
