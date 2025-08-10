

import { useState } from "react"
import LoginPage from "./Views/Admin/Pre_Login/Adminlogin"
import MainRouter from "./Router/MainRouter"
import { message } from "./Components/common/message/message"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    message.success('Logged out successfully!');
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <MainRouter onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
