import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import LoadingSpinner from './LoadingSpinner';
import { buttonVariants } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';

interface JournalsCountCardProps {
  journalCount: number | undefined;
  isFetchingJournalCount: boolean;
}

const JournalsCountCard = ({
  journalCount,
  isFetchingJournalCount,
}: JournalsCountCardProps) => {
  return (
    <Card className='max-w-[400px]'>
      <CardHeader>
        <CardTitle>Journals</CardTitle>
        <CardDescription>Finding number of journal entries</CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-center'>
        {isFetchingJournalCount && <LoadingSpinner />}
        {(!journalCount || journalCount === 0) && (
          <p>No journal entries has been logged.</p>
        )}
        {journalCount !== undefined && journalCount !== 0 && (
          <div className='flex flex-col items-center'>
            <p className='text-3xl font-semibold'>{journalCount}</p>
            <NavLink
              to={`/wellbeing`}
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              See my entries
            </NavLink>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JournalsCountCard;
