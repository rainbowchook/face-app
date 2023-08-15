import { render, screen, waitFor, within } from '@testing-library/react'
import FaceRecognition from '.'
import { Box } from '../../routes/Home'
import { truncate } from '../utilities'

const url = 'http://fakeurl.com'

// const mockBoxes: Box[] = [
//   {
//     bottomRow: 135.5870938897133,
//     leftCol: 94.51752156019211,
//     rightCol: 351.77774727344513,
//     topRow: 64.49077171087265,
//   },
//   {
//     bottomRow: 199.15367776155472,
//     leftCol: 337.93872594833374,
//     rightCol: 119.63886022567749,
//     topRow: 23.580069683492184,
//   },
//   {
//     bottomRow: 183.9993437230587,
//     leftCol: 273.7271785736084,
//     rightCol: 184.52709913253784,
//     topRow: 36.04503411054611,
//   },
// ]
const mockBoxes: Box[] =
[
  {
      "box": {
          "bottomRow": 0.6169483661651611,
          "leftCol": 0.6044502854347229,
          "rightCol": 0.7698749303817749,
          "topRow": 0.2599295973777771
      },
      "sentiments": {
        "sentiments": [
          {
              "name": "happiness",
              "value": 0.9999020099639893
          },
          {
              "name": "neutral",
              "value": 0.0007556382333859801
          },
          {
              "name": "disgust",
              "value": 0.00001711054574116133
          },
          {
              "name": "fear",
              "value": 0.000004997186806576792
          },
          {
              "name": "anger",
              "value": 0.0000033253259061893914
          },
          {
              "name": "sadness-contempt",
              "value": 0.000002709033651626669
          },
          {
              "name": "surprise",
              "value": 1.9033157627745823e-7
          }
        ],
        "topSentimentWithDimensions": {
          "name": "happiness",
          "value": 0.9999020099639893,
          "left": 123,
          "bottom": 123
        }
      }
      
  },
  {
      "box": {
          "bottomRow": 0.5788751244544983,
          "leftCol": 0.4050147831439972,
          "rightCol": 0.5777044296264648,
          "topRow": 0.25500038266181946
      },
      "sentiments": {
        "sentiments": [
          {
              "name": "happiness",
              "value": 0.999999463558197
          },
          {
              "name": "fear",
              "value": 0.0000035160396691935603
          },
          {
              "name": "surprise",
              "value": 0.00000279340315501031
          },
          {
              "name": "disgust",
              "value": 0.000001902792746477644
          },
          {
              "name": "anger",
              "value": 6.22392661853155e-8
          },
          {
              "name": "sadness-contempt",
              "value": 1.5287126231555703e-8
          },
          {
              "name": "neutral",
              "value": 2.9181337901640347e-10
          }
        ],
        "topSentimentWithDimensions": {
          "name": "happiness",
          "value": 0.999999463558197,
          "left": 123,
          "bottom": 123
        }
      }
      
  }
]

describe('FaceRecognition', () => {
  test('Image displays', async () => {
    render(<FaceRecognition imageUrl={url} boxes={[]} loading={false}/>)

    const image = await waitFor(() => screen.findByTestId('inputImage'))
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', url)
  })

  test('Image not found', () => {
    const emptyUrl = ''
    render(<FaceRecognition imageUrl={emptyUrl} boxes={[]} loading={false}/>)

    const image = screen.queryByTestId('inputImage')
    expect(image).not.toBeInTheDocument()
  })
  
  test('Image displays with no bounding boxes', async () => {
    render(<FaceRecognition imageUrl={url} boxes={[]} loading={false}/>)
    // screen.debug()
    // const boundingBoxes = await waitFor(() => screen.findAllByTestId('bounding-box'))
    const boundingBox = screen.queryByTestId('bounding-box')
    expect(boundingBox).not.toBeInTheDocument()
    
  })

  test('Image displays with bounding boxes', async () => {
    render(<FaceRecognition imageUrl={url} boxes={mockBoxes} loading={false}/>)
    // screen.debug()
    const boundingBoxes = await waitFor(() => screen.findAllByTestId('bounding-box'))
    // const boundingBoxes = screen.queryAllByTestId('bounding-box')
    expect(boundingBoxes).toHaveLength(mockBoxes.length)
    boundingBoxes.forEach((box, index) => {
      expect(box).toBeInTheDocument()
      expect(box).toBeVisible()
      expect(box).toHaveClass('bounding-box')
      // expect(box).toBeEmptyDOMElement()

      const { name, value } = mockBoxes[index].sentiments.sentiments[0]
      const sentimentLabel = within(box).getByDisplayValue(`${name} | ${truncate(value, 4)}`)
      expect(sentimentLabel).toBeInTheDocument()

      const { topRow, bottomRow, rightCol, leftCol } = mockBoxes[index].box
      // console.log({ topRow, bottomRow, rightCol, leftCol })
      // let style = window.getComputedStyle(box)
      // console.log(style)
      // expect(style.top).toBe(`${topRow}px`)
      expect(box).toHaveStyle(`
        display: block;
        top: ${topRow}px;
        bottom: ${bottomRow}px;
        right: ${rightCol}px;
        left: ${leftCol}px;
      `)
    })
  })
})
