import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Heading from './Heading';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { FieldValues, useForm } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
import useAddPrompt from '../services/gratitudePrompts/addPrompt';
import { Textarea } from './ui/textarea';

const GratitudeJournalPromptAddCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: addPrompt } = useAddPrompt();
  function handleAddPrompt(data: FieldValues) {
    addPrompt(
      {
        prompt: data.prompt,
        placeholder: data.placeholder,
        category: data.category,
      },
      {
        onSuccess: () => {
          reset({
            prompt: '',
            placeholder: '',
            category: '',
          });
        },
      }
    );
  }

  return (
    <Card className='lg:w-[500px] w-400px'>
      <CardHeader>
        <CardTitle>Add new prompts here.</CardTitle>
        <CardDescription>You can add new prompts from here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='px-5'>
          <div>
            <Heading className='mb-0 text-lg font-medium'>Prompt</Heading>
            <Textarea
              placeholder='Provide prompt.'
              {...register('prompt', {
                required: {
                  value: true,
                  message: 'Please provide prompt for gratitude journal.',
                },
                maxLength: {
                  value: 300,
                  message: 'Prompt should be less than 300 characters.',
                },
              })}
            />
            {errors.prompt && (
              <ErrorMessage>{errors.prompt.message as string}</ErrorMessage>
            )}
          </div>
          <div>
            <Heading className='mb-0 text-lg font-medium'>Placeholder</Heading>
            <Textarea
              placeholder='Provide placeholder.'
              {...register('placeholder', {
                required: {
                  value: true,
                  message: 'Please provide placeholder for the prompt.',
                },
                maxLength: {
                  value: 100,
                  message: 'Placeholder should be less than 100 characters.',
                },
              })}
            />
            {errors.placeholder && (
              <ErrorMessage>
                {errors.placeholder.message as string}
              </ErrorMessage>
            )}
          </div>
          <div>
            <Heading className='mb-0 text-lg font-medium'>Category</Heading>
            <Input
              placeholder='Category of the prompt'
              {...register('category', {
                required: {
                  value: true,
                  message: 'Provide category for the prompt.',
                },
                maxLength: {
                  value: 25,
                  message: 'Category should be less than 25 characters.',
                },
              })}
            />
            {errors.category && (
              <ErrorMessage>{errors.category.message as string}</ErrorMessage>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit(handleAddPrompt)}>Add prompt</Button>
      </CardFooter>
    </Card>
  );
};

export default GratitudeJournalPromptAddCard;
