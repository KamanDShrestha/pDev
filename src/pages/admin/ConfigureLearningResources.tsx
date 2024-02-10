import useGetAllVideos from '../../services/learningVideos/getLearningVideos';
import AddLearningVideoCard from '../../components/AddLearningVideoCard';
import Heading from '../../components/Heading';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import TruncatedText from '../../components/TruncatedText';
import { Separator } from '../../components/ui/separator';

const ConfigureLearningResources = () => {
  const { data: learningVideos, isLoading: isFetchingLearningVideos } =
    useGetAllVideos();
  console.log(learningVideos);
  return (
    <div>
      <Heading>Learning Videos</Heading>
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
                    <Card className='w-[360px]' key={index}>
                      <CardHeader>
                        <CardTitle className='text-md'>
                          <TruncatedText content={video.title} limit={50} />
                        </CardTitle>
                        <Separator />
                      </CardHeader>
                      <CardContent className='h-[250px]'>
                        <iframe
                          className='w-full h-full rounded-lg shadow-md'
                          src={video.embedUrl}
                          title={video.title}
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
      <AddLearningVideoCard />
    </div>
  );
};

export default ConfigureLearningResources;
