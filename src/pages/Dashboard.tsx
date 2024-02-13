import { useAuthContext } from '../context/AuthProvider';
import useGetCurrentEmbarkedJourney from '../services/embarkedJourneys/getCurrentEmbarkedJourney';

import useDocumentTitle from '../services/getTitle';

const Dashboard = () => {
  const { user } = useAuthContext();

  const { data: currentJourney, isLoading } = useGetCurrentEmbarkedJourney(
    user?.id as string
  );
  console.log(currentJourney);

  useDocumentTitle('Dashboard - SelfSync');
  return <div>Dashboard</div>;
};

export default Dashboard;
