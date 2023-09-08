import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

interface ProtectedRouteProps {
  children?: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}): JSX.Element => {
  const { currentUser } = useAuthContext()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }
  return <>{children}</>
}

export default ProtectedRoute
