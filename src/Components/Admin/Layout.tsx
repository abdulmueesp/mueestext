// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { menuData } from "@/data/menuData";
// import { logout } from "@/store/slices/userSlice";
// import { RootState } from "@/store";
// import AdminHeader from "../common/header";
// import Dashboard from "@/Views/Admin/Post_Login/Dashboard";
// import { FaGraduationCap } from "react-icons/fa";

// const LogOut = ({ className, style }: any) => (
//   <span className={className} style={style}>
//     🚪
//   </span>
// );

// const X = ({ className, style }: any) => (
//   <span className={className} style={style}>
//     ✗
//   </span>
// );
// const GraduationCap = ({ className, style }: any) => (
//   <span className={className} style={style}>
//     🎓
//   </span>
// );

// interface AdminLayoutProps {
//   onLogout: () => void;
// }

// const AdminLayout = ({ onLogout }: AdminLayoutProps) => {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState("dashboard");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { role } = useSelector((state: RootState) => state.user);

//   const primaryColor = "#007575";

//   // Get menu items based on role
//   const menuItems = role ? menuData[role] : [];
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Update active menu based on current location
//   React.useEffect(() => {
//     const currentMenuItem = menuItems.find(
//       (item) => item.path === location.pathname
//     );
//     if (currentMenuItem) {
//       setActiveMenu(currentMenuItem.id);
//     }
//   }, [location.pathname]);

//   const handleMenuClick = (item: any) => {
//     setActiveMenu(item.id);
//     setSidebarOpen(false);
//     navigate(item.path);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     onLogout();
//   };



//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 transition duration-200 ease-in-out lg:static lg:inset-0 z-30`}
//       >
//         <div className="flex flex-col w-64 bg-white  shadow-2xl h-full">
//           <div className="flex items-center justify-between h-16 px-6">
//             <div className="flex items-center">
//               <div
//                 className="w-8 h-8 rounded-lg flex items-center justify-center"
//                 style={{ backgroundColor: primaryColor }}
//               >
//                 {/* <GraduationCap className="w-5 h-5 text-white" /> */}
//                 <FaGraduationCap color="white" />
//               </div>
//               <span
//                 className="ml-3 text-xl font-bold font-local2"
//                 style={{ color: primaryColor }}
//               >
//                 myExam
//               </span>
//             </div>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="lg:hidden text-gray-500 hover:text-gray-700"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <nav className="flex-1 px-4 py-6 space-y-2">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = activeMenu === item.id;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => handleMenuClick(item)}
//                   className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition duration-200 ${
//                     isActive ? "text-white" : "text-gray-700"
//                   }`}
//                   style={{
//                     backgroundColor: isActive ? primaryColor : "transparent",
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isActive)
//                       e.currentTarget.style.backgroundColor = "#e8eeff";
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isActive)
//                       e.currentTarget.style.backgroundColor = "transparent";
//                   }}
//                 >
//                   <Icon className="w-5 h-5 mr-3" />
//                   {item.label}
//                 </button>
//               );
//             })}
//           </nav>

//           <div className="p-4 border-t border-gray-200">
//             <button
//               onClick={handleLogout}
//               className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
//             >
//               <LogOut className="w-5 h-5 mr-3" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
//         {/* Header */}
//         <AdminHeader
//           currentTime={currentTime}
//           onMenuClick={() => setSidebarOpen(true)}
//         />

//         {/* Main Content Area */}
//         <main className="flex-1 overflow-auto px-3 py-2 bg-white">
//           {location.pathname === "/dashboard" ? (
//             <Dashboard />
//           ) : (
//             <Outlet />
//           )}
          
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { menuData } from "@/data/menuData";
import { logout } from "@/store/slices/userSlice";
import { RootState } from "@/store";
import AdminHeader from "../common/header";
import Dashboard from "@/Views/Admin/Post_Login/Dashboard";
import { FaGraduationCap } from "react-icons/fa";
import { MdLogout } from "react-icons/md";


