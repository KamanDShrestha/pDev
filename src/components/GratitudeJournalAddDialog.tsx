import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import Heading from './Heading';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useForm } from 'react-hook-form';

const GratitudeJournalAddDialog = () => {
  const { register } = useForm();
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Express gratitude for your well-being.</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Gratitude journaling</DialogTitle>
          <DialogDescription className='px-2 text-sm'>
            Express gratitude for the well-being.
          </DialogDescription>
        </DialogHeader>
        <div className='px-4'>
          <div>
            <Heading className='mb-0 text-md'>
              What am I grateful for today?
            </Heading>
            <Textarea placeholder='I am grateful for ...' {...register('')} />
          </div>
          <div>
            <Heading className='mb-0 text-md'>
              Who made a positive impact on my day?
            </Heading>
            <Textarea placeholder='Acknowledge the people who have made your day better.' />
          </div>
          <div>
            <Heading className='mb-0 text-md'>
              How did I grow or learn from today's challenges?
            </Heading>
            <Textarea placeholder='Focus on the lessons learned and personal growth opportunities.' />
          </div>
          <div>
            <Heading className='mb-0 text-md'>
              What progress, achievements, or aspirations am I grateful for?
            </Heading>
            <Textarea placeholder='Celebrate your accomplishments and express gratitude for your hopes and dreams.' />
          </div>
        </div>
        <div>
          <Button>Express gratitude</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GratitudeJournalAddDialog;
