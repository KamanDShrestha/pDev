import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { QuestionPrompt } from '../types';
import { Button, buttonVariants } from './ui/button';
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
import useUpdatePromptVerificationStatus from '../services/questionPrompts/updatePromptVerificationStatus';
import useAddPromptFeedback from '../services/promptFeedbacks/addPromptFeedback';
import LoadingSpinner from './LoadingSpinner';

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

  const { mutate: updateStatus, isLoading: isUpdating } =
    useUpdatePromptVerificationStatus();
  const { mutate: addFeedback, isLoading: isAdding } = useAddPromptFeedback();
  function handleFeedbackSubmit(data: FieldValues) {
    console.log(data);
    addFeedback(
      {
        userId: user?.id as string,
        promptId: questionPrompt._id,
        feedback: data.feedback,
        feedbackDate: new Date(),
      },
      {
        onSuccess: () => {
          reset({ feedback: '' });
        },
      }
    );
  }

  function handlePromptStatusChange(verificationStatus: boolean) {
    console.log('Prompt status changed');
    updateStatus({
      questionPromptId: questionPrompt._id,
      verificationStatus: verificationStatus,
      verifiedBy: user?.id as string,
    });
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
          <Button
            onClick={() => handlePromptStatusChange(true)}
            disabled={isUpdating}
          >
            Verify
          </Button>
          <Button
            variant={'destructive'}
            onClick={() => handlePromptStatusChange(false)}
            disabled={isUpdating}
          >
            Reject
          </Button>
          <Dialog
            onOpenChange={() => {
              errors.feedback && reset({ feedback: '' });
            }}
          >
            <DialogTrigger>
              <p className={buttonVariants({ variant: 'outline' })}>
                Provide feedback
              </p>
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
                {isAdding ? <LoadingSpinner /> : <span>Submit feedback</span>}
              </Button>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
};

export default QuestionPromptCard;
