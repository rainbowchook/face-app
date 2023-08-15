import {
  createContext,
  useState,
  useEffect,
  // useCallback,
  ReactNode,
  // Dispatch,
  // SetStateAction,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

// type SetValue<T> = Dispatch<SetStateAction<T>>

export type User = {
  id: number
  name: string
  email: string
  entries: number
  joined: Date
}

//define type for context value
export type AuthContextType = {
  currentUser: User | null
  // setCurrentUser?: (currentUser: User) => void;
  // setUser: SetValue<User>;
  signIn: (user: User) => void
  signOut: () => void
  addEntriesCount: (entries: number) => void
}

//create context
export const AuthContext = createContext<AuthContextType | undefined>({
  currentUser: null,
  // setCurrentUser: () => null,
  // setUser: () => null
  signIn: () => null,
  signOut: () => null,
  addEntriesCount: () => null,
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

  // const setUser: SetValue<User> = useCallback((user) => {
  //   const newUser =
  //     currentUser === null
  //       ? null
  //       : user instanceof Function
  //       ? user(currentUser)
  //       : currentUser
  //   setCurrentUser(newUser)
  //   setSessionUser(newUser)
  // }, [currentUser, setCurrentUser, setSessionUser])

  useEffect(() => {
    if (sessionUser !== currentUser) {
      setSessionUser(currentUser)
    }
    return () => setSessionUser(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const signIn = (user: User): void => {
    // setUser(user)
    setCurrentUser(user)
  }

  const signOut = (): void => {
    setCurrentUser(null)
    // setSessionUser(null)
  }

  const addEntriesCount = (entries: number): void => {
    currentUser
      // ? setCurrentUser({ ...currentUser, entries: Number(currentUser.entries) + 1 })
      ? setCurrentUser({ ...currentUser, entries: Number(entries) })
      : console.error(`Cannot add count to current user: ${currentUser}`)
  }

  const authContextValue: AuthContextType = {
    currentUser,
    signIn,
    signOut,
    addEntriesCount,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
