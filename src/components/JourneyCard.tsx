import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './ui/tooltip';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { Button, buttonVariants } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import { useTheme } from './ThemeProvider';
import { useAuthContext } from '../context/AuthProvider';
import useGetEmbarkedJourney from '../services/embarkedJourneys/getEmbarkedJourney';
import useDeleteSpecificJourney from '../services/journey/deleteSpecificJourney';

import { GoDotFill } from 'react-icons/go';
import { BsDot } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { cn } from '../lib/utils';
import useDiscontinueJourney from '../services/embarkedJourneys/discontinueJourney';
import useContinueJourney from '../services/embarkedJourneys/continueJourney';
import { useQueryClient } from '@tanstack/react-query';
import useAddEmbarkedJourney from '../services/embarkedJourneys/addEmbarkedJourney';

interface ActionSteps {
  description: string;
  majorAction: string;
  additionalSteps?: string[];
  evidences: string[];
  references?: string[];
}

export interface JourneyCardProps {
  journeyId: string;
  journeyName: string;
  journeyIcon: { light?: string; dark?: string };
  journeyDescription: string;
  journeyLength: number;
  importance: string[];
  usages: string[];
  learningQuotes?: string[];
  actionSteps?: ActionSteps[];
}

const JourneyCard = ({
  journeyId,
  journeyName,
  journeyDescription,
  journeyIcon,
  journeyLength,
  importance,
  usages,
}: JourneyCardProps) => {
  const { theme } = useTheme();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { data: embarkedJourney } = useGetEmbarkedJourney(
    user?.id as string,
    journeyId
  );
  const { mutate: deleteJourney, isLoading: isDeleting } =
    useDeleteSpecificJourney();
  const { mutate: discontinueJourney, isLoading: isDiscontinuing } =
    useDiscontinueJourney();
  const { mutate: continueJourney, isLoading: isContinuing } =
    useContinueJourney();
  const { mutate: embarkJourney, isLoading: isEmbarking } =
    useAddEmbarkedJourney();

  const queryClient = useQueryClient();

  function handleEmbarkJourney() {
    embarkJourney(
      {
        userId: user?.id as string,
        journeyId: journeyId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            'embarkedJourney',
            user?.id as string,
            journeyId,
          ]);
        },
      }
    );
  }

  function handleContinueJourney() {
    continueJourney(
      {
        userId: user?.id as string,
        journeyId: journeyId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            'embarkedJourney',
            user?.id as string,
            journeyId,
          ]);
        },
      }
    );
  }

  function handleDiscontinueJourney() {
    discontinueJourney(
      {
        userId: user?.id as string,
        journeyId: journeyId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            'embarkedJourney',
            user?.id as string,
            journeyId,
          ]);
        },
      }
    );
  }

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className='max-w-[500px]'>
              <CardHeader>
                <div className='flex items-center justify-around gap-10'>
                  <CardTitle>{journeyName}</CardTitle>
                  {journeyIcon.dark && journeyIcon.light && (
                    <img
                      src={
                        journeyIcon.dark &&
                        journeyIcon.light &&
                        theme === 'dark'
                          ? journeyIcon.dark
                          : journeyIcon.light
                      }
                      className='w-32'
                    />
                  )}
                </div>
                <CardDescription>
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger className='text-lg'>
                        Description
                      </AccordionTrigger>
                      <AccordionContent>{journeyDescription}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardDescription>
                {}
                <div></div>
              </CardHeader>
              <CardContent>
                <div className='p-2'>
                  <h4 className='mb-1 font-semibold'>Importance</h4>
                  <p>
                    {importance.map((item) => (
                      <p className='flex gap-3'>
                        <span className='text-2xl'>
                          <BsDot />
                        </span>
                        <span>{item}</span>
                      </p>
                    ))}
                  </p>
                </div>

                <div className='p-2'>
                  <h4 className='mb-1 font-semibold'>Length of the journey</h4>
                  <span>{journeyLength}</span>
                </div>
              </CardContent>
              <CardFooter className='space-x-4'>
                {user &&
                  user.role === 'user' &&
                  user.preferredJourney !== '' &&
                  (user.preferredJourney === journeyName ||
                    user.hasSubscribed) && (
                    <>
                      <Button
                        onClick={() => navigate(`/journeys/${journeyId}`)}
                      >
                        Browse
                      </Button>

                      {embarkedJourney &&
                        embarkedJourney.journeyStatus === 'discontinued' && (
                          <Button onClick={() => handleContinueJourney()}>
                            {isContinuing ? (
                              <LoadingSpinner />
                            ) : (
                              'Continue the journey'
                            )}
                          </Button>
                        )}

                      {!embarkedJourney ? (
                        <Button onClick={handleEmbarkJourney}>
                          {isEmbarking ? <LoadingSpinner /> : 'Begin'}
                        </Button>
                      ) : (
                        embarkedJourney.isJourneyCompleted === false &&
                        embarkedJourney.journeyStatus === 'ongoing' && (
                          <>
                            <NavLink
                              to={`/currentJourney/${embarkedJourney?.journeyId}`}
                              className={cn(
                                buttonVariants({ variant: 'secondary' })
                              )}
                            >
                              Navigate to the journey
                            </NavLink>

                            <Button onClick={() => handleDiscontinueJourney()}>
                              {isDiscontinuing ? (
                                <LoadingSpinner />
                              ) : (
                                'Discontinue journey'
                              )}
                            </Button>
                          </>
                        )
                      )}
                    </>
                  )}
                {user &&
                  user.role === 'user' &&
                  user.preferredJourney !== journeyName &&
                  !user.hasSubscribed && (
                    <>
                      <FaLock />
                      <span className='text-sm'>
                        Subscribe for unlocking the journey!
                      </span>
                      <Button
                        size={'xs'}
                        onClick={() => navigate('/subscribe')}
                      >
                        Subscribe
                      </Button>
                    </>
                  )}
                {user && user.role === 'admin' && (
                  <>
                    <Button onClick={() => navigate(`/journeys/${journeyId}`)}>
                      Browse
                    </Button>
                    <Button
                      onClick={() => navigate(`/journeys/edit/${journeyId}`)}
                    >
                      Edit this journey
                    </Button>
                    <Button
                      onClick={() => deleteJourney({ id: journeyId })}
                      variant={'destructive'}
                    >
                      {isDeleting ? <LoadingSpinner /> : 'Delete this journey'}
                    </Button>
                  </>
                )}
                {user && user.role === 'qhp' && (
                  <>
                    <Button onClick={() => navigate(`/journeys/${journeyId}`)}>
                      Browse
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </TooltipTrigger>
          <TooltipContent sideOffset={5} side='left'>
            <div className='p-4 border bg-slate-50 dark:bg-slate-800 border-slate-200 w-[300px] rounded-xl'>
              <h2 className='text-lg font-semibold'>Usages</h2>
              <div>
                {usages.map((item) => (
                  <>
                    <span className='flex gap-2 '>
                      <GoDotFill />
                      {item}
                    </span>
                  </>
                ))}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default JourneyCard;
