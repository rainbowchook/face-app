import { useEffect, useState } from 'react'

//To be used for future refactoring
const useFetchAPI = (url: string, options?: Object ) => {
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ data, setData ] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setError(null)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return { loading, error, data }
}

export default useFetchAPI