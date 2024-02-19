import useGetUsersCountInJourney from '../../services/journey/getUsersCountInJourney';
import useDocumentTitle from '../../services/getTitle';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import Heading from '../../components/Heading';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { buttonVariants } from '../../components/ui/button';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmbarkationStatisticsCard from '../../components/EmbarkationStatisticsCard';
import useGetMembersCount from '../../services/communityMembers/getMembersCount';
import CommunityStatisticsCard from '../../components/CommunityStatisticsCard';
import useGetDiscontinuedJourneysCount from '../../services/embarkedJourneys/getDiscontinuedJourneysCount';
import useGetOngoingJourneysCount from '../../services/embarkedJourneys/getOngoingJourneysCount';
import useGetCompletedJourneysCount from '../../services/embarkedJourneys/getCompletedJourneysCount';

const AdminDashboard = () => {
  const {
    data: usersCountInJourney,
    error,
    isLoading: isFetchingCount,
  } = useGetUsersCountInJourney();
  const { data: membersCountInCommunity, isLoading: IsFetchingMembersCount } =
    useGetMembersCount();
  const {
    data: discontinuedJourneysCount,
    isLoading: isFetchingDiscontinuedJourneysCount,
  } = useGetDiscontinuedJourneysCount();
  const {
    data: ongoingJourneysCount,
    isLoading: isFetchingOngoingJourneysCount,
  } = useGetOngoingJourneysCount();
  const {
    data: completedJourneysCount,
    isLoading: isFetchingCompletedJourneysCount,
  } = useGetCompletedJourneysCount();

  console.log(usersCountInJourney);
  console.log(membersCountInCommunity);
  console.log(discontinuedJourneysCount);
  console.log(ongoingJourneysCount);
  console.log(completedJourneysCount);
  console.log(error);
  useDocumentTitle('Admin Dashboard - SelfSync');
  return (
    <>
      <Heading>Admin Dashboard</Heading>
      <div className='p-5 space-y-5'>
        <EmbarkationStatisticsCard
          usersCountInJourney={usersCountInJourney}
          isFetchingCount={isFetchingCount}
        />
        <CommunityStatisticsCard
          membersCount={membersCountInCommunity}
          isFetchingCount={IsFetchingMembersCount}
        />
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
                  Object.keys(discontinuedJourneysCount).map(
                    (journey, index) => (
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
                    )
                  )}
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
      </div>
    </>
  );
};

export default AdminDashboard;
