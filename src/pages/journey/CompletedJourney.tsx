import { Skeleton } from '../../components/ui/skeleton';

import { useAuthContext } from '../../context/AuthProvider';

import { useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Button, buttonVariants } from '../../components/ui/button';

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

import { LucideDot } from 'lucide-react';
import useGetRandomQuote from '../../services/quotes/getRandomQuote';
import { cn } from '../../lib/utils';
import { Textarea } from '../../components/ui/textarea';
import { FieldValues, useForm } from 'react-hook-form';
import useUpdateRetrospection from '../../services/embarkedJourneys/updateRetrospection';
import ReflectionCard from '../../components/ReflectionCard';
import KeyLearningCard from '../../components/KeyLearningCard';
import useGetCompletedJourney from '../../services/embarkedJourneys/getCompletedJourney';
import useGetJourneyCompletionStatus from '../../services/embarkedJourneys/getJourneyCompletionStatus';
import { useQueryClient } from '@tanstack/react-query';
const CompletedJourney = () => {
  const [selectedJourneyDay, setSelectedJourneyDay] = useState(1);
  const { user } = useAuthContext();
  const journeyId = useParams();
  const {
    data: completedJourney,
    isLoading: isFetchingEmbarkedJourney,
    error,
  } = useGetCompletedJourney(user?.id as string, journeyId?.id as string);

  const { data: completionStatus } = useGetJourneyCompletionStatus(
    user?.id as string,
    journeyId?.id as string
  );
  const { data: randomQuote, isLoading: isFetchingRandomQuote } =
    useGetRandomQuote(completedJourney?.journeyName as string);

  const { register, handleSubmit } = useForm();

  const { mutate: updateRetrospection } = useUpdateRetrospection();

  console.log(error);
  const queryClient = useQueryClient();
  console.log('completedJourney', completedJourney);
  console.log('completionStatus', completionStatus);
  useDocumentTitle('Completed Journey - SelfSync');

  function handleRetrospectionSubmission(data: FieldValues) {
    console.log(data);
    updateRetrospection(
      {
        embarkedJourneyId: completedJourney?._id ?? '',
        updatedFields: {
          reflection: data.reflection,
          keyLearning: data.keyLearning,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            'completedJourney',
            user?.id,
            journeyId?.id,
          ]);
        },
      }
    );
  }

  return (
    <div>
      {completionStatus === false && (
        <div className='w-[full] h-[80vh] flex flex-col items-center justify-center'>
          <h2 className='text-2xl'>You have not completed this journey.</h2>
          <NavLink to={'/journeys'} className={'hover:underline'}>
            Navigate to Journeys page
          </NavLink>
        </div>
      )}

      {completionStatus && (
        <>
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
              <div className='p-10'>
                <h2 className='mt-2 mb-5 text-4xl font-semibold'>
                  Action steps for the journey
                </h2>

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
                    {completedJourney &&
                      Object.keys(completedJourney.actionSteps).map(
                        (day: string, index) => (
                          <Card className='flex flex-col items-center gap-4 p-3 w-full text-lg font-medium max-w-[500px] justify-center border-gray-800'>
                            <Card className='p-3'>
                              {completedJourney.actionSteps[day].status ===
                                'completed' && <FaCheck />}

                              {completedJourney.actionSteps[day].status ===
                                'ongoing' && <CiCircleCheck />}

                              {completedJourney.actionSteps[day].status ===
                                'idle' && <FaRegCalendarCheck />}
                              {completedJourney.actionSteps[day].status ===
                                'blocked' && <MdBlock />}
                              {completedJourney.actionSteps[day].status ===
                                'due' && <TbCalendarDue />}
                            </Card>

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
                                      <span className='whitespace-pre '>
                                        {' '}
                                        -{' '}
                                      </span>

                                      <TruncatedText
                                        content={
                                          completedJourney.actionSteps[day]
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
                                            completedJourney.actionSteps[
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
                                            completedJourney.actionSteps[
                                              `day${selectedJourneyDay}`
                                            ].description
                                          }
                                        </p>
                                      </div>

                                      {completedJourney.actionSteps[
                                        `day${selectedJourneyDay}`
                                      ].example && (
                                        <div>
                                          <NavLink
                                            to={`/journeys/${completedJourney.journeyId}/actionSteps/examples`}
                                            className={cn(
                                              buttonVariants({
                                                variant: 'link',
                                              }),
                                              'underline'
                                            )}
                                          >
                                            View example
                                          </NavLink>
                                        </div>
                                      )}

                                      {completedJourney.actionSteps[
                                        `day${selectedJourneyDay}`
                                      ].additionalSteps && (
                                        <div>
                                          <h2 className='text-xl font-semibold'>
                                            Additional Steps
                                          </h2>
                                          <p className='px-1 py-2 text-sm'>
                                            {completedJourney.actionSteps[
                                              `day${selectedJourneyDay}`
                                            ].additionalSteps.map(
                                              (step: string, index) =>
                                                step && (
                                                  <p
                                                    key={index}
                                                    className='flex'
                                                  >
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

                                      {completedJourney.actionSteps[
                                        `day${selectedJourneyDay}`
                                      ].evidences && (
                                        <div>
                                          <h2 className='text-xl font-semibold'>
                                            Evidences
                                          </h2>
                                          {completedJourney.actionSteps[
                                            `day${selectedJourneyDay}`
                                          ].evidences.filter(
                                            (evidence) => evidence !== null
                                          ).length === 0 && (
                                            <p className='px-3 text-sm'>
                                              No evidences have been provided.
                                            </p>
                                          )}
                                          <p className='px-1 py-2 text-sm font-medium'>
                                            {completedJourney.actionSteps[
                                              `day${selectedJourneyDay}`
                                            ].evidences.map(
                                              (link: string, index) =>
                                                link && (
                                                  <p
                                                    key={index}
                                                    className='flex'
                                                  >
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
          {completedJourney &&
            completedJourney?.isJourneyCompleted &&
            !completedJourney.keyLearning &&
            !completedJourney.reflection && (
              <Card>
                <CardHeader>
                  <CardTitle className='text-3xl'>
                    Provide your retrospection for reflecting on these action
                    steps.
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
          {completedJourney &&
            completedJourney.reflection &&
            completedJourney.keyLearning && (
              <Card>
                <CardHeader>
                  <CardTitle className='text-3xl'>Retrospection</CardTitle>
                  <CardDescription>
                    Ensure yourself to get most out of the journey.
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-wrap items-center justify-around gap-5 p-5'>
                  <ReflectionCard
                    embarkedJourneyId={completedJourney?._id}
                    reflection={completedJourney?.reflection}
                  />

                  <KeyLearningCard
                    embarkedJourneyId={completedJourney._id}
                    keyLearning={completedJourney.keyLearning}
                  />
                </CardContent>
              </Card>
            )}
        </>
      )}
    </div>
  );
};

export default CompletedJourney;
