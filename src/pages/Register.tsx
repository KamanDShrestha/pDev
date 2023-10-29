import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schema/authSchema';

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
import { useRegisterUser } from '../services/userAuth/registerUser';
import { ModeToggle } from '../components/ThemeToggleButton';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const providedEmail = watch('email');

  const providedPassword = watch('password');
  const providedConfirmPassword = watch('confirmPassword');
  const providedFName = watch('firstName');
  const providedLName = watch('lastName');
  const providedDOB = watch('dateOfBirth');

  const { mutate } = useRegisterUser();

  async function handleRegister(values: z.infer<typeof registerSchema>) {
    console.log(values);
    mutate(values);
  }

  function handleGoogleAuthSuccess(credentialResponse: CredentialResponse) {
    console.log(credentialResponse);

    const decrypted = jwt_decode(credentialResponse.credential!);
    console.log(decrypted);
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='absolute top-5 right-5'>
        <ModeToggle />
      </div>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register to your account to get started
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
                console.log('Register Failed');
              }}
            />
          </div>
          <hr className='w-[100%] h-[0.5px] bg-slate-100 mt-6 mb-6' />
          <form onSubmit={handleSubmit(handleRegister)} autoComplete='off'>
            <div className='flex flex-col gap-3'>
              <p className='m-auto font-semibold text-bg text-slate-700'>
                Sign up with your email
              </p>

              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='firstName'
                  hasContent={
                    providedFName !== undefined && providedFName?.length !== 0
                  }
                >
                  First Name
                </InputFieldLabel>
                <Input {...register('firstName')} type='text' />
                {errors.firstName && (
                  <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                )}
              </div>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='lastName'
                  hasContent={
                    providedFName !== undefined && providedLName?.length !== 0
                  }
                >
                  Last Name
                </InputFieldLabel>
                <Input {...register('lastName')} type='text' />
                {errors.lastName && (
                  <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                )}
              </div>
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
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='confirmPassword'
                  hasContent={
                    providedConfirmPassword !== undefined &&
                    providedConfirmPassword?.length !== 0
                  }
                >
                  Confirm Password
                </InputFieldLabel>
                <Input {...register('confirmPassword')} type='password' />
                {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                )}
              </div>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='dateOfBirth'
                  hasContent={providedDOB !== undefined}
                >
                  Date of Birth
                </InputFieldLabel>
                <Input {...register('dateOfBirth')} type='date' />
                {errors.dateOfBirth && (
                  <ErrorMessage>{errors.dateOfBirth.message}</ErrorMessage>
                )}
              </div>
              <Button>Register</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <span className='text-xs'>
            Already have an account?{' '}
            <NavLink
              to={'/login'}
              className='text-slate-500 hover:text-slate-700'
            >
              Login
            </NavLink>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
