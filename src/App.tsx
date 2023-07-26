import { ChangeEvent, Component } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'

class App extends Component {
  state = {
    input: '',
    imageUrl: ''
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value)
    this.setState({input: e.target.value})
  }

  onButtonClick = (): void => {
    this.setState({ imageUrl: this.state.input})
    console.log(this.state.imageUrl)
  }

  render() {
    return (
      <div>
        <ParticleBackground />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onChange={this.onInputChange} onClick={this.onButtonClick} />
        {/* <FaceRecognition /> */}
      </div>
    )
  }
}

export default App
