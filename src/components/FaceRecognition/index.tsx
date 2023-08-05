import React, { useState } from 'react'
import { Box } from '../../App'
import { truncate } from '../utilities'

interface FaceRecognitionProps {
  imageUrl: string
  boxes: Box[]
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({
  imageUrl,
  boxes,
}) => {
  const [activeFace, setActiveFace] = useState(0)
  const [hovering, setHovering] = useState(false)

  const toggleActivate = (index: number): void => {
    const activated = !hovering
    setHovering(activated)
    activated ? setActiveFace(index) : setActiveFace(0)
  }

  return (
    <div className="center mx-auto my-5">
      <div className="fill mt-2 relative">
        {imageUrl && (
          <img
            data-testid="inputImage"
            id="inputImage"
            alt="input for detection"
            src={imageUrl}
            width="500px"
            height="auto"
          />
        )}
        {boxes.length > 0 &&
          boxes.map((boundingBox: Box, index: number): JSX.Element => {
            const { topRow, bottomRow, rightCol, leftCol } = boundingBox.box
            const { name, value, left, bottom } =
              boundingBox.sentiments.topSentimentWithDimensions
            return (
              <>
                <div
                  key={`box-${index}`}
                  data-testid="bounding-box"
                  id={`div-${index}`}
                  className={`bounding-box ${
                    hovering && index !== activeFace ? 'inactive-box' : ''
                  }`}
                  style={{
                    top: topRow,
                    bottom: bottomRow,
                    right: rightCol,
                    left: leftCol,
                  }}
                  onMouseEnter={() => toggleActivate(index)}
                  onMouseLeave={() => toggleActivate(index)}
                >
                  {/* <div className="w-full h-full"></div> */}
                  {/* <div
                    className={`box-label ${
                      hovering && index === activeFace ? '' : 'truncate'
                    } ${
                      hovering && index !== activeFace ? 'inactive-box' : ''
                    }`}
                  >
                    {`${name} | ${truncate(value, 4)}`}
                  </div> */}
                </div>
                <span
                  key={`face-${index}`}
                  className={`box-label 
                  ${
                    hovering
                      ? index === activeFace
                        ? 'z-20 text-xl'
                        : 'inactive-box opacity-10'
                      : 'truncate text-sm z-10'
                  }`}
                  style={{
                    bottom,
                    left,
                  }}
                >
                  {`${name} | ${truncate(value, 4)}`}
                </span>
                {/* <span
                  className={`box-label 
                  ${
                    hovering && index === activeFace
                      ? 'z-20 text-2xl'
                      : 'truncate text-sm'
                  } 
                  ${
                    hovering && index !== activeFace
                      ? 'inactive-box opacity-10'
                      : 'z-10'
                  }
                  `}
                  style={{
                    bottom,
                    left,
                  }}
                >
                  {`${name} | ${truncate(value, 4)}`}
                </span> */}
                {/* <span
                  className={`box-label 
                  ${hovering && index === activeFace ? 'z-20 text-6xl' : 'truncate'} 
                  ${hovering && index !== activeFace ? 'inactive-box' : 'z-10'}`}
                  style={{
                    bottom,
                    left,
                  }}
                >
                  {`${name} | ${truncate(value, 4)}`}
                </span> */}
              </>
            )
          })}
      </div>
    </div>
  )
}

export default FaceRecognition
