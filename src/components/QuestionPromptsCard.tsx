import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import Heading from './Heading';

import ErrorMessage from './ErrorMessage';
// import LoadingSpinner from './LoadingSpinner';
// import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { QuestionPrompt } from '../types';
import { useForm } from 'react-hook-form';

interface QuestionPromptsCardProps {
  questionPrompt: QuestionPrompt;
}

const QuestionPromptsCard = ({ questionPrompt }: QuestionPromptsCardProps) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <Dialog>
      <DialogTrigger>
        <Card className='w-[400px] h-[150px] flex justify-center items-center'>
          <CardHeader className='text-center'>
            <CardTitle>{questionPrompt.title}</CardTitle>
            <CardDescription>{questionPrompt.description}</CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
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
        <div>
          {/* {isSubmitting ? (
            <LoadingSpinner />
          ) : (
            <Button onClick={handleSubmit(handleGratitudeJournalSubmit)}>
              Express gratitude
            </Button>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionPromptsCard;
