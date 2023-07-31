import { ChangeEvent, Component } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import FaceRecognition from './components/FaceRecognition'

type BoundingBox = {
  bottomRow: number
  leftCol: number
  rightCol: number
  topRow: number
}

// export type Box = BoundingBox
export interface Box extends BoundingBox {}

interface AppState {
  imageUrl: string
  boxes: Box[]
}

const serverUrl: string =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:4000'
    : process.env.REACT_APP_SERVER_URL
    ? process.env.REACT_APP_SERVER_URL
    : 'http://localhost:4000'

class App extends Component<{}, AppState> {
  state = {
    imageUrl: '',
    boxes: [],
  }

  calculateFaceLocations = (boundingBoxes: BoundingBox[]): Box[] | void => {
    const image = document.getElementById('inputImage') as HTMLImageElement
    if (!image) return alert('Not a valid image')
    const imageWidth = Number(image.width)
    const imageHeight = Number(image.height)
    console.log([imageWidth, imageHeight])
    return boundingBoxes.map((boundingBox) => {
      const { bottomRow, leftCol, rightCol, topRow } = boundingBox
      const box = {
        leftCol: leftCol * imageWidth,
        topRow: topRow * imageHeight,
        rightCol: imageWidth - rightCol * imageWidth,
        bottomRow: imageHeight - bottomRow * imageHeight,
      }
      console.log(box)
      return box
    })
  }

  displayFaceLocations = (boxes: Box[]) => {
    this.setState({ boxes })
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value)
    this.setState({ imageUrl: e.target.value })
  }

  onButtonClick = (): void => {
    const { imageUrl } = this.state
    console.log(this.state.imageUrl)
    if (!this.state.imageUrl) {
      return alert('Please enter a URL')
    }
    fetch(`${serverUrl}/images`, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
      cache: 'default',
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(typeof data)
        // console.log(data)
        if (typeof data === 'string') {
          return alert(data)
        }
        const boxes = this.calculateFaceLocations(data)
        if (boxes) {
          this.displayFaceLocations(boxes)
        }
      })
      .catch((err) => {
        // console.log(err)
        alert(err)
      })
  }

  render() {
    return (
      <div>
        <ParticleBackground />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onChange={this.onInputChange}
          onClick={this.onButtonClick}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} boxes={this.state.boxes}/>
      </div>
    )
  }
}

export default App
