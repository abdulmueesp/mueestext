
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

  // Safety check - this router should only be rendered when fully authenticated
  if (!isAuthenticated || !isProfileCompleted) {
    return <Navigate to="/" replace />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout onLogout={onLogout} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="paper" element={<Paper />} />
          <Route path="profile" element={<Profile />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;