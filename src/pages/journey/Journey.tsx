import { useGetAllJourneys } from '../../services/journey/getAllJourneys';

import JourneyCardSkeleton from '../../components/JourneyCardSkeleton';
import JourneyCard from '../../components/JourneyCard';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import useGetAllEmbarkedJourneys from '../../services/embarkedJourneys/getAllEmbarkedJourneys';
import RetrospectionCard from '../../components/RetrospectionCard';

const Journey = () => {
  const { user } = useAuthContext();
  const { data: journeys, isLoading } = useGetAllJourneys();
  const { data: embarkedJourneys } = useGetAllEmbarkedJourneys(
    user?.id as string
  );

  console.log('embarkedJourneys', embarkedJourneys);
  const navigate = useNavigate();

  console.log(journeys);

  function handleJourneyBrowseClick(name: string) {
    navigate('/journeys/' + name.toLowerCase());
  }
  return (
    <div className='p-5 mt-5 mb-5'>
      <div className='w-screen h-[80vh] bg-gray-200'>
        Placeholder for quotes
      </div>
      <div className='mt-8'>
        <h2 className='mt-2 mb-5 text-4xl font-semibold'>Journeys</h2>
        <div className='flex flex-wrap justify-center gap-10'>
          {isLoading &&
            Array.from(Array(4)).map((_, index) => (
              <JourneyCardSkeleton key={index} />
            ))}

          {journeys &&
            journeys.map((journey) => (
              <>
                <JourneyCard
                  journeyId={journey._id}
                  journeyName={journey.name}
                  journeyDescription={journey.description}
                  journeyIcon={journey.imageLinks}
                  journeyLength={journey.length}
                  key={journey.name}
                  importance={journey.importance}
                  usages={journey.usages}
                  onBrowseClick={() => handleJourneyBrowseClick(journey.name)}
                />
              </>
            ))}
        </div>
      </div>
      <div className='mt-8'>
        <h2 className='mb-5 text-4xl font-semibold'>Completed Journeys</h2>
        <div className='flex flex-wrap justify-center gap-10'>
          <div>
            {embarkedJourneys &&
            embarkedJourneys.filter(
              (embarkedJourney) => embarkedJourney.isJourneyCompleted === true
            ).length !== 0 ? (
              embarkedJourneys.map(
                (embarkedJourney) =>
                  embarkedJourney.isJourneyCompleted && (
                    <RetrospectionCard
                      key={embarkedJourney._id}
                      keyLearnings={embarkedJourney.keyLearning}
                      reflection={embarkedJourney.reflection}
                      journeyName='Stoicism'
                    />
                  )
              )
            ) : (
              <p>You have not completed any journeys. </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
