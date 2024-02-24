import { useAuthContext } from '../context/AuthProvider';
import { cn } from '../lib/utils';
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
import { useForm } from 'react-hook-form';

const EditPersonalDetailsDialog = () => {
  const { user } = useAuthContext();
  const { register } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      dateOfBirth: user?.dateOfBirth,
    },
  });

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

        <Button>Edit personal details</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditPersonalDetailsDialog;
