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
import { FieldValues, useForm } from 'react-hook-form';
import useGetPrompts from '../services/gratitudePrompts/getPrompts';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const GratitudeJournalAddDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: gratitudePrompts, isLoading } = useGetPrompts();

  function handleGratitudeJournalSubmit(data: FieldValues) {
    console.log(data);
  }

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
          {isLoading && <LoadingSpinner />}
          {gratitudePrompts &&
            gratitudePrompts.map((prompt, index) => (
              <div>
                <Heading className='mb-0 text-md'>{prompt.prompt}</Heading>
                <Textarea
                  placeholder={prompt.placeholder}
                  key={index}
                  {...register(prompt.category, {
                    required: {
                      value: true,
                      message: 'Provide the details before proceeding.',
                    },
                  })}
                />
                {errors[prompt.category] && (
                  <ErrorMessage>
                    {errors[prompt.category]?.message as string}
                  </ErrorMessage>
                )}
              </div>
            ))}
        </div>
        <div>
          <Button onClick={handleSubmit(handleGratitudeJournalSubmit)}>
            Express gratitude
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GratitudeJournalAddDialog;