const X = ({ className, style }: any) => (
  <span className={className} style={style}>
    ✗
  </span>
);

interface AdminLayoutProps {
  onLogout: () => void;
}

const AdminLayout = ({ onLogout }: AdminLayoutProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { role } = useSelector((state: RootState) => state.user);

  const primaryColor = "#007575";

  // Get menu items based on role
  const menuItems = role ? menuData[role] : [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update active menu based on current location
  React.useEffect(() => {
    const currentMenuItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    if (currentMenuItem) {
      setActiveMenu(currentMenuItem.id);
    }
  }, [location.pathname]);

  const handleMenuClick = (item: any) => {
    setActiveMenu(item.id);
    setSidebarOpen(false);
    navigate(item.path);
  };

  const handleLogout = () => {
    dispatch(logout());
    onLogout();
  };

  // Group menu items by sections
  const getMenuSections = () => {
    if (role === 'admin') {
      return [
        {
          title: "Overview",
          items: menuItems.filter(item => ['dashboard'].includes(item.id))
        },
        {
          title: "User Management",
          items: menuItems.filter(item => ['users'].includes(item.id))
        },
        {
          title: "Exam Management",
          items: menuItems.filter(item => ['examgen', 'modules', 'courses', 'subjects', 'questions','Chapters'].includes(item.id))
        },
        {
          title: "Plans",
          items: menuItems.filter(item => ['subscription'].includes(item.id))
        },
        {
          title: "Account",
          items: menuItems.filter(item => ['settings'].includes(item.id))
        }
      ];
    } else if (role === 'user') {
      return [
       
        {
          title: "EXAMS",
          items: menuItems.filter(item => ['Create Paper', 'My Papers', 'My Questions','Blueprints','Dynamic Blueprint'].includes(item.id))
        },
       
      ];
    }
    return [];
  };

  const menuSections = getMenuSections();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition duration-200 ease-in-out lg:static lg:inset-0 z-30`}
      >
        <div className="flex flex-col w-64 bg-white shadow-2xl h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 flex-shrink-0 border-b border-gray-200">
            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                <FaGraduationCap color="white" />
              </div>
              <span
                className="ml-3 text-xl font-bold font-local2"
                style={{ color: primaryColor }}
              >
                myExam
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Menu Area */}
          <div 
            className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#e8eeff transparent'
            }}
          >
            <nav className="space-y-6">
              {menuSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  {/* Section Heading */}
                  <div className="px-3 mb-2">
                    <h3 className="text-[12px] text-gray-600 uppercase tracking-wider font-bold">
                      {section.title}
                    </h3>
                  </div>
                  
                  {/* Section Menu Items */}
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeMenu === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleMenuClick(item)}
                          className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition duration-200 text-sm ${
                            isActive ? "text-white" : "text-gray-500"
                          }`}
                          style={{
                            backgroundColor: isActive ? primaryColor : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive)
                              e.currentTarget.style.backgroundColor = "#e8eeff";
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive)
                              e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <Icon className={`w-5 h-5 mr-3 flex-shrink-0 text-[#007575] ${
                            isActive ? "text-white" : "text-[#007575]"
                          }`} />
                  
                          <span className="truncate font-local2 ">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Fixed Logout Button */}
          <div className=" flex justify-center items-center p-3 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 w-full px-4 py-3 text-gray-700 hover:bg-red-50 rounded-lg transition duration-200 text-sm"
            >
              {/* <LogOut className="w-5 h-5 mr-3 flex-shrink-0" /> */}
              <MdLogout size={20} color="red" />
              <span className="truncate text-red-500 font-local2 font-bold">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <AdminHeader
          currentTime={currentTime}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Main Content Area */}
        <main className={`flex-1 overflow-auto px-3 py-2 ${
        role === "admin" ? "bg-white" : "bg-gradient-to-br from-slate-50 to-slate-100"
      }`}>
          {location.pathname === "/dashboard" ? (
            <Dashboard />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;