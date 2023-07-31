import React from 'react'
import { Box } from '../../App'

interface FaceRecognitionProps {
  imageUrl: string
  boxes: Box[]
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({
  imageUrl,
  boxes,
}) => {
  return (
    <div className="center mx-auto my-5">
      <div className="fill mt-2 relative">
        <img
          data-testid="inputImage"
          id="inputImage"
          alt="input for detection"
          src={imageUrl}
          width="500px"
          height="auto"
        />
        {boxes.length && boxes.map((box: Box, index: number): JSX.Element => {
          const { topRow, bottomRow, rightCol, leftCol } = box
          return (
            <div
              key={index}
              data-testid="bounding-box"
              // className={`bounding-box top-[${topRow}px] bottom-[${bottomRow}px] right-[${rightCol}px] left-[${leftCol}px]`}
              className="bounding-box"
              style={{
                top: topRow,
                bottom: bottomRow,
                right: rightCol,
                left: leftCol,
              }}
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default FaceRecognition
