import { Skeleton } from '../../components/ui/skeleton';
import { Checkbox } from '../../components/ui/checkbox';
import { useAuthContext } from '../../context/AuthProvider';
import useGetEmbarkedJourney from '../../services/embarkedJourneys/getEmbarkedJourney';
import { useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Button, buttonVariants } from '../../components/ui/button';
import useUpdateActionCompletion from '../../services/embarkedJourneys/updateActionCompletion';
import { useQueryClient } from '@tanstack/react-query';
import TruncatedText from '../../components/TruncatedText';
import { FaCheck, FaRegCalendarCheck } from 'react-icons/fa';
import { CiCircleCheck } from 'react-icons/ci';
import { MdBlock } from 'react-icons/md';
import { TbCalendarDue } from 'react-icons/tb';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import LoadingSpinner from '../../components/LoadingSpinner';
import useDocumentTitle from '../../services/getTitle';

import ProgressBar from '../../components/ProgressBar';
import { LucideDot } from 'lucide-react';
import useGetRandomQuote from '../../services/quotes/getRandomQuote';
import { cn } from '../../lib/utils';
import { Textarea } from '../../components/ui/textarea';
import { FieldValues, useForm } from 'react-hook-form';
import useUpdateRetrospection from '../../services/embarkedJourneys/updateRetrospection';
import ReflectionCard from '../../components/ReflectionCard';
import KeyLearningCard from '../../components/KeyLearningCard';
const CurrentJourney = () => {
  const { user } = useAuthContext();
  const journeyId = useParams();
  const {
    data: embarkedJourney,
    isLoading: isFetchingEmbarkedJourney,
    error,
  } = useGetEmbarkedJourney(user?.id as string, journeyId?.id as string);

  const { data: randomQuote, isLoading: isFetchingRandomQuote } =
    useGetRandomQuote(embarkedJourney?.journeyName as string);

  const { register, handleSubmit } = useForm();

  const { mutate: updateRetrospection } = useUpdateRetrospection();

  console.log(error);
  const { mutate } = useUpdateActionCompletion();
  const queryClient = useQueryClient();
  const [selectedJourneyDay, setSelectedJourneyDay] = useState(1);
  const [isActionStepChecked, setIsActionStepChecked] = useState(false);

  useDocumentTitle('Current Journey - SelfSync');

  const completionPercentage =
    embarkedJourney &&
    (Object.keys(embarkedJourney.actionSteps).filter(
      (day) => embarkedJourney.actionSteps[day].isCompleted === true
    ).length /
      Object.keys(embarkedJourney.actionSteps).length) *
      100;

  function handleConfirmActionStepCompletion(day: string) {
    mutate(
      {
        journeyId: journeyId?.id as string,
        day: day,
        userId: user?.id as string,
      },
      {
        onSuccess: () => {
          console.log('Action step completion updated successfully');
          queryClient.invalidateQueries({
            queryKey: ['embarkedJourney', user?.id, journeyId.id],
          });
        },
      }
    );
  }

  function handleRetrospectionSubmission(data: FieldValues) {
    console.log(data);
    updateRetrospection({
      embarkedJourneyId: embarkedJourney?._id ?? '',
      updatedFields: {
        reflection: data.reflection,
        keyLearning: data.keyLearning,
      },
    });
  }

  return (
    <div>
      <div className='w-[full] h-[80vh] bg-gray-200 flex items-center '>
        <div className='flex items-center justify-center w-full h-full p-10'>
          {isFetchingRandomQuote && <LoadingSpinner />}
          {randomQuote && (
            <div className='space-y-5'>
              <p className='text-2xl'>{randomQuote.quote}</p>
              <p className='text-lg text-right'> - {randomQuote.author}</p>
            </div>
          )}
        </div>
      </div>

      {error ? (
        <p>{error.response?.data.message}</p>
      ) : (
        <>
          <div className='p-5'>
            <h2 className='mt-2 mb-5 text-4xl font-semibold'>
              Today's action step
            </h2>

            <div className='flex items-center justify-center gap-3 p-5 text-2xl font-medium text-center'>
              {/* getting the action step in which the journey is ongoing as only one of the journey would be ongoing*/}
              {isFetchingEmbarkedJourney && <LoadingSpinner />}

              {embarkedJourney &&
              (embarkedJourney.isJourneyCompleted
                ? 'You have completed the whole journey. 🎉'
                : embarkedJourney.actionSteps[
                    Object.keys(embarkedJourney.actionSteps).filter(
                      (day) =>
                        embarkedJourney?.actionSteps[day].status ===
                          'ongoing' ||
                        embarkedJourney.actionSteps[day].status === 'due'
                    )[0]
                  ]?.actionStep) ? (
                <Card>
                  <CardContent className='p-5 space-y-3'>
                    <p>
                      {
                        embarkedJourney.actionSteps[
                          Object.keys(embarkedJourney.actionSteps).filter(
                            (day) =>
                              embarkedJourney?.actionSteps[day].status ===
                                'ongoing' ||
                              embarkedJourney.actionSteps[day].status === 'due'
                          )[0]
                        ]?.actionStep
                      }
                    </p>

                    <p className='text-lg'>
                      {
                        embarkedJourney.actionSteps[
                          Object.keys(embarkedJourney.actionSteps).filter(
                            (day) =>
                              embarkedJourney?.actionSteps[day].status ===
                                'ongoing' ||
                              embarkedJourney.actionSteps[day].status === 'due'
                          )[0]
                        ]?.description
                      }
                    </p>

                    {embarkedJourney.actionSteps[
                      Object.keys(embarkedJourney.actionSteps).filter(
                        (day) =>
                          embarkedJourney?.actionSteps[day].status ===
                            'ongoing' ||
                          embarkedJourney.actionSteps[day].status === 'due'
                      )[0]
                    ]?.example ? (
                      <NavLink
                        className={cn(
                          buttonVariants({ variant: 'link' }),
                          'text-sm'
                        )}
                        to={`/journeys/${embarkedJourney.journeyId}/actionSteps/examples`}
                      >
                        View example
                      </NavLink>
                    ) : null}
                  </CardContent>
                </Card>
              ) : (
                embarkedJourney &&
                'You have completed the action step for the day. 🎉'
              )}
            </div>
          </div>

          <div className='p-10'>
            <h2 className='mt-2 mb-5 text-4xl font-semibold'>
              Ongoing journey
            </h2>

            <ProgressBar completion={completionPercentage!} />
            <div>
              <div className='flex flex-col gap-8'>
                {isFetchingEmbarkedJourney &&
                  Array.from(Array(7)).map((_, index) => (
                    <div className='flex gap-4' key={index}>
                      <Skeleton className='w-8 h-8 rounded-full' />
                      <Skeleton className='w-[80vw] h-8' />
                    </div>
                  ))}
              </div>

              <div className='flex flex-wrap justify-center gap-5 p-5'>
                {embarkedJourney &&
                  Object.keys(embarkedJourney.actionSteps).map(
                    (day: string, index) => (
                      <Card className='flex flex-col items-center gap-4 p-3 w-full text-lg font-medium max-w-[500px] justify-center border-gray-800'>
                        <Dialog>
                          <DialogTrigger
                            disabled={
                              embarkedJourney.actionSteps[day].isCompleted ||
                              embarkedJourney.actionSteps[day].status ===
                                'idle' ||
                              embarkedJourney.actionSteps[day].status ===
                                'blocked'
                            }
                            className='text-2xl'
                          >
                            <Card className='p-3'>
                              {embarkedJourney.actionSteps[day].status ===
                                'completed' && <FaCheck />}

                              {embarkedJourney.actionSteps[day].status ===
                                'ongoing' && <CiCircleCheck />}

                              {embarkedJourney.actionSteps[day].status ===
                                'idle' && <FaRegCalendarCheck />}
                              {embarkedJourney.actionSteps[day].status ===
                                'blocked' && <MdBlock />}
                              {embarkedJourney.actionSteps[day].status ===
                                'due' && <TbCalendarDue />}
                            </Card>
                          </DialogTrigger>
                          <DialogContent>
                            <div className='space-y-5'>
                              <h1 className='text-2xl font-semibold'>
                                Do you want to mark this day as completed?
                              </h1>
                              <div className='flex justify-between'>
                                <DialogClose>
                                  <Button
                                    onClick={() =>
                                      setIsActionStepChecked(false)
                                    }
                                  >
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <DialogClose>
                                  <Button
                                    onClick={() =>
                                      handleConfirmActionStepCompletion(day)
                                    }
                                  >
                                    Confirm
                                  </Button>
                                </DialogClose>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* modal dialog for providing details of action steps */}
                        <div
                          className='hover:cursor-pointer'
                          onClick={() => setSelectedJourneyDay(index + 1)}
                        >
                          <Dialog>
                            <DialogTrigger>
                              <Card>
                                <CardContent className='flex items-center justify-center p-5'>
                                  <p className='text-xl'>{`Day ${
                                    index + 1
                                  }`}</p>
                                  <span className='whitespace-pre '> - </span>

                                  <TruncatedText
                                    content={
                                      embarkedJourney.actionSteps[day]
                                        .actionStep
                                    }
                                    limit={75}
                                  />
                                </CardContent>
                              </Card>
                            </DialogTrigger>

                            <DialogContent className='max-h-[70vh] overflow-scroll'>
                              <div>
                                <h1 className='text-2xl font-semibold'>
                                  Day {selectedJourneyDay}
                                </h1>
                                <DialogDescription className='text-lg font-medium'>
                                  Level up your day
                                </DialogDescription>
                                <div className='p-3'>
                                  <div>
                                    <h2 className='text-xl font-semibold'>
                                      Action step for the day
                                    </h2>
                                    <p className='px-3 py-2 text-sm'>
                                      {
                                        embarkedJourney.actionSteps[
                                          `day${selectedJourneyDay}`
                                        ].actionStep
                                      }
                                    </p>
                                  </div>

                                  <div>
                                    <h2 className='text-xl font-semibold'>
                                      Description
                                    </h2>
                                    <p className='px-3 py-2 text-sm'>
                                      {
                                        embarkedJourney.actionSteps[
                                          `day${selectedJourneyDay}`
                                        ].description
                                      }
                                    </p>
                                  </div>

                                  {embarkedJourney.actionSteps[
                                    `day${selectedJourneyDay}`
                                  ].example && (
                                    <div>
                                      <NavLink
                                        to={`/journeys/${embarkedJourney.journeyId}/actionSteps/examples`}
                                        className={cn(
                                          buttonVariants({ variant: 'link' }),
                                          'underline'
                                        )}
                                      >
                                        View example
                                      </NavLink>
                                    </div>
                                  )}

                                  {embarkedJourney.actionSteps[
                                    `day${selectedJourneyDay}`
                                  ].additionalSteps && (
                                    <div>
                                      <h2 className='text-xl font-semibold'>
                                        Additional Steps
                                      </h2>
                                      <p className='px-1 py-2 text-sm'>
                                        {embarkedJourney.actionSteps[
                                          `day${selectedJourneyDay}`
                                        ].additionalSteps.map(
                                          (step: string, index) =>
                                            step && (
                                              <p key={index} className='flex'>
                                                <span>
                                                  <LucideDot />
                                                </span>
                                                <span>{step}</span>
                                              </p>
                                            )
                                        )}
                                      </p>
                                    </div>
                                  )}

                                  {embarkedJourney.actionSteps[
                                    `day${selectedJourneyDay}`
                                  ].evidences && (
                                    <div>
                                      <h2 className='text-xl font-semibold'>
                                        Evidences
                                      </h2>
                                      {embarkedJourney.actionSteps[
                                        `day${selectedJourneyDay}`
                                      ].evidences.filter(
                                        (evidence) => evidence !== null
                                      ).length === 0 && (
                                        <p className='px-3 text-sm'>
                                          No evidences have been provided.
                                        </p>
                                      )}
                                      <p className='px-1 py-2 text-sm font-medium'>
                                        {embarkedJourney.actionSteps[
                                          `day${selectedJourneyDay}`
                                        ].evidences.map(
                                          (link: string, index) =>
                                            link && (
                                              <p key={index} className='flex'>
                                                <span>
                                                  <LucideDot />
                                                </span>
                                                <Link
                                                  key={index}
                                                  to={link}
                                                  target='_blank'
                                                >
                                                  {link}
                                                </Link>
                                              </p>
                                            )
                                        )}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {embarkedJourney.actionSteps[
                                  `day${selectedJourneyDay}`
                                ].status === 'ongoing' && (
                                  <div className='flex items-center gap-2'>
                                    <Checkbox
                                      defaultChecked={
                                        embarkedJourney.actionSteps[day]
                                          .isCompleted
                                      }
                                      checked={
                                        embarkedJourney.actionSteps[day]
                                          .isCompleted || isActionStepChecked
                                      }
                                      disabled={
                                        embarkedJourney.actionSteps[day]
                                          .isCompleted
                                      }
                                      onClick={() =>
                                        handleConfirmActionStepCompletion(day)
                                      }
                                    />
                                    <span className='font-medium'>
                                      Yay, I completed the action step for the
                                      day. 🎉
                                    </span>
                                  </div>
                                )}

                                {embarkedJourney.actionSteps[
                                  `day${selectedJourneyDay}`
                                ].status === 'idle' && (
                                  <span className='font-medium'>
                                    I will surely complete this on the
                                    respective day.
                                  </span>
                                )}

                                {embarkedJourney.actionSteps[
                                  `day${selectedJourneyDay}`
                                ].status === 'blocked' && (
                                  <span className='font-medium'>
                                    Please complete previous days action steps
                                    to unlock this day's action step.
                                  </span>
                                )}

                                {embarkedJourney.actionSteps[
                                  `day${selectedJourneyDay}`
                                ].status === 'due' && (
                                  <span className='font-medium'>
                                    Please complete this day to unlock the next
                                    day's action step.
                                  </span>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </Card>
                    )
                  )}
              </div>
            </div>
          </div>
        </>
      )}
      {embarkedJourney &&
        embarkedJourney?.isJourneyCompleted &&
        !embarkedJourney.keyLearning &&
        !embarkedJourney.reflection && (
          <Card>
            <CardHeader>
              <CardTitle className='text-3xl'>
                Provide your retrospection for reflecting on these action steps.
              </CardTitle>
              <CardDescription>
                Provide your throughts and experiences for relflection.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-wrap items-center justify-around gap-5 p-5'>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Provide your reflection after completing this journey:
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className='max-w-[600px] lg:w-[600px] md:w-[400px] w-full transition-all'
                    {...register('reflection', {
                      required:
                        'Please provide your reflection before submission.',
                      maxLength: {
                        value: 250,
                        message:
                          'Please provide your reflection within 250 characters.',
                      },
                    })}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Provide your key learning:</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className='max-w-[600px] lg:w-[600px] md:w-[400px] w-full transition-all'
                    {...register('keyLearning', {
                      required:
                        'Please provide your key learning before submission.',
                      maxLength: {
                        value: 250,
                        message:
                          'Please provide your key learning within 250 characters.',
                      },
                    })}
                  />
                </CardContent>
              </Card>
            </CardContent>

            <CardFooter>
              <Button onClick={handleSubmit(handleRetrospectionSubmission)}>
                Submit my retrospection
              </Button>
            </CardFooter>
          </Card>
        )}
      {embarkedJourney &&
        embarkedJourney.reflection &&
        embarkedJourney.keyLearning && (
          <Card>
            <CardHeader>
              <CardTitle className='text-3xl'>Retrospection</CardTitle>
              <CardDescription>
                Ensure yourself to get most out of the journey.
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-wrap items-center justify-around gap-5 p-5'>
              <ReflectionCard
                embarkedJourneyId={embarkedJourney?._id}
                reflection={embarkedJourney?.reflection}
              />

              <KeyLearningCard
                embarkedJourneyId={embarkedJourney._id}
                keyLearning={embarkedJourney.keyLearning}
              />
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default CurrentJourney;
