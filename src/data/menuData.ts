import {BiHome } from "react-icons/bi";
import { FiFilePlus } from "react-icons/fi";
import {
  AiOutlineProfile,
  AiOutlineRead,
  AiOutlineFileText,
} from "react-icons/ai";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { LuSchool } from "react-icons/lu";

export const menuData = {  admin: [
  { id: "dashboard", icon: BiHome, label: "Dashboard", path: "/dashboard" },
    { id: "users", icon: LuSchool, label: "List Schools", path: "/schools" },
    
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
