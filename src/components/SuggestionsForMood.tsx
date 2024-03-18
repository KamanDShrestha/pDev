import { useAuthContext } from '../context/AuthProvider';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import useGetTodayMood from '../services/moods/getTodayMood';
import useGetRandomQuoteForMood from '../services/quotes/getRandomQuoteForMood';
import useGetRandomVideoForMood from '../services/learningVideos/getRandomVideoForMood';
import useGetRandomPodcastForMood from '../services/learningPodcasts/getRandomPodcastForMood';
import QuoteCard from './QuoteCard';
import LoadingSpinner from './LoadingSpinner';
import LearningVideoCard from './LearningVideoCard';
import LearningPodcastCard from './LearningPodcastCard';
import Heading from './Heading';

const SuggestionsForMood = () => {
  const { user } = useAuthContext();
  const { data: todayMood } = useGetTodayMood(user?.id as string);
  const { data: randomQuote, isLoading: isFetchingRandomQuote } =
    useGetRandomQuoteForMood(todayMood?.mood as number);
  const { data: randomVideo, isLoading: isFetchingRandomVideo } =
    useGetRandomVideoForMood(todayMood?.mood as number);
  const { data: randomPodcast, isLoading: isFetchingRandomPodcast } =
    useGetRandomPodcastForMood(todayMood?.mood as number);

  console.log(todayMood);
  console.log(randomQuote);
  console.log(randomVideo);
  console.log(randomPodcast);
  console.log(user);
  console.log(user?.id);

  return (
    <>
      <Card>
        {user?.loggedMood === false &&
          (todayMood === undefined || todayMood == null) && (
            <CardContent className='p-5'>
              Log your mood for getting suggestions.
            </CardContent>
          )}
        {user?.loggedMood === true &&
          todayMood !== undefined &&
          todayMood !== null && (
            <>
              <CardHeader>
                <CardTitle>Suggestions</CardTitle>
                <CardDescription>
                  Suggestions for your mood will be displayed here. You can also
                  explore the app to get suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex flex-wrap items-center justify-around gap-5'>
                <div>
                  <Heading className='my-2 text-lg'>Quote of the day</Heading>
                  {isFetchingRandomQuote && <LoadingSpinner />}
                  {randomQuote && randomQuote.quote && (
                    <QuoteCard quote={randomQuote} />
                  )}
                </div>
                <div>
                  <Heading className='my-2 text-lg'>Suggested video</Heading>
                  {isFetchingRandomVideo && <LoadingSpinner />}
                  {randomVideo && <LearningVideoCard video={randomVideo} />}
                </div>
                <div>
                  <Heading className='my-2 text-lg'>Suggested podcast</Heading>

                  {isFetchingRandomPodcast && <LoadingSpinner />}
                  {randomPodcast && (
                    <LearningPodcastCard podcast={randomPodcast} />
                  )}
                </div>
              </CardContent>
            </>
          )}
      </Card>
    </>
  );
};

export default SuggestionsForMood;
