import { Component } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Navigation from './components/Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Root from './routes/Root'
import Home from './routes/Home'
import SignIn from './routes/SignIn'
import Register from './routes/Register'
import ProtectedRoute from './routes/ProtectedRoute'

class App extends Component<{}, {}> {
  render() {
    return (
      <>
        <ParticleBackground />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route index path="/" element={<Root />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="register" element={<Register />} />
            {/* <Route path="home" element={<Home />} /> */}
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<p>Page does not exist</p>} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

export default App
