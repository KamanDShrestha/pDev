import useGetAllVideos from '../../services/learningVideos/getLearningVideos';
import AddLearningVideoCard from '../../components/AddLearningVideoCard';
import Heading from '../../components/Heading';
import LoadingSpinner from '../../components/LoadingSpinner';

import { NavLink } from 'react-router-dom';
import { buttonVariants } from '../../components/ui/button';
import LearningVideoCard from '../../components/LearningVideoCard';
import useDocumentTitle from '../../services/getTitle';

const ConfigureLearningResources = () => {
  const { data: learningVideos, isLoading: isFetchingLearningVideos } =
    useGetAllVideos();
  console.log(learningVideos);
  useDocumentTitle('Learning Resources - Configure - SelfSync');
  return (
    <div>
      <Heading>Learning Videos</Heading>
      <NavLink
        to='/configureResources/podcasts'
        className={buttonVariants({ variant: 'secondary' })}
      >
        {' '}
        Configure learning podcasts
      </NavLink>
      <div className=''>
        {isFetchingLearningVideos && <LoadingSpinner />}
        {learningVideos && learningVideos.length === 0 && (
          <p>No learning videos available</p>
        )}

        {learningVideos &&
          learningVideos.map((videoDocument, index) => {
            return (
              <div key={index} className='p-5 m-5'>
                <Heading className='text-lg'>
                  {videoDocument.category} learning videos
                </Heading>
                <div className='flex flex-wrap items-center justify-center gap-5'>
                  {videoDocument.videos.map((video, index) => (
                    <LearningVideoCard
                      video={video}
                      key={index}
                      videoCategory={videoDocument.category}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
      <AddLearningVideoCard />
    </div>
  );
};

export default ConfigureLearningResources;
