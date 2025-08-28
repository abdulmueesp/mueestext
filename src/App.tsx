

// import { useState } from "react"
// import { useSelector} from "react-redux"
// import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
// import { RootState } from "@/store"
// import LoginPage from "./Views/Admin/Pre_Login/Adminlogin"
// import OtpForm from "./Views/Admin/Pre_Login/otp"
// import Profile from "./Views/Admin/Post_Login/Profile"
// import AdminLayout from "./Components/Admin/Layout"
// import Dashboard from "./Views/Admin/Post_Login/Dashboard"
// import Paper from "./Views/Admin/Post_Login/Paper"
// import Subscription from "./Views/Admin/Post_Login/Subscription"
// import Settings from "./Views/Admin/Post_Login/Settings"
// import { message } from "./Components/common/message/message"
// import UsersTable from "./Views/Admin/Post_Login/users"
// import DeatileCard from "./Views/Admin/Post_Login/users/components/deatile"

// function App() {
//   const { isAuthenticated, isProfileCompleted } = useSelector((state: RootState) => state.user);
//   const [showOtp, setShowOtp] = useState(false);
//   const navigate = useNavigate(); // ✅ add navigate hook

//   const handleLogin = () => {
//     setShowOtp(true);
//   };

//   const handleLogout = () => {
//     setShowOtp(false);
//     // probably also dispatch logout action here
//     message.success('Logged out successfully!');
//     navigate("/", { replace: true }); // ✅ redirect to login page
//   };

//   return (
//     <Routes>
//       {/* Not authenticated - show login flow */}
//       {!isAuthenticated ? (
//         <Route path="*" element={
//           !showOtp ? (
//             <LoginPage onLogin={handleLogin} />
//           ) : (
//             <OtpForm />
//           )
//         } />
//       ) : !isProfileCompleted ? (
//         /* Authenticated but profile not completed */
//         <Route path="*" element={<Profile />} />
//       ) : (
//         /* Authenticated and profile completed - main app */
//         <>
//           <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
//             <Route index element={<Navigate to="dashboard" replace />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="paper" element={<Paper />} />
//             <Route path="profile" element={<Profile />} />
//             <Route path="subscription" element={<Subscription />} />
//             <Route path="settings" element={<Settings />} />
//             <Route path="users" element={<UsersTable />} />
//             <Route path="detail/:id" element={<DeatileCard/>} />
//           </Route>
//           <Route path="*" element={<Navigate to="/dashboard" replace />} />
//         </>
//       )}
//     </Routes>
//   );
// }

// // Wrap App with BrowserRouter in index.tsx (better separation)
// function AppWrapper() {
//   return (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
// }

// export default AppWrapper;
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux" // ✅ Both hooks imported
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { RootState } from "@/store"
import { logout } from "@/store/slices/userSlice" // ✅ Import logout action
import LoginPage from "./Views/Admin/Pre_Login/Adminlogin"
import OtpForm from "./Views/Admin/Pre_Login/otp"
import Profile from "./Views/Admin/Post_Login/Profile"
import AdminLayout from "./Components/Admin/Layout"
import Dashboard from "./Views/Admin/Post_Login/Dashboard"
import Paper from "./Views/Admin/Post_Login/Paper"
import Subscription from "./Views/Admin/Post_Login/Subscription"
import Settings from "./Views/Admin/Post_Login/Settings"
import { message } from "./Components/common/message/message"
import UsersTable from "./Views/Admin/Post_Login/users"
import DeatileCard from "./Views/Admin/Post_Login/users/components/deatile"
import ExamGenerator from "./Views/Admin/Post_Login/ExamGenerator"
import Modules from "./Views/Admin/Post_Login/Modules"
import Chapters from "./Views/Admin/Post_Login/Chapters"
import Courses from "./Views/Admin/Post_Login/Courses"
import Questions from "./Views/Admin/Post_Login/Questions"
import SubjectForm from "./Views/Admin/Post_Login/Chapters/components/form"
import ViewChapter from "./Views/Admin/Post_Login/ChapterText/components/view"
import ChapterForm from "./Views/Admin/Post_Login/ChapterText/components/form"
import ChaptersT from "./Views/Admin/Post_Login/ChapterText"
import QuestionForm from "./Views/Admin/Post_Login/Questions/components/form"
import QuestionViiew from "./Views/Admin/Post_Login/Questions/components/view"

function App() {
  const { isAuthenticated, isProfileCompleted } = useSelector((state: RootState) => state.user);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Added dispatch hook

  const handleLogin = () => {
    setShowOtp(true);
  };

  const handleLogout = () => {
    setShowOtp(false);
    // ✅ IMPORTANT: Dispatch logout action to clear persisted state
    dispatch(logout());
    message.success('Logged out successfully!');
    navigate("/", { replace: true });
  };

  return (
    <Routes>
      {/* 🚫 Not authenticated - show login flow */}
      {!isAuthenticated ? (
        <Route path="*" element={
          !showOtp ? (
            <LoginPage onLogin={handleLogin} />
          ) : (
            <OtpForm />
          )
        } />
      ) : !isProfileCompleted ? (
        /* 👤 Authenticated but profile not completed */
        <Route path="*" element={<Profile />} />
      ) : (
        /* ✅ Authenticated and profile completed - main app */
        <>
          <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="paper" element={<Paper />} />
            <Route path="profile" element={<Profile />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<UsersTable />} />
            <Route path="detail/:id" element={<DeatileCard/>} />
            <Route path="examboard" element={<ExamGenerator />} />
            <Route path="modules" element={<Modules />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="subjects" element={<Chapters />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="subjectForm/:id" element={<SubjectForm />} />
            <Route path="Chapters" element={<ChaptersT/>} />
            <Route path="chaptersview/:id" element={<ViewChapter/>} />
            <Route path="/chaptersform/:id" element={<ChapterForm/>} />
            <Route path="/questionform/:id" element={<QuestionForm/>} />
            <Route path="/Viewquestion/:id" element={<QuestionViiew/>} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
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
