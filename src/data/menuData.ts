import { BiCreditCard, BiHome } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FiFilePlus } from "react-icons/fi";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import {
  AiOutlineProfile,
  AiOutlineRead,
  AiOutlineFileText,
} from "react-icons/ai";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineProject } from "react-icons/ai";
import { TbFolderQuestion } from "react-icons/tb";
import { TbHome } from "react-icons/tb";
import { CgStack } from "react-icons/cg";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { BsGraphUpArrow } from "react-icons/bs";
import { FiBox } from "react-icons/fi";
import { MdOutlineCardGiftcard } from "react-icons/md";
export const menuData = {
  admin: [
    { id: "dashboard", icon: BiHome, label: "Dashboard", path: "/dashboard" },
    {
      id: "subscription",
      icon: BiCreditCard,
      label: "Subscription",
      path: "/subscription",
    },
    { id: "users", icon: LuUsersRound, label: "Users", path: "/users" },
    {
      id: "examgen",
      icon: MdOutlineDashboardCustomize,
      label: "Examboard",
      path: "/examboard",
    },
    {
      id: "modules",
      icon: AiOutlineProfile,
      label: "Modules",
      path: "/modules",
    },
    {
      id: "courses",
      icon: AiOutlineFileText,
      label: "Courses",
      path: "/courses",
    },
    {
      id: "subjects",
      icon: AiOutlineProject,
      label: "Subjects",
      path: "/subjects",
    },
    {
      id: "Chapters",
      icon: AiOutlineRead,
      label: "Chapters",
      path: "/Chapters",
    },
    {
      id: "questions",
      icon: VscGitPullRequestGoToChanges,
      label: "Questions",
      path: "/questions",
    },
    {
      id: "settings",
      icon: IoSettingsOutline,
      label: "Settings",
      path: "/settings",
    },
  ],
  user: [
    { id: "dashboard", icon: BiHome, label: "Dashboard", path: "/dashboard" },
    {
      id: "Create Paper",
      icon: FiFilePlus,
      label: "Create Paper",
      path: "/paper",
    },
    {
      id: "My Papers",
      icon: AiOutlineFileText,
      label: "My Papers",
      path: "/exams",
    },
    {
      id: "My Questions",
      icon: TbFolderQuestion,
      label: "My Questions",
      path: "/results",
    },
    {
      id: "Blueprints",
      icon: AiOutlineProject,
      label: "Blueprints",
      path: "/results",
    },
    {
      id: "Dynamic Blueprint",
      icon: AiOutlineProject,
      label: "Dynamic Blueprint",
      path: "/results",
    },
    {
      id: "My Institute",
      icon: TbHome,
      label: "My Institute",
      path: "/results",
    },
    { id: "Batches", icon: CgStack, label: "Batches", path: "/results" },
    { id: "Students", icon: LuUsersRound, label: "Students", path: "/results" },
    {
      id: "Teachers",
      icon: PiChalkboardTeacherLight,
      label: "Teachers",
      path: "/results",
    },
     { id: "Refer & Earn", icon: BsGraphUpArrow, label: "Refer & Earn", path: "/results" },
      { id: "Subscriptions", icon: FiBox, label: "Subscriptions", path: "/mysubscriptions" },
       { id: "My Orders", icon: MdOutlineCardGiftcard, label: "My Orders", path: "/results" },
    { id: "settings", icon: CiSettings, label: "Settings", path: "/settings" },
  ],
};
