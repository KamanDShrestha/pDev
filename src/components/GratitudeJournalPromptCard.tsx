import useGetPrompts from '../services/gratitudePrompts/getPrompts';
import LoadingSpinner from './LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const GratitudeJournalPromptCard = () => {
  const { data: prompts, isLoading } = useGetPrompts();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gratitude journal prompts</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        {isLoading && <LoadingSpinner />}
        {prompts &&
          prompts.map((prompt) => (
            <div className='flex flex-col gap-1'>
              <span>{prompt.prompt}</span>
              <span className='text-sm'>Placeholder: {prompt.placeholder}</span>
              <span className='text-sm'>Category: {prompt.category}</span>
            </div>
          ))}
        {prompts?.length === 0 && <p>No prompts found.</p>}
      </CardContent>
    </Card>
  );
};

export default GratitudeJournalPromptCard;
