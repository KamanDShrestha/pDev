import { NavLink } from 'react-router-dom';
import Heading from '../../components/Heading';
import { buttonVariants } from '../../components/ui/button';
import LoadingSpinner from '../../components/LoadingSpinner';
import AddLearningPodcastCard from '../../components/AddLearningPodcastCard';
import useGetAllPodcasts from '../../services/learningPodcasts/getLearningPodcasts';
import LearningPodcastCard from '../../components/LearningPodcastCard';
import useDocumentTitle from '../../services/getTitle';
import { Separator } from '../../components/ui/separator';

const ConfigureLearningPodcasts = () => {
  const { data: learningPodcasts, isLoading: isFetchingLearningPodcasts } =
    useGetAllPodcasts();
  console.log(learningPodcasts);
  useDocumentTitle('Learning Podcasts - Configure - SelfSync');
  return (
    <div>
      <Heading>Learning Podcasts</Heading>
      <NavLink
        to='/configureResources'
        className={buttonVariants({ variant: 'secondary' })}
      >
        Configure learning videos
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
                    <LearningPodcastCard
                      podcast={podcast}
                      podcastCategory={podcastDocument.category}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
      <Separator className='my-20' />

      <Heading>Add new learning podcasts</Heading>
      <div className='flex items-center justify-center'>
        <AddLearningPodcastCard />
      </div>
    </div>
  );
};

export default ConfigureLearningPodcasts;
