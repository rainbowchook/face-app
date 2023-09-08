import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import { useAuthContext } from '../../hooks/useAuthContext'

const Root = () => {
  const { currentUser } = useAuthContext()
  return (
    <>
      <h2 className="text-white text-2xl font-ysabeau">
        {`Welcome ${currentUser ? currentUser.name : ''}!`}
        {` `}
        {`Please click on the logo to continue`}
      </h2>
      <div className="center">
        <Link to="/home" role="link">
          <Logo />
        </Link>
      </div>
    </>
  )
}

export default Root
