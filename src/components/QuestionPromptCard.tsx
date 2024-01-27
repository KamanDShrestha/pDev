import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { QuestionPrompt } from '../types';

interface QuestionPromptCardProps {
  questionPrompt: QuestionPrompt;
}

const QuestionPromptCard = ({ questionPrompt }: QuestionPromptCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{questionPrompt.title}</CardTitle>
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
    </Card>
  );
};

export default QuestionPromptCard;
