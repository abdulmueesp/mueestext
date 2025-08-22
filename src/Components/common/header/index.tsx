import React from "react";

interface AdminHeaderProps {
  currentTime: Date;
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentTime,
  onMenuClick,
}) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-100 ">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* Date & Time */}
          <div className="flex gap-8">
            <div className="text-sm border p-1 font-local2 text-gray-600">
              {currentTime.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <p className="text-sm border p-1 font-local2 text-gray-600">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
