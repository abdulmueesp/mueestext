import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import {
    Home,
    Users,
    BookOpen,
    FileText,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    GraduationCap,
    TrendingUp,
    Award,
    UserCheck,
    Bell,FilePlus
} from 'lucide-react';


const Dashboard = ({ onLogout }:any) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const navigate = useNavigate();

    const primaryColor = '#06014f';

    // Sample data for charts
    const examData = [
        { month: 'Jan', students: 240, exams: 12 },
        { month: 'Feb', students: 320, exams: 18 },
        { month: 'Mar', students: 280, exams: 15 },
        { month: 'Apr', students: 450, exams: 22 },
        { month: 'May', students: 380, exams: 19 },
        { month: 'Jun', students: 520, exams: 28 }
    ];

    const subjectData = [
        { name: 'Mathematics', value: 35, color: '#06014f' },
        { name: 'Science', value: 25, color: '#4c1d95' },
        { name: 'English', value: 20, color: '#7c3aed' },
        { name: 'History', value: 20, color: '#a855f7' }
    ];

    const menuItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'Create Paper', icon: FilePlus, label: 'Create Paper' },
        { id: 'exams', icon: FileText, label: 'Exams' },
        { id: 'subjects', icon: BookOpen, label: 'Subjects' },
        { id: 'results', icon: Award, label: 'Results' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        { id: 'settings', icon: Settings, label: 'Settings' }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out lg:static lg:inset-0 z-30`}>
                <div className="flex flex-col w-64 bg-white shadow-lg h-full">
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <span className="ml-3 text-xl font-bold" style={{ color: primaryColor }}>myExam</span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeMenu === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveMenu(item.id);
                                        setSidebarOpen(false);
                                        
                                        // Navigate to specific routes based on menu item
                                        if (item.id === 'Create Paper') {
                                            navigate('/paper');
                                        }
                                    }}
                                    className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition duration-200 ${isActive
                                        ? 'text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    style={{
                                        backgroundColor: isActive ? primaryColor : 'transparent'
                                    }}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={onLogout}
                            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-bold capitalize" style={{ color: primaryColor }}>
                                {activeMenu}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 text-xs rounded-full text-white flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                                    3
                                </span>
                            </button>
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                                    <UserCheck className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-auto p-6 bg-white">
                    {activeMenu === 'dashboard' && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Total Students</p>
                                            <p className="text-3xl font-bold" style={{ color: primaryColor }}>2,847</p>
                                            <p className="text-sm text-green-600 font-medium">+12% from last month</p>
                                        </div>
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Users className="w-6 h-6" style={{ color: primaryColor }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Active Exams</p>
                                            <p className="text-3xl font-bold" style={{ color: primaryColor }}>134</p>
                                            <p className="text-sm text-blue-600 font-medium">+8 new this week</p>
                                        </div>
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-6 h-6" style={{ color: primaryColor }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Completed Tests</p>
                                            <p className="text-3xl font-bold" style={{ color: primaryColor }}>1,892</p>
                                            <p className="text-sm text-purple-600 font-medium">+15% completion rate</p>
                                        </div>
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Award className="w-6 h-6" style={{ color: primaryColor }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Average Score</p>
                                            <p className="text-3xl font-bold" style={{ color: primaryColor }}>87.5%</p>
                                            <p className="text-sm text-orange-600 font-medium">+5% improvement</p>
                                        </div>
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <TrendingUp className="w-6 h-6" style={{ color: primaryColor }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Bar Chart */}
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
                                        Students & Exams Overview
                                    </h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={examData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="month" stroke="#666" />
                                            <YAxis stroke="#666" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                }}
                                            />
                                            <Bar dataKey="students" fill={primaryColor} radius={4} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Pie Chart */}
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
                                        Subject Distribution
                                    </h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={subjectData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={120}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {subjectData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="flex justify-center flex-wrap gap-4 mt-4">
                                        {subjectData.map((entry, index) => (
                                            <div key={index} className="flex items-center">
                                                <div
                                                    className="w-3 h-3 rounded-full mr-2"
                                                    style={{ backgroundColor: entry.color }}
                                                />
                                                <span className="text-sm text-gray-600">{entry.name} ({entry.value}%)</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Line Chart */}
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4" style={{ color: primaryColor }}>
                                    Exam Participation Trend
                                </h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={examData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="month" stroke="#666" />
                                        <YAxis stroke="#666" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="exams"
                                            stroke={primaryColor}
                                            strokeWidth={3}
                                            dot={{ fill: primaryColor, r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {/* Other menu content placeholders */}
                    {activeMenu !== 'dashboard' && (
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                {(() => {
                                    const menuItem = menuItems.find(item => item.id === activeMenu);
                                    return menuItem ? React.createElement(menuItem.icon,
                                        { className: "w-8 h-8", style: { color: primaryColor } }
                                    ) : null;
                                })()}
                            </div>
                            <h2 className="text-2xl font-bold mb-2 capitalize" style={{ color: primaryColor }}>
                                {activeMenu} Management
                            </h2>
                            <p className="text-gray-600">
                                This section will contain the {activeMenu} management interface.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;