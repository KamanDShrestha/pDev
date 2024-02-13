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

interface PromptEntriesCountCardProps {
  promptEntriesCount: number | undefined;
  isFetchingPromptEntriesCount: boolean;
}

const PromptEntriesCountCard = ({
  promptEntriesCount,
  isFetchingPromptEntriesCount,
}: PromptEntriesCountCardProps) => {
  return (
    <Card className='max-w-[400px]'>
      <CardHeader>
        <CardTitle>Prompt Entries</CardTitle>
        <CardDescription>Finding number of prompt entries</CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-center'>
        {isFetchingPromptEntriesCount && <LoadingSpinner />}
        {(!promptEntriesCount || promptEntriesCount === 0) && (
          <p>No entries has been logged.</p>
        )}
        {promptEntriesCount !== undefined && promptEntriesCount !== 0 && (
          <div className='flex flex-col items-center'>
            <p className='text-3xl font-semibold'>{promptEntriesCount}</p>
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

export default PromptEntriesCountCard;
