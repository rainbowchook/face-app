import { ChangeEvent, Component, createRef } from 'react'
// import ParticleBackground from '../../components/ParticleBackground'
// import Navigation from '../../components/Navigation'
import Logo from '../../components/Logo'
import ImageLinkForm from '../../components/ImageLinkForm'
import Rank from '../../components/Rank'
import FaceRecognition from '../../components/FaceRecognition'
import Spinner from '../../components/Spinner'
import { AuthContext, User } from '../../contexts/AuthContext'

type BoundingBox = {
  bottomRow: number
  leftCol: number
  rightCol: number
  topRow: number
}

type Sentiment = {
  name: string
  value: number
}

type BoxSentiment = { box: BoundingBox; sentiments: Sentiment[] }

// export type Box = BoundingBox
// export interface Box extends BoundingBox {}
// export interface Box extends BoxSentiment {}

type SentimentWithDimensions = Sentiment & { left: number; bottom: number }

export type Box = {
  box: BoundingBox
  sentiments: {
    sentiments: Sentiment[]
    topSentimentWithDimensions: SentimentWithDimensions
  }
}

interface AppState {
  input: string
  imageUrl: string
  boxes: Box[]
  loading: boolean
}

export const serverUrl: string =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:4000'
    : process.env.REACT_APP_SERVER_URL
    ? process.env.REACT_APP_SERVER_URL
    : 'http://localhost:4000'

class Home extends Component<{}, AppState> {
  state = {
    input: '',
    imageUrl: '',
    boxes: [],
    loading: false,
  }

  static contextType = AuthContext
  declare context: React.ContextType<typeof AuthContext>
  // context!: React.ContextType<typeof AuthContext>

  updateUserEntries = (currentUser: User): number => {
    const { id } = currentUser
    let returnValue: number = 0
    fetch(`${serverUrl}/users/${currentUser.id}/image`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
      cache: 'default',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('image data', data)
        returnValue = data
      })
      .catch((err) => {
        console.error('image error', err)
        alert(err)
      })
    return returnValue
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<AppState>,
    snapshot?: any
  ): void {
    if (prevState.boxes !== this.state.boxes) {
      const authCtx = this.context
      if (authCtx && authCtx.currentUser !== null) {
        const { currentUser, addEntriesCount } = authCtx
        // addEntriesCount()
        const entries = this.updateUserEntries(currentUser)
        if (entries !== 0) {
          addEntriesCount(entries)
        }
      }
    }
  }

  //need a calculateFaceLocations hook that returns boxes keeping imageWidth and imageHeight as states
  calculateFaceLocations = (boundingBoxes: BoxSentiment[]): Box[] | void => {
    const image = document.getElementById('inputImage') as HTMLImageElement
    if (!image) return alert('Not a valid image')
    const imageWidth = Number(image.width)
    const imageHeight = Number(image.height)
    console.log([imageWidth, imageHeight])
    return boundingBoxes.map((boundingBox: BoxSentiment) => {
      console.log(boundingBox)
      const { box, sentiments } = boundingBox
      const { bottomRow, leftCol, rightCol, topRow } = box
      const boxDimensions = {
        leftCol: leftCol * imageWidth,
        topRow: topRow * imageHeight,
        rightCol: imageWidth - rightCol * imageWidth,
        bottomRow: imageHeight - bottomRow * imageHeight,
      }
      const topSentimentWithDimensions = {
        name: sentiments[0].name,
        value: sentiments[0].value,
        left: rightCol * imageWidth,
        bottom: imageHeight - topRow * imageHeight,
      }
      console.log(boxDimensions)
      return {
        box: boxDimensions,
        sentiments: { sentiments, topSentimentWithDimensions },
      }
    })
  }

  displayFaceLocations = (boxes: Box[]) => {
    this.setState({ boxes, loading: false })
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value)
    this.setState({ input: e.target.value })
  }

  onButtonClick = (): void => {
    // const { input, imageUrl } = this.state
    if (!this.state.input) {
      return alert('Please enter URL')
    }
    this.setState({ imageUrl: this.state.input, loading: true })
    // console.log(this.state.imageUrl)
    fetch(`${serverUrl}/images`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: this.state.input }),
      cache: 'default',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('here 1' + typeof data)
        console.log(data)
        if (typeof data === 'string') {
          this.setState({ input: '', imageUrl: '', boxes: [], loading: false })
          // console.log({
          //   input: this.state.input,
          //   imageUrl: this.state.imageUrl,
          //   boxes: this.state.boxes,
          // })
          return alert(data)
        }
        // else {
        // this.setState({ imageUrl: this.state.input })
        const boxes = this.calculateFaceLocations(data)
        if (boxes) {
          this.displayFaceLocations(boxes)
        }
        // }
      })
      .catch((err) => {
        console.log('here' + err)
        this.setState({ input: '', imageUrl: '', boxes: [], loading: false })
        alert(err)
      })
    // .finally(() => {
    //   this.setState({ loading: false })
    // })
  }

  render() {
    return (
      <div>
        {/* <ParticleBackground />
        <Navigation /> */}
        <Logo />
        <Rank />
        <ImageLinkForm
          imageUrl={this.state.input}
          onChange={this.onInputChange}
          onClick={this.onButtonClick}
        />
        <FaceRecognition
          imageUrl={this.state.imageUrl}
          boxes={this.state.boxes}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default Home
