import { FieldValues, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../schema/authSchema';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import InputFieldLabel from '../../components/InputFieldLabel';
import { Button } from '../../components/ui/button';
import ErrorMessage from '../../components/ErrorMessage';
import { useRegisterUser } from '../../services/userAuth/registerUser';

import { NavLink } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import { FcGoogle } from 'react-icons/fc';
import useDocumentTitle from '../../services/getTitle';
import LoadingSpinner from '../../components/LoadingSpinner';

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

  const { mutate, isLoading: isRegistering } = useRegisterUser();

  useDocumentTitle('Register - SelfSync');

  console.log(errors);

  async function handleRegister(values: FieldValues) {
    const formData = new FormData();
    const providedImage = watch('image');

    const file = providedImage?.[0]; // get the File object
    console.log(file instanceof File);
    console.log(typeof file);
    if (file instanceof File) {
      // check if file is a File object
      formData.append('image', file); // append the File object directly
    }
    delete values.image;
    console.log(formData.entries());
    // values = { ...values, thisImage: values.image[0].name };
    formData.append('data', JSON.stringify(values));

    // Log FormData entries
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    mutate(formData);
  }

  function handleGoogleAuthLogin() {
    window.open(`${BACKEND_URL}/auth/google/callback`, '_self');
  }

  return (
    <>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register to your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className='overflow-scroll h-[60vh]'>
          <div className='flex flex-col items-center gap-2'>
            <Button
              onClick={handleGoogleAuthLogin}
              variant={'outline'}
              className='space-x-1'
            >
              <span>Sign in using Google</span>
              <span className='text-lg'>
                <FcGoogle />
              </span>
            </Button>
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
                <Input {...register('firstName')} type='text' id='firstName' />
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
                <Input {...register('lastName')} type='text' id='lastName' />
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
                <Input {...register('email')} type='email' id='email' />
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
                <Input
                  {...register('password')}
                  type='password'
                  id='password'
                />
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
                <Input
                  {...register('confirmPassword')}
                  type='password'
                  id='confirmPassword'
                />
                {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                )}
              </div>
              <div>
                <label>Upload image</label>
                <Input
                  type='file'
                  {...register('image', { required: false })}
                />
              </div>

              <div className='relative group'>
                <InputFieldLabel htmlFor='dateOfBirth' hasContent={true}>
                  Date of Birth
                </InputFieldLabel>
                <Input {...register('dateOfBirth')} type='date' />
                {errors.dateOfBirth && (
                  <ErrorMessage>{errors.dateOfBirth.message}</ErrorMessage>
                )}
              </div>
              <Button>{isRegistering ? <LoadingSpinner /> : 'Register'}</Button>
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
    </>
  );
};

export default Register;
