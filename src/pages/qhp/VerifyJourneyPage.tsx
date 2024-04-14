import { useGetAllJourneys } from '../../services/journey/getAllJourneys';
import Heading from '../../components/Heading';
import JourneyCardSkeleton from '../../components/JourneyCardSkeleton';

import ReviewJourneyCard from '../../components/ReviewJourneyCard';
import useUpdateJourneyVerification from '../../services/journey/updateJourneyVerification';
import JourneyCard from '../../components/JourneyCard';
import useDocumentTitle from '../../services/getTitle';

const VerifyJourneyPage = () => {
  const { data: journeys, isLoading } = useGetAllJourneys();
  const { mutate } = useUpdateJourneyVerification();

  useDocumentTitle('Verify Journeys - SelfSync');

  function handleVerification(journeyId: string) {
    mutate(journeyId);
  }

  return (
    <>
      <div className='mb-20'>
        <div>
          <Heading>Review journeys</Heading>
          <span className='text-sm text-gray-400'>
            You can review these journeys, enabling the users to embark them.
          </span>
        </div>

        <div className='flex flex-wrap justify-center gap-5 pt-4'>
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

          {journeys?.length === 0 ? (
            <span>No journeys are found</span>
          ) : journeys?.filter((journey) => journey.isVerified === false)
              .length === 0 ? (
            <span>No pending journeys for verification are found.</span>
          ) : null}
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

        <div className='flex flex-wrap justify-center gap-5 pt-4'>
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
