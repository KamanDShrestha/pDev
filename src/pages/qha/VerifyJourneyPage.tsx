import { useGetAllJourneys } from '../../services/journey/getAllJourneys';
import Heading from '../../components/Heading';
import JourneyCardSkeleton from '../../components/JourneyCardSkeleton';

import ReviewJourneyCard from '../../components/ReviewJourneyCard';
import useUpdateJourneyVerification from '../../services/journey/updateJourneyVerification';
import JourneyCard from '../../components/JourneyCard';

const VerifyJourneyPage = () => {
  const { data: journeys, isLoading } = useGetAllJourneys();
  const { mutate } = useUpdateJourneyVerification();

  function handleVerification(journeyId: string) {
    mutate(journeyId);
  }

  return (
    <>
      <div>
        <div>
          <Heading>Review journeys</Heading>
          <span className='text-sm text-gray-400'>
            You can review these journeys, enabling the users to embark them.
          </span>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-5 pt-4'>
          {isLoading &&
            Array.from(Array(4)).map((_, index) => {
              return <JourneyCardSkeleton key={index} />;
            })}
          {journeys &&
            journeys.map(
              (journey) =>
                journey.isVerified === false && (
                  <ReviewJourneyCard
                    journeyId={journey._id}
                    journeyName={journey.name}
                    journeyDescription={journey.description}
                    journeyIcon={journey.imageLinks}
                    journeyLength={journey.length}
                    key={journey.name}
                    importance={journey.importance}
                    usages={journey.usages}
                    onVerifyClick={handleVerification}
                  />
                )
            )}
        </div>
      </div>

      <div>
        <div>
          <Heading>Verified journeys</Heading>
          <span className='text-sm text-gray-400'>
            You can provide feedbacks for these journeys, enabling the users to
            get maximum result.
          </span>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-5 pt-4'>
          {isLoading &&
            Array.from(Array(4)).map((_, index) => {
              return <JourneyCardSkeleton key={index} />;
            })}
          {journeys &&
            journeys.map(
              (journey) =>
                journey.isVerified === true && (
                  <JourneyCard
                    journeyId={journey._id}
                    journeyName={journey.name}
                    journeyDescription={journey.description}
                    journeyIcon={journey.imageLinks}
                    journeyLength={journey.length}
                    key={journey.name}
                    importance={journey.importance}
                    usages={journey.usages}
                  />
                )
            )}
        </div>
      </div>
    </>
  );
};

export default VerifyJourneyPage;
