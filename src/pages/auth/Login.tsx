import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../schema/authSchema"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import InputFieldLabel from "../../components/InputFieldLabel"

import { Button } from "../../components/ui/button"
import ErrorMessage from "../../components/ErrorMessage"
import { NavLink } from "react-router-dom"
import { useLoginUser } from "../../services/userAuth/loginUser"
import LoadingSpinner from "../../components/LoadingSpinner"
import { BACKEND_URL } from "../../constants"
import { FcGoogle } from "react-icons/fc"
import useDocumentTitle from "../../services/getTitle"

import { useAuthContext } from "../../context/AuthProvider"
import useLogoutUser from "../../services/userAuth/logoutUser"
import Turnstile, { useTurnstile } from "react-turnstile"
import { useState } from "react"
import toast from "react-hot-toast"
import { useTheme } from "../../components/ThemeProvider"

const Login = () => {
  const { theme } = useTheme()
  const [captchaToken, setCaptchaToken] = useState("")
  const { user } = useAuthContext()
  const {
    register,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate: logoutUser } = useLogoutUser()
  const turnstile = useTurnstile()

  console.log(user)
  const providedEmail = watch("email")
  const providedPassword = watch("password")
  const { mutate: loginUser, isLoading: isLoggingIn } = useLoginUser()

  useDocumentTitle("Login - SelfSync")

  function handleLogin(values: z.infer<typeof loginSchema>) {
    console.log(user)
    if (!captchaToken || captchaToken.length === 0) {
      toast.error("Please verify yourself before proceeding.")
    }

    if (user?.email) {
      logoutUser(user.id, {
        onSuccess: () => {
          loginUser(values)
        },
      })
    } else {
      loginUser(
        { ...values, token: captchaToken },
        {
          onSuccess: () => {
            reset()
            setCaptchaToken("")
          },
        },
      )
      turnstile.reset()
    }
  }

  function handleGoogleAuthLogin() {
    if (user?.email) {
      logoutUser(user.id, {
        onSuccess: () => {
          window.open(`${BACKEND_URL}/api/auth/google/callback`, "_self")
        },
      })
    } else {
      window.open(`${BACKEND_URL}/api/auth/google/callback`, "_self")
    }
  }

  function handleCaptchaTheme(): "dark" | "light" {
    if (theme === "dark") {
      return "dark"
    } else if (theme === "light") {
      return "light"
    }

    return theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  return (
    <>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2">
            <Button onClick={handleGoogleAuthLogin} variant={"outline"} className="space-x-1">
              <span>Sign in using Google</span>
              <span className="text-lg">
                <FcGoogle />
              </span>
            </Button>
          </div>
          <hr className="w-[100%] h-[0.5px] bg-slate-100 mt-6 mb-6" />
          <form onSubmit={handleSubmit(handleLogin)} autoComplete="off">
            <div className="flex flex-col gap-3">
              <p className="m-auto font-semibold text-bg text-slate-700">Sign in with your email</p>
              <div className="relative group">
                <InputFieldLabel htmlFor="email" hasContent={providedEmail !== undefined && providedEmail?.length !== 0}>
                  Email
                </InputFieldLabel>
                <Input
                  {...register("email", {
                    required: "Please provide your email",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      message: "Please provide a valid email address",
                    },
                  })}
                  type="email"
                  id="email"
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </div>

              <div className="relative group">
                <InputFieldLabel htmlFor="password" hasContent={providedPassword !== undefined && providedPassword?.length !== 0}>
                  Password
                </InputFieldLabel>
                <Input
                  {...register("password", {
                    required: "Please provide your password",
                    minLength: {
                      value: 6,
                      message: "Password should be at least 6 characters long",
                    },
                  })}
                  type="password"
                  id="password"
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              </div>
              <NavLink to={"/forgetPassword"} className="text-sm text-slate-500 hover:text-slate-700">
                Forget Password?
              </NavLink>
              <div>
                <Turnstile sitekey={`${import.meta.env.VITE_CAPTCHA_SITE_KEY}`} onVerify={(token) => setCaptchaToken(token)} className="bg-transparent w-full rounded-lg" style={{ borderRadius: "8px" }} theme={handleCaptchaTheme()} size="flexible" />
              </div>

              <Button disabled={isLoggingIn}>{isLoggingIn ? <LoadingSpinner /> : "Login"}</Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <span className="text-xs">
            Don't have an account?{" "}
            <NavLink to={"/register"} className="text-slate-500 hover:text-slate-700">
              Register
            </NavLink>
          </span>
          <span className="text-xs font-medium">
            <NavLink to={"/reverify"} className="text-slate-500 hover:text-slate-700">
              Verify my account
            </NavLink>
          </span>
        </CardFooter>
      </Card>
    </>
  )
}

export default Login
