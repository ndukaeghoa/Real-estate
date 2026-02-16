import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LandlordDashboard } from './LandlordDashboard';
import { TenantDashboard } from './TenantDashboard';
import { AdminDashboard } from './AdminDashboard';

const roleViews = {
  tenant: TenantDashboard,
  landlord: LandlordDashboard,
  admin: AdminDashboard
};

export const RoleDashboardPage = () => {
  const { role } = useParams();
  const { user } = useAuth();

  if (!roleViews[role]) {
    return <p className="text-sm text-red-600">Unknown dashboard role.</p>;
  }

  if (!user) {
    return (
      <div className="bg-white border rounded-lg p-5 space-y-2">
        <h1 className="text-xl font-semibold">{role[0].toUpperCase() + role.slice(1)} Dashboard</h1>
        <p className="text-sm text-slate-600">Please log in to continue.</p>
        <Link to="/login" className="text-sm text-indigo-600 underline">Go to login</Link>
      </div>
    );
  }

  if (user.role !== role) {
    return (
      <div className="bg-white border rounded-lg p-5 space-y-2">
        <h1 className="text-xl font-semibold">Access restricted</h1>
        <p className="text-sm text-slate-600">
          You are logged in as <strong>{user.role}</strong>. Switch account to access the <strong>{role}</strong> dashboard.
        </p>
      </div>
    );
  }

  const DashboardView = roleViews[role];
  return <DashboardView />;
};
