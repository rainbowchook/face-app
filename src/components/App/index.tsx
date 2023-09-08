import { Component } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ParticleBackground from '../ParticleBackground'
import Navigation from '../Navigation'
import Root from '../../routes/Root'
import Home from '../../routes/Home'
import SignIn from '../../routes/SignIn'
import Register from '../../routes/Register'
import ProtectedRoute from '../../routes/ProtectedRoute'
import { AuthProvider } from '../../contexts/AuthContext'

class App extends Component<{}, {}> {
  render() {
    return (
      <>
        <ParticleBackground />
        <AuthProvider>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route index path="/" element={<Root />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="register" element={<Register />} />
              <Route
                path="home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <h1 className="text-3xl m-5">Page does not exist</h1>
                    <Link className="link" to="/">
                      Back to Home
                    </Link>
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </>
    )
  }
}

export default App
