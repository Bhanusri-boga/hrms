import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const roleLanding = {
  ADMIN: '/dashboard',
  HR: '/employees',
  MANAGER: '/attendance',
  EMPLOYEE: '/profile',
};

const RoleRedirect = () => {
  const { user } = useAuth();
  if (!user?.role) return <Navigate to="/login" replace />;
  return <Navigate to={roleLanding[user.role] || '/unauthorized'} replace />;
};

export default RoleRedirect; 