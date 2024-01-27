import { FaTrash } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthProvider';
import { cn } from '../lib/utils';
import useDeleteGratitudeJournalEntry from '../services/gratitudeJournals/deleteGratitudeJournalEntry';
import { GratitudeJournals } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { buttonVariants } from './ui/button';
import { Card, CardTitle } from './ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

import { TbPointFilled } from 'react-icons/tb';
import { useQueryClient } from '@tanstack/react-query';

interface GratitudeJournalCardProps {
  gratitudeJournal: GratitudeJournals;
}

const GratitudeJournalCard = ({
  gratitudeJournal,
}: GratitudeJournalCardProps) => {
  const { user } = useAuthContext();
  const { mutate: deleteGratitudeJournal, isLoading: isDeleting } =
    useDeleteGratitudeJournalEntry();

  const queryClient = useQueryClient();

  function handleGratitudeJournalDeletion() {
    deleteGratitudeJournal(
      {
        userId: user?.id as string,
        entryId: gratitudeJournal._id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['gratitudeJournals', user?.id]);
        },
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Card className='flex items-center justify-center p-5'>
          <CardTitle className='text-lg'>
            <span>Gratitude expressed on: </span> <br />
            <span className='font-medium'>
              {new Date(gratitudeJournal.entryDate).toLocaleString()}
            </span>
          </CardTitle>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Gratitude journal</DialogTitle>
          <DialogDescription>
            {new Date(gratitudeJournal.entryDate).toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-3 p-3'>
          {gratitudeJournal.journals.map((journal, index) => (
            <div key={index} className='flex flex-col'>
              <span className='flex items-center gap-3 font-medium'>
                <span className=''>
                  <TbPointFilled />
                </span>
                <span className='flex flex-col'>
                  <span>{journal.prompt}</span>
                  <span className='font-normal '>{journal.answer}</span>
                </span>
              </span>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose
            className={cn(
              buttonVariants({ variant: 'destructive', size: 'xs' }),
              'space-x-2'
            )}
            onClick={handleGratitudeJournalDeletion}
          >
            {isDeleting ? (
              <LoadingSpinner />
            ) : (
              <>
                <span>Delete</span>
                <span>
                  <FaTrash />
                </span>
              </>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GratitudeJournalCard;
