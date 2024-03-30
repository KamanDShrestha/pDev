import useDeletePrompt from '../services/gratitudePrompts/deletePrompt';
import useGetPrompts from '../services/gratitudePrompts/getPrompts';
import LoadingSpinner from './LoadingSpinner';
import UpdateGratitudeJournalPrompt from './UpdateGratitudeJournalPrompt';
import { Button } from './ui/button';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const GratitudeJournalPromptCard = () => {
  const { data: prompts, isLoading } = useGetPrompts();

  const { mutate: deletePrompt, isLoading: isDeleting } = useDeletePrompt();

  function handlePromptDelete(promptId: string) {
    deletePrompt(promptId);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gratitude journal prompts</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        {isLoading && <LoadingSpinner />}
        {prompts &&
          prompts.map((prompt, index) => (
            <div key={index} className='space-y-1'>
              <div className='flex flex-col gap-1'>
                <span>{prompt.prompt}</span>
                <span className='text-sm'>
                  Placeholder: {prompt.placeholder}
                </span>
                <span className='text-sm'>Category: {prompt.category}</span>
              </div>
              <div className='space-x-3'>
                <UpdateGratitudeJournalPrompt prompt={prompt} />
                <Button
                  size={'xs'}
                  variant={'destructive'}
                  onClick={() => handlePromptDelete(prompt._id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? <LoadingSpinner /> : 'Delete'}
                </Button>
              </div>
            </div>
          ))}
        {prompts?.length === 0 && <p>No prompts found.</p>}
      </CardContent>
    </Card>
  );
};

export default GratitudeJournalPromptCard;
