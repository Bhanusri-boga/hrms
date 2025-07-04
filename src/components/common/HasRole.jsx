import { useAuth } from '../../hooks/useAuth';

const HasRole = ({ roles, children }) => {
  const { user } = useAuth();
  if (!user?.role) return null;
  if (Array.isArray(roles) ? roles.includes(user.role) : user.role === roles) {
    return children;
  }
  return null;
};

export default HasRole; 