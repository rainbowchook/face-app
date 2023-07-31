import { render, screen, waitFor } from '@testing-library/react'
import FaceRecognition from '.'
import { Box } from '../../App'

const url = 'http://fakeurl.com'

const mockBoxes: Box[] = [
  {
    bottomRow: 135.5870938897133,
    leftCol: 94.51752156019211,
    rightCol: 351.77774727344513,
    topRow: 64.49077171087265,
  },
  {
    bottomRow: 199.15367776155472,
    leftCol: 337.93872594833374,
    rightCol: 119.63886022567749,
    topRow: 23.580069683492184,
  },
  {
    bottomRow: 183.9993437230587,
    leftCol: 273.7271785736084,
    rightCol: 184.52709913253784,
    topRow: 36.04503411054611,
  },
]

describe('FaceRecognition', () => {
  test('Image displays', async () => {
    render(<FaceRecognition imageUrl={url} boxes={[]} />)

    const image = await waitFor(() => screen.findByTestId('inputImage'))
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', url)
  })

  test('Image not found', () => {
    const emptyUrl = ''
    render(<FaceRecognition imageUrl={emptyUrl} boxes={[]} />)

    const image = screen.queryByTestId('inputImage')
    expect(image).not.toBeInTheDocument()
  })
  
  test('Image displays with no bounding boxes', async () => {
    render(<FaceRecognition imageUrl={url} boxes={[]} />)
    // screen.debug()
    // const boundingBoxes = await waitFor(() => screen.findAllByTestId('bounding-box'))
    const boundingBox = screen.queryByTestId('bounding-box')
    expect(boundingBox).not.toBeInTheDocument()
    
  })

  test('Image displays with bounding boxes', async () => {
    render(<FaceRecognition imageUrl={url} boxes={mockBoxes} />)
    // screen.debug()
    // const boundingBoxes = await waitFor(() => screen.findAllByTestId('bounding-box'))
    const boundingBoxes = screen.queryAllByTestId('bounding-box')
    expect(boundingBoxes).toHaveLength(mockBoxes.length)
    boundingBoxes.forEach((box, index) => {
      expect(box).toBeInTheDocument()
      expect(box).toBeVisible()
      expect(box).toHaveClass('bounding-box')
      expect(box).toBeEmptyDOMElement()
      
      const { topRow, bottomRow, rightCol, leftCol } = mockBoxes[index]
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
