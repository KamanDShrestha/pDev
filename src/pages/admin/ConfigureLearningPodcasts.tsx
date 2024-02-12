import { NavLink } from 'react-router-dom';
import Heading from '../../components/Heading';
import { buttonVariants } from '../../components/ui/button';
import LoadingSpinner from '../../components/LoadingSpinner';
import AddLearningPodcastCard from '../../components/AddLearningPodcastCard';
import useGetAllPodcasts from '../../services/learningPodcasts/getLearningPodcasts';
import LearningPodcastCard from '../../components/LearningPodcastCard';
import useDocumentTitle from '../../services/getTitle';

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
      <AddLearningPodcastCard />
    </div>
  );
};

export default ConfigureLearningPodcasts;
