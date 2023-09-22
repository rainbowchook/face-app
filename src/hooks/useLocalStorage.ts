import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

type SetValue<T> = Dispatch<SetStateAction<T>>

function getInitialValue<T> (key: string, initialValue: T): T {
  // Prevent build error "window is undefined" but keeps working
  if(typeof window === 'undefined') {
    return initialValue
  }
  try {
    // Get from local storage, then parse stored json or return initialValue
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? (JSON.parse(storedValue) as T) : initialValue
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}": `, error)
    return initialValue
  }
}

export function useLocalStorage<T> (key: string, initialValue: T): [T, SetValue<T>] {

  // Get initial value from local storage as parsed json or default to initialValue if undefined
  const readValue = useCallback((): T => getInitialValue<T>(key, initialValue)
  , [initialValue, key])

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue)
  
  // Return a wrapped version of useState's setter function that persists the new value to the localStorage
  const setValue: SetValue<T> = useCallback((value) => {
    if(typeof window === 'undefined') {
      console.warn(`Tried setting the localStorage key "${key}" even though environment is not a client`)
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value

      //Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue))

      //Save state
      setStoredValue(newValue)
    } catch (error) {
      console.warn(`error setting localStorage key "${key}": `, error)
    }
  }, [key, storedValue])

  useEffect(() => {
    setStoredValue(readValue())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [storedValue, setValue]
}
