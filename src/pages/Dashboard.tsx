import Heading from '../components/Heading';

import { useAuthContext } from '../context/AuthProvider';
import useGetCurrentEmbarkedJourney from '../services/embarkedJourneys/getCurrentEmbarkedJourney';

import useDocumentTitle from '../services/getTitle';

import CurrentJourneyProgressCard from '../components/CurrentJourneyProgressCard';
import useGetCompletedEmbarkedJourneys from '../services/embarkedJourneys/getCompletedEmbarkedJourneys';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import LoadingSpinner from '../components/LoadingSpinner';
import { NavLink } from 'react-router-dom';
import { Separator } from '../components/ui/separator';
import CompletedJourneysCard from '../components/CompletedJourneysCard';
import useGetPostsCount from '../services/posts/getPostsCount';

const Dashboard = () => {
  const { user } = useAuthContext();

  const { data: currentJourney, isLoading: isFetchingCurrentJourney } =
    useGetCurrentEmbarkedJourney(user?.id as string);
  const { data: completedJourneys, isLoading: isFetchingCompletedJourneys } =
    useGetCompletedEmbarkedJourneys(user?.id as string);

  const { data: postsCount } = useGetPostsCount(user?.id as string);
  console.log(postsCount);

  console.log(currentJourney);
  console.log(completedJourneys);

  useDocumentTitle('Dashboard - SelfSync');
  return (
    <>
      <Heading>Dashboard</Heading>
      <div className='p-5'>
        <Card className='flex flex-wrap justify-around gap-5 p-5'>
          <CurrentJourneyProgressCard
            currentJourney={currentJourney}
            isFetchingCurrentJourney={isFetchingCurrentJourney}
          />
          <CompletedJourneysCard
            completedJourneys={completedJourneys}
            isFetchingCompletedJourneys={isFetchingCompletedJourneys}
          />
        </Card>
        <div></div>
      </div>
    </>
  );
};

export default Dashboard;
