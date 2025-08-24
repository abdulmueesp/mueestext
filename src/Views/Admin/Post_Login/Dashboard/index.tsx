
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
    const { role } = useSelector((state: RootState) => state.user);

    // Show role-based dashboard
    if (role === 'admin') {
        return <AdminDashboard />;
    } else if (role === 'user') {
        return <UserDashboard />;
    }

    // Fallback
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center" style={{ color: '#06014f' }}>
                Dashboard
            </h1>
            <p className="text-center text-gray-600">
                Welcome to the Dashboard.
            </p>
        </div>
    );
};

export default Dashboard;
