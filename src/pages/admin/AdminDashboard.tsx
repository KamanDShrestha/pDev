import useGetUsersCountInJourney from '../../services/journey/getUsersCountInJourney';
import useDocumentTitle from '../../services/getTitle';

import Heading from '../../components/Heading';

import EmbarkationStatisticsCard from '../../components/EmbarkationStatisticsCard';
import useGetMembersCount from '../../services/communityMembers/getMembersCount';
import CommunityStatisticsCard from '../../components/CommunityStatisticsCard';
import useGetDiscontinuedJourneysCount from '../../services/embarkedJourneys/getDiscontinuedJourneysCount';
import useGetOngoingJourneysCount from '../../services/embarkedJourneys/getOngoingJourneysCount';
import useGetCompletedJourneysCount from '../../services/embarkedJourneys/getCompletedJourneysCount';
import JourneyStatisticsCard from '../../components/JourneyStatisticsCard';
import UsersCountCard from '../../components/UsersCountCard';

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

  console.log(error);
  useDocumentTitle('Admin Dashboard - SelfSync');
  return (
    <>
      <Heading>Admin Dashboard</Heading>
      <div className='p-5 space-y-32'>
        <EmbarkationStatisticsCard
          usersCountInJourney={usersCountInJourney}
          isFetchingCount={isFetchingCount}
        />

        <UsersCountCard />
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
