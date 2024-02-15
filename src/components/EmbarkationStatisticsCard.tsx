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
import LoadingSpinner from './LoadingSpinner';
import { buttonVariants } from './ui/button';
import { UsersCountInJourney } from '../types';
import EmbarkationStatisticsChart from './EmbarkationStatisticsChart';
import { Separator } from './ui/separator';

interface EmbarkationStatisticsCardProps {
  usersCountInJourney: UsersCountInJourney | null | undefined;
  isFetchingCount: boolean;
}

const EmbarkationStatisticsCard = ({
  usersCountInJourney,
  isFetchingCount,
}: EmbarkationStatisticsCardProps) => {
  const usersCount =
    usersCountInJourney &&
    Object.keys(usersCountInJourney).map((journeyId) => ({
      name: usersCountInJourney[journeyId].journeyName,
      count: usersCountInJourney[journeyId].userCount,
    }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Embarkation Statistics</CardTitle>
        <CardDescription>
          Finding the number of users embarked on a journey
        </CardDescription>
      </CardHeader>
      <div className='flex flex-col items-center justify-center gap-5 lg:flex-row '>
        {usersCountInJourney && usersCount && (
          <EmbarkationStatisticsChart countStats={usersCount} />
        )}

        <CardContent className='flex flex-wrap justify-around gap-5'>
          {isFetchingCount && <LoadingSpinner />}
          {!isFetchingCount && !usersCountInJourney && (
            <p>No statistics can be provided at the moment.</p>
          )}
          {usersCountInJourney &&
            Object.keys(usersCountInJourney).map((journey, index) => (
              <Card key={index}>
                <CardContent className='p-5 space-y-5 text-center'>
                  <CardTitle className='text-2xl'>
                    {usersCountInJourney[journey].journeyName}
                  </CardTitle>
                  <Separator />
                  <CardTitle className='text-xl'>
                    {usersCountInJourney[journey].userCount} users
                  </CardTitle>
                </CardContent>
              </Card>
            ))}
        </CardContent>
      </div>

      <CardFooter>
        <NavLink
          to={'/journeys'}
          className={cn(buttonVariants({ variant: 'link' }))}
        >
          View all journeys
        </NavLink>
      </CardFooter>
    </Card>
  );
};

export default EmbarkationStatisticsCard;
