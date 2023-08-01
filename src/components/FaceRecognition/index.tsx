import React, { useState } from 'react'
import { Box } from '../../App'

interface FaceRecognitionProps {
  imageUrl: string
  boxes: Box[]
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({
  imageUrl,
  boxes,
}) => {
  const [ activeFace, setActiveFace ] = useState(0)
  const [ hovering, setHovering ] = useState(false)

  // const toggleActivate = (index: number, activate: boolean) => {
  //   if (activate) {
  //     setHovering(true) 
  //     setActiveFace(index) 
  //   } else {
  //     setHovering(false)
  //     setActiveFace(0) 
  //   }
  // }
  const toggleActivate = (index: number) => {
    const activated = !hovering
    setHovering(activated) 
    activated ? setActiveFace(index) : setActiveFace(0) 
  }

  return (
    <div className="center mx-auto my-5">
      <div className="fill mt-2 relative">
        {imageUrl &&
          <img
            data-testid="inputImage"
            id="inputImage"
            alt="input for detection"
            src={imageUrl}
            width="500px"
            height="auto"
          />
        }
        {boxes.length > 0 && boxes.map((boundingBox: Box, index: number): JSX.Element => {
          const { topRow, bottomRow, rightCol, leftCol } = boundingBox.box
          return (
            <div
              key={index}
              data-testid="bounding-box"
              id={`div-${index}`}
              // className={`bounding-box top-[${topRow}px] bottom-[${bottomRow}px] right-[${rightCol}px] left-[${leftCol}px]`}
              className={`bounding-box ${hovering && index !== activeFace ? 'inactive-box' : ''}`}
              style={{
                top: topRow,
                bottom: bottomRow,
                right: rightCol,
                left: leftCol,
              }}
              onMouseEnter={() => toggleActivate(index)} 
              onMouseLeave={() => toggleActivate(index)}
              // onMouseOver={() => toggleActivate(index, false)} 
              // onMouseLeave={() => toggleActivate(index, true)}
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default FaceRecognition
