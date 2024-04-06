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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { FieldValues, useForm } from 'react-hook-form';
import { FaPen } from 'react-icons/fa';
import { cn } from '../lib/utils';
import { buttonVariants, Button } from './ui/button';
import useUpdateLearningPodcast from '../services/learningPodcasts/updateLearningPodcast';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import ErrorMessage from './ErrorMessage';

interface LearningPodcastCardProps {
  podcast: LearningPodcast;
  podcastCategory?: string;
}

const LearningPodcastCard = ({
  podcast,
  podcastCategory,
}: LearningPodcastCardProps) => {
  const { user } = useAuthContext();

  const { mutate: savePodcast, isLoading: isSaving } = useAddSavedContent();
  const { mutate: updatePodcast, isLoading: isUpdating } =
    useUpdateLearningPodcast();
  const { data: savedContentStatus, isLoading: gettingSavedContentStatus } =
    useGetContentSavedStatus(user?.id as string, 'podcast', podcast._id);

  const [selectedMoodSpecific, setSelectedMoodSpecific] = useState<
    string | null
  >();
  const [selectedMoodSpecificError, setSelectedMoodSpecificError] =
    useState<string>();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: podcast.title,
      url: podcast.url,
      embedUrl: podcast.embedUrl,
      host: podcast.host,
      podcastTitle: podcast.podcastTitle,
      podcastDescription: podcast.podcastDescription,
    },
  });

  const queryClient = useQueryClient();

  function handleSavePost() {
    if (!podcastCategory) {
      return;
    }
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

  function handlePodcastUpdate(data: FieldValues) {
    if (!podcastCategory) {
      return;
    }
    updatePodcast({
      category: podcastCategory,
      podcastId: podcast._id,
      podcast: {
        title: data.title,
        url: data.url,
        embedUrl: data.embedUrl,
        host: data.host,
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        moodSpecific: selectedMoodSpecific as string,
      },
    });
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
      <CardFooter className='space-x-3'>
        <span className='text-xl hover:cursor-pointer' onClick={handleSavePost}>
          {gettingSavedContentStatus || isSaving ? (
            <LoadingSpinner />
          ) : savedContentStatus ? (
            <IoBookmark />
          ) : (
            <IoBookmarkOutline />
          )}
        </span>

        <div>
          {user?.role === 'admin' && podcastCategory && (
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
                    <label htmlFor='host'>Host</label>
                    <Input
                      {...register('host', {
                        required: 'Host must be provided.',
                        min: {
                          value: 10,
                          message: 'Host must be at least 10 characters.',
                        },
                      })}
                    />
                  </div>
                  <div>
                    <label htmlFor='podcastTitle'>Podcast Title</label>
                    <Input
                      {...register('podcastTitle', {
                        required: 'Podcast Title must be provided.',
                        min: {
                          value: 10,
                          message:
                            'Podcast Title must be at least 10 characters.',
                        },
                      })}
                    />
                  </div>
                  <div>
                    <label htmlFor='podcastDescription'>
                      Podcast Description
                    </label>
                    <Textarea
                      {...register('podcastDescription', {
                        required: 'Podcast Description must be provided.',
                        min: {
                          value: 10,
                          message:
                            'Podcast Description must be at least 10 characters.',
                        },
                      })}
                    />
                  </div>
                  <div>
                    <label>Mood specific</label>
                    <Select
                      onValueChange={(e) => {
                        setSelectedMoodSpecific(e);
                        setSelectedMoodSpecificError('');
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Mood Specific' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='low'>Low</SelectItem>
                        <SelectItem value='neutral'>Neutral</SelectItem>
                        <SelectItem value='high'>High</SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedMoodSpecificError && (
                      <ErrorMessage>{selectedMoodSpecificError}</ErrorMessage>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className={cn(
                      buttonVariants({ variant: 'default', size: 'xs' }),
                      'space-x-2'
                    )}
                    onClick={handleSubmit(handlePodcastUpdate)}
                  >
                    {isUpdating ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <span>Update this post</span>
                        <FaPen />
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LearningPodcastCard;
