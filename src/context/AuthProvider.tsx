import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react"
import { initiateRefresh } from "../services/userAuth/refreshUser"
import { initTokenManager, setAccessToken } from "../lib/tokenManager"

export type AuthContextType = {
  firstName: string
  lastName: string
  email: string
  role: string
  accessToken: string
  id: string
  isNewUser: boolean
  hasSubscribed: boolean
  preferredJourney: string
  loggedMood: boolean
  dateOfBirth?: string
  image: string
  isGoogleLoggedIn: boolean
} | null

export type SignUpUserType = {
  email: string
  name: string
}

const AuthContext = createContext(
  {} as {
    user?: AuthContextType
    setUser?: React.Dispatch<React.SetStateAction<AuthContextType>>
    signUpUser?: SignUpUserType
    setSignUpUser?: React.Dispatch<React.SetStateAction<SignUpUserType>>
    isLoading: boolean
    accessToken: string | null
    setToken: React.Dispatch<React.SetStateAction<string | null>>
  }
)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType>(null as AuthContextType)
  const [signUpUser, setSignUpUser] = useState<SignUpUserType>({
    email: "",
    name: "",
  })

  const [accessToken, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    initTokenManager(setToken)

    const initializeAuth = async () => {
      try {
        const response = await initiateRefresh()
        if (response?.success && response.accessToken && response.user) {
          setToken(response.accessToken)
          setAccessToken(response.accessToken)
          setUser({ ...response.user, id: response.user._id } as AuthContextType)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error initializing auth:", error)
        setToken(null)
        setUser(null as AuthContextType)
        setIsLoading(false)
      }
    }

    // condition for tab refresh or direct access to non-callback routes
    if (!accessToken && !window.location.pathname.includes("/auth/callback")) {
      console.log("Initializing auth from AuthProvider")
      initializeAuth()
      console.log("after initializeAuth in AuthProvider")
    } else {
      setIsLoading(false)
    }

    return () => {}
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: setUser as React.Dispatch<React.SetStateAction<AuthContextType>>,
        isLoading,
        signUpUser,
        setSignUpUser,
        accessToken,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}

export default AuthProvider
