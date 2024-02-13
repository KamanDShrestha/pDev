import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import LoadingSpinner from './LoadingSpinner';
import ProgressBar from './ProgressBar';
import { buttonVariants } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { EmbarkedJourney } from '../types';

interface CurrentJourneyProgressCardProps {
  currentJourney: EmbarkedJourney | null | undefined;
  isFetchingCurrentJourney: boolean;
}

const CurrentJourneyProgressCard = ({
  currentJourney,
  isFetchingCurrentJourney,
}: CurrentJourneyProgressCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your journey</CardTitle>
      </CardHeader>
      <CardContent>
        {isFetchingCurrentJourney && <LoadingSpinner />}
        {currentJourney === null && (
          <p>
            Your adventure has yet to unfold! Embrace the blank canvas of
            possibilities waiting for you, as your journey is just about to
            begin.
          </p>
        )}
        {currentJourney && currentJourney !== null && (
          <div className='space-y-5'>
            <p>
              You are currently on the journey of{' '}
              <strong>{currentJourney.journeyId}</strong>. Keep going!
            </p>
            <ProgressBar
              completion={
                (Object.keys(currentJourney.actionSteps).filter(
                  (day) => currentJourney.actionSteps[day].isCompleted === true
                ).length /
                  Object.keys(currentJourney.actionSteps).length) *
                100
              }
            />
            <NavLink
              to={`/currentJourney/${currentJourney.journeyId}`}
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              Continue to your journey
            </NavLink>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentJourneyProgressCard;
