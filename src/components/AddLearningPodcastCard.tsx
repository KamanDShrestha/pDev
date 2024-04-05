import { useState } from 'react';
import useGetPodcastCategories from '../services/learningPodcasts/getPodcastCategories';
import useAddLearningPodcast from '../services/learningPodcasts/addLearningPodcast';
import { FieldValues, useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Heading from './Heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import ErrorMessage from './ErrorMessage';
import { Button } from './ui/button';
import LoadingSpinner from './LoadingSpinner';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const AddLearningPodcastCard = () => {
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { mutate: addLearningPodcast, isLoading: isAddingPodcast } =
    useAddLearningPodcast();
  const [selectedCategoryError, setSelectedCategoryError] = useState<string>();

  const { data: categories, isLoading: isCategoryFetching } =
    useGetPodcastCategories();

  const [selectedMoodSpecific, setSelectedMoodSpecific] = useState<
    string | null
  >();
  const [selectedMoodSpecificError, setSelectedMoodSpecificError] =
    useState<string>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function handlePodcastSubmit(data: FieldValues) {
    if (!isAddingNewCategory && !selectedCategory) {
      setSelectedCategoryError('Category is required');
      return;
    }
    if (!selectedMoodSpecific) {
      setSelectedMoodSpecificError('Mood specific is required');
      return;
    }
    addLearningPodcast(
      {
        title: data.title,
        url: data.url,
        embedUrl: data.embedUrl,
        host: data.host,
        category: isAddingNewCategory ? data.category : selectedCategory,
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        moodSpecific: selectedMoodSpecific,
      },
      {
        onSuccess: () => {
          setIsAddingNewCategory(false);
          reset({
            title: '',
            url: '',
            embedUrl: '',
            host: '',
            category: '',
            podcastTitle: '',
            podcastDescription: '',
          });
        },
      }
    );
  }

  return (
    <Card className='w-[400px] lg:w-[600px]'>
      <CardHeader>
        <CardTitle>Add new videos for users</CardTitle>
        <CardDescription>
          You can add new learning videos for users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Heading className='mb-0 text-lg font-medium'>Title</Heading>
          <Input
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 5,
                message: 'Title should be at least 5 characters long',
              },
            })}
          />
          {errors.title && (
            <ErrorMessage>{errors.title.message as string}</ErrorMessage>
          )}
        </div>
        <div>
          <Heading className='mb-0 text-lg font-medium'>URL</Heading>
          <Input
            {...register('url', {
              required: 'URL is required',
              minLength: {
                value: 5,
                message: 'URL should be at least 5 characters long',
              },
            })}
          />
          {errors.url && (
            <ErrorMessage>{errors.url.message as string}</ErrorMessage>
          )}
        </div>
        <div>
          <Heading className='mb-0 text-lg font-medium'>Embed URL</Heading>
          <Input
            {...register('embedUrl', {
              required: 'Embed URL is required',
              minLength: {
                value: 5,
                message: 'Embed URL should be at least 5 characters long',
              },
            })}
          />
          {errors.embedUrl && (
            <ErrorMessage>{errors.embedUrl.message as string}</ErrorMessage>
          )}
        </div>
        <div>
          <Heading className='mb-0 text-lg font-medium'>Host</Heading>
          <Input
            {...register('host', {
              required: 'Host is required',
              minLength: {
                value: 5,
                message: 'Host should be at least 5 characters long',
              },
            })}
          />
          {errors.host && (
            <ErrorMessage>{errors.host.message as string}</ErrorMessage>
          )}
        </div>
        <div>
          <Heading className='mb-0 text-lg font-medium'>Podcast Title</Heading>
          <Input
            {...register('podcastTitle', {
              required: 'Podcast Title is required',
              minLength: {
                value: 5,
                message: 'Podcast Title should be at least 5 characters long',
              },
            })}
          />
          {errors.podcastTitle && (
            <ErrorMessage>{errors.podcastTitle.message as string}</ErrorMessage>
          )}
        </div>
        <div>
          <Heading className='mb-0 text-lg font-medium'>
            Podcast Description
          </Heading>
          <Textarea
            {...register('podcastDescription', {
              required: 'Podcast Description is required',
              minLength: {
                value: 5,
                message:
                  'Podcast Description should be at least 5 characters long',
              },
            })}
          />
          {errors.podcastDescription && (
            <ErrorMessage>
              {errors.podcastDescription.message as string}
            </ErrorMessage>
          )}
        </div>
        <div className='flex flex-col gap-3 my-3'>
          {isCategoryFetching && <LoadingSpinner />}
          {categories && categories.length === 0 ? (
            <p>No existing categories found.</p>
          ) : (
            <>
              <Select
                disabled={isAddingNewCategory}
                onValueChange={(category) => setSelectedCategory(category)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Category' />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!isAddingNewCategory && selectedCategoryError && (
                <ErrorMessage>{selectedCategoryError}</ErrorMessage>
              )}
            </>
          )}
          <div className='space-y-3'>
            <div className='flex items-center gap-3'>
              <Switch
                checked={isAddingNewCategory}
                onCheckedChange={() =>
                  setIsAddingNewCategory((previous) => !previous)
                }
              />
              <Heading className='m-0 text-md'>New category?</Heading>
            </div>
            {isAddingNewCategory && (
              <div>
                <Heading className='mb-0 font-medium text-md'>
                  New Category
                </Heading>
                <Input
                  disabled={!isAddingNewCategory}
                  {...register('category', {
                    required: 'Category is required',
                    minLength: {
                      value: 4,
                      message: 'Category should be at least 4 characters long',
                    },
                  })}
                />
                {errors.category && (
                  <ErrorMessage>
                    {errors.category.message as string}
                  </ErrorMessage>
                )}
              </div>
            )}
          </div>
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
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit(handlePodcastSubmit)}>
          {isAddingPodcast ? <LoadingSpinner /> : 'Add Podcast'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddLearningPodcastCard;
