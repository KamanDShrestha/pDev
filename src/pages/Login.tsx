import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schema/authSchema';

import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import InputFieldLabel from '../components/InputFieldLabel';

import { Button } from '../components/ui/button';
import ErrorMessage from '../components/ErrorMessage';
import { NavLink } from 'react-router-dom';
import { useLoginUser } from '../services/userAuth/loginUser';

const Login = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const providedEmail = watch('email');
  const providedPassword = watch('password');

  console.log(errors);
  const { mutate } = useLoginUser();

  function handleLogin(values: z.infer<typeof loginSchema>) {
    console.log(values);
    mutate(values);
  }
  function handleGoogleAuthSuccess(credentialResponse: CredentialResponse) {
    console.log(credentialResponse);
    const decrypted = jwt_decode(credentialResponse.credential!);
    console.log(decrypted);
  }

  return (
    <>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center gap-2'>
            <p className='m-auto font-semibold text-bg text-slate-700'>
              Sign in using Google
            </p>
            <GoogleLogin
              onSuccess={handleGoogleAuthSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
          <hr className='w-[100%] h-[0.5px] bg-slate-100 mt-6 mb-6' />
          <form onSubmit={handleSubmit(handleLogin)} autoComplete='off'>
            <div className='flex flex-col gap-3'>
              <p className='m-auto font-semibold text-bg text-slate-700'>
                Sign in with your email
              </p>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='email'
                  hasContent={
                    providedEmail !== undefined && providedEmail?.length !== 0
                  }
                >
                  Email
                </InputFieldLabel>
                <Input {...register('email')} type='email' />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </div>

              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='password'
                  hasContent={
                    providedPassword !== undefined &&
                    providedPassword?.length !== 0
                  }
                >
                  Password
                </InputFieldLabel>
                <Input {...register('password')} type='password' />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
              </div>
              <Button>Login</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <span className='text-xs'>
            Don't have an account?{' '}
            <NavLink
              to={'/register'}
              className='text-slate-500 hover:text-slate-700'
            >
              Register
            </NavLink>
          </span>
        </CardFooter>
      </Card>
    </>
  );
};

export default Login;
