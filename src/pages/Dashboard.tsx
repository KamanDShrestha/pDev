import Heading from '../components/Heading';

import { useAuthContext } from '../context/AuthProvider';
import useGetCurrentEmbarkedJourney from '../services/embarkedJourneys/getCurrentEmbarkedJourney';

import useDocumentTitle from '../services/getTitle';

import CurrentJourneyProgressCard from '../components/CurrentJourneyProgressCard';

const Dashboard = () => {
  const { user } = useAuthContext();

  const { data: currentJourney, isLoading: isFetchingCurrentJourney } =
    useGetCurrentEmbarkedJourney(user?.id as string);
  console.log(currentJourney);

  useDocumentTitle('Dashboard - SelfSync');
  return (
    <>
      <Heading>Dashboard</Heading>
      <div className='p-5'>
        <div className='flex justify-center '>
          <CurrentJourneyProgressCard
            currentJourney={currentJourney}
            isFetchingCurrentJourney={isFetchingCurrentJourney}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
