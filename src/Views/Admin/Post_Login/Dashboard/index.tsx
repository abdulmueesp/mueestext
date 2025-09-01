// @ts-nocheck
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  CreditCard,
  Calendar,
  DollarSign,
  Activity,
  MessageCircle,
} from "lucide-react";
import { Card, Modal, Form, Input, Upload, message, Button as AntButton } from "antd";
import { Button } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import createpaper from "../../../../assets/createpaper.png"
import mypapers from "../../../../assets/mypapers.png"
import institute1 from "../../../../assets/institute1.jpeg"
import blueprint from "../../../../assets/Blueprints.png"
import dynaimblue from "../../../../assets/Dynamic Blueprints.png"
import myquestions from "../../../../assets/myquestions.png"
import evaluate from "../../../../assets/Evaluate.png"
import syllabus from "../../../../assets/Syllabus.png"
import merge from "../../../../assets/merge test papers.png"
import institue from "../../../../assets/My institute.png"
import batches from "../../../../assets/Batches.png"
import students from "../../../../assets/Students.png"
import teachers from "../../../../assets/Teachers.png"
import refer from "../../../../assets/Refer & Earn.png"
import subscriptions from "../../../../assets/Subscription.png"
import myprofile from "../../../../assets/My profile.png"
import errreport from "../../../../assets/Error Report.png"
import { FaWhatsapp } from "react-icons/fa";
import Instituteimg from "../../../../assets/institute1.jpeg"
// Mock data for charts
const revenueData = [
  { name: "Jan", monthly: "120000" },
  { name: "Feb", monthly: 98000 },
  { name: "Mar", monthly: 140000 },
  { name: "Apr", monthly: 125000 },
  { name: "May", monthly: 160000 },
  { name: "Jun", monthly: 145000 },
  { name: "July", monthly: 132000 },
];

const userGrowthData = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1800 },
  { month: "Mar", users: 2400 },
  { month: "Apr", users: 2800 },
  { month: "May", users: 3200 },
  { month: "Jun", users: 3800 },
];
const examBoxes = [
  {
    title: "Create Paper",
    color: "bg-gradient-to-br from-teal-600/60 to-teal-700/60",
    image: createpaper,
    path: "/paper",
  },
  {
    title: "My Papers",
    color: "bg-gradient-to-br from-red-400/60 to-red-500/60",
    image: mypapers,
    path: "/mypapers",
  },
  {
    title: "My Questions",
    color: "bg-gradient-to-br from-yellow-400/60 to-yellow-500/60",
    image: myquestions,
    path: "/myquestions",
  },
  {
    title: "Blueprints",
    color: "bg-gradient-to-br from-orange-400/60 to-orange-500/60",
    image: blueprint,
    path: "/Blueprint",
  },
  {
    title: "Dynamic Blueprints",
    color: "bg-gradient-to-br from-orange-300/60 to-orange-400/60",
    image: dynaimblue,
    path: "/dynamictemplate",
  },
  {
    title: "Evaluate",
    color: "bg-gradient-to-br from-red-400/60 to-red-500/60",
    image: evaluate,
    path: "/evaluate",
  },
  {
    title: "Syllabus",
    color: "bg-gradient-to-br from-blue-400/60 to-blue-500/60",
    image: syllabus,
    path: "/syllabus",
  },
  {
    title: "Merge Testpapers",
    color: "bg-gradient-to-br from-green-400/60 to-green-500/60",
    image: merge,
    path: "/mergepapers",
  },
];

const instituteBoxes = [
  {
    title: "My Institute",
    color: "bg-gradient-to-br from-orange-400/60 to-orange-500/60",
    image: institue,
    path: "/my-institute",
  },
  {
    title: "Batches",
    color: "bg-gradient-to-br from-yellow-400/60 to-yellow-500/60",
    image: batches,
    path: "/batch",
  },
  {
    title: "Students",
    color: "bg-gradient-to-br from-blue-400/60 to-blue-500/60",
    image: students,
    path: "/allstudents",
  },
  {
    title: "Teachers",
    color: "bg-gradient-to-br from-teal-600/60 to-teal-700/60",
    image: teachers,
    path: "/teachers",
  },
];

