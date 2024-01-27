import { JourneyFeedbacks } from '../types';
import Heading from './Heading';
import JourneyFeedbackCard from './JourneyFeedbackCard';

interface FeedbackSectionProps {
  journeyFeedbacks: JourneyFeedbacks[];
  status: 'pending' | 'resolved' | 'rejected';
  isLoading: boolean;
}

const FeedbackSection = ({
  journeyFeedbacks,
  status,
  isLoading,
}: FeedbackSectionProps) => (
  <>
    <Heading className='text-xl'>{`${
      status.charAt(0).toUpperCase() + status.slice(1)
    } feedbacks`}</Heading>
    <div className='flex flex-wrap justify-center gap-4'>
      {isLoading && <div>Loading...</div>}
      {journeyFeedbacks &&
      journeyFeedbacks.filter((feedback) =>
        feedback.journeyFeedbacks.filter(
          (journeyFeedback) => journeyFeedback.feedbackStatus === status
        )
      ).length !== 0 ? (
        journeyFeedbacks.map((feedback) =>
          feedback.journeyFeedbacks
            .filter(
              (journeyFeedback) => journeyFeedback.feedbackStatus === status
            )
            .map((journeyFeedback, index) => (
              <JourneyFeedbackCard
                feedback={journeyFeedback}
                userId={feedback.userId}
                feedbackId={feedback._id}
                journeyId={feedback.journeyId}
                key={index}
              />
            ))
        )
      ) : (
        <div>No {status} feedbacks</div>
      )}
    </div>
  </>
);

export default FeedbackSection;
