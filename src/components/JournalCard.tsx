import { Card, CardFooter, CardHeader } from './ui/card';
import { Journal } from '../types';

interface JournalCardProps {
  journal: Journal;
}

const JournalCard = ({ journal }: JournalCardProps) => {
  return (
    <Card className='min-w-[400px]'>
      <CardHeader>
        <div>{journal.journalContent}</div>
      </CardHeader>
      <CardFooter>
        <div>{journal.journalTitle}</div>
        <div>{new Date(journal.entryDate).toLocaleString()}</div>
      </CardFooter>
    </Card>
  );
};

export default JournalCard;
