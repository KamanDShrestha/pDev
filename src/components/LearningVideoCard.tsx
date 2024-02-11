import { LearningVideo } from '../types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from '@radix-ui/react-separator';
import TruncatedText from './TruncatedText';
import useAddSavedContent from '../services/savedContent/addSavedContent';
import { useAuthContext } from '../context/AuthProvider';

import useGetContentSavedStatus from '../services/savedContent/getContentSavedStatus';
import LoadingSpinner from './LoadingSpinner';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';

interface LearningVideoCardProps {
  video: LearningVideo;
  videoCategory: string;
}

const LearningVideoCard = ({
  video,
  videoCategory,
}: LearningVideoCardProps) => {
  const { user } = useAuthContext();
  const { mutate: saveVideo, isLoading: isSaving } = useAddSavedContent();
  const { data: savedContentStatus, isLoading: gettingSavedContentStatus } =
    useGetContentSavedStatus(user?.id as string, 'video', video._id);

  const queryClient = useQueryClient();
  function handleSavePost() {
    saveVideo(
      {
        userId: user?.id as string,
        contentId: video._id,
        contentType: 'video',
        category: videoCategory,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['savedContents', user?.id as string]);
          queryClient.invalidateQueries([
            'contentSavedStatus',
            user?.id as string,
            'video',
            video._id,
          ]);
        },
      }
    );
  }

  return (
    <Card className='w-[360px]'>
      <CardHeader>
        <CardTitle className='text-md'>
          <TruncatedText content={video.title} limit={75} />
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
          loading='lazy'
          allowFullScreen
        ></iframe>
      </CardContent>
      <CardFooter>
        <span
          className='right-0 text-xl hover:cursor-pointer'
          onClick={handleSavePost}
        >
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

export default LearningVideoCard;
