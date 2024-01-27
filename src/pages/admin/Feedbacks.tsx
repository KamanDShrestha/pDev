import Heading from '../../components/Heading';
import useGetJourneyFeedbacks from '../../services/journeyFeedbacks/getJourneyFeedbacks';
import FeedbackSection from '../../components/FeedbackSection';
import ActionStepFeedbackSection from '../../components/ActionStepFeedbackSection';

const Feedbacks = () => {
  const { data: journeyFeedbacks, isLoading } = useGetJourneyFeedbacks();

  return (
    <>
      <Heading className=''>Feedbacks for journeys</Heading>
      <Heading className='text-3xl'>Journey feedbacks</Heading>
      <FeedbackSection
        journeyFeedbacks={journeyFeedbacks!}
        status='pending'
        isLoading={isLoading}
      />
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
      <Heading className='text-3xl'>Action step feedbacks</Heading>
      <ActionStepFeedbackSection
        journeyFeedbacks={journeyFeedbacks!}
        status='pending'
        isLoading={isLoading}
      />
      <ActionStepFeedbackSection
        journeyFeedbacks={journeyFeedbacks!}
        status='resolved'
        isLoading={isLoading}
      />
      <ActionStepFeedbackSection
        journeyFeedbacks={journeyFeedbacks!}
        status='rejected'
        isLoading={isLoading}
      />
    </>
  );
};

export default Feedbacks;
