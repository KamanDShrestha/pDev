import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { JourneyFeedbacks } from '../types';
import Heading from './Heading';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface JourneyFeedbackCardProps {
  feedback: JourneyFeedbacks;
}

const JourneyFeedbackCard = ({ feedback }: JourneyFeedbackCardProps) => {
  const navigate = useNavigate();

  const statusColoring = {
    pending: 'bg-yellow-100 text-yellow-500',
    resolved: 'bg-green-100 text-green-500',
    rejected: 'bg-red-100 text-red-500',
  };
  return (
    <Card className='max-w-[550px] '>
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        <div>
          <Heading className='m-0 text-lg'>
            Feedback from : {feedback.userId}
          </Heading>
          <Heading className='m-0 text-lg'>
            Feedback for journey : {feedback.journeyId}
          </Heading>
        </div>
        <div>
          {feedback.journeyFeedback.length > 0 ? (
            <>
              <Heading className='m-0 text-lg'>
                Feedbacks for the journey:
              </Heading>
              <ul>
                {feedback.journeyFeedback.map((feedback, index) => (
                  <li key={index} className=' list-item'>
                    {feedback}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Heading className='m-0 text-lg'>
              {' '}
              No feedbacks for journeys are found{' '}
            </Heading>
          )}
        </div>

        <div>
          {feedback.actionStepFeedback.length > 0 ? (
            <>
              <Heading className='m-0 text-lg'>
                Feedbacks for the action steps:
              </Heading>
              <div>
                {feedback.actionStepFeedback.map((feedback, index) => (
                  <div key={index}>
                    <div>
                      <span className='mb-0 font-medium'>Feedback for: </span>
                      <span>{feedback.actionStepDay}</span>
                    </div>
                    <div>
                      <span className='mb-0 font-medium'>Feedback: </span>
                      <span>{feedback.feedback}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Heading className='m-0 text-lg'>
              {' '}
              No feedbacks for journeys are found{' '}
            </Heading>
          )}
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='space-x-3'>
          <Button>Resolve</Button>
          <Button>Reject</Button>
          <Button
            onClick={() => navigate(`/journeys/edit/${feedback.journeyId}`)}
          >
            Act
          </Button>
        </div>
        <span
          className={`px-4 py-2 text-xs ${
            statusColoring[
              feedback.feedbackStatus as keyof typeof statusColoring
            ]
          } bg-red-100 rounded-full`}
        >
          {feedback.feedbackStatus}
        </span>
      </CardFooter>
    </Card>
  );
};

export default JourneyFeedbackCard;
