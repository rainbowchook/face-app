import { createContext, useState, useContext, ReactNode } from 'react'

type User = {
  id: number
  name: string
  email: string
  entries: number
  joined: Date
}

//define type for context value
type AuthContextValue = {
  currentUser: User | null
  setCurrentUser: (currentUser: User) => void
}

//create context
export const AuthContext = createContext<AuthContextValue | undefined>({
  currentUser: null,
  setCurrentUser: () => null,
})

//Provider component
type AuthProviderProps = {
  children?: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<null | User>(null)

  const authContextValue: AuthContextValue = {
    currentUser,
    setCurrentUser,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
