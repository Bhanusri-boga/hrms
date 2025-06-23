import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PublicRoute 