
// import { useState } from "react"
// import { useSelector } from "react-redux"
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

// function App() {
//   const { isAuthenticated, isProfileCompleted } = useSelector((state: RootState) => state.user);
//   const [showOtp, setShowOtp] = useState(false);
//  const navigate = useNavigate();

//   const handleLogin = () => {
//     setShowOtp(true);
//   };

//   const handleLogout = () => {
//     setShowOtp(false);
//      navigate("/", { replace: true });
//     message.success('Logged out successfully!');
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Not authenticated - show login flow */}
//         {!isAuthenticated ? (
//           <Route path="*" element={
//             !showOtp ? (
//               <LoginPage onLogin={handleLogin} />
//             ) : (
//               <OtpForm />
//             )
//           } />
//         ) : !isProfileCompleted ? (
//           /* Authenticated but profile not completed */
//           <Route path="*" element={<Profile />} />
//         ) : (
//           /* Authenticated and profile completed - main app */
//           <>
//             <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
//               <Route index element={<Navigate to="dashboard" replace />} />
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="paper" element={<Paper />} />
//               <Route path="profile" element={<Profile />} />
//               <Route path="subscription" element={<Subscription />} />
//               <Route path="settings" element={<Settings />} />
//             </Route>
//             <Route path="*" element={<Navigate to="/dashboard" replace />} />
//           </>
//         )}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { useState } from "react"
import { useSelector} from "react-redux"
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { RootState } from "@/store"
import LoginPage from "./Views/Admin/Pre_Login/Adminlogin"
import OtpForm from "./Views/Admin/Pre_Login/otp"
import Profile from "./Views/Admin/Post_Login/Profile"
import AdminLayout from "./Components/Admin/Layout"
import Dashboard from "./Views/Admin/Post_Login/Dashboard"
import Paper from "./Views/Admin/Post_Login/Paper"
import Subscription from "./Views/Admin/Post_Login/Subscription"
import Settings from "./Views/Admin/Post_Login/Settings"
import { message } from "./Components/common/message/message"

function App() {
  const { isAuthenticated, isProfileCompleted } = useSelector((state: RootState) => state.user);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate(); // ✅ add navigate hook

  const handleLogin = () => {
    setShowOtp(true);
  };

  const handleLogout = () => {
    setShowOtp(false);
    // probably also dispatch logout action here
    message.success('Logged out successfully!');
    navigate("/", { replace: true }); // ✅ redirect to login page
  };

  return (
    <Routes>
      {/* Not authenticated - show login flow */}
      {!isAuthenticated ? (
        <Route path="*" element={
          !showOtp ? (
            <LoginPage onLogin={handleLogin} />
          ) : (
            <OtpForm />
          )
        } />
      ) : !isProfileCompleted ? (
        /* Authenticated but profile not completed */
        <Route path="*" element={<Profile />} />
      ) : (
        /* Authenticated and profile completed - main app */
        <>
          <Route path="/" element={<AdminLayout onLogout={handleLogout} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="paper" element={<Paper />} />
            <Route path="profile" element={<Profile />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  );
}

// Wrap App with BrowserRouter in index.tsx (better separation)
function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default AppWrapper;
