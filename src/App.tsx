

import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import LoginPage from "./Views/Admin/Pre_Login/Adminlogin"
import OtpForm from "./Views/Admin/Pre_Login/otp"
import MainRouter from "./Router/MainRouter"
import { message } from "./Components/common/message/message"

function App() {
  const { isAuthenticated, isProfileCompleted } = useSelector((state: RootState) => state.user);
  const [showOtp, setShowOtp] = useState(false);

  const handleLogin = () => {
    setShowOtp(true);
  };

  const handleLogout = () => {
    setShowOtp(false); // Reset OTP state so logout goes to login page
    message.success('Logged out successfully!');
  };

  return (
    <>
      {!isAuthenticated ? (
        !showOtp ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <OtpForm />
        )
      ) : (
        <MainRouter onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
