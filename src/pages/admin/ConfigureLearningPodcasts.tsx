import { NavLink } from 'react-router-dom';
import Heading from '../../components/Heading';
import { buttonVariants } from '../../components/ui/button';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import TruncatedText from '../../components/TruncatedText';
import { Separator } from '../../components/ui/separator';
import AddLearningPodcastCard from '../../components/AddLearningPodcastCard';
import useGetAllPodcasts from '@/src/services/learningPodcasts/getLearningPodcasts';

const ConfigureLearningPodcasts = () => {
  const { data: learningPodcasts, isLoading: isFetchingLearningPodcasts } =
    useGetAllPodcasts();
  return (
    <div>
      <Heading>Learning Podcasts</Heading>
      <NavLink
        to='/configureResources/podcasts'
        className={buttonVariants({ variant: 'secondary' })}
      >
        {' '}
        Configure learning podcasts
      </NavLink>
      <div className=''>
        {isFetchingLearningPodcasts && <LoadingSpinner />}
        {learningPodcasts && learningPodcasts.length === 0 && (
          <p>No learning podcasts available</p>
        )}

        {learningPodcasts &&
          learningPodcasts.map((podcastDocument, index) => {
            return (
              <div key={index} className='p-5 m-5'>
                <Heading className='text-lg'>
                  {podcastDocument.category} learning podcasts
                </Heading>
                <div className='flex flex-wrap items-center justify-center gap-5'>
                  {podcastDocument.podcasts.map((podcast, index) => (
                    <Card className='w-[360px]' key={index}>
                      <CardHeader>
                        <CardTitle className='text-md'>
                          <TruncatedText content={podcast.title} limit={75} />
                        </CardTitle>
                        <Separator />
                      </CardHeader>
                      <CardContent className='h-[250px]'>
                        <iframe
                          className='w-full h-full rounded-lg shadow-md'
                          src={podcast.embedUrl}
                          title={podcast.title}
                          style={{ border: 'none' }}
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                          allowFullScreen
                        ></iframe>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
      <AddLearningPodcastCard />
    </div>
  );
};

export default ConfigureLearningPodcasts;
