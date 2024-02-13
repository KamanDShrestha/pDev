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

interface GratitudeJournalsCountCardProps {
  gratitudeJournalCount: number | undefined;
  isFetchingGratitudeJournalCount: boolean;
}

const GratitudeJournalsCountCard = ({
  gratitudeJournalCount,
  isFetchingGratitudeJournalCount,
}: GratitudeJournalsCountCardProps) => {
  return (
    <Card className='max-w-[400px]'>
      <CardHeader>
        <CardTitle>Gratitude Journals</CardTitle>
        <CardDescription>Finding number of journal entries</CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-center'>
        {isFetchingGratitudeJournalCount && <LoadingSpinner />}
        {(!gratitudeJournalCount || gratitudeJournalCount === 0) && (
          <p>No journal entries has been logged.</p>
        )}
        {gratitudeJournalCount !== undefined && gratitudeJournalCount > 0 && (
          <div className='flex flex-col items-center'>
            <p className='text-3xl font-semibold'>
              {gratitudeJournalCount > 0 && gratitudeJournalCount}
            </p>
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

export default GratitudeJournalsCountCard;
