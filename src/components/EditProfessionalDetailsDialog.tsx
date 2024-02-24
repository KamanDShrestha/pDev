import { useQueryClient } from '@tanstack/react-query';
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
import { FieldValues, useForm } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';
import { useEffect } from 'react';
import useUpdateQhpDetails from '../services/qhpDetails/updateQhpDetails';
import useGetQhpDetails from '../services/qhpDetails/getQhpDetails';
import LoadingSpinner from './LoadingSpinner';
import { Textarea } from './ui/textarea';

const EditProfessionalDetailsDialog = () => {
  const { user } = useAuthContext();
  const { data: qhpDetails, isLoading: isFetchingQhpDetails } =
    useGetQhpDetails(user?.id as string);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      workingLicense: qhpDetails?.workingLicense,
      jobTitle: qhpDetails?.jobTitle,
      employerName: qhpDetails?.employerName,
      qualifications: qhpDetails?.qualifications,
      experiences: qhpDetails?.experiences,
      proficientFields: qhpDetails?.proficientFields,
      additionalSkills: qhpDetails?.additionalSkills,
      additionalInformation: qhpDetails?.additionalInformation,
    },
  });

  useEffect(() => {
    reset({
      workingLicense: qhpDetails?.workingLicense,
      jobTitle: qhpDetails?.jobTitle,
      employerName: qhpDetails?.employerName,
      qualifications: qhpDetails?.qualifications,
      experiences: qhpDetails?.experiences,
      proficientFields: qhpDetails?.proficientFields,
      additionalSkills: qhpDetails?.additionalSkills,
      additionalInformation: qhpDetails?.additionalInformation,
    });
  }, [reset]);

  const { mutate: updateQhpDetails } = useUpdateQhpDetails();

  const queryClient = useQueryClient();

  function handleUpdateQhpDetails(data: FieldValues) {
    updateQhpDetails(
      {
        userId: user?.id as string,
        updatedQhpFields: {
          workingLicense: data.workingLicense,
          jobTitle: data.jobTitle,
          employerName: data.employerName,
          qualifications: data.qualifications,
          experiences: data.experiences,
          proficientFields: data.proficientFields,
          additionalSkills: data.additionalSkills,
          additionalInformation: data.additionalInformation,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['qhpDetails', user?.id as string]);
        },
      }
    );
    console.log(data);
  }

  return (
    <Dialog>
      {isFetchingQhpDetails ? (
        <LoadingSpinner />
      ) : (
        <DialogTrigger className={cn(buttonVariants({ variant: 'default' }))}>
          Edit Professional details
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit professional details</DialogTitle>
          <DialogDescription>You can edit your details here.</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-3 h-[60vh] overflow-scroll p-3'>
          <div>
            <label htmlFor='workingLicense' className='font-medium'>
              Working License No.
            </label>
            <Input
              id='workingLicense'
              {...register('workingLicense', {
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
            {errors.workingLicense && (
              <ErrorMessage>{errors.workingLicense.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor='jobTitle' className='font-medium'>
              Job Title
            </label>
            <Input
              id='jobTitle'
              {...register('jobTitle', {
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
            {errors.jobTitle && (
              <ErrorMessage>{errors.jobTitle.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor='employerName' className='font-medium'>
              Employer
            </label>
            <Input
              id='employerName'
              {...register('employerName', {
                required: {
                  value: true,
                  message: 'Please provide your employerName address',
                },
              })}
            />
            {errors.employerName && (
              <ErrorMessage>{errors.employerName.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor='qualifications' className='font-medium'>
              Qualifications
            </label>
            {qhpDetails && qhpDetails.qualifications.length > 0
              ? qhpDetails.qualifications.map((_, index) => (
                  <>
                    <Input
                      className='my-1'
                      key={index}
                      {...register(`qualifications.${index}`, {
                        required: {
                          value: true,
                          message: 'Please provide your qualifications',
                        },
                      })}
                    />
                    {errors.qualifications && (
                      <ErrorMessage>
                        {errors.qualifications.message}
                      </ErrorMessage>
                    )}
                  </>
                ))
              : 'No qualifications are provided.'}
          </div>
          <div>
            <label htmlFor='experiences' className='font-medium'>
              Experiences
            </label>
            {qhpDetails && qhpDetails.experiences.length > 0
              ? qhpDetails.experiences.map((_, index) => (
                  <>
                    <Input
                      className='my-1'
                      key={index}
                      {...register(`experiences.${index}`, {
                        required: {
                          value: true,
                          message: 'Please provide your experiences',
                        },
                      })}
                    />
                    {errors.experiences && (
                      <ErrorMessage>{errors.experiences.message}</ErrorMessage>
                    )}
                  </>
                ))
              : 'No experiences are provided.'}
          </div>
          <div>
            <label htmlFor='proficientFields' className='font-medium'>
              Proficient Fields
            </label>
            {qhpDetails && qhpDetails.proficientFields.length > 0
              ? qhpDetails.proficientFields.map((_, index) => (
                  <>
                    <Input
                      className='my-1'
                      key={index}
                      {...register(`proficientFields.${index}`, {
                        required: {
                          value: true,
                          message: 'Please provide your proficientFields',
                        },
                      })}
                    />
                    {errors.proficientFields && (
                      <ErrorMessage>
                        {errors.proficientFields.message}
                      </ErrorMessage>
                    )}
                  </>
                ))
              : 'No proficientFields are provided.'}
          </div>
          <div>
            <label htmlFor='additionalSkills' className='font-medium'>
              Additional Skills
            </label>
            {qhpDetails && qhpDetails.additionalSkills.length > 0
              ? qhpDetails.additionalSkills.map((_, index) => (
                  <>
                    <Input
                      className='my-1'
                      key={index}
                      {...register(`additionalSkills.${index}`, {
                        required: {
                          value: true,
                          message: 'Please provide your additionalSkills',
                        },
                      })}
                    />
                    {errors.additionalSkills && (
                      <ErrorMessage>
                        {errors.additionalSkills.message}
                      </ErrorMessage>
                    )}
                  </>
                ))
              : 'No additionalSkills are provided.'}
          </div>
          <div>
            <label htmlFor='additionalInformation' className='font-medium'>
              Additional Info
            </label>
            <Textarea
              id='additionalInformation'
              {...register('additionalInformation', {
                required: {
                  value: true,
                  message: 'Please provide your additionalInformation address',
                },
              })}
            />
            {errors.additionalInformation && (
              <ErrorMessage>
                {errors.additionalInformation.message}
              </ErrorMessage>
            )}
          </div>
        </div>

        <Button onClick={handleSubmit(handleUpdateQhpDetails)}>
          Edit professional details
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfessionalDetailsDialog;
