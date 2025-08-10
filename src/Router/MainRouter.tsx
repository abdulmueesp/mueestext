import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import AdminLayout from "../Components/Admin/Layout"
import Paper from "../Views/Admin/Post_Login/Paper";

interface MainRouterProps {
  onLogout: () => void;
}

const MainRouter = ({ onLogout }: MainRouterProps) => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<AdminLayout onLogout={onLogout} />}>
          <Route path="/dashboard" element={<div />} />
          <Route path="/paper" element={<Paper />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default MainRouter
