import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PrivateRoute =  ({ allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Role check
  if (
    allowedRoles &&
    user?.role &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default PrivateRoute 