import { FieldValues, useForm } from 'react-hook-form';
import Heading from './Heading';
import { Button } from './ui/button';
import { Input } from './ui/input';

import { Textarea } from './ui/textarea';
import useAddJourneyFeedback from '../services/journeyFeedbacks/addJourneyFeedback';
import { useAuthContext } from '../context/AuthProvider';

interface JourneyFeedbackProps {
  journeyId: string;
}

const JourneyFeedback = ({ journeyId }: JourneyFeedbackProps) => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuthContext();
  const { mutate } = useAddJourneyFeedback();
  function handleFeedbackSubmit(data: FieldValues) {
    if (!data.journeyFeedback && !data.actionStepFeedback) return;

    console.log(data);
    mutate({
      userId: user?.id as string,
      journeyId,
      journeyFeedback: data.journeyFeedback || '',
      actionStepFeedback: {
        actionStepDay: data.actionStepDay || '',
        feedback: data.feedback || '',
      },
    });
  }

  return (
    <div className='space-y-5'>
      <Heading className='mb-0 text-xl'>Provide appropriate feedbacks</Heading>
      <span className='text-xs text-gray-400'>
        You can provide multiple feedbacks for both journey and action steps
      </span>
      <div>
        <Heading className='mb-2 text-lg'>Feedback for the journey</Heading>
        <Textarea {...register('journeyFeedback')} />
      </div>
      <div>
        <Heading className='mb-2 text-lg'>
          Feedback for the action steps{' '}
          <span className='text-sm'>(Optional)</span>
        </Heading>
        <div className='space-y-3'>
          <div>
            <label className='font-medium'>For this day </label>
            <Input {...register('actionStepDay')} />
          </div>
          <div>
            <label className='font-medium'>Feedback </label>
            <Textarea {...register('feedback')} />
          </div>
        </div>
      </div>
      <Button onClick={handleSubmit(handleFeedbackSubmit)}>Submit</Button>
    </div>
  );
};

export default JourneyFeedback;
