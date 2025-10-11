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
import CreateUser from "./Views/Admin/Post_Login/users/CreateUser"
import Books from "./Views/Admin/Post_Login/Books/index"
import Chapters from "./Views/Admin/Post_Login/Chapters"
import Questions from "./Views/Admin/Post_Login/Questions"
import QuestionForm from "./Views/Admin/Post_Login/Questions/components/form"
import MyPapers from "./Views/Admin/Post_Login/mypapers"
import Chaptersform from "./Views/Admin/Post_Login/Chapters/components/form"
import Subject from "./Views/Admin/Post_Login/Subject"

function App() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('App render - isAuthenticated:', isAuthenticated, 'user:', user);

  const handleLogout = () => {
    dispatch(logout());
    message.success('Logged out successfully!');
    navigate('/', { replace: true });
  };

  // Determine default route based on user role
  const getDefaultRoute = () => {
    if (user?.role === 'admin') {
      return '/dashboard';
    } else if (user?.role === 'school') {
      return '/paper';
    }
    return '/paper'; // fallback
  };

  // Show loading or login based on authentication state
  if (!isAuthenticated) {
    console.log('Not authenticated, showing login page');
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  console.log('Authenticated, showing main app for user:', user);


  return (
    <Routes>
      {/* ✅ Authenticated - main app */}
      <>
        <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
          <Route index element={<Navigate to={getDefaultRoute()} replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="paper" element={<Paper />} />
            <Route path="schools" element={<UsersTable />} />
            <Route path="schools/new" element={<CreateUser />} />
            <Route path="schools/edit/:id" element={<CreateUser />} />
            <Route path="books" element={<Books />} />
            <Route path="chapters" element={<Chapters />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="chaptersform/:id" element={<Chaptersform />} />
            <Route path="/questionform/:id" element={<QuestionForm/>} />
            <Route path="/mypapers" element={<MyPapers />} />
            <Route path="/subjects" element={<Subject />} />
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
