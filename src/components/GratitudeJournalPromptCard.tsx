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
      <CardContent>
        {isLoading && <LoadingSpinner />}
        {prompts && prompts.map((prompt) => <p>{prompt.prompt}</p>)}
        {prompts?.length === 0 && <p>No prompts found.</p>}
      </CardContent>
    </Card>
  );
};

export default GratitudeJournalPromptCard;
