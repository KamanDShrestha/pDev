import JourneyCardSkeleton from '../../components/JourneyCardSkeleton';
import { Skeleton } from '../../components/ui/skeleton';
import useGetSpecificJourney from '../../services/journey/getSpecificJourney';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActionStepShowcase from '../../components/ActionStepShowcase';
import { Button } from '../../components/ui/button';
import useAddEmbarkedJourney from '../../services/embarkedJourneys/addEmbarkedJourney';
import { useAuthContext } from '../../context/AuthProvider';
import useGetEmbarkedJourney from '../../services/embarkedJourneys/getEmbarkedJourney';

const validJourneys = [
  'mindfulness',
  'mindset',
  'beatingProcrastination',
  'personalProductivity',
  'stoicism',
];

const SpecificJourney = () => {
  const params = useParams();

  const { data: journey, isLoading } = useGetSpecificJourney(
    params.name as string
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

  useEffect(() => {
    if (!validJourneys.includes(params.name as string)) {
      navigate('/journeyNotFound');
    }
  }, [navigate, params.name]);

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

  return (
    <div>
      <div className='w-screen h-[80vh] bg-gray-200 flex items-center '>
        <div className='p-4 text-3xl'>
          {journey ? journey.name : <Skeleton className='h-4 w-[450px]' />}
        </div>
      </div>
      <div className='p-3'>
        <div className='flex flex-wrap items-center justify-between'>
          <h2 className='mt-2 mb-5 text-4xl font-semibold'>
            Action Steps for Stoicism
          </h2>
          {embarkedJourney && !embarkedJourney.isJourneyCompleted ? (
            <Button onClick={() => navigate(`/currentJourney/${journey?._id}`)}>
              Navigate to current journey
            </Button>
          ) : (
            <Button onClick={handleBeginButton}>Begin the journey</Button>
          )}
        </div>
        <div className='flex flex-wrap justify-center gap-5 p-3'>
          {isLoading &&
            Array.from(Array(4)).map((_, index) => (
              <JourneyCardSkeleton key={index} />
            ))}

          {journey &&
            Array.from(Array(journey.length)).map((_, index) => (
              <ActionStepShowcase
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
