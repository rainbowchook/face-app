import { ChangeEvent, Component } from 'react'
import Logo from '../../components/Logo'
import ImageLinkForm from '../../components/ImageLinkForm'
import Rank from '../../components/Rank'
import FaceRecognition from '../../components/FaceRecognition'
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

export const serverUrl: string = process.env.REACT_APP_SERVER_URL!
  // process.env.NODE_ENV !== 'production'
  //   ? 'http://localhost:4000'
  //   : process.env.REACT_APP_SERVER_URL
  //   ? process.env.REACT_APP_SERVER_URL
  //   : 'http://localhost:4000'

class Home extends Component<{}, AppState> {
  state = {
    input: '',
    imageUrl: '',
    boxes: [],
    loading: false,
  }

  static contextType = AuthContext
  declare context: React.ContextType<typeof AuthContext> 
  /* react-app-rewired installed to use above declare context line instead of:
    context!: React.ContextType<typeof AuthContext>
    so that "@babel/plugin-transform-typescript" babel plugin can run before other plugins.
    https://dev.to/ansonh/simplest-way-to-install-babel-plugins-in-create-react-app-7i5
  */

  updateUserEntries = async (currentUser: User): Promise<any> => {
    const { id } = currentUser
    try {
      const res = await fetch(`${serverUrl}/users/${currentUser.id}/image`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
        cache: 'default',
      })
      const data = await res.json()
      return data
    } catch (err) {
      console.error('image error', err)
      alert(err)
    }
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<AppState>,
    snapshot?: any
  ): void {
    if ((prevState.boxes !== this.state.boxes) && this.state.boxes.length > 0) {
      const authCtx = this.context
      if (authCtx && authCtx.currentUser !== null) {
        const { currentUser, addEntriesCount } = authCtx
        this.updateUserEntries(currentUser).then((entries) => {
        
          addEntriesCount(entries)
          console.log(entries)
      })
      }
    }
  }

  //need a calculateFaceLocations hook with useCallback (with dependencies imageWidth and imageHeight) that returns boxes, keeping imageWidth and imageHeight as states
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

  displayFaceLocations = (boxes: Box[]): void => {
    this.setState({ boxes, loading: false })
  }

  onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ input: e.target.value })
  }

  onButtonClick = (): void => {
    if (!this.state.input) {
      return alert('Please enter URL')
    }
    this.setState({ imageUrl: this.state.input, loading: true })
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
        if (typeof data === 'string') {
          this.setState({ input: '', imageUrl: '', boxes: [], loading: false })
          return alert(data)
        }
        const boxes = this.calculateFaceLocations(data)
        if (boxes) {
          this.displayFaceLocations(boxes)
        }
      })
      .catch((err) => {
        console.error(err)
        this.setState({ input: '', imageUrl: '', boxes: [], loading: false })
        alert(err)
      })
  }

  render() {
    return (
      <div>
        <Logo />
        <Rank />
        <ImageLinkForm
          imageUrl={this.state.input}
          onChange={this.onInputChange}
          onClick={this.onButtonClick}
          loading={this.state.loading}
        />
        <FaceRecognition
          imageUrl={this.state.imageUrl}
          boxes={this.state.boxes}
        />
      </div>
    )
  }
}

export default Home
