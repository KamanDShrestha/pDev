import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { refreshToken } from "../services/userAuth/refreshUser"
import LoadingSpinner from "../components/LoadingSpinner"

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
}

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
  const [user, setUser] = useState<AuthContextType>({} as AuthContextType)
  const [signUpUser, setSignUpUser] = useState<SignUpUserType>({
    email: "",
    name: "",
  })

  const [accessToken, setToken] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    if (!accessToken) {
      fetchRefreshToken()
    }
    async function fetchRefreshToken() {
      try {
        setIsLoading(() => true)
        const response = await refreshToken()
        console.log("Refresh token response in provider:", response)
        if (response && response.success && response.accessToken && response.user) {
          setToken(response.accessToken)
          setUser(() => ({ ...response.user, id: response.user._id } as AuthContextType))
          setIsLoading(() => false)
        }
      } catch (error) {
        console.error("Error refreshing token:", error)
        setIsLoading(() => false)
        setToken(null)
        setUser({} as AuthContextType)
      } finally {
        setIsLoading(() => false)
      }
    }
    return () => {
      isMounted = false
    }
  }, [])

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
