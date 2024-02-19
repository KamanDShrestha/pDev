import LoadingSpinner from './LoadingSpinner';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';
import { EmbarkedJourneyCount } from '../types';

interface JourneyStatisticsCardProps {
  discontinuedJourneysCount: EmbarkedJourneyCount | null | undefined;
  isFetchingDiscontinuedJourneysCount: boolean;
  ongoingJourneysCount: EmbarkedJourneyCount | null | undefined;
  isFetchingOngoingJourneysCount: boolean;
  completedJourneysCount: EmbarkedJourneyCount | null | undefined;
  isFetchingCompletedJourneysCount: boolean;
}

const JourneyStatisticsCard = ({
  discontinuedJourneysCount,
  isFetchingDiscontinuedJourneysCount,
  ongoingJourneysCount,
  isFetchingOngoingJourneysCount,
  completedJourneysCount,
  isFetchingCompletedJourneysCount,
}: JourneyStatisticsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Journey Statistics</CardTitle>
        <CardDescription>
          Getting the stats regarding the embarked journeys
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-5'>
        <Card>
          <CardHeader>
            <CardTitle>Discontinued Journeys Statistics</CardTitle>
            <CardDescription>
              Finding the count of discontinued journeys
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-wrap items-center justify-center gap-5'>
            {isFetchingDiscontinuedJourneysCount && <LoadingSpinner />}
            {discontinuedJourneysCount &&
              Object.keys(discontinuedJourneysCount).map((journey, index) => (
                <Card key={index}>
                  <CardContent className='p-5 space-y-5 text-center'>
                    <CardTitle className='text-2xl'>
                      {discontinuedJourneysCount[journey].journeyName}
                    </CardTitle>
                    <CardTitle className='text-xl'>
                      {discontinuedJourneysCount[journey].count === 1
                        ? `${discontinuedJourneysCount[journey].count} time`
                        : `${discontinuedJourneysCount[journey].count} times`}
                    </CardTitle>
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ongoing Journeys Statistics</CardTitle>
            <CardDescription>
              Finding the count of ongoing journeys
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-wrap items-center justify-center gap-5'>
            {isFetchingOngoingJourneysCount && <LoadingSpinner />}
            {ongoingJourneysCount &&
              Object.keys(ongoingJourneysCount).map((journey, index) => (
                <Card key={index}>
                  <CardContent className='p-5 space-y-5 text-center'>
                    <CardTitle className='text-2xl'>
                      {ongoingJourneysCount[journey].journeyName}
                    </CardTitle>
                    <CardTitle className='text-xl'>
                      {ongoingJourneysCount[journey].count === 1
                        ? `${ongoingJourneysCount[journey].count} time`
                        : `${ongoingJourneysCount[journey].count} times`}
                    </CardTitle>
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Journeys Statistics</CardTitle>
            <CardDescription>
              Finding the count of completed journeys
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-wrap items-center justify-center gap-5'>
            {isFetchingCompletedJourneysCount && <LoadingSpinner />}
            {completedJourneysCount &&
              Object.keys(completedJourneysCount).map((journey, index) => (
                <Card key={index}>
                  <CardContent className='p-5 space-y-5 text-center'>
                    <CardTitle className='text-2xl'>
                      {completedJourneysCount[journey].journeyName}
                    </CardTitle>
                    <CardTitle className='text-xl'>
                      {completedJourneysCount[journey].count === 1
                        ? `${completedJourneysCount[journey].count} time`
                        : `${completedJourneysCount[journey].count} times`}
                    </CardTitle>
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default JourneyStatisticsCard;
