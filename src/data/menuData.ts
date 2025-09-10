import { BiCreditCard, BiHome } from "react-icons/bi";

import { FiFilePlus } from "react-icons/fi";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import {
  AiOutlineProfile,
  AiOutlineRead,
  AiOutlineFileText,
} from "react-icons/ai";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

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
      path: "/mypapers",
    },
   
   
    
  ],
};
