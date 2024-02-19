import useGetUsersCountInJourney from '../../services/journey/getUsersCountInJourney';
import useDocumentTitle from '../../services/getTitle';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '../../components/ui/card';
import Heading from '../../components/Heading';
// import { NavLink } from 'react-router-dom';
// import { cn } from '../../lib/utils';
// import { buttonVariants } from '../../components/ui/button';
// import LoadingSpinner from '../../components/LoadingSpinner';
import EmbarkationStatisticsCard from '../../components/EmbarkationStatisticsCard';
import useGetMembersCount from '../../services/communityMembers/getMembersCount';
import CommunityStatisticsCard from '../../components/CommunityStatisticsCard';
import useGetDiscontinuedJourneysCount from '../../services/embarkedJourneys/getDiscontinuedJourneysCount';
import useGetOngoingJourneysCount from '../../services/embarkedJourneys/getOngoingJourneysCount';
import useGetCompletedJourneysCount from '../../services/embarkedJourneys/getCompletedJourneysCount';
import JourneyStatisticsCard from '@/src/components/JourneyStatisticsCard';

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
        <JourneyStatisticsCard
          discontinuedJourneysCount={discontinuedJourneysCount}
          isFetchingDiscontinuedJourneysCount={
            isFetchingDiscontinuedJourneysCount
          }
          ongoingJourneysCount={ongoingJourneysCount}
          isFetchingOngoingJourneysCount={isFetchingOngoingJourneysCount}
          completedJourneysCount={completedJourneysCount}
          isFetchingCompletedJourneysCount={isFetchingCompletedJourneysCount}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
