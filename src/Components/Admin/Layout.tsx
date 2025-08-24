import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { menuData } from "@/data/menuData";
import { logout } from "@/store/slices/userSlice";
import { RootState } from "@/store";
import AdminHeader from "../common/header";

const LogOut = ({ className, style }: any) => (
  <span className={className} style={style}>
    🚪
  </span>
);

const X = ({ className, style }: any) => (
  <span className={className} style={style}>
    ✗
  </span>
);
const GraduationCap = ({ className, style }: any) => (
  <span className={className} style={style}>
    🎓
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

  const primaryColor = "#06014f";

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

  const renderDashboardContent = () => <div className="space-y-6"></div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition duration-200 ease-in-out lg:static lg:inset-0 z-30`}
      >
        <div className="flex flex-col w-64 bg-white  shadow-2xl h-full">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span
                className="ml-3 text-xl font-bold"
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

          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition duration-200 ${
                    isActive ? "text-white" : "text-gray-700"
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
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
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
        <main className="flex-1 overflow-auto px-3 py-2 bg-white">
          {location.pathname === "/dashboard" ? (
            renderDashboardContent()
          ) : (
            <Outlet />
          )}
          
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
