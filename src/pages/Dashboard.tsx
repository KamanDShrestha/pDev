import Heading from '../components/Heading';

import { useAuthContext } from '../context/AuthProvider';
import useGetCurrentEmbarkedJourney from '../services/embarkedJourneys/getCurrentEmbarkedJourney';

import useDocumentTitle from '../services/getTitle';

import CurrentJourneyProgressCard from '../components/CurrentJourneyProgressCard';
import useGetCompletedEmbarkedJourneys from '../services/embarkedJourneys/getCompletedEmbarkedJourneys';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import LoadingSpinner from '../components/LoadingSpinner';
import { NavLink } from 'react-router-dom';

import CompletedJourneysCard from '../components/CompletedJourneysCard';
import useGetPostsCount from '../services/posts/getPostsCount';
import useGetGratitudeJournalCount from '../services/gratitudeJournals/getGratitudeJournalCount';

import useGetQuestionPromptEntriesCount from '../services/questionPromptEntries/getQuestionPromptEntriesCount';
import useGetJournalCount from '../services/journals/getJournalCounts';
import { cn } from '../lib/utils';
import { buttonVariants } from '../components/ui/button';
import PostsCountCard from '../components/PostsCountCard';
import JournalsCountCard from '../components/JournalsCountCard';

const Dashboard = () => {
  const { user } = useAuthContext();

  const { data: currentJourney, isLoading: isFetchingCurrentJourney } =
    useGetCurrentEmbarkedJourney(user?.id as string);
  const { data: completedJourneys, isLoading: isFetchingCompletedJourneys } =
    useGetCompletedEmbarkedJourneys(user?.id as string);
  const { data: postsCount, isLoading: isFetchingPostsCount } =
    useGetPostsCount(user?.id as string);
  const {
    data: gratitudeJournalCount,
    isLoading: isFetchingGratitudeJournalCount,
  } = useGetGratitudeJournalCount(user?.id as string);
  const { data: questionPromptEntriesCount } = useGetQuestionPromptEntriesCount(
    user?.id as string
  );
  const { data: journalCount, isLoading: isFetchingJournalCount } =
    useGetJournalCount(user?.id as string);

  console.log(postsCount);
  console.log(currentJourney);
  console.log(completedJourneys);
  console.log(gratitudeJournalCount);
  console.log(questionPromptEntriesCount);
  console.log(journalCount);

  useDocumentTitle('Dashboard - SelfSync');
  return (
    <>
      <Heading>Dashboard</Heading>
      <div className='p-5 space-y-10'>
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
        <div className='flex gap-5'>
          <PostsCountCard
            postsCount={postsCount}
            isFetchingPostsCount={isFetchingPostsCount}
          />
          <JournalsCountCard
            journalCount={journalCount}
            isFetchingJournalCount={isFetchingJournalCount}
          />
          <Card className='max-w-[400px]'>
            <CardHeader>
              <CardTitle>Gratitude Journals</CardTitle>
              <CardDescription>
                Finding number of journal entries
              </CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              {isFetchingGratitudeJournalCount && <LoadingSpinner />}
              {(!gratitudeJournalCount || gratitudeJournalCount === 0) && (
                <p>No journal entries has been logged.</p>
              )}
              {gratitudeJournalCount !== undefined &&
                gratitudeJournalCount > 0 && (
                  <div className='flex flex-col items-center'>
                    <p className='text-3xl font-semibold'>
                      {gratitudeJournalCount > 0 && gratitudeJournalCount}
                    </p>
                    <NavLink
                      to={`/wellbeing`}
                      className={cn(buttonVariants({ variant: 'link' }))}
                    >
                      See my entries
                    </NavLink>
                  </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
