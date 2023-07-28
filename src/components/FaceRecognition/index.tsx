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
    <div className="center mx-auto">
      <div className="fill mt-2">
        <img
          data-testid="inputImage"
          id="inputImage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        />
      </div>
    </div>
  )
}

export default FaceRecognition