const accountBoxes = [
  {
    title: "My Profile",
    color: "bg-gradient-to-br from-purple-400/60 to-purple-500/60",
    image: myprofile,
    path: "/my-profile",
  },
  {
    title: "Subscription",
    color: "bg-gradient-to-br from-indigo-400/60 to-indigo-500/60",
    image: subscriptions,
    path: "/mysubscriptions",
  },
  {
    title: "Refer & Earn",
    color: "bg-gradient-to-br from-pink-400/60 to-pink-500/60",
    image: refer,
    path: "/refer",
  },
  {
    title: "Error Report",
    color: "bg-gradient-to-br from-gray-400/60 to-gray-500/60",
    image: errreport,
    path: "/error-report",
  },
];

const plansData = [
  { name: "Basic", value: 45, color: "#007575" },
  { name: "Super", value: 35, color: "#4a9a9a" },
  { name: "Super-pro", value: 20, color: "#6bb3b3" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div
        className="bg-gradient-to-r  from-[#009999] to-[#007777]
 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Hello Admin! 👋</h1>
            <p className="text-base opacity-90">
              Welcome back to your admin dashboard
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Activity size={28} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue Card */}
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-[#007575]/10 p-2.5 rounded-full">
              <DollarSign className="text-[#007575]" size={20} />
            </div>
            <span className="text-[#007575] text-xs font-medium bg-[#007575]/10 px-2 py-1 rounded-full">
              +12.5%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold text-gray-800 mb-1">₹8,45,230</p>
          <p className="text-gray-500 text-xs">This month</p>
        </div>

        {/* Total Users Card */}
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-[#007575]/10 p-2.5 rounded-full">
              <Users className="text-[#007575]" size={20} />
            </div>
            <span className="text-[#007575] text-xs font-medium bg-[#007575]/10 px-2 py-1 rounded-full">
              +8.2%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Total Users
          </h3>
          <p className="text-2xl font-bold text-gray-800 mb-1">3,847</p>
          <p className="text-gray-500 text-xs">Active users</p>
        </div>

        {/* Total Plans Card */}
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-[#007575]/10 p-2.5 rounded-full">
              <CreditCard className="text-[#007575]" size={20} />
            </div>
            <span className="text-[#007575] text-xs font-medium bg-[#007575]/10 px-2 py-1 rounded-full">
              +5.7%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Active Plans
          </h3>
          <p className="text-2xl font-bold text-gray-800 mb-1">1,247</p>
          <p className="text-gray-500 text-xs">Subscriptions</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Revenue Analytics
            </h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-[#007575]" size={18} />
              <span className="text-[#007575] text-sm font-medium">
                Trending Up
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="daily" fill="#007575" radius={[3, 3, 0, 0]} />
                <Bar dataKey="weekly" fill="#4a9a9a" radius={[3, 3, 0, 0]} />
                <Bar dataKey="monthly" fill="#6bb3b3" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-[#007575] rounded-full"></div>
              <span className="text-xs text-gray-600">Daily</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-[#4a9a9a] rounded-full"></div>
              <span className="text-xs text-gray-600">Weekly</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-[#6bb3b3] rounded-full"></div>
              <span className="text-xs text-gray-600">Monthly</span>
            </div>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">User Growth</h2>
            <div className="flex items-center space-x-2">
              <Users className="text-[#007575]" size={18} />
              <span className="text-[#007575] text-sm font-medium">
                Growing
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                />
                <Tooltip
                  formatter={(value) => [`${value} users`, ""]}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#007575"
                  strokeWidth={2.5}
                  dot={{ fill: "#007575", strokeWidth: 1.5, r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: "#007575",
                    strokeWidth: 2,
                    fill: "#ffffff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Plans Distribution Chart */}
      <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Plans Distribution
          </h2>
          <div className="flex items-center space-x-2">
            <CreditCard className="text-[#007575]" size={18} />
            <span className="text-[#007575] text-sm font-medium">
              Active Plans
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={plansData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={90}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {plansData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, ""]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center space-y-3">
            {plansData.map((plan, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: plan.color }}
                  ></div>
                  <span className="font-medium text-gray-700 text-sm">
                    {plan.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-base font-semibold text-gray-800">
                    {plan.value}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((1247 * plan.value) / 100)} users
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
             </div>

       {/* Institute Modal */}
    
    </div>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  
  // Institute modal state and data
  const [isInstituteModalVisible, setIsInstituteModalVisible] = useState(false);
  const [instituteForm] = Form.useForm();

  // Dummy institute data
  const dummyInstituteData = {
    name: "ABC Institute of Technology",
    address: "123 Education Street, Knowledge City, State - 123456",
    logo: Instituteimg
  };

  const handleStartClick = () => {
    navigate('/paper');
  };

  const handleBuyClick = () => {
    navigate('/subscriptions');
  };

  const handleBoxClick = (path: string) => {
    if (path === "/my-institute") {
      setIsInstituteModalVisible(true);
      instituteForm.setFieldsValue(dummyInstituteData);
    } else {
      navigate(path);
    }
  };

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number (with country code, no + or spaces)
    const phoneNumber = "918075699058"; // Example: Indian number 9876543210
    const message = "Hello! I need help with MyExam."; // Default message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstituteModalOk = () => {
    instituteForm.validateFields().then((values) => {
      console.log('Form values:', values);
      message.success('Saved');
      setIsInstituteModalVisible(false);
    }).catch((errorInfo) => {
      console.log('Validation failed:', errorInfo);
    });
  };

  const handleInstituteModalCancel = () => {
    setIsInstituteModalVisible(false);
    instituteForm.resetFields();
  };

  return (
    <div className="h-min p-3 pt-4  ">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="text-gray-700">
          <h2 className="text-xl font-semibold mb-2 font-local2">
            Hello, mubaris👋
          </h2>
        </div>
        <p className="text-sm font-semibold  text-gray-600 font-local2">
          Welcome back to MyExam
        </p>
      </div>

      {/* Generate New Question Paper Card */}
      <Card
        title="Generate New Question Paper"
        headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="mb-8 shadow-lg border-0 font-local2"
        bodyStyle={{ padding: "1rem" }}
      >
        <div className="flex flex-wrap gap-2 md:gap-4">
          <Button
            size="large"
            onClick={handleStartClick}
            className="bg-gradient-to-r from-[#007575] to-[#339999] text-white border-0 font-local2
             hover:!bg-gradient-to-r hover:!from-[#007575] hover:!to-[#339999] hover:!text-white transition-transform duration-200 hover:scale-105"
            style={{
              height: "40px",
              borderRadius: "8px",
              minWidth: "90px", // fixed typo (was 9a0px)
            }}
          >
            Start
          </Button>

          {/* <Button
            size="large"
            className="border-2 border-[#007575] text-[#007575] hover:bg-[#007575] hover:text-white transition-all duration-200 font-local2"
            style={{
              height: "40px",
              borderRadius: "8px",
              minWidth: "90px",
            }}
          >
            Tutorials
          </Button> */}
          <Button
            size="large"
            onClick={handleBuyClick}
            className="bg-white border-green-600 text-green-600 hover:!bg-green-600 hover:!text-white hover:!border-white font-local2 hover:!bg-opacity-80"
            style={{
              height: "40px",
              borderRadius: "8px",
              minWidth: "90px",
            }}
          >
            Buy
          </Button>
        </div>
      </Card>

      {/* Exams Card */}
      <Card
        title="Exams"
        headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="mb-8 shadow-lg border-0 font-local2"
        bodyStyle={{ padding: "2rem" }}
      >
                 {/* Exam Boxes Grid */}
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
           {examBoxes.map((exam, index) => (
             <div key={index} className="flex flex-col items-center mb-4">
               <div
                 onClick={() => handleBoxClick(exam.path)}
                 className={`${exam.color} rounded-xl p-3 cursor-pointer hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg w-28 h-28 flex items-center justify-center mb-2`}
               >
                                  <img
                    src={exam.image}
                    alt={exam.title}
                    className="w-20 h-20 object-contain"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                  />
               </div>
               <h3 className="text-gray-700 font-bold text-base text-center leading-tight font-local2 mt-2">
                 {exam.title}
               </h3>
             </div>
           ))}
         </div>
      </Card>

      {/* Institute Card */}
      <Card
        title={
          <div className="flex items-center justify-between w-full pr-1">
            <span>Institute</span>
            <Button
              size="small"
              className="bg-gradient-to-r from-[#007575] to-[#339999] text-white border-0 font-local2
             hover:!bg-gradient-to-r hover:!from-[#007575] hover:!to-[#339999] hover:!text-white transition-transform duration-200 hover:scale-105"s
              style={{
                height: "40px",
                borderRadius: "8px",
                minWidth: "90px", // fixed typo (was 9a0px)
              }}
            >
              Share
            </Button>
          </div>
        }
        headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="mb-8 shadow-lg border-0 font-local2"
        bodyStyle={{ padding: "2rem" }}
      >
                 {/* Institute Boxes Flex */}
         <div className="flex flex-wrap justify-start gap-4 md:gap-6 lg:gap-[55px]">
           {instituteBoxes.map((institute, index) => (
             <div key={index} className="flex flex-col items-center mb-4 flex-shrink-0">
               <div
                 onClick={() => handleBoxClick(institute.path)}
                 className={`${institute.color} rounded-xl p-3 cursor-pointer hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg w-28 h-28 flex items-center justify-center mb-2`}
               >
                                  <img
                    src={institute.image}
                    alt={institute.title}
                    className="w-20 h-20 object-contain"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                  />
               </div>
               <h3 className="text-gray-700 font-bold text-base text-center leading-tight font-local2 mt-2">
                 {institute.title}
               </h3>
             </div>
           ))}
         </div>
      </Card>

      {/* My Account Card */}
      <Card
        title="My Account"
        headStyle={{ backgroundColor: "#fafafa", color: "#000" }}
        className="shadow-lg border-0 font-local2"
        bodyStyle={{ padding: "2rem" }}
      >
                 {/* Account Boxes Flex */}
         <div className="flex flex-wrap justify-start gap-4 md:gap-6 lg:gap-[55px]">
           {accountBoxes.map((account, index) => (
             <div key={index} className="flex flex-col items-center mb-4 flex-shrink-0">
               <div
                 onClick={() => handleBoxClick(account.path)}
                 className={`${account.color} rounded-xl p-3 cursor-pointer hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg w-28 h-28 flex items-center justify-center mb-2`}
               >
                                  <img
                    src={account.image}
                    alt={account.title}
                    className="w-20 h-20 object-contain"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                  />
               </div>
               <h3 className="text-gray-700 font-bold text-base text-center leading-tight font-local2 mt-2">
                 {account.title}
               </h3>
             </div>
           ))}
         </div>
      </Card>

             {/* Fixed WhatsApp Button */}
       <div className="fixed bottom-6 right-6 z-50">
         <Button
           onClick={handleWhatsAppClick}
           className="bg-green-500 hover:!bg-green-600 border-0 text-white hover:!text-white shadow-lg hover:!shadow-xl transform hover:!scale-105 transition-all duration-200 flex items-center gap-2 font-local2 "
           size="large"
           style={{
             borderRadius: "25px",
             height: "50px",
             paddingLeft: "20px",
             paddingRight: "20px",
           }}
         >
           {/* <MessageCircle size={20} /> */}
           <FaWhatsapp size={20} />
           Chat with us
         </Button>
       </div>

       {/* Institute Modal */}
       <Modal
         title="Add/Edit Institute"
         open={isInstituteModalVisible}
         onOk={handleInstituteModalOk}
         onCancel={handleInstituteModalCancel}
         okText="Save"
         cancelText="Cancel"
         centered={false}
         style={{ top: 20 }}
         width={600}
         okButtonProps={{
           className: "bg-gradient-to-r from-[#007575] to-[#339999] text-white border-0 hover:!bg-gradient-to-r hover:!from-[#007575] hover:!to-[#339999] hover:!text-white"
         }}
       >
         <Form
           form={instituteForm}
           layout="vertical"
           className="mt-4"
         >
           <Form.Item
             label="Logo"
             name="logo"
           >
             <Upload
               listType="picture-card"
               maxCount={1}
               beforeUpload={() => false}
               accept="image/*"
             >
               <div>
                 <PlusOutlined />
                 <div style={{ marginTop: 8 }}>Upload Logo</div>
               </div>
             </Upload>
           </Form.Item>

           <Form.Item
             label="Institute Name"
             name="name"
             rules={[{ required: true, message: 'Please enter institute name!' }]}
           >
             <Input 
               placeholder="Enter institute name"
               size="large"
               className="rounded-lg"
             />
           </Form.Item>

           <Form.Item
             label="Address"
             name="address"
             rules={[{ required: true, message: 'Please enter address!' }]}
           >
             <Input.TextArea
               placeholder="Enter institute address"
               rows={3}
               className="rounded-lg"
             />
           </Form.Item>
         </Form>
       </Modal>
    </div>
  );
};

const Dashboard = () => {
  const { role } = useSelector((state: RootState) => state.user);

  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "user") {
    return <UserDashboard />;
  }

  // Fallback
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-semibold text-[#007575]">Dashboard</h1>
        <p className="text-xl text-gray-600">Welcome to the Dashboard</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md mx-auto">
          <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <Calendar className="text-yellow-600" size={24} />
          </div>
          <p className="text-yellow-800 font-semibold">Role not detected</p>
          <p className="text-yellow-700 text-sm mt-1">
            Please login again to access your dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
