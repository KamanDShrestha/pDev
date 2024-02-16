import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Journal } from '../types';
import Heading from './Heading';
import { Badge } from './ui/badge';
import TruncatedText from './TruncatedText';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { buttonVariants } from './ui/button';
import { FaTrash } from 'react-icons/fa';
import useDeleteJournal from '../services/journals/deleteJournal';
import LoadingSpinner from './LoadingSpinner';
import { useAuthContext } from '../context/AuthProvider';
import { cn } from '../lib/utils';

interface JournalCardProps {
  journal: Journal;
}

const JournalCard = ({ journal }: JournalCardProps) => {
  const { mutate: deleteJournal, isLoading: isDeleting } = useDeleteJournal();
  const { user } = useAuthContext();

  function handleJournalDeletion() {
    deleteJournal({ userId: user?.id as string, journalId: journal._id });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Card className='lg:max-w-[600px] w-[400px] h-[300px] grid grid-rows-[20%_60%_20%]'>
            <CardHeader className='flex items-end w-full'>
              <Badge>{journal.journalCategory}</Badge>
            </CardHeader>
            <CardContent className='flex items-center'>
              <TruncatedText content={journal.journalContent} />
            </CardContent>
            <CardFooter className='flex items-center justify-between'>
              <Heading className='my-0 text-xl'>{journal.journalTitle}</Heading>
              <div className='text-sm'>
                {new Date(journal.entryDate).toDateString()}
              </div>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{journal.journalTitle}</DialogTitle>
          </DialogHeader>
          <div className='flex justify-between'>
            <span className='text-sm'>
              {new Date(journal.entryDate).toDateString()}
            </span>
            <Badge>{journal.journalCategory}</Badge>
          </div>
          <div className='whitespace-pre-wrap '>
            <p>{journal.journalContent}</p>
          </div>
          <DialogFooter>
            <DialogClose
              className={cn(
                buttonVariants({ variant: 'destructive', size: 'xs' }),
                'space-x-2'
              )}
              onClick={handleJournalDeletion}
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
    </>
  );
};

export default JournalCard;
