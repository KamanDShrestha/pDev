import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthProvider';
import { cn } from '../lib/utils';
import useUpdateUserDetails from '../services/users/updateUserDetails';
import { Button, buttonVariants } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { FieldValues, useForm } from 'react-hook-form';
import getFormattedDate from '../services/getFormattedDate';
import ErrorMessage from './ErrorMessage';
import { useEffect } from 'react';
import removeWhitespace from '../services/removeWhitespace';

const EditPersonalDetailsDialog = () => {
  const { user, setUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      dateOfBirth: getFormattedDate(new Date(user?.dateOfBirth as string)),
    },
  });

  useEffect(() => {
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      dateOfBirth: getFormattedDate(new Date(user?.dateOfBirth as string)),
    });
  }, [reset, user?.dateOfBirth, user?.email, user?.firstName, user?.lastName]);

  const { mutate: updatePersonalUserDetails } = useUpdateUserDetails();

  const queryClient = useQueryClient();

  function handleUpdatePersonalDetails(data: FieldValues) {
    updatePersonalUserDetails(
      {
        userId: user?.id as string,
        updatedUserFields: {
          firstName: removeWhitespace(data.firstName),
          lastName: removeWhitespace(data.lastName),
          email: removeWhitespace(data.email),
          dateOfBirth: new Date(data.dateOfBirth),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['user', user?.id as string]);
          setUser &&
            setUser((prevUser) => ({
              ...prevUser,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              dateOfBirth: new Date(data.dateOfBirth).toISOString(),
            }));
        },
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: 'default' }))}>
        Edit personal details
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit personal details</DialogTitle>
          <DialogDescription>You can edit your details here.</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-3'>
          <div>
            <label htmlFor='firstName' className='font-medium'>
              First Name
            </label>
            <Input
              id='firstName'
              {...register('firstName', {
                required: {
                  value: true,
                  message: 'Please provide your first name',
                },
                minLength: {
                  value: 3,
                  message: 'First name should be at least 3 characters long',
                },
              })}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor='lastName' className='font-medium'>
              Last Name
            </label>
            <Input
              id='lastName'
              {...register('lastName', {
                required: {
                  value: true,
                  message: 'Please provide your last name',
                },
                minLength: {
                  value: 3,
                  message: 'Last name should be at least 3 characters long',
                },
              })}
            />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor='email' className='font-medium'>
              Email
            </label>
            <Input
              id='email'
              type='email'
              {...register('email', {
                required: {
                  value: true,
                  message: 'Please provide your email address',
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: 'Please provide a valid email address',
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor='dateOfBirth' className='font-medium'>
              Date of birth
            </label>
            <Input
              id='dateOfBirth'
              type='date'
              {...register('dateOfBirth', {
                required: {
                  value: true,
                  message: 'Please provide your date of birth',
                },
              })}
            />
            {errors.dateOfBirth && (
              <ErrorMessage>{errors.dateOfBirth.message}</ErrorMessage>
            )}
          </div>
        </div>

        <Button onClick={handleSubmit(handleUpdatePersonalDetails)}>
          Edit personal details
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditPersonalDetailsDialog;
