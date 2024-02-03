import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { QuestionPrompt } from '../types';
import { Button } from './ui/button';
import { useAuthContext } from '../context/AuthProvider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import Heading from './Heading';
import { Textarea } from './ui/textarea';
import { FieldValues, useForm } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

interface QuestionPromptCardProps {
  questionPrompt: QuestionPrompt;
}

const QuestionPromptCard = ({ questionPrompt }: QuestionPromptCardProps) => {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function handleFeedbackSubmit(data: FieldValues) {
    console.log(data);
  }

  return (
    <Card className='lg:w-[600px] w-[400px]'>
      <CardHeader>
        <CardTitle>{questionPrompt.title}</CardTitle>
        <CardDescription>{questionPrompt.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        {questionPrompt.questions &&
          questionPrompt.questions.map((prompt) => (
            <div className='flex flex-col gap-1'>
              <span>{prompt.prompt}</span>
              <span className='text-sm'>Placeholder: {prompt.placeholder}</span>
              <span className='text-sm'>Category: {prompt.tag}</span>
            </div>
          ))}
      </CardContent>
      {user?.role === 'qha' && (
        <CardFooter className='flex gap-3'>
          <Button>Verify</Button>
          <Button variant={'destructive'}>Reject</Button>
          <Dialog
            onOpenChange={() => {
              errors.feedback && reset({ feedback: '' });
            }}
          >
            <DialogTrigger>
              <Button variant={'outline'}>Provide feedback</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Provide feedback for this question prompt
                </DialogTitle>
                <DialogDescription>
                  You can provide feedbacks for incorporating changes for this
                  prompt.
                </DialogDescription>
              </DialogHeader>
              <div>
                <Heading className='mb-0 text-md'>Feedback</Heading>
                <Textarea
                  placeholder='Provide feedback...'
                  {...register('feedback', {
                    required: {
                      value: true,
                      message: 'Please provide feedback for this prompt.',
                    },
                    min: {
                      value: 10,
                      message: 'Feedback should be at least 10 characters.',
                    },
                  })}
                />
                {errors.feedback && (
                  <ErrorMessage>
                    {errors.feedback.message as string}
                  </ErrorMessage>
                )}
              </div>
              <Button onClick={handleSubmit(handleFeedbackSubmit)}>
                Provide feedback
              </Button>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
};

export default QuestionPromptCard;
