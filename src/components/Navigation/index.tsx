import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navigation: React.FC = () => {
  const [currentUser, ] = useState(null)
  return (
    <nav className="flex justify-end">
      {/* <p className="text-2xl no-underline ease-in transition opacity-100 hover:opacity-50 hover:underline p-3 cursor-pointer"> */}
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
        >
          Sign Out
        </NavLink>
      ) : (
        <>
          <NavLink to="/signin" className="text-2xl link" role="link">
            Sign In
          </NavLink>
          <NavLink to="/register" className="text-2xl link" role="link">
            Register
          </NavLink>
        </>
      )}
    </nav>
    // <nav className="flex justify-end">
    //   {/* <p className="text-2xl no-underline ease-in transition opacity-100 hover:opacity-50 hover:underline p-3 cursor-pointer"> */}
    //   <p className="text-2xl link">
    //     <span role="link" >
    //       {'Sign Out'}
    //     </span>
    //   </p>
    // </nav>
  )
}

export default Navigation
