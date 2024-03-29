import JourneyCardSkeleton from '../../components/JourneyCardSkeleton';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActionStepShowcase from '../../components/ActionStepShowcase';
import { Button } from '../../components/ui/button';
import useAddEmbarkedJourney from '../../services/embarkedJourneys/addEmbarkedJourney';
import { useAuthContext } from '../../context/AuthProvider';
import useGetEmbarkedJourney from '../../services/embarkedJourneys/getEmbarkedJourney';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../components/ui/dialog';
import JourneyFeedback from '../../components/JourneyFeedback';
import useDocumentTitle from '../../services/getTitle';
import useGetRandomQuote from '../../services/quotes/getRandomQuote';
import LoadingSpinner from '../../components/LoadingSpinner';
import useGetSpecificJourneyByID from '../../services/journey/getSpecificJourneyByID';
import useGetJourneyExistence from '../../services/journey/getJourneyExistence';
import useContinueJourney from '../../services/embarkedJourneys/continueJourney';
import { useQueryClient } from '@tanstack/react-query';

// const validJourneys = [
//   'mindfulness',
//   'mindset',
//   'beating procrastination',
//   'personalProductivity',
//   'stoicism',
// ];

const SpecificJourney = () => {
  const params = useParams();

  const { data: journey, isLoading } = useGetSpecificJourneyByID(
    params.id as string
  );
  console.log(journey);
  const navigate = useNavigate();

  const { user } = useAuthContext();
  console.log(user);
  const { mutate } = useAddEmbarkedJourney();

  const { data: embarkedJourney } = useGetEmbarkedJourney(
    user?.id as string,
    journey?._id as string
  );
  const { data: randomQuote, isLoading: isGettingRandomQuote } =
    useGetRandomQuote(journey?.name as string);
  const { data: journeyExistence, isLoading: isJourneyExistenceLoading } =
    useGetJourneyExistence(params.id as string);

  const { mutate: continueJourney, isLoading: isContinuing } =
    useContinueJourney();

  const queryClient = useQueryClient();

  useDocumentTitle(`${journey?.name} - SelfSync`);

  console.log(randomQuote);

  useEffect(() => {
    //to check if the user have the particular journey as preferred or user's subscribed
    if (
      user?.hasSubscribed === false &&
      user.preferredJourney !== params.name &&
      user.role === 'user'
    ) {
      navigate('/notSubscribed');
    }

    if (!isJourneyExistenceLoading && journeyExistence === false) {
      navigate('/journeyNotFound');
    }
  }, [
    isJourneyExistenceLoading,
    journeyExistence,
    navigate,
    params.name,
    user?.hasSubscribed,
    user?.preferredJourney,
    user?.role,
  ]);

  function handleBeginButton() {
    console.log(user?.id, journey?._id);
    if (!user?.id || !journey?._id) return;
    mutate(
      { userId: user.id, journeyId: journey._id },
      {
        onSuccess: () => {
          navigate(`/currentJourney/${journey._id}`);
        },
        onError: () => {
          navigate('/unauthorized');
        },
      }
    );
  }

  function handleContinueJourney() {
    continueJourney(
      {
        userId: user?.id as string,
        journeyId: journey?._id as string,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            'embarkedJourney',
            user?.id as string,
            journey?._id as string,
          ]);
        },
      }
    );
  }
  return (
    <div>
      <div className='w-[full] h-[80vh] bg-gray-200 flex items-center '>
        <div className='flex items-center justify-center w-full h-full p-10'>
          {isGettingRandomQuote && <LoadingSpinner />}
          {randomQuote && (
            <div className='space-y-5'>
              <p className='text-2xl'>{randomQuote.quote}</p>
              <p className='text-lg text-right'> - {randomQuote.author}</p>
            </div>
          )}
        </div>
      </div>
      <div className='p-3'>
        <div className='flex flex-wrap items-center justify-between'>
          <h2 className='mt-2 mb-5 text-4xl font-semibold'>
            Action Steps for {journey?.name}
          </h2>
          <div className='space-x-2'>
            {(user?.role === 'qhp' || user?.role === 'user') && (
              <Dialog>
                <DialogTrigger>
                  <Button>Provide feedbacks</Button>
                </DialogTrigger>
                <DialogContent>
                  <JourneyFeedback journeyId={journey?._id as string} />
                </DialogContent>
              </Dialog>
            )}

            {embarkedJourney === null && (
              <Button onClick={handleBeginButton}>Begin the journey</Button>
            )}

            {embarkedJourney &&
              !embarkedJourney.isJourneyCompleted &&
              embarkedJourney.journeyStatus === 'ongoing' && (
                <Button
                  onClick={() => navigate(`/currentJourney/${journey?._id}`)}
                >
                  Navigate to current journey
                </Button>
              )}

            {embarkedJourney &&
              !embarkedJourney.isJourneyCompleted &&
              embarkedJourney.journeyStatus === 'discontinued' && (
                <Button onClick={() => handleContinueJourney()}>
                  {isContinuing ? <LoadingSpinner /> : 'Continue the journey'}
                </Button>
              )}
          </div>
        </div>
        <div className='flex flex-wrap justify-center gap-5 p-3'>
          {isLoading &&
            Array.from(Array(4)).map((_, index) => (
              <JourneyCardSkeleton key={index} />
            ))}

          {journey &&
            Array.from(Array(journey.length)).map((_, index) => (
              <ActionStepShowcase
                journeyId={journey._id}
                user={user}
                day={index + 1}
                actionStep={journey.actionSteps[`day${index + 1}`]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificJourney;
