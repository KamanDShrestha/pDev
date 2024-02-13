import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { SavedContentCountData } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { buttonVariants } from './ui/button';

interface SavedContentCountCardProps {
  savedContentCount: SavedContentCountData | null | undefined;
  isFetchingSavedContentCount: boolean;
}

const SavedContentCountCard = ({
  savedContentCount,
  isFetchingSavedContentCount,
}: SavedContentCountCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Content</CardTitle>
        <CardDescription>Finding number of saved content</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-wrap justify-around gap-5'>
        {isFetchingSavedContentCount && <LoadingSpinner />}
        {savedContentCount === null && <p>No content has been saved.</p>}
        {savedContentCount &&
          Object.keys(savedContentCount).map((content, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>
                  {content.charAt(0).toUpperCase() + content.slice(1)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-xl font-semibold text-center lg:text-right'>
                  {savedContentCount[content as keyof SavedContentCountData]}
                </p>
              </CardContent>
            </Card>
          ))}
      </CardContent>
      <CardFooter>
        <NavLink
          to={`/profile`}
          className={cn(buttonVariants({ variant: 'link' }))}
        >
          View the saved contents
        </NavLink>
      </CardFooter>
    </Card>
  );
};

export default SavedContentCountCard;
