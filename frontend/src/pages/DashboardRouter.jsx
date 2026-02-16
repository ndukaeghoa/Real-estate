import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LandlordDashboard } from './LandlordDashboard';
import { TenantDashboard } from './TenantDashboard';
import { AdminDashboard } from './AdminDashboard';
import { api } from '../services/api';

export const DashboardRouter = () => {
  const { user, setUser, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/login');
    if (!user) {
      api.get('/auth/me')
        .then(({ data }) => setUser(data))
        .catch(() => navigate('/login'));
    }
  }, [token, user, setUser, navigate]);

  if (!user) return <p>Loading dashboard...</p>;
  if (user.role === 'landlord') return <LandlordDashboard />;
  if (user.role === 'admin') return <AdminDashboard />;
  return <TenantDashboard />;
};
