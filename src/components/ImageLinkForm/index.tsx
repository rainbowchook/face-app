import { ChangeEventHandler } from 'react'
import Spinner from '../Spinner'

interface ImageLinkFormProps {
  imageUrl: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onClick: () => void
  loading: boolean
}

const ImageLinkForm: React.FC<ImageLinkFormProps> = ({
  imageUrl,
  onChange,
  onClick,
  loading,
}): JSX.Element => {
  return (
    <>
      <p className="text-2xl mt-3">{'Upload picture to detect face'}</p>
      <div className="flex justify-center">
        <div className="image-link-form p-6 rounded-lg shadow-xl">
          <input
            className="font-sans text-xl text-black px-4 py-2 mx-auto w-3/4"
            type="text"
            placeholder="Enter URL here"
            aria-placeholder="Enter URL here"
            onChange={onChange}
            value={imageUrl}
            aria-required="true"
          />
          <button
            className={`w-1/4 shrink-0 text-xl px-4 py-2 inline-block text-white bg-violet-500 ${
              !loading ? 'grow link' : ''
            } `}
            type="button"
            aria-label="Detect"
            aria-describedby="description-detect"
            onClick={onClick}
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Detect'}
            {/* {'Detect'} */}
          </button>
          <span id="description-detect" hidden>
            Clicking will detect faces
          </span>
        </div>
      </div>
    </>
  )
}

export default ImageLinkForm
