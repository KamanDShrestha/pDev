import JourneyFeedbackCard from '../../components/JourneyFeedbackCard';
import Heading from '../../components/Heading';
import useGetJourneyFeedbacks from '../../services/journeyFeedbacks/getJourneyFeedbacks';

const Feedbacks = () => {
  const { data: journeyFeedbacks, isLoading } = useGetJourneyFeedbacks();

  return (
    <>
      <div>
        <Heading>Feedbacks for journeys</Heading>

        {isLoading && <div>Loading...</div>}

        {journeyFeedbacks &&
          journeyFeedbacks?.map((feedback, index) => (
            <JourneyFeedbackCard feedback={feedback} key={index} />
          ))}
      </div>
    </>
  );
};

export default Feedbacks;
