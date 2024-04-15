import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button, buttonVariants } from './ui/button';
import { FieldValues, useForm } from 'react-hook-form';
import useUpdatePrompt from '../services/gratitudePrompts/updatePrompt';
import LoadingSpinner from './LoadingSpinner';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';

interface UpdateGratitudeJournalPromptProps {
  prompt: {
    _id: string;
    prompt: string;
    placeholder: string;
    category: string;
  };
}

const UpdateGratitudeJournalPrompt = ({
  prompt,
}: UpdateGratitudeJournalPromptProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      prompt: prompt.prompt,
      placeholder: prompt.placeholder,
      category: prompt.category,
    },
  });
  const { mutate: updatePrompt, isLoading: isUpdating } = useUpdatePrompt();

  function handlePromptUpdate(data: FieldValues) {
    updatePrompt({
      promptId: prompt._id,
      promptEditFields: {
        prompt: data.prompt,
        placeholder: data.placeholder,
        category: data.category,
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({ variant: 'default', size: 'xs' })}
      >
        Update
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update prompt</DialogTitle>
        <div>
          <div>
            <label htmlFor='prompt' className='font-medium'>
              Prompt
            </label>
            <Textarea
              id='prompt'
              {...register('prompt', {
                required: 'Prompt must be provided.',
              })}
            />
          </div>
          <div>
            <label htmlFor='placeholder' className='font-medium'>
              Placeholder
            </label>
            <Textarea
              id='placeholder'
              {...register('placeholder', {
                required: 'Placeholder must be provided.',
              })}
            />
          </div>
          <div>
            <label htmlFor='category' className='font-medium'>
              Category
            </label>
            <Input
              id='category'
              {...register('category', {
                required: 'Category must be provided.',
              })}
            />
          </div>
        </div>
        <Button
          onClick={handleSubmit(handlePromptUpdate)}
          disabled={isUpdating}
        >
          {isUpdating ? <LoadingSpinner /> : 'Update'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGratitudeJournalPrompt;
