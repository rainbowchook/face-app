import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

//custom hook to access AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within the AuthContext')
  }
  return context
}