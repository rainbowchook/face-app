import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type SetValue<T> = Dispatch<SetStateAction<T>>

type User = {
  id: number
  name: string
  email: string
  entries: number
  joined: Date
}

//define type for context value
type AuthContextType = {
  currentUser: User | null
  // setCurrentUser?: (currentUser: User) => void
  setUser: SetValue<User>
}

//create context
export const AuthContext = createContext<AuthContextType | undefined>({
  currentUser: null,
  // setCurrentUser: () => null,
  setUser: () => null
})

//Provider component
type AuthProviderProps = {
  children?: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<null | User>(null)
  const [sessionUser, setSessionUser] = useLocalStorage<null | User>(
    'currentUser',
    currentUser
  )

  const setUser: SetValue<User> = useCallback((user) => {
    const newUser =
      currentUser === null
        ? null
        : user instanceof Function
        ? user(currentUser)
        : currentUser
    setCurrentUser(newUser)
    setSessionUser(newUser)
  }, [currentUser, setCurrentUser, setSessionUser])

  useEffect(() => {
    setSessionUser(currentUser)
    return () => {
      setCurrentUser(null)
      setSessionUser(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const authContextValue: AuthContextType = {
    currentUser,
    setUser,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
