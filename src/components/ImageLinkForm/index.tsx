const ImageLinkForm = () => {
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
          />
          <button
            className="w-1/4 grow shrink-0 text-xl link px-4 py-2 inline-block text-white bg-violet-500"
            type="submit"
          >
            {'Detect'}
          </button>
        </div>
      </div>
    </>
  )
}

export default ImageLinkForm