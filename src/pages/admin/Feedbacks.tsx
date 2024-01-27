import Heading from '../../components/Heading';
import useGetJourneyFeedbacks from '../../services/journeyFeedbacks/getJourneyFeedbacks';
import FeedbackSection from '../../components/FeedbackSection';
import ActionStepFeedbackSection from '../../components/ActionStepFeedbackSection';

const Feedbacks = () => {
  const { data: journeyFeedbacks, isLoading } = useGetJourneyFeedbacks();

  return (
    <>
      <Heading className=''>Feedbacks for journeys</Heading>
      <div>
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
      </div>
      <div className='flex flex-col gap-3 mt-5'>
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
      </div>
    </>
  );
};

export default Feedbacks;
