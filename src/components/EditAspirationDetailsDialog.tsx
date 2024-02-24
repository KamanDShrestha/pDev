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

import ErrorMessage from './ErrorMessage';
import { useEffect } from 'react';
import useGetSpecificUser from '../services/users/getSpecificUser';
import LoadingSpinner from './LoadingSpinner';

const EditAspirationDetailsDialog = () => {
  const { user } = useAuthContext();
  const { data: userDetails, isLoading: isFetchingUserDetails } =
    useGetSpecificUser(user?.id as string);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      challenges: userDetails?.challenges,
      goals: userDetails?.goals,
      values: userDetails?.values,
    },
  });

  useEffect(() => {
    reset({
      challenges: userDetails?.challenges,
      goals: userDetails?.goals,
      values: userDetails?.values,
    });
  }, [reset]);

  const { mutate: updateAspirationUserDetails } = useUpdateUserDetails();

  const queryClient = useQueryClient();

  function handleUpdateAspirationDetails(data: FieldValues) {
    updateAspirationUserDetails(
      {
        userId: user?.id as string,
        updatedUserFields: {
          challenges: data.challenges,
          goals: data.goals,
          values: data.values,
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
      {isFetchingUserDetails ? (
        <LoadingSpinner />
      ) : (
        <DialogTrigger className={cn(buttonVariants({ variant: 'default' }))}>
          Edit Aspiration details
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Aspiration details</DialogTitle>
          <DialogDescription>You can edit your details here.</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-3'>
          <div>
            <label htmlFor='challenges' className='font-medium'>
              Challenges to overcome
            </label>
            {userDetails && userDetails.challenges.length > 0
              ? userDetails.challenges.map((_, index) => (
                  <>
                    <Input
                      className='my-1'
                      key={index}
                      {...register(`challenges.${index}`, {
                        required: {
                          value: true,
                          message: 'Please provide your challenges',
                        },
                      })}
                    />
                    {errors.challenges && (
                      <ErrorMessage>{errors.challenges.message}</ErrorMessage>
                    )}
                  </>
                ))
              : 'No challenges are provided.'}
          </div>

          <div>
            <label htmlFor='values' className='font-medium'>
              Values
            </label>
            {userDetails && userDetails.values.length > 0
              ? userDetails.values.map((_, index) => (
                  <>
                    <Input
                      className='my-1'
                      key={index}
                      {...register(`values.${index}`, {
                        required: {
                          value: true,
                          message: 'Please provide your values',
                        },
                      })}
                    />
                    {errors.values && (
                      <ErrorMessage>{errors.values.message}</ErrorMessage>
                    )}
                  </>
                ))
              : 'No values are provided.'}
          </div>
          <div>
            <label htmlFor='goals' className='font-medium'>
              goals
            </label>
            {userDetails && userDetails.goals.length > 0
              ? userDetails.goals.map((_, index) => (
                  <>
                    <Input
                      className='my-1'
                      key={index}
                      {...register(`goals.${index}`, {
                        required: {
                          value: true,
                          message: 'Please provide your goals',
                        },
                      })}
                    />
                    {errors.goals && (
                      <ErrorMessage>{errors.goals.message}</ErrorMessage>
                    )}
                  </>
                ))
              : 'No goals are provided.'}
          </div>
        </div>

        <Button onClick={handleSubmit(handleUpdateAspirationDetails)}>
          Edit Aspiration details
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditAspirationDetailsDialog;
