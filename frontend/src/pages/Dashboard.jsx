import { useContext } from 'react';
import AdminDashboard from '../components/Dashboard/AdminDashboard.jsx';
import ManagerDashboard from '../components/Dashboard/ManagerDashboard.jsx';
import DeliveryDashboard from '../components/Dashboard/DeliveryDashboard.jsx';
import TechnicianDashboard from '../components/Dashboard/TechnicianDashboard.jsx';
import Missing from '../components/General/Missing.jsx';
import useTitle from '../hooks/useTitle';
import AuthContext from '../context/AuthContext.jsx';

const Dashboard = () => {
    useTitle('Dashboard - Printova')
    const { hasRole } = useContext(AuthContext);

    const DashboardHome = () => {
        if (!hasRole("ADMIN") && !hasRole("MANAGER") && !hasRole("DELIVERY") && !hasRole("TECHNICIAN"))
        return <Missing />;
    };

  return (
    <main className='flex flex-col bg-[#f7f7f8] grow w-full mt-20 dark:bg-[#0e0e10] z-50 font-family-poppins'>
        {hasRole("ADMIN") && <AdminDashboard />}
        {hasRole("MANAGER") && <ManagerDashboard />}
        {hasRole("DELIVERY") && <DeliveryDashboard />}
        {hasRole("TECHNICIAN") && <TechnicianDashboard />}
    </main>
  )
}

export default Dashboard;