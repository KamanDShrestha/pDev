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

  function handleLogin(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  function handleGoogleAuthSuccess(credentialResponse: CredentialResponse) {
    console.log(credentialResponse);

    const decrypted = jwt_decode(credentialResponse.credential!);
    console.log(decrypted);
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <GoogleLogin
            onSuccess={handleGoogleAuthSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <form onSubmit={handleSubmit(handleLogin)} autoComplete='off'>
            <div className='flex flex-col gap-3'>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='email'
                  hasContent={
                    providedEmail !== '' && providedEmail?.length !== 0
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
                    providedPassword !== '' && providedPassword?.length !== 0
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
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default Login;
