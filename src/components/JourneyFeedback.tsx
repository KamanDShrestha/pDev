import Heading from './Heading';
import { Button } from './ui/button';
import { Input } from './ui/input';

import { Textarea } from './ui/textarea';

const JourneyFeedback = () => {
  return (
    <div className='space-y-5'>
      <Heading className='mb-0 text-xl'>Provide appropriate feedbacks</Heading>
      <span className='text-xs text-gray-400'>
        You can provide multiple feedbacks for both journey and action steps
      </span>
      <div>
        <Heading className='mb-2 text-lg'>Feedback for the journey</Heading>
        <Textarea />
      </div>
      <div>
        <Heading className='mb-2 text-lg'>
          Feedback for the action steps{' '}
          <span className='text-sm'>(Optional)</span>
        </Heading>
        <div className='space-y-3'>
          <div>
            <label className='font-medium'>For this day </label>
            <Input />
          </div>
          <div>
            <label className='font-medium'>Feedback </label>
            <Textarea />
          </div>
        </div>
      </div>
      <Button>Submit</Button>
    </div>
  );
};

export default JourneyFeedback;
