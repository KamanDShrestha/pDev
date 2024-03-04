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
import { Button, buttonVariants } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { FaPen } from 'react-icons/fa';
import { cn } from '../lib/utils';

import { Input } from './ui/input';

import { FieldValues, useForm } from 'react-hook-form';
import useUpdateLearningVideo from '../services/learningVideos/updateLearningVideo';

interface LearningVideoCardProps {
  video: LearningVideo;
  videoCategory?: string;
}

const LearningVideoCard = ({
  video,
  videoCategory,
}: LearningVideoCardProps) => {
  const { user } = useAuthContext();
  const { mutate: saveVideo, isLoading: isSaving } = useAddSavedContent();
  const { mutate: updateVideo, isLoading: isUpdating } =
    useUpdateLearningVideo();
  const { data: savedContentStatus, isLoading: gettingSavedContentStatus } =
    useGetContentSavedStatus(user?.id as string, 'video', video._id);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: video.title,
      url: video.url,
      embedUrl: video.embedUrl,
      author: video.author,
    },
  });

  const queryClient = useQueryClient();
  function handleSavePost() {
    if (!videoCategory) {
      return;
    }
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

  function handleVideoUpdate(data: FieldValues) {
    if (!videoCategory) {
      return;
    }
    updateVideo({
      category: videoCategory,
      videoId: video._id,
      video: {
        title: data.title,
        url: data.url,
        embedUrl: data.embedUrl,
        author: data.author,
      },
    });
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
      {user?.role === 'admin' && videoCategory && (
        <CardFooter className='space-x-3'>
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
          <div>
            <Dialog>
              <DialogTrigger
                className={cn(
                  buttonVariants({ variant: 'default', size: 'xs' }),
                  'space-x-2'
                )}
              >
                <span>Update Video</span>
                <FaPen />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Update this video</DialogTitle>
                <DialogDescription>
                  You can update this video here.
                </DialogDescription>
                <div className='space-y-2'>
                  <div>
                    <label htmlFor='title'>Title</label>
                    <Input
                      id='title'
                      {...register('title', {
                        required: 'Title must be provided.',
                        min: {
                          value: 10,
                          message: 'Title must be at least 10 characters.',
                        },
                      })}
                    />
                  </div>
                  <div>
                    <label htmlFor='url'>URL</label>
                    <Input
                      id='url'
                      {...register('url', {
                        required: 'URL must be provided.',
                        min: {
                          value: 10,
                          message: 'URL must be at least 10 characters.',
                        },
                      })}
                    />
                  </div>
                  <div>
                    <label htmlFor='embedUrl'>Embed URL</label>
                    <Input
                      id='embedUrl'
                      {...register('embedUrl', {
                        required: 'Embed URL must be provided.',
                        min: {
                          value: 10,
                          message: 'Embed URL must be at least 10 characters.',
                        },
                      })}
                    />
                  </div>
                  <div>
                    <label htmlFor='author'>Author</label>
                    <Input
                      {...register('author', {
                        required: 'Author must be provided.',
                        min: {
                          value: 10,
                          message: 'Author must be at least 10 characters.',
                        },
                      })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className={cn(
                      buttonVariants({ variant: 'default', size: 'xs' }),
                      'space-x-2'
                    )}
                    onClick={handleSubmit(handleVideoUpdate)}
                  >
                    {isUpdating ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <span>Update this video</span>
                        <FaPen />
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default LearningVideoCard;
