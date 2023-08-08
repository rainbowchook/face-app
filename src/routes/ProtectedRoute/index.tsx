import { useContext, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
// import { AuthContext } from '../../contexts/AuthContext'

interface ProtectedRoutedProps {
  children?: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRoutedProps> = ({
  children,
}): JSX.Element => {
  // const { currentUser } = useContext(AuthContext)
  const location = useLocation()

  // if(!currentUser) {
  //     return <Navigate to='/signin' state={{ from: location}} replace />
  // }
  return <>{children}</>
}

export default ProtectedRoute
