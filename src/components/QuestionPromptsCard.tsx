import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Heading from './Heading';

import ErrorMessage from './ErrorMessage';
import { Textarea } from './ui/textarea';
import { QuestionPrompt } from '../types';
import { FieldValues, useForm } from 'react-hook-form';
import useAddQuestionPromptEntry from '../services/questionPromptEntries/addQuestionPromptEntry';
import LoadingSpinner from './LoadingSpinner';
import { Button } from './ui/button';
import { useAuthContext } from '../context/AuthProvider';
import useDeleteQuestionPrompt from '../services/questionPrompts/deleteQuestionPrompt';
import { cn } from '../lib/utils';
import removeWhitespace from '../services/removeWhitespace';
import { useQueryClient } from '@tanstack/react-query';

interface QuestionPromptsCardProps {
  questionPrompt: QuestionPrompt;
}

const QuestionPromptsCard = ({ questionPrompt }: QuestionPromptsCardProps) => {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: addEntry, isLoading: isSubmitting } =
    useAddQuestionPromptEntry();

  const { mutate: deletePrompt, isLoading: isDeleting } =
    useDeleteQuestionPrompt();

  const queryClient = useQueryClient();

  function handleEntrySubmission(data: FieldValues) {
    console.log(data);
    const tags = Object.keys(data);
    const entryQuestions = Object.fromEntries(
      questionPrompt.questions.map((question) => {
        return [question.tag, question.prompt];
      })
    );
    const entries = tags.map((tag) => ({
      prompt: entryQuestions[tag],
      answer: removeWhitespace(data[tag]),
    }));

    addEntry(
      {
        userId: user?.id as string,
        promptTitle: questionPrompt.title,
        entryDate: new Date(),
        entries: entries,
      },
      {
        onSuccess: () => {
          reset();
          queryClient.invalidateQueries(['questionPromptEntries', user?.id]);
        },
      }
    );
  }

  function handleQuestionPromptDeletion(promptId: string) {
    deletePrompt({ promptId: promptId });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Card
          className={cn(
            'w-[400px] h-[150px] flex justify-center items-center flex-col',
            user?.role === 'admin' ? 'h-[200px]' : ''
          )}
        >
          <CardHeader className='text-center'>
            <CardTitle>{questionPrompt.title}</CardTitle>
            <CardDescription className='text-xs'>
              {questionPrompt.description}
            </CardDescription>
          </CardHeader>
          {user?.role === 'admin' && (
            <CardFooter>
              <Button
                variant='destructive'
                onClick={() => handleQuestionPromptDeletion(questionPrompt._id)}
              >
                {!isDeleting ? <span>Move to trash</span> : <LoadingSpinner />}
              </Button>
            </CardFooter>
          )}
        </Card>
      </DialogTrigger>
      <DialogContent className='h-[80vh] overflow-scroll'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>{questionPrompt.title}</DialogTitle>
          <DialogDescription className='px-2 text-sm'>
            {questionPrompt.description}
          </DialogDescription>
        </DialogHeader>
        <div className='px-4'>
          {questionPrompt &&
            questionPrompt.questions.map((prompt, index) => (
              <div>
                <Heading className='mb-0 text-md'>{prompt.prompt}</Heading>
                <Textarea
                  placeholder={prompt.placeholder}
                  key={index}
                  {...register(prompt.tag, {
                    required: {
                      value: true,
                      message: 'Provide the details before proceeding.',
                    },
                    maxLength: {
                      value: 400,
                      message: 'Please keep your answer under 400 characters.',
                    },
                  })}
                />
                {errors[prompt.tag] && (
                  <ErrorMessage>
                    {errors[prompt.tag]?.message as string}
                  </ErrorMessage>
                )}
              </div>
            ))}
        </div>
        {!window.location.pathname.includes('verifyQuestionPrompts') && (
          <div>
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <Button onClick={handleSubmit(handleEntrySubmission)}>
                Log entry
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuestionPromptsCard;
