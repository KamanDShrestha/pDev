import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card';
import Heading from './Heading';

import { QuestionPromptEntry } from '../types';

import { buttonVariants } from './ui/button';
import { useAuthContext } from '../context/AuthProvider';
import { cn } from '../lib/utils';
import { FaTrash } from 'react-icons/fa';
import useDeleteQuestionPromptEntry from '../services/questionPromptEntries/deleteQuestionPromptEntry';
import { useQueryClient } from '@tanstack/react-query';

interface PromptEntryCardProps {
  promptEntry: QuestionPromptEntry;
}

const PromptEntryCard = ({ promptEntry }: PromptEntryCardProps) => {
  const { user } = useAuthContext();

  const { mutate: deletePrompt } = useDeleteQuestionPromptEntry();
  const queryClient = useQueryClient();

  function handlePromptEntryDeletion(promptId: string) {
    deletePrompt(promptId, {
      onSuccess: () => {
        queryClient.invalidateQueries(['questionPromptEntries', user?.id]);
      },
    });
  }

  return (
    <Card
      className={cn(
        'w-[400px] h-[200px] flex justify-center items-center flex-col',
        user?.role === 'admin' ? 'h-[200px]' : ''
      )}
    >
      <CardHeader className='p-3 text-center'>
        <CardTitle className='mt-5'>{promptEntry.promptTitle}</CardTitle>
      </CardHeader>
      <Dialog>
        <DialogTrigger className={buttonVariants({ variant: 'link' })}>
          View content
        </DialogTrigger>
        <DialogContent className='max-h-[60vh] overflow-scroll'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>
              {promptEntry.promptTitle}
            </DialogTitle>
          </DialogHeader>
          <div className='px-4'>
            {promptEntry &&
              promptEntry.entries.map((prompt, index) => (
                <div key={index}>
                  <Heading className='mb-0 text-lg'>{prompt.prompt}</Heading>
                  <span className='font-medium text-md'>{prompt.answer}</span>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
      <CardFooter>
        <Dialog>
          <DialogTrigger className={buttonVariants({ variant: 'destructive' })}>
            Move to trash <FaTrash />
          </DialogTrigger>
          <DialogContent>
            <div>
              <Heading className=' text-md'>
                Are you sure you want to delete this prompt?
              </Heading>
              <DialogFooter className='flex gap-3'>
                <DialogClose
                  className={buttonVariants({ variant: 'secondary' })}
                >
                  Cancel
                </DialogClose>
                <DialogClose
                  onClick={() => handlePromptEntryDeletion(promptEntry._id)}
                  className={buttonVariants({ variant: 'destructive' })}
                >
                  Delete
                </DialogClose>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PromptEntryCard;
