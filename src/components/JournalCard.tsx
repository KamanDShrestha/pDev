import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Journal } from '../types';
import Heading from './Heading';
import { Badge } from './ui/badge';
import TruncatedText from './TruncatedText';

interface JournalCardProps {
  journal: Journal;
}

const JournalCard = ({ journal }: JournalCardProps) => {
  return (
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
  );
};

export default JournalCard;
