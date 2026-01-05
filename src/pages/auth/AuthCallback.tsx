import { useEffect } from "react"
import { useAuthContext } from "../../context/AuthProvider"
import { initializeBootstrap } from "../../services/userAuth/bootstrapUser"
import { useNavigate, useSearchParams } from "react-router-dom"

const AuthCallback = () => {
  const { setUser, setToken } = useAuthContext()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get("token")

  useEffect(() => {
    if (code) {
      getBootstrap(code)
    }
  }, [code])

  async function getBootstrap(token: string) {
    try {
      const response = await initializeBootstrap(token)
      if (response && response.success && response.user && response.accessToken) {
        setUser && setUser({ ...response.user, id: response.user._id })
        setToken(() => response.accessToken)
      }
      return response.success ? navigate("/home") : navigate("/login")
    } catch (error) {
      console.error("Error during bootstrap:", error)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <span className="font-bold text-lg">Authenticating...</span>
    </div>
  )
}

export default AuthCallback
