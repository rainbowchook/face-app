import ParticleBackground from './components/ParticleBackground'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'

const App: React.FC = () => {

  return (
    <div>
      <ParticleBackground />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  )
}

export default App
