import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { initiateRefresh } from "../services/userAuth/refreshUser"
import LoadingSpinner from "../components/LoadingSpinner"
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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    initTokenManager(setToken)

    // condition for tab refresh or direct access to non-callback routes
    console.log("accessToken", window.location.pathname)
    if (!accessToken && !window.location.pathname.includes("/auth/callback") && !isLoading) {
      initializeAuth()
    }

    return () => {}
  }, [])

  const initializeAuth = async () => {
    try {
      setIsLoading(true)
      const response = await initiateRefresh()
      if (response?.success && response.accessToken && response.user) {
        setToken(response.accessToken)
        setAccessToken(response.accessToken)
        setUser({ ...response.user, id: response.user._id } as AuthContextType)
      }
    } catch (error) {
      console.error("Error initializing auth:", error)
      setToken(null)
      setUser(null as AuthContextType)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <LoadingSpinner />
      </div>
    )
  }

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
