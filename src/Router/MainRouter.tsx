import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import AdminLayout from "../Components/Admin/Layout"
import Paper from "../Views/Admin/Post_Login/Paper";
import Profile from "../Views/Admin/Post_Login/Profile";
import Dashboard from "../Views/Admin/Post_Login/Dashboard";
import Subscription from "../Views/Admin/Post_Login/Subscription";
import Settings from "../Views/Admin/Post_Login/Settings";

interface MainRouterProps {
  onLogout: () => void;
}

const MainRouter = ({ onLogout }: MainRouterProps) => {
  const { isAuthenticated, isProfileCompleted } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Profile Route - shown when authenticated but profile not completed */}
          {isAuthenticated && !isProfileCompleted ? (
            <>
              <Route path="/" element={<Navigate to="/profile" replace />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : isAuthenticated && isProfileCompleted ? (
            /* Main App Routes - shown when authenticated and profile completed */
            <Route path="/" element={<AdminLayout onLogout={onLogout} />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/paper" element={<Paper />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          ) : (
            /* Fallback - should not happen but just in case */
            <Route path="/" element={<Navigate to="/profile" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default MainRouter
