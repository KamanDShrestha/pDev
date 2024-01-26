import { Card, CardFooter, CardHeader } from './ui/card';
import { Journal } from '../types';
import Heading from './Heading';

interface JournalCardProps {
  journal: Journal;
}

const JournalCard = ({ journal }: JournalCardProps) => {
  return (
    <Card className='min-w-[400px]'>
      <CardHeader>
        <div>{journal.journalContent}</div>
      </CardHeader>
      <CardFooter className='flex items-center justify-between'>
        <Heading className='my-0 text-xl'>{journal.journalTitle}</Heading>
        <div>{new Date(journal.entryDate).toDateString()}</div>
      </CardFooter>
    </Card>
  );
};

export default JournalCard;
