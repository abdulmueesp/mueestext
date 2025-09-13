
// @ts-nocheck
import { useSelector, useDispatch } from "react-redux" // ✅ Both hooks imported
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { RootState } from "@/store"
import { logout } from "@/store/slices/userSlice" // ✅ Import logout action
import LoginPage from "./Views/Admin/Pre_Login/Adminlogin"
// Removed OTP flow
import AdminLayout from "./Components/Admin/Layout"
import Dashboard from "./Views/Admin/Post_Login/Dashboard"
import Paper from "./Views/Admin/Post_Login/Paper"
import { message } from "antd"
import UsersTable from "./Views/Admin/Post_Login/users"
import Books from "./Views/Admin/Post_Login/Books/index"
import Chapters from "./Views/Admin/Post_Login/Chapters"
import Questions from "./Views/Admin/Post_Login/Questions"
import QuestionForm from "./Views/Admin/Post_Login/Questions/components/form"
import QuestionViiew from "./Views/Admin/Post_Login/Questions/components/view"
import MyPapers from "./Views/Admin/Post_Login/mypapers"
import Chaptersform from "./Views/Admin/Post_Login/Chapters/components/form"

function App() {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch(); // ✅ Added dispatch hook
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ IMPORTANT: Dispatch logout action to clear persisted state
    dispatch(logout());
    message.success('Logged out successfully!');
    // Navigate to root path after logout
    navigate('/', { replace: true });
  };

  // Determine default route based on user role
  const getDefaultRoute = () => {
    if (role === 'admin') {
      return '/dashboard';
    } else if (role === 'user') {
      return 'paper';
    }
    return 'paper'; // fallback
  };

  // Show loading or login based on authentication state
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }


  return (
    <Routes>
      {/* ✅ Authenticated - main app */}
      <>
        <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
          <Route index element={<Navigate to={getDefaultRoute()} replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="paper" element={<Paper />} />
            <Route path="users" element={<UsersTable />} />
            <Route path="books" element={<Books />} />
            <Route path="chapters" element={<Chapters />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="chaptersform/:id" element={<Chaptersform />} />
            <Route path="/questionform/:id" element={<QuestionForm/>} />
            <Route path="/Viewquestion/:id" element={<QuestionViiew/>} />    
            <Route path="/mypapers" element={<MyPapers />} />
        </Route>
        <Route path="*" element={<Navigate to={`/${getDefaultRoute()}`} replace />} />
      </>
    </Routes>
  );
}

// Wrap App with BrowserRouter
function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default AppWrapper;
