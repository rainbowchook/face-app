import { ChangeEventHandler } from "react"

interface ImageLinkFormProps {
  imageUrl: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  onClick: () => void,
}

const ImageLinkForm: React.FC<ImageLinkFormProps> = ({ imageUrl, onChange, onClick }): JSX.Element => {
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
            className="w-1/4 grow shrink-0 text-xl link px-4 py-2 inline-block text-white bg-violet-500"
            type="button"
            aria-label="Detect"
            aria-describedby="description-detect"
            onClick={onClick}
          >
            {'Detect'}
          </button>
          <span id="description-detect" hidden>Clicking will detect faces</span>
        </div>
      </div>
    </>
  )
}

export default ImageLinkForm
