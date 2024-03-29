import { JourneyFeedbacks } from '../types';
import ActionStepFeedbackCard from './ActionStepFeedbackCard';
import Heading from './Heading';
import LoadingSpinner from './LoadingSpinner';

interface ActionStepFeedbackSectionProps {
  journeyFeedbacks: JourneyFeedbacks[];
  status: 'pending' | 'resolved' | 'rejected';
  isLoading: boolean;
}

const ActionStepFeedbackSection = ({
  journeyFeedbacks,
  status,
  isLoading,
}: ActionStepFeedbackSectionProps) => (
  <>
    <Heading className='text-2xl'>{`${
      status.charAt(0).toUpperCase() + status.slice(1)
    } feedbacks`}</Heading>
    <div className='flex flex-wrap justify-center gap-4'>
      {isLoading && <LoadingSpinner />}
      {journeyFeedbacks &&
      journeyFeedbacks.filter((feedback) =>
        feedback.actionStepFeedbacks.filter(
          (actionStepFeedback) => actionStepFeedback.feedbackStatus === status
        )
      ).length !== 0 ? (
        journeyFeedbacks.map((feedback) =>
          feedback.actionStepFeedbacks
            .filter(
              (actionStepFeedback) =>
                actionStepFeedback.feedbackStatus === status
            )
            .map((journeyFeedback, index) => (
              <ActionStepFeedbackCard
                feedback={journeyFeedback}
                userId={feedback.userId}
                feedbackId={feedback._id}
                journeyId={feedback.journeyId}
                userRole={feedback.userRole}
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

export default ActionStepFeedbackSection;
