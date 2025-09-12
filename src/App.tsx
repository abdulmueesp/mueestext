
import { useSelector, useDispatch } from "react-redux" // ✅ Both hooks imported
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { RootState } from "@/store"
import { logout } from "@/store/slices/userSlice" // ✅ Import logout action
import LoginPage from "./Views/Admin/Pre_Login/Adminlogin"
// Removed OTP flow
import Profile from "./Views/Admin/Post_Login/Profile"
import AdminLayout from "./Components/Admin/Layout"
import Dashboard from "./Views/Admin/Post_Login/Dashboard"
import Paper from "./Views/Admin/Post_Login/Paper"
import Subscription from "./Views/Admin/Post_Login/Subscription"
import Settings from "./Views/Admin/Post_Login/Settings"
import { message } from "./Components/common/message/message"
import UsersTable from "./Views/Admin/Post_Login/users"
import ExamGenerator from "./Views/Admin/Post_Login/ExamGenerator"
import Books from "./Views/Admin/Post_Login/Books/index"
import Chapters from "./Views/Admin/Post_Login/Chapters"
import Courses from "./Views/Admin/Post_Login/Courses"
import Questions from "./Views/Admin/Post_Login/Questions"
import ViewChapter from "./Views/Admin/Post_Login/ChapterText/components/view"
import ChapterForm from "./Views/Admin/Post_Login/ChapterText/components/form"
import ChaptersT from "./Views/Admin/Post_Login/ChapterText"
import QuestionForm from "./Views/Admin/Post_Login/Questions/components/form"
import QuestionViiew from "./Views/Admin/Post_Login/Questions/components/view"
import HeaderFooter from "./Views/Admin/Post_Login/Paper/components/headfoot"
import Plans from "./Views/Admin/Post_Login/Plans"
import UserPlan from "./Views/Admin/Post_Login/Userplan"
import Orders from "./Views/Admin/Post_Login/Orders"

import DynamicBlue from "./Views/Admin/Post_Login/Dynamicblue"
import Blueprint from "./Views/Admin/Post_Login/BluePrints"
import MyQuestions from "./Views/Admin/Post_Login/Myquestions"
import Evaluate from "./Views/Admin/Post_Login/Evaluate"
import Syllabus from "./Views/Admin/Post_Login/Syllabus"
import MergePapers from "./Views/Admin/Post_Login/MergePapers"
import Batches from "./Views/Admin/Post_Login/Institute/Batches"
import BatchDeatile from "./Views/Admin/Post_Login/Institute/Batches/components/batchdeatile"
import StudentsBatch from "./Views/Admin/Post_Login/Institute/Batches/components/studentsbatch"
import ReportCard from "./Views/Admin/Post_Login/Institute/Batches/components/reportcard"
import Teachers from "./Views/Admin/Post_Login/Institute/Batches/components/teachers"
import Overallcard from "./Views/Admin/Post_Login/Institute/Batches/components/overall"
import Uploadss from "./Views/Admin/Post_Login/Institute/Batches/components/uploadss"
import Allstudents from "./Views/Admin/Post_Login/Institute/Batches/components/allstudents"
import MyPapers from "./Views/Admin/Post_Login/mypapers"
import Errors from "./Views/Admin/Post_Login/Errors"
import Subjects from "./Views/Admin/Post_Login/Modules"
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
      return 'examboard';
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
            <Route path="profile" element={<Profile />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<UsersTable />} />
            <Route path="examboard" element={<ExamGenerator />} />
            <Route path="books" element={<Books />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="chapters" element={<Chapters />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="chaptersform/:id" element={<Chaptersform />} />
            <Route path="Chaptersjd" element={<ChaptersT/>} />
            <Route path="chaptersview/:id" element={<ViewChapter/>} />
            <Route path="/chaptersformhj/:id" element={<ChapterForm/>} />
            <Route path="/questionform/:id" element={<QuestionForm/>} />
            <Route path="/Viewquestion/:id" element={<QuestionViiew/>} />
            <Route path="/header" element={<HeaderFooter />} />
            <Route path="/subscriptions" element={<Plans/>} />
            <Route path="/mysubscriptions" element={<UserPlan/>} />
            <Route path="/orders" element={<Orders />}/>
           
            <Route path="/dynamictemplate" element={<DynamicBlue />}/>
            <Route path="/Blueprint" element={<Blueprint/>} />
            <Route path="/myquestions" element={<MyQuestions />} />
            <Route path="/evaluate" element={<Evaluate />} />
            <Route path="/syllabus" element={<Syllabus />}/>
            <Route path="/mergepapers" element={<MergePapers />} />
            <Route path="/batch" element={<Batches />} />
            <Route path="/batchdeatile" element={<BatchDeatile />} />
            <Route path="/students/1" element={<StudentsBatch />} />
            <Route path="/reportcard" element={<ReportCard />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/overall" element={<Overallcard />}/>
            <Route path="/uploads" element={<Uploadss />} />
            <Route  path="/allstudents" element={<Allstudents />}/>
            <Route path="/mypapers" element={<MyPapers />} />
            <Route path="/errors" element={<Errors />} />
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
