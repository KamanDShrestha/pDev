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

const EditPersonalDetailsDialog = () => {
  const { user } = useAuthContext();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      dateOfBirth: getFormattedDate(new Date(user?.dateOfBirth as string)),
    },
  });

  const { mutate: updatePersonalUserDetails } = useUpdateUserDetails();

  const queryClient = useQueryClient();

  function handleUpdatePersonalDetails(data: FieldValues) {
    updatePersonalUserDetails(
      {
        userId: user?.id as string,
        updatedUserFields: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dateOfBirth: new Date(data.dateOfBirth),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['user', user?.id as string]);
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
            <Input id='firstName' {...register('firstName')} />
          </div>
          <div>
            <label htmlFor='lastName' className='font-medium'>
              Last Name
            </label>
            <Input id='lastName' {...register('lastName')} />
          </div>
          <div>
            <label htmlFor='email' className='font-medium'>
              Email
            </label>
            <Input id='email' {...register('email')} />
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
