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

const AdminDashboard = () => {
  const {
    data: usersCountInJourney,
    error,
    isLoading: isFetchingCount,
  } = useGetUsersCountInJourney();
  console.log(usersCountInJourney);
  console.log(error);
  useDocumentTitle('Admin Dashboard - SelfSync');
  return (
    <>
      <Heading>Admin Dashboard</Heading>
      <div className='p-5'>
        <EmbarkationStatisticsCard
          usersCountInJourney={usersCountInJourney}
          isFetchingCount={isFetchingCount}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
