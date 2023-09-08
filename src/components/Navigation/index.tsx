import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

const Navigation: React.FC = () => {
  const { currentUser, signOut } = useAuthContext()

  return (
    <nav className="flex justify-end">
      {currentUser ? (
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? 'text-2xl link text-violet-300'
              : isActive
              ? 'text-2xl link'
              : 'text-2xl link'
          }
          role="link"
          onClick={() => signOut()}
        >
          Sign Out
        </NavLink>
      ) : (
        <>
          <NavLink to="/" className="text-2xl link" role="link">Home</NavLink>
          <NavLink to="/signin" className="text-2xl link" role="link">
            Sign In
          </NavLink>
          <NavLink to="/register" className="text-2xl link" role="link">
            Register
          </NavLink>
        </>
      )}
    </nav>
  )
}

export default Navigation
