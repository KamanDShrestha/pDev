import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import TruncatedText from './TruncatedText';
import { Separator } from './ui/separator';
import { LearningPodcast } from '../types';
import useAddSavedContent from '../services/savedContent/addSavedContent';
import useGetContentSavedStatus from '../services/savedContent/getContentSavedStatus';
import { useAuthContext } from '../context/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import LoadingSpinner from './LoadingSpinner';

interface LearningPodcastCardProps {
  podcast: LearningPodcast;
  podcastCategory: string;
}

const LearningPodcastCard = ({
  podcast,
  podcastCategory,
}: LearningPodcastCardProps) => {
  const { user } = useAuthContext();

  const { mutate: savePodcast, isLoading: isSaving } = useAddSavedContent();
  const { data: savedContentStatus, isLoading: gettingSavedContentStatus } =
    useGetContentSavedStatus(user?.id as string, 'podcast', podcast._id);

  const queryClient = useQueryClient();

  function handleSavePost() {
    savePodcast(
      {
        userId: user?.id as string,
        contentId: podcast._id,
        contentType: 'podcast',
        category: podcastCategory,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['savedContents', user?.id as string]);
          queryClient.invalidateQueries([
            'contentSavedStatus',
            user?.id as string,
            'podcast',
            podcast._id,
          ]);
        },
      }
    );
  }
  return (
    <Card className='w-[360px] h-[300px]'>
      <CardHeader className='h-[100px]'>
        <CardTitle className='text-md'>
          <TruncatedText content={podcast.title} limit={75} />
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className='h-[150px] flex justify-center items-center'>
        <iframe
          style={{ borderRadius: '12px' }}
          src={podcast.embedUrl}
          className='w-full h-[100px]'
          allowFullScreen
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
        ></iframe>
      </CardContent>
      <CardFooter className=''>
        <span className='text-xl hover:cursor-pointer' onClick={handleSavePost}>
          {gettingSavedContentStatus || isSaving ? (
            <LoadingSpinner />
          ) : savedContentStatus ? (
            <IoBookmark />
          ) : (
            <IoBookmarkOutline />
          )}
        </span>
      </CardFooter>
    </Card>
  );
};

export default LearningPodcastCard;
