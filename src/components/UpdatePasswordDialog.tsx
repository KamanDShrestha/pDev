import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, buttonVariants } from './ui/button';
import { cn } from '../lib/utils';
import ErrorMessage from './ErrorMessage';
import { Input } from './ui/input';
import useUpdatePassword from '../services/users/updatePassword';
import { useAuthContext } from '../context/AuthProvider';
import { useState } from 'react';

const UpdatePasswordDialog = () => {
  const { user } = useAuthContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { mutate: updatePassword } = useUpdatePassword();
  const [isPasswordError, setIsPasswordError] = useState(false);
  const passwordError = 'Provided passwords do not match';
  function handleUpdatePassword(data: FieldValues) {
    if (data.newPassword !== data.confirmNewPassword) {
      setIsPasswordError(true);
      return;
    }
    updatePassword({
      userId: user?.id as string,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  }

  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: 'default' }))}>
        Change password
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your password</DialogTitle>
          <DialogDescription>
            You can update your password here.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-3'>
          <div>
            <label htmlFor='currentPassword' className='font-medium'>
              Current Password
            </label>
            <Input
              id='currentPassword'
              type='password'
              {...register('currentPassword', {
                required: {
                  value: true,
                  message: 'Please provide your current password',
                },
                minLength: {
                  value: 3,
                  message:
                    'Current Password should be at least 3 characters long',
                },
              })}
            />
            {errors.currentPassword && (
              <ErrorMessage>
                {errors.currentPassword.message as string}
              </ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor='newPassword' className='font-medium'>
              New Password
            </label>
            <Input
              id='newPassword'
              type='password'
              {...register('newPassword', {
                required: {
                  value: true,
                  message: 'Please provide your new password',
                },
                minLength: {
                  value: 3,
                  message: 'new Password should be at least 3 characters long',
                },
              })}
            />
            {errors.newPassword && (
              <ErrorMessage>
                {errors.newPassword.message as string}
              </ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor='confirmNewPassword' className='font-medium'>
              Confirm New Password
            </label>
            <Input
              id='confirmNewPassword'
              type='password'
              {...register('confirmNewPassword', {
                required: {
                  value: true,
                  message: 'Please provide your new password',
                },
                minLength: {
                  value: 3,
                  message: 'New Password should be at least 3 characters long',
                },
              })}
            />
            {errors.confirmNewPassword && (
              <ErrorMessage>
                {errors.confirmNewPassword.message as string}
              </ErrorMessage>
            )}
          </div>
          {isPasswordError && (
            <ErrorMessage>{passwordError as string}</ErrorMessage>
          )}
        </div>
        <Button onClick={handleSubmit(handleUpdatePassword)}>
          Update password
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePasswordDialog;
