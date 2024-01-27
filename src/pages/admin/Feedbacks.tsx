import Heading from '../../components/Heading';
import useGetJourneyFeedbacks from '../../services/journeyFeedbacks/getJourneyFeedbacks';
import FeedbackSection from '../../components/FeedbackSection';

const Feedbacks = () => {
  const { data: journeyFeedbacks, isLoading } = useGetJourneyFeedbacks();

  return (
    <>
      {/* <div>
        <Heading className=''>Feedbacks for journeys</Heading>

        <Heading className='text-3xl'>Journey feedbacks</Heading>
        <Heading className='text-xl'>Pending feedbacks</Heading>
        <div className='flex flex-wrap justify-center gap-4'>
          {isLoading && <div>Loading...</div>}

          {journeyFeedbacks &&
          journeyFeedbacks.filter((feedback) =>
            feedback.journeyFeedbacks.filter(
              (journeyFeedback) => journeyFeedback.feedbackStatus === 'pending'
            )
          ).length !== 0 ? (
            journeyFeedbacks.map((feedback) =>
              feedback.journeyFeedbacks
                .filter(
                  (journeyFeedback) =>
                    journeyFeedback.feedbackStatus === 'pending'
                )
                .map((feedback, index) => (
                  <>
                    <p>{feedback.feedback}</p>
                    <JourneyFeedbackCard feedback={feedback} userId = {journey}/>
                  </>

                  // <JourneyFeedbackCard feedback={feedback} key={index} />
                ))
            )
          ) : (
            <div>No pending feedbacks</div>
          )}
        </div>
        <Heading className='text-3xl'>Action step feedbacks</Heading>
      </div>

      {/* <div>
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
      </div> */}
      <Heading className=''>Feedbacks for journeys</Heading>
      <Heading className='text-3xl'>Journey feedbacks</Heading>
      <FeedbackSection
        journeyFeedbacks={journeyFeedbacks!}
        status='pending'
        isLoading={isLoading}
      />
      <Heading className='text-3xl'>Action step feedbacks</Heading>
      <FeedbackSection
        journeyFeedbacks={journeyFeedbacks!}
        status='resolved'
        isLoading={isLoading}
      />
      <FeedbackSection
        journeyFeedbacks={journeyFeedbacks!}
        status='rejected'
        isLoading={isLoading}
      />
    </>
  );
};

export default Feedbacks;
