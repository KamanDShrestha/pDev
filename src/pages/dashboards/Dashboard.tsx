import CompletedJourneysCard from '@/src/components/CompletedJourneysCard';
import CurrentJourneyProgressCard from '@/src/components/CurrentJourneyProgressCard';
import GoalSet from '@/src/components/GoalSet';
import GoalSettingSection from '@/src/components/GoalSettingSection';
import GratitudeJournalsCountCard from '@/src/components/GratitudeJournalsCountCard';
import JournalsCountCard from '@/src/components/JournalsCountCard';
import MonthlyGoalSet from '@/src/components/MonthlyGoalSet';
import MoodDisplay from '@/src/components/MoodDisplay';
import MoodsChartSection from '@/src/components/MoodsChartSection';
import PostsCountCard from '@/src/components/PostsCountCard';
import PromptEntriesCountCard from '@/src/components/PromptEntriesCountCard';
import SavedContentCountCard from '@/src/components/SavedContentCountCard';
import SuggestionsForMood from '@/src/components/SuggestionsForMood';
import { Card } from '@/src/components/ui/card';
import WeeklyGoalSet from '@/src/components/WeeklyGoalSet';
import WithinWeekGoalSet from '@/src/components/WithinWeekGoalSet';
import { useAuthContext } from '@/src/context/AuthProvider';
import useGetCompletedEmbarkedJourneys from '@/src/services/embarkedJourneys/getCompletedEmbarkedJourneys';
import useGetCurrentEmbarkedJourney from '@/src/services/embarkedJourneys/getCurrentEmbarkedJourney';
import useDocumentTitle from '@/src/services/getTitle';
import useGetGratitudeJournalCount from '@/src/services/gratitudeJournals/getGratitudeJournalCount';
import useGetJournalCount from '@/src/services/journals/getJournalCounts';
import useGetTodayMood from '@/src/services/moods/getTodayMood';
import useGetPostsCount from '@/src/services/posts/getPostsCount';
import useGetQuestionPromptEntriesCount from '@/src/services/questionPromptEntries/getQuestionPromptEntriesCount';
import useGetSavedContentCount from '@/src/services/savedContent/getSavedContentCount';
import Heading from '@/src/components/Heading';


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

  const { data: todayMood } = useGetTodayMood(user?.id as string);

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
        <SuggestionsForMood todayMood={todayMood?.mood} />

        <MoodsChartSection />

        <GoalSet />

        <WeeklyGoalSet />

        <WithinWeekGoalSet />

        <MonthlyGoalSet />

        <div className='flex flex-wrap justify-center gap-5'>
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
        <GoalSettingSection />
      </div>
    </>
  );
};

export default Dashboard;
