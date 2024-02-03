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

interface QuestionPromptCardProps {
  questionPrompt: QuestionPrompt;
}

const QuestionPromptCard = ({ questionPrompt }: QuestionPromptCardProps) => {
  const { user } = useAuthContext();
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
        </CardFooter>
      )}
    </Card>
  );
};

export default QuestionPromptCard;
