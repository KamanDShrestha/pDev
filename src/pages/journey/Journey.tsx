import { useGetAllJourneys } from '../../services/journey/getAllJourneys';

import JourneyCardSkeleton from '../../components/JourneyCardSkeleton';
import JourneyCard from '../../components/JourneyCard';

import { useAuthContext } from '../../context/AuthProvider';
import useGetAllEmbarkedJourneys from '../../services/embarkedJourneys/getAllEmbarkedJourneys';
import RetrospectionCard from '../../components/RetrospectionCard';
import useDocumentTitle from '../../services/getTitle';
import useGetRandomQuote from '../../services/quotes/getRandomQuote';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Separator } from '../../components/ui/separator';

const Journey = () => {
  const { user } = useAuthContext();
  const { data: journeys, isLoading } = useGetAllJourneys();
  const { data: embarkedJourneys } = useGetAllEmbarkedJourneys(
    user?.id as string
  );

  const { data: randomQuote, isLoading: isFetchingRandomQuote } =
    useGetRandomQuote('Progress');

  console.log('embarkedJourneys', embarkedJourneys);

  console.log(journeys);
  console.log(randomQuote);
  useDocumentTitle('Journeys - SelfSync');

  return (
    <div>
      <div
        style={{
          backgroundImage: `url('/src/assets/coverImages/ontoJourney.jpg')`,
        }}
        className='w-full h-[80vh] flex items-center justify-center bg-cover rounded-lg'
      >
        <div className='flex items-center justify-center w-full h-full p-3 border bg-opacity-40'>
          {isFetchingRandomQuote && <LoadingSpinner />}
          {randomQuote && (
            <div className='p-3 space-y-5 whitespace-pre-wrap shadow-lg bg-[#f7b267] bg-opacity-60 backdrop-blur-xl rounded-lg'>
              <p className='text-2xl'>{randomQuote.quote}</p>
              <p className='text-lg text-right'> - {randomQuote.author}</p>
            </div>
          )}
        </div>
      </div>
      <div className='relative mt-8'>
        <h2 className='mt-2 mb-5 text-4xl font-semibold'>Journeys</h2>
        <div className='flex flex-wrap justify-center gap-10'>
          {isLoading &&
            Array.from(Array(4)).map((_, index) => (
              <JourneyCardSkeleton key={index} />
            ))}

          {journeys &&
            (user?.role === 'user' || user?.role === 'qhp') &&
            journeys
              ?.filter((journey) => journey.isVerified === true)
              .map((journey, index) => (
                <div key={index}>
                  <JourneyCard
                    journeyId={journey._id}
                    journeyName={journey.name}
                    journeyDescription={journey.description}
                    journeyIcon={journey.imageLinks}
                    journeyLength={journey.length}
                    importance={journey.importance}
                    usages={journey.usages}
                  />
                </div>
              ))}

          {journeys &&
            user?.role === 'admin' &&
            journeys.map((journey, index) => (
              <div key={index}>
                <JourneyCard
                  journeyId={journey._id}
                  journeyName={journey.name}
                  journeyDescription={journey.description}
                  journeyIcon={journey.imageLinks}
                  journeyLength={journey.length}
                  importance={journey.importance}
                  usages={journey.usages}
                />
              </div>
            ))}
        </div>
        <p className='my-10 text-right'>
          <span className='text-xs'>
            *For medical emergencies or conditions, please seek appropriate
            medical assistance and expertise. <br />
            Our platform is designed to complement personal development efforts,
            not to provide medical advice or treatment.
          </span>
        </p>
      </div>
      <Separator className='my-24' />
      <div className='mt-8'>
        <h2 className='mb-5 text-4xl font-semibold'>Completed Journeys</h2>
        <div className='flex flex-wrap justify-center gap-10'>
          {embarkedJourneys &&
          embarkedJourneys.filter(
            (embarkedJourney) => embarkedJourney.isJourneyCompleted === true
          ).length !== 0 ? (
            embarkedJourneys.map(
              (embarkedJourney) =>
                embarkedJourney.isJourneyCompleted && (
                  <RetrospectionCard
                    key={embarkedJourney._id}
                    keyLearning={embarkedJourney.keyLearning}
                    reflection={embarkedJourney.reflection}
                    embarkedJourneyId={embarkedJourney._id}
                    journeyId={embarkedJourney.journeyId}
                    journeyName={embarkedJourney.journeyName}
                  />
                )
            )
          ) : (
            <p>You have not completed any journeys. </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journey;
