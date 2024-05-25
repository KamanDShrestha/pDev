import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { statusColoring } from '../constants';
import { PromptFeedback } from '../types';
import { Button } from './ui/button';
import useUpdateStatus from '../services/promptFeedbacks/updateStatus';
import LoadingSpinner from './LoadingSpinner';
import { useQueryClient } from '@tanstack/react-query';

interface PromptFeedbackCardProps {
  feedback: PromptFeedback;
}

const PromptFeedbackCard = ({ feedback }: PromptFeedbackCardProps) => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useUpdateStatus();
  const queryClient = useQueryClient();

  function handleResolve() {
    mutate(
      { feedbackId: feedback._id, feedbackStatus: 'resolved' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['promptFeedbacks']);
        },
      }
    );
  }

  function handleReject() {
    mutate(
      { feedbackId: feedback._id, feedbackStatus: 'rejected' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['promptFeedbacks']);
        },
      }
    );
  }
  return (
    <Card className='w-[400px]'>
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col'>
        <p className='font-semibold'>
          Feedback from: <span className='font-medium'>{feedback.userId}</span>
        </p>
        <p className='font-semibold'>
          Feedback for: <span className='font-medium'>{feedback.promptId}</span>
        </p>
        <p className='font-semibold'>
          Provided feedback: <br />
          <span className='px-3 font-medium'>{feedback.feedback}</span>
        </p>
      </CardContent>
      <CardFooter className='flex justify-between'>
        {feedback.feedbackStatus === 'pending' && (
          <div className='space-x-3'>
            <>
              <Button onClick={() => handleResolve()}>
                {isLoading ? <LoadingSpinner /> : 'Resolve'}
              </Button>
              <Button onClick={() => handleReject()}>
                {isLoading ? <LoadingSpinner /> : 'Reject'}
              </Button>
              <Button
                onClick={() => navigate(`/prompts/edit/${feedback.promptId}`)}
              >
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

export default PromptFeedbackCard;
