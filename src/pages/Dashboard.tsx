import Heading from '../components/Heading';

import { useAuthContext } from '../context/AuthProvider';
import useGetCurrentEmbarkedJourney from '../services/embarkedJourneys/getCurrentEmbarkedJourney';

import useDocumentTitle from '../services/getTitle';

import CurrentJourneyProgressCard from '../components/CurrentJourneyProgressCard';
import useGetCompletedEmbarkedJourneys from '../services/embarkedJourneys/getCompletedEmbarkedJourneys';
import { Card } from '../components/ui/card';

import CompletedJourneysCard from '../components/CompletedJourneysCard';
import useGetPostsCount from '../services/posts/getPostsCount';
import useGetGratitudeJournalCount from '../services/gratitudeJournals/getGratitudeJournalCount';

import useGetQuestionPromptEntriesCount from '../services/questionPromptEntries/getQuestionPromptEntriesCount';
import useGetJournalCount from '../services/journals/getJournalCounts';

import PostsCountCard from '../components/PostsCountCard';
import JournalsCountCard from '../components/JournalsCountCard';
import GratitudeJournalsCountCard from '../components/GratitudeJournalsCountCard';
import PromptEntriesCountCard from '../components/PromptEntriesCountCard';
import useGetSavedContentCount from '../services/savedContent/getSavedContentCount';

import SavedContentCountCard from '../components/SavedContentCountCard';
import MoodDisplay from '../components/MoodDisplay';

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
  const {
    data: questionPromptEntriesCount,
    isLoading: isFetchingPromptEntriesCount,
  } = useGetQuestionPromptEntriesCount(user?.id as string);
  const { data: journalCount, isLoading: isFetchingJournalCount } =
    useGetJournalCount(user?.id as string);
  const { data: savedContentCount, isLoading: isFetchingSavedContentCount } =
    useGetSavedContentCount(user?.id as string);

  console.log(postsCount);
  console.log(currentJourney);
  console.log(completedJourneys);
  console.log(gratitudeJournalCount);
  console.log(questionPromptEntriesCount);
  console.log(journalCount);
  console.log(savedContentCount);

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

        <MoodDisplay />

        <div className='flex flex-wrap gap-5'>
          <PostsCountCard
            postsCount={postsCount}
            isFetchingPostsCount={isFetchingPostsCount}
          />
          <JournalsCountCard
            journalCount={journalCount}
            isFetchingJournalCount={isFetchingJournalCount}
          />
          <GratitudeJournalsCountCard
            gratitudeJournalCount={gratitudeJournalCount}
            isFetchingGratitudeJournalCount={isFetchingGratitudeJournalCount}
          />
          <PromptEntriesCountCard
            promptEntriesCount={questionPromptEntriesCount}
            isFetchingPromptEntriesCount={isFetchingPromptEntriesCount}
          />
        </div>
        <div>
          <SavedContentCountCard
            savedContentCount={savedContentCount}
            isFetchingSavedContentCount={isFetchingSavedContentCount}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
