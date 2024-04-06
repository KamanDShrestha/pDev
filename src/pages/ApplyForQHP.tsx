import { FieldValues, useForm } from 'react-hook-form';
import Heading from '../components/Heading';
import { useAuthContext } from '../context/AuthProvider';
import InputFieldLabel from '../components/InputFieldLabel';
import { Input } from '../components/ui/input';
import ErrorMessage from '../components/ErrorMessage';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import useApplyForQHP from '../services/qhpApplications/applyForQHP';
import LoadingSpinner from '../components/LoadingSpinner';
import useDocumentTitle from '../services/getTitle';
import { useState } from 'react';

const ApplyForQHP = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate: applyForQHP, isLoading: isApplying } = useApplyForQHP();

  const providedLicense = watch('workingLicense');
  const providedEmployer = watch('employerName');
  const providedPosition = watch('workingPosition');
  const providedAdditionalInfo = watch('additionalInformation');

  useDocumentTitle('Apply for QHP - SelfSync');

  function handleApplicationSubmit(data: FieldValues) {
    const formData = new FormData();
    if (!(file instanceof File)) {
      setFileError('Please provide a valid document file');
      return;
    }
    if (fileError) {
      return;
    }
    formData.append('cv', file);

    const experiences = [];
    const qualifications = [];
    const proficientFields = [];
    const additionalSkills = [];
    for (let i = 1; i <= 2; i++) {
      if (data[`experience${i}`]) {
        experiences.push(data[`experience${i}`]);
      }
      if (data[`qualification${i}`]) {
        qualifications.push(data[`qualification${i}`]);
      }
      if (data[`proficientField${i}`]) {
        proficientFields.push(data[`proficientField${i}`]);
      }
      if (data[`additionalSkill${i}`]) {
        additionalSkills.push(data[`additionalSkill${i}`]);
      }
    }
    console.log(data);
    console.log(experiences);
    console.log(qualifications);
    console.log(proficientFields);
    console.log(additionalSkills);

    formData.append(
      'data',
      JSON.stringify({
        userId: user?.id as string,
        workingLicense: data.workingLicense,
        additionalInformation: data.additionalInformation,
        experiences,
        qualifications,
        proficientFields,
        additionalSkills,
        workingPosition: data.workingPosition,
        employerName: data.employerName,
      })
    );

    applyForQHP(formData);
  }

  function handleCVUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    setFileError(null);
    if (e.target.files === null) return;
    if (e.target.files[0].type.split('/')[0] !== 'application') {
      setFileError('Please provide a valid document file');
      return;
    }
    if (e.target.files[0].type.split('/')[1] !== 'pdf') {
      setFileError('Please provide a valid PDF file');
      return;
    }

    if (e.target.files[0].size > 5000000) {
      setFileError('File size must not exceed 5MB');
      return;
    }

    setFile(e.target.files[0]);
  }

  return (
    <>
      <Heading>Apply for QHP</Heading>
      <div>
        <p className='my-5 text-lg'>
          You are currently applying as{' '}
          <strong className=''>
            {user?.firstName} {user?.lastName}
          </strong>
        </p>
        <div className='flex flex-wrap items-center justify-around gap-10'>
          <div className='flex flex-col'>
            <label htmlFor='' className='font-medium'>
              Upload your CV
            </label>
            <Input type='file' onChange={handleCVUpdate} />
            {fileError && <ErrorMessage>{fileError}</ErrorMessage>}
          </div>
          <Card className='w-[400px]'>
            <CardHeader>
              <CardTitle>Your info</CardTitle>
            </CardHeader>
            <CardContent className='mt-3 space-y-3 h-[75vh] overflow-scroll p-3'>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='workingLicense'
                  hasContent={
                    providedLicense !== undefined &&
                    providedLicense?.length !== 0
                  }
                >
                  License Number
                </InputFieldLabel>
                <Input
                  {...register('workingLicense', {
                    required: 'License Number need to be provided',
                    minLength: {
                      value: 7,
                      message: 'License number must have at least 7 characters',
                    },
                  })}
                  id='workingLicense'
                  type='text'
                />
                {errors.workingLicense && (
                  <ErrorMessage>
                    {errors.workingLicense.message as string}
                  </ErrorMessage>
                )}
              </div>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='employerName'
                  hasContent={
                    providedEmployer !== undefined &&
                    providedEmployer?.length !== 0
                  }
                >
                  Employer Name
                </InputFieldLabel>
                <Input
                  {...register('employerName', {
                    required: 'Employer name need to be provided',
                    minLength: {
                      value: 7,
                      message: 'Employer name must have at least 5 characters',
                    },
                  })}
                  id='employerName'
                  type='text'
                />
                {errors.employerName && (
                  <ErrorMessage>
                    {errors.employerName.message as string}
                  </ErrorMessage>
                )}
              </div>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='workingPosition'
                  hasContent={
                    providedPosition !== undefined &&
                    providedPosition?.length !== 0
                  }
                >
                  Working Position
                </InputFieldLabel>
                <Input
                  {...register('workingPosition', {
                    required: 'Working position need to be provided',
                    minLength: {
                      value: 7,
                      message:
                        'Working position must have at least 5 characters',
                    },
                  })}
                  id='workingPosition'
                  type='text'
                />
                {errors.workingPosition && (
                  <ErrorMessage>
                    {errors.workingPosition.message as string}
                  </ErrorMessage>
                )}
              </div>
              <div className='relative group'>
                <label htmlFor='journeyImportance' className='font-medium'>
                  Relevant Qualifications
                </label>
                <div className='relative flex flex-col gap-2'>
                  {Array.from(Array(2)).map((_, index) => (
                    <>
                      <Input
                        key={index}
                        {...register(`qualification${index + 1}`, {
                          required: 'Please provide your qualification',
                        })}
                      />
                      {errors[`qualification${index + 1}`] && (
                        <ErrorMessage key={index}>
                          {
                            errors[`qualification${index + 1}`]
                              ?.message as string
                          }
                        </ErrorMessage>
                      )}
                    </>
                  ))}
                </div>
              </div>
              <div className='relative group'>
                <label htmlFor='relevantExperiences' className='font-medium'>
                  Relevant Experiences
                </label>
                <div className='relative flex flex-col gap-2'>
                  {Array.from(Array(2)).map((_, index) => (
                    <>
                      <Input
                        key={index}
                        {...register(`experience${index + 1}`, {
                          required: 'Please provide your relevant experience.',
                        })}
                      />
                      {errors[`experience${index + 1}`] && (
                        <ErrorMessage key={index}>
                          {errors[`experience${index + 1}`]?.message as string}
                        </ErrorMessage>
                      )}
                    </>
                  ))}
                </div>
              </div>
              <div className='relative group'>
                <label htmlFor='proficientFields' className='font-medium'>
                  Proficient Fields
                </label>
                <div className='relative flex flex-col gap-2'>
                  {Array.from(Array(2)).map((_, index) => (
                    <>
                      <Input
                        key={index}
                        {...register(`proficientField${index + 1}`, {
                          required: 'Please provide your proficient field.',
                        })}
                      />
                      {errors[`proficientField${index + 1}`] && (
                        <ErrorMessage key={index}>
                          {
                            errors[`proficientField${index + 1}`]
                              ?.message as string
                          }
                        </ErrorMessage>
                      )}
                    </>
                  ))}
                </div>
              </div>
              <div className='relative group'>
                <label htmlFor='additionalSkills' className='font-medium'>
                  Additional Skills
                </label>
                <div className='relative flex flex-col gap-2'>
                  {Array.from(Array(2)).map((_, index) => (
                    <>
                      <Input
                        key={index}
                        {...register(`additionalSkill${index + 1}`, {
                          required: 'Please provide your proficient field.',
                        })}
                      />
                      {errors[`additionalSkill${index + 1}`] && (
                        <ErrorMessage key={index}>
                          {
                            errors[`additionalSkill${index + 1}`]
                              ?.message as string
                          }
                        </ErrorMessage>
                      )}
                    </>
                  ))}
                </div>
              </div>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='additionalInformation'
                  hasContent={
                    providedAdditionalInfo !== undefined &&
                    providedAdditionalInfo?.length !== 0
                  }
                >
                  Additional info
                </InputFieldLabel>
                <Textarea
                  id='additionalInformation'
                  {...register('additionalInformation', {
                    required: 'Additional info need to be provided',
                    minLength: {
                      value: 20,
                      message:
                        'Additional info must have at least 20 characters',
                    },
                    maxLength: {
                      value: 500,
                      message:
                        'Additional info must not have more than 500 characters',
                    },
                  })}
                />
                {errors.additionalInformation && (
                  <ErrorMessage>
                    {errors.additionalInformation.message as string}
                  </ErrorMessage>
                )}
              </div>
            </CardContent>
            <CardFooter className='flex justify-center'>
              <Button onClick={handleSubmit(handleApplicationSubmit)}>
                {isApplying ? <LoadingSpinner /> : 'Submit my application'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ApplyForQHP;
