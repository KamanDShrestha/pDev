import JourneyFeedbackCard from '../../components/JourneyFeedbackCard';
import Heading from '../../components/Heading';
import useGetJourneyFeedbacks from '../../services/journeyFeedbacks/getJourneyFeedbacks';

const Feedbacks = () => {
  const { data: journeyFeedbacks, isLoading } = useGetJourneyFeedbacks();

  return (
    <>
      <div>
        <Heading>Feedbacks for journeys</Heading>

        <div className='flex flex-wrap justify-center gap-4'>
          {isLoading && <div>Loading...</div>}

          {journeyFeedbacks &&
          journeyFeedbacks.filter(
            (feedback) => feedback.feedbackStatus === 'pending'
          ).length !== 0 ? (
            journeyFeedbacks
              .filter((feedback) => feedback.feedbackStatus === 'pending')
              .map((feedback, index) => (
                <JourneyFeedbackCard feedback={feedback} key={index} />
              ))
          ) : (
            <div>No pending feedbacks</div>
          )}
        </div>
      </div>

      <div>
        <Heading>Resolved Feedbacks</Heading>
        {isLoading && <div>Loading...</div>}
        <div className='flex flex-wrap justify-center gap-4'>
          {journeyFeedbacks &&
          journeyFeedbacks.filter(
            (feedback) => feedback.feedbackStatus === 'resolved'
          ).length !== 0 ? (
            journeyFeedbacks
              .filter((feedback) => feedback.feedbackStatus === 'resolved')
              .map((feedback, index) => (
                <JourneyFeedbackCard feedback={feedback} key={index} />
              ))
          ) : (
            <div>No resolved feedbacks</div>
          )}
        </div>
      </div>
      <div>
        <Heading>Rejected Feedbacks</Heading>
        {isLoading && <div>Loading...</div>}
        <div className='flex flex-wrap justify-center gap-4'>
          {journeyFeedbacks &&
          journeyFeedbacks.filter(
            (feedback) => feedback.feedbackStatus === 'rejected'
          ).length !== 0 ? (
            journeyFeedbacks
              .filter((feedback) => feedback.feedbackStatus === 'rejected')
              .map((feedback, index) => (
                <JourneyFeedbackCard feedback={feedback} key={index} />
              ))
          ) : (
            <div>No rejected feedbacks</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feedbacks;
