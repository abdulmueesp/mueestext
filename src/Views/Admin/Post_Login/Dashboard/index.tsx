// @ts-nocheck
import { useSelector } from "react-redux";
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
import { Card } from "antd";
import { Button } from "antd";
import createpaper from "../../../../assets/createpaper.png"
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
    color: "bg-gradient-to-br from-teal-600 to-teal-700",
  },
  {
    title: "My Papers",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  },
  {
    title: "My Questions",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
  },
  {
    title: "Blueprints",
    color: "bg-gradient-to-br from-orange-400 to-orange-500",
  },
  {
    title: "Dynamic Bluepr...",
    color: "bg-gradient-to-br from-orange-300 to-orange-400",
  },
  { title: "Evaluate", color: "bg-gradient-to-br from-red-400 to-red-500" },
  {
    title: "Syllabus",
    color: "bg-gradient-to-br from-orange-300 to-orange-400",
  },
  {
    title: "Merge Testpage...",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
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
    </div>
  );
};

const UserDashboard = () => {
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
        className="mb-8 shadow-lg border-0"
        bodyStyle={{ padding: "1rem" }}
      >
        <div className="flex flex-wrap gap-2 md:gap-4">
          <Button
            size="large"
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

          <Button
            size="large"
            className="border-2 border-[#007575] text-[#007575] hover:bg-[#007575] hover:text-white transition-all duration-200 font-local2"
            style={{
              height: "40px",
              borderRadius: "8px",
              minWidth: "90px",
            }}
          >
            Tutorials
          </Button>
          <Button
            size="large"
            className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 font-local2"
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
        className="shadow-lg border-0"
        bodyStyle={{ padding: "2rem" }}
      >
        {/* Exam Boxes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {examBoxes.map((exam, index) => (
            <div
              key={index}
              className={`${exam.color} rounded-2xl p-4 md:p-6 cursor-pointer hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl`}
            >
              <div className="aspect-square flex items-center justify-center mb-2 md:mb-3">
    
                  <img src={createpaper} alt="icon" className="w-full h-full object-contain"/>
                  
              </div>
              <h3 className="text-white font-medium text-xs md:text-sm text-center leading-tight font-local2">
                {exam.title}
              </h3>
            </div>
          ))}
        </div>
      </Card>

      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="bg-green-500 hover:bg-green-600 border-0 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 font-local2"
          size="large"
          style={{
            borderRadius: "25px",
            height: "50px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <MessageCircle size={20} />
          Chat with us
        </Button>
      </div>
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
