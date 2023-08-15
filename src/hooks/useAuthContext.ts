import { useContext } from "react"
import { AuthContext, AuthContextType } from "../contexts/AuthContext"

//custom hook to access AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within the AuthContext')
  }
  return context
}