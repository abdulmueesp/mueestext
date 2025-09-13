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


export const menuData = {  admin: [
  { id: "dashboard", icon: BiHome, label: "Dashboard", path: "/dashboard" },
    { id: "users", icon: LuUsersRound, label: "Users", path: "/users" },
    
    {
      id: "Books",
      icon: AiOutlineProfile,
      label: "Books",
      path: "/books",
    },
    {
      id: "Chapters",
      icon: AiOutlineRead,
      label: "Chapters",
      path: "/chapters",
    },
    {
      id: "questions",
      icon: VscGitPullRequestGoToChanges,
      label: "Questions",
      path: "/questions",
    },
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
