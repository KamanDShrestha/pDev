import { useEffect } from "react"
import { useAuthContext } from "../../context/AuthProvider"
import { bootstrapUser } from "../../services/userAuth/bootstrapUser"
import { useNavigate, useSearchParams } from "react-router-dom"

const AuthCallback = () => {
  const { setUser, setToken } = useAuthContext()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const code = searchParams.get("token")
    if (code) {
      bootstrapUser(code)
        .then((response) => {
          if (response && response.success && response.user && response.accessToken) {
            setUser && setUser({ ...response.user, id: response.user._id })
            setToken(response.accessToken)
            navigate("/home")
          } else {
            console.log("Invalid bootstrap response")
          }
        })
        .catch((error) => {
          console.error("Error during bootstrap:", error)
        })
    }
  }, [searchParams.get("token")])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <span className="font-bold text-lg">Authenticating...</span>
    </div>
  )
}

export default AuthCallback
