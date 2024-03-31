import { useForm } from 'react-hook-form';
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
import { useState } from 'react';
import { cn } from '../../lib/utils';

const Register = () => {
  const [imageURL, setImageURL] = useState<string | undefined>();
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    // checking if the image is provided or not
    setImageError(null);

    if (e.target.files) {
      if (e.target.files[0].type.split('/')[0] !== 'image') {
        setImageError('Please provide a valid image file');
        return;
      }

      // check if the image is within 5MB limit
      if (e.target.files[0].size > 5000000) {
        setImageError('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result as string);
      };
      setImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleRegister(values: z.infer<typeof registerSchema>) {
    const formData = new FormData();

    if (image instanceof File) {
      // check if file is a File object
      formData.append('image', image); // append the File object directly
    }
    console.log(formData.entries());

    //trimming and changing the email to lowercase
    values.firstName = values.firstName.trim();
    values.lastName = values.lastName.trim();
    values.email = values.email.trim().toLowerCase();
    formData.append('data', JSON.stringify(values));

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
              <div className='flex flex-col'>
                <label>Upload image</label>
                {imageURL && (
                  <img
                    src={imageURL}
                    alt='user-image'
                    className={cn(imageURL ? `w-20 h-20 rounded-full` : '')}
                  />
                )}
                <Input type='file' onChange={handleImageChange} />
                {imageError && <ErrorMessage>{imageError}</ErrorMessage>}
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
              <Button disabled={isRegistering}>
                {isRegistering ? <LoadingSpinner /> : 'Register'}
              </Button>
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
