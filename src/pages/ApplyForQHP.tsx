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

const ApplyForQHP = () => {
  const { user } = useAuthContext();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate: applyForQHP } = useApplyForQHP();

  const providedLicense = watch('workingLicense');
  const providedAdditionalInfo = watch('additionalInformation');

  function handleApplicationSubmit(data: FieldValues) {
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

    applyForQHP({
      userId: user?.id as string,
      workingLicense: data.workingLicense,
      additionalInformation: data.additionalInformation,
      experiences,
      qualifications,
      proficientFields,
      additionalSkills,
    });
  }
  return (
    <>
      <Heading>Apply for QHP</Heading>
      <div>
        <p className='text-lg'>
          You are currently applying as{' '}
          <strong className=''>
            {user?.firstName} {user?.lastName}
          </strong>
        </p>
        <div className='flex items-center justify-center'>
          <Card className='w-[400px]'>
            <CardHeader>
              <CardTitle>Your info</CardTitle>
            </CardHeader>
            <CardContent className='mt-3 space-y-3'>
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
                  type='text'
                />
                {errors.workingLicense && (
                  <ErrorMessage>
                    {errors.workingLicense.message as string}
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
                  htmlFor='journeyDescription'
                  hasContent={
                    providedAdditionalInfo !== undefined &&
                    providedAdditionalInfo?.length !== 0
                  }
                >
                  Additional info
                </InputFieldLabel>
                <Textarea
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
                Submit my application
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ApplyForQHP;
