import React, { useState } from 'react'
import { Box } from '../../App'
import { truncate } from '../utilities'

type Colors = {
  [key: string]: string
}

const colors: Colors = {
  neutral: 'rgb(3 105 161)', // '#334155', //sky-700
  happiness: 'rgb(37 99 235)', // '#0369a1', //blue-600
  'sadness-contempt': 'rgb(109 40 217)', // '#6d28d9', //violet-700
  fear: 'rgb(234 179 8)', // '#eab308', //yellow-500
  surprise: 'rgb(249 115 22)', // '#c2410c', //orange-500
  anger: 'rgb(190 18 60)', // '#eab308', //rose-700
  disgust: 'rgb(4 120 87)', // '#047857', //emerald-700
}

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

  const toggleActivate = (index: number, activated: boolean): void => {
    // const activated = !hovering
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
                    boxShadow: `0 0 0 3px ${colors[name]} inset`,
                  }}
                  onMouseEnter={() => toggleActivate(index, true)}
                  onMouseLeave={() => toggleActivate(index, false)}
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
                  {/* bg-[${colors[`${name}`]}] */}
                </div>
                {hovering && (
                  <span
                    key={`face-${index}-${value}`}
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
                      backgroundColor: colors[name],
                    }}
                  >
                    {`${name} | ${truncate(value, 2)}`}
                  </span>
                )}
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
