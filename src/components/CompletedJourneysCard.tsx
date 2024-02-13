import { NavLink } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { EmbarkedJourney } from '../types';

interface CompletedJourneysCardProps {
  completedJourneys: EmbarkedJourney[] | undefined;
  isFetchingCompletedJourneys: boolean;
}

const CompletedJourneysCard = ({
  completedJourneys,
  isFetchingCompletedJourneys,
}: CompletedJourneysCardProps) => {
  return (
    <Card className='max-w-[400px]'>
      <CardHeader className='pb-0'>
        <CardTitle>Completed journeys</CardTitle>
      </CardHeader>
      <Separator className='my-3' />
      <CardContent>
        {isFetchingCompletedJourneys && <LoadingSpinner />}
        {completedJourneys && completedJourneys.length === 0 && (
          <p className='text-sm'>
            Your journey remains unfinished, but the excitement of completing it
            lies ahead. Gear up for the triumphs and discoveries that await as
            you continue forging your unique path.
          </p>
        )}
        {completedJourneys &&
          completedJourneys.length > 0 &&
          completedJourneys.map((journey, index) => (
            <div className='' key={index}>
              <p>{journey.journeyName}</p>
              <NavLink to={`/currentJourney/${journey.journeyId}`}>
                View journey
              </NavLink>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default CompletedJourneysCard;
