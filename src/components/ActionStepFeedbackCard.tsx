import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ActionStepFeedback } from '../types';
import Heading from './Heading';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useUpdateJourneyFeedbackStatus } from '../services/journeyFeedbacks/updateJourneyFeedbackStatus';

interface ActionStepFeedbackCardProps {
  feedback: ActionStepFeedback;
  feedbackId: string;
  userId: string;
  journeyId: string;
}

// This component provide a card for the feedbacks of the journey
const JourneyFeedbackCard = ({
  feedback,
  feedbackId,
  userId,
  journeyId,
}: ActionStepFeedbackCardProps) => {
  const { mutate: updateFeedbackStatus } = useUpdateJourneyFeedbackStatus();
  const navigate = useNavigate();

  const statusColoring = {
    pending: 'bg-yellow-100 text-yellow-500',
    resolved: 'bg-green-100 text-green-500',
    rejected: 'bg-red-100 text-red-500',
  };

  function handleResolve() {
    updateFeedbackStatus({
      feedbackDocumentId: feedbackId,
      feedbackId: feedback._id,
      status: 'resolved',
    });
  }
  function handleReject() {
    updateFeedbackStatus({
      feedbackDocumentId: feedbackId,
      feedbackId: feedback._id,
      status: 'rejected',
    });
  }

  return (
    <Card className='max-w-[550px] '>
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        <div>
          <Heading className='m-0 text-lg'>Feedback from : {userId}</Heading>
          <Heading className='m-0 text-lg'>
            Feedback for journey : {journeyId}
          </Heading>
        </div>

        <div>
          <>
            <Heading className='m-0 text-lg'>
              Feedbacks for the action steps:
            </Heading>
            <div>
              <div>
                <div>
                  <span className='mb-0 font-medium'>Feedback for: </span>
                  <span>{feedback.actionStepDay}</span>
                </div>
                <div>
                  <span className='mb-0 font-medium'>Feedback: </span>
                  <span>{feedback.feedback}</span>
                </div>
              </div>
            </div>
          </>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        {feedback.feedbackStatus === 'pending' && (
          <div className='space-x-3'>
            <>
              <Button onClick={() => handleResolve()}>Resolve</Button>
              <Button onClick={() => handleReject()}>Reject</Button>
              <Button onClick={() => navigate(`/journeys/edit/${journeyId}`)}>
                Act
              </Button>
            </>
          </div>
        )}
        <span
          className={`px-4 py-2 text-xs ${
            statusColoring[
              feedback.feedbackStatus as keyof typeof statusColoring
            ]
          } rounded-full`}
        >
          {feedback.feedbackStatus}
        </span>
      </CardFooter>
    </Card>
  );
};

export default JourneyFeedbackCard;
