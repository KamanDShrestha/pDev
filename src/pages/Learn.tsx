import Heading from '../components/Heading';
import LearningPodcastCard from '../components/LearningPodcastCard';
import LearningVideoCard from '../components/LearningVideoCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useGetAllPodcasts from '../services/learningPodcasts/getLearningPodcasts';
import useGetAllVideos from '../services/learningVideos/getLearningVideos';

const Learn = () => {
  const { data: learningVideos, isLoading: isFetchingLearningVideos } =
    useGetAllVideos();
  const { data: learningPodcasts, isLoading: isFetchingLearningPodcasts } =
    useGetAllPodcasts();
  return (
    <>
      <Heading>Learning Resources</Heading>
      <div className='mx-3 my-10'>
        <Heading className='mb-0 text-2xl'>Learning Videos</Heading>
        {isFetchingLearningVideos && <LoadingSpinner />}
        {learningVideos && learningVideos.length === 0 && (
          <p>No learning videos available</p>
        )}
        {learningVideos &&
          learningVideos.map((videoDocument, index) => {
            return (
              <div key={index} className='px-5 m-5'>
                <Heading className='text-lg'>
                  {videoDocument.category} learning videos
                </Heading>
                <div className='flex flex-wrap items-center justify-center gap-5'>
                  {videoDocument.videos.map((video, index) => (
                    <LearningVideoCard video={video} key={index} />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
      <div className='mx-3 my-10'>
        <Heading className='mb-0 text-2xl'>Learning Podcasts</Heading>
        {isFetchingLearningPodcasts && <LoadingSpinner />}
        {learningPodcasts && learningPodcasts.length === 0 && (
          <p>No learning podcasts available</p>
        )}

        {learningPodcasts &&
          learningPodcasts.map((podcastDocument, index) => {
            return (
              <div key={index} className='px-5 m-5'>
                <Heading className='text-lg'>
                  {podcastDocument.category} learning podcasts
                </Heading>
                <div className='flex flex-wrap items-center justify-center gap-5'>
                  {podcastDocument.podcasts.map((podcast, index) => (
                    <LearningPodcastCard podcast={podcast} key={index} />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Learn;
