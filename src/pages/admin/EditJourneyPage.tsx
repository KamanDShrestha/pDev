import { FieldValues, useForm } from 'react-hook-form';
import { Input } from '../../components/ui/input';
import useGetSpecificJourneyByID from '../../services/journey/getSpecificJourneyByID';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Heading from '../../components/Heading';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import useEditJourney from '../../services/journey/editJourney';
import LoadingSpinner from '../../components/LoadingSpinner';
import useDocumentTitle from '../../services/getTitle';
import UpdateJourneyIconDialog from '../../components/UpdateJourneyIconDialog';
import ErrorMessage from '../../components/ErrorMessage';

const EditJourneyPage = () => {
  const { id } = useParams();

  const { data: journey, isLoading } = useGetSpecificJourneyByID(id as string);

  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: journey?.name ?? '',
      description: journey?.description ?? '',
      light: journey?.imageLinks.light,
      dark: journey?.imageLinks.dark,
      importance: journey?.importance ?? [],
      usages: journey?.usages ?? [],
      learningQuotes: journey?.learningQuotes ?? [],
      actionSteps: journey?.actionSteps,
    },
  });
  const { mutate, isLoading: isUpdating } = useEditJourney();

  useDocumentTitle('Edit Journey - SelfSync');

  useEffect(() => {
    if (journey) {
      reset({
        name: journey.name,
        description: journey.description,
        light: journey.imageLinks.light,
        dark: journey.imageLinks.dark,
        importance: journey.importance || [],
        usages: journey.usages || [],
        learningQuotes: journey.learningQuotes || [],
        actionSteps: journey.actionSteps || {},
      });
    }
  }, [journey, reset]);

  console.log(getValues());
  console.log(journey);

  function onSubmit(data: FieldValues) {
    console.log(data);
    // handle null values in evidences, additional steps and references in action steps
    const actionSteps = Object.keys(data.actionSteps).reduce((acc, key) => {
      const { actionStep, description, evidences, additionalSteps, example } =
        data.actionSteps[key];
      console.log(evidences);
      return {
        ...acc,
        [key]: {
          actionStep,
          description,
          example,
          evidences: evidences.filter(
            (evidence: string) => evidence !== null && evidence !== ''
          ),
          additionalSteps: additionalSteps.filter(
            (additionalStep: string) =>
              additionalStep !== null && additionalStep !== ''
          ),
        },
      };
    }, {});

    console.log(actionSteps);
    mutate({
      _id: id as string,
      name: data.name,
      description: data.description,
      imageLinks: {
        light: data.light,
        dark: data.dark,
      },
      importance: data.importance,
      usages: data.usages,
      learningQuotes: data.learningQuotes,
      actionSteps: actionSteps,
      length: journey?.length as number,
    });
  }
  return (
    <>
      <Heading>Edit the journey</Heading>
      {isLoading && <LoadingSpinner />}

      {journey && (
        <div className='space-y-5'>
          <div className='flex flex-wrap justify-around gap-5'>
            <div>
              <div>
                <Heading className='mb-2 text-2xl'>Journey Name</Heading>
                <Input
                  {...register('name', {
                    required: 'Journey name need to be provided',
                    minLength: {
                      value: 5,
                      message: 'Journey name must have at least 5 characters',
                    },
                  })}
                  className='text-lg w-[300px]'
                />
                {errors.name && (
                  <ErrorMessage>{errors.name.message as string}</ErrorMessage>
                )}
              </div>
              <div>
                <Heading className='mb-2 text-2xl'>Journey Description</Heading>
                <Textarea
                  {...register('description', {
                    required: 'Description need to be provided',
                    minLength: {
                      value: 20,
                      message: 'Description must have at least 20 characters',
                    },
                    maxLength: {
                      value: 500,
                      message:
                        'Description must not have more than 500 characters',
                    },
                  })}
                  className='text-lg h-[200px] w-[450px]'
                />
                {errors.description && (
                  <ErrorMessage>
                    {errors.description.message as string}
                  </ErrorMessage>
                )}
              </div>
            </div>
            <div>
              <Heading className='mb-2 text-2xl'>
                Length of the journey: {journey.length}
              </Heading>
              <UpdateJourneyIconDialog journey={journey} />
            </div>
          </div>

          <div className='flex flex-wrap justify-around gap-5'>
            <div>
              <Heading className='mb-2 text-2xl'>Importance</Heading>
              {journey.importance.length !== 0 ? (
                <>
                  {journey.importance.map((item, index) => (
                    <>
                      <Input
                        {...register(`importance.${index}`, {
                          required:
                            'Please provide importance for this journey',
                        })}
                        defaultValue={item}
                        key={index}
                        className='mb-2 text-lg w-[500px]'
                      />
                      {errors?.importance && errors.importance[index] && (
                        <ErrorMessage>
                          {errors.importance[index]?.message as string}
                        </ErrorMessage>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <>
                  {Array.from(Array(3).keys()).map((item, index) => (
                    <>
                      <Input
                        {...register(`importance.${index}`, {
                          required:
                            'Please provide importance for this journey',
                        })}
                        key={index}
                        className='mb-2 text-lg w-[500px]'
                      />
                      {errors?.importance && errors.importance[index] && (
                        <ErrorMessage>
                          {errors.importance[index]?.message as string}
                        </ErrorMessage>
                      )}
                    </>
                  ))}
                </>
              )}
            </div>
            <div>
              <Heading className='mb-2 text-2xl'>Usages</Heading>
              {journey.usages.length !== 0 ? (
                <>
                  {journey.usages.map((item, index) => (
                    <>
                      <Input
                        {...register(`usages.${index}`, {
                          required: 'Please provide usages for this journey',
                        })}
                        defaultValue={item}
                        key={index}
                        className='mb-2 text-lg w-[500px]'
                      />
                      {errors?.usages && errors.usages[index] && (
                        <ErrorMessage>
                          {errors.usages[index]?.message as string}
                        </ErrorMessage>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <>
                  {Array.from(Array(3).keys()).map((item, index) => (
                    <>
                      <Input
                        {...register(`usages.${index}`, {
                          required: 'Please provide usages for this journey',
                        })}
                        defaultValue={item}
                        key={index}
                        className='mb-2 text-lg w-[500px]'
                      />
                      {errors?.usages && errors.usages[index] && (
                        <ErrorMessage>
                          {errors.usages[index]?.message as string}
                        </ErrorMessage>
                      )}
                    </>
                  ))}
                </>
              )}
            </div>
            <div>
              <Heading className='mb-2 text-2xl'>Learning Quotes</Heading>
              {journey.learningQuotes.length !== 0 ? (
                <>
                  {journey.learningQuotes.map((item, index) => (
                    <>
                      <Input
                        {...register(`learningQuotes.${index}`, {
                          required: 'Please provide quotes for this journey',
                        })}
                        defaultValue={item}
                        key={index}
                        className='mb-2 text-lg w-[500px]'
                      />
                      {errors?.learningQuotes &&
                        errors.learningQuotes[index] && (
                          <ErrorMessage>
                            {errors.learningQuotes[index]?.message as string}
                          </ErrorMessage>
                        )}
                    </>
                  ))}
                </>
              ) : (
                <>
                  {Array.from(Array(3).keys()).map((item, index) => (
                    <>
                      <Input
                        {...register(`learningQuotes.${index}`, {
                          required: 'Please provide quotes for this journey',
                        })}
                        defaultValue={item}
                        key={index}
                        className='mb-2 text-lg w-[500px]'
                      />
                      {errors?.learningQuotes &&
                        errors.learningQuotes[index] && (
                          <ErrorMessage>
                            {errors.learningQuotes[index]?.message as string}
                          </ErrorMessage>
                        )}
                    </>
                  ))}
                </>
              )}
            </div>
          </div>
          <div>
            <Heading className='mb-2 text-2xl'>Action Steps</Heading>
            <div className='flex flex-wrap justify-center gap-5'>
              {Array.from(Array(journey.length)).map((item, index) => (
                <>
                  <Card className='p-5'>
                    <Heading className='mb-2 text-xl'>
                      Action Steps for Day {index + 1}
                    </Heading>

                    <div>
                      <Heading className='mb-1 text-lg'>
                        Major Action Step
                      </Heading>
                      <Input
                        {...register(`actionSteps.day${index + 1}.actionStep`, {
                          required: 'Action Step need to be provided',
                          minLength: {
                            value: 10,
                            message: 'Action step must have 10 characters',
                          },
                          maxLength: {
                            value: 500,
                            message:
                              'Action step must have at most 500 characters',
                          },
                        })}
                        defaultValue={
                          journey.actionSteps[`day${index + 1}`].actionStep
                        }
                      />
                      {errors.actionSteps &&
                        errors.actionSteps[`day${index + 1}`]?.actionStep && (
                          <ErrorMessage>
                            {
                              errors.actionSteps[`day${index + 1}`]?.actionStep
                                ?.message as string
                            }
                          </ErrorMessage>
                        )}
                    </div>
                    <div>
                      <Heading className='mb-1 text-lg'>Description</Heading>
                      <Textarea
                        {...register(
                          `actionSteps.day${index + 1}.description`,
                          {
                            required: 'Description need to be provided',
                            minLength: {
                              value: 20,
                              message:
                                'Description must have at least 20 characters',
                            },
                            maxLength: {
                              value: 450,
                              message:
                                'Description must have at most 450 characters',
                            },
                          }
                        )}
                        className=' h-[100px] w-[450px]'
                      />
                      {errors.actionSteps &&
                        errors.actionSteps[`day${index + 1}`]?.description && (
                          <ErrorMessage>
                            {
                              errors.actionSteps[`day${index + 1}`]?.description
                                ?.message as string
                            }
                          </ErrorMessage>
                        )}
                    </div>
                    <div>
                      <Heading className='mb-1 text-lg'>Example</Heading>
                      <Textarea
                        {...register(`actionSteps.day${index + 1}.example`)}
                        className=' h-[100px] w-[450px]'
                      />
                      {errors.actionSteps &&
                        errors.actionSteps[`day${index + 1}`]?.example && (
                          <ErrorMessage>
                            {
                              errors.actionSteps[`day${index + 1}`]?.example
                                ?.message as string
                            }
                          </ErrorMessage>
                        )}
                    </div>
                    <Dialog>
                      <DialogTrigger>
                        <p className='mt-3 text-xs font-medium hover:underline text-slate-600'>
                          Make additional changes
                        </p>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className='text-xl'>
                            Make changes in additional steps and evidences !
                          </DialogTitle>
                        </DialogHeader>
                        <div>
                          <Heading className='mt-1 mb-1 text-lg'>
                            Additional Steps
                          </Heading>
                          <div className='space-y-2'>
                            {Array.from(Array(3).keys()).map(
                              (item, thisIndex) => (
                                <>
                                  <Input
                                    {...register(
                                      `actionSteps.day${
                                        index + 1
                                      }.additionalSteps[${thisIndex}]`
                                    )}
                                    defaultValue={
                                      journey.actionSteps[`day${index + 1}`]
                                        ?.additionalSteps?.[thisIndex]
                                    }
                                  />
                                </>
                              )
                            )}
                          </div>
                        </div>
                        <div>
                          <Heading className='mt-1 mb-1 text-lg'>
                            Evidences
                          </Heading>
                          <div className='space-y-2'>
                            {Array.from(Array(3).keys()).map(
                              (item, thisIndex) => (
                                <>
                                  <Input
                                    {...register(
                                      `actionSteps.day${
                                        index + 1
                                      }.evidences[${thisIndex}]`
                                    )}
                                    defaultValue={
                                      journey.actionSteps[`day${index + 1}`]
                                        ?.evidences?.[thisIndex] || ''
                                    }
                                  />
                                </>
                              )
                            )}
                          </div>
                        </div>
                        <p className='text-xs text-slate-400'>
                          Close for temporarily saving the changes!
                        </p>
                      </DialogContent>
                    </Dialog>
                  </Card>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className='flex items-center justify-center'>
        <Button onClick={handleSubmit(onSubmit)} className='my-10 '>
          {isUpdating ? <LoadingSpinner /> : 'Update this journey'}
        </Button>
      </div>
    </>
  );
};

export default EditJourneyPage;
