import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Heading from './Heading';
import ErrorMessage from './ErrorMessage';
import { FieldValues, useForm } from 'react-hook-form';
import LoadingSpinner from './LoadingSpinner';
import { Input } from './ui/input';
import { Switch } from './ui/switch';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import useAddLearningVideo from '../services/learningVideos/addLearningVideo';
import useGetVideoCategories from '../services/learningVideos/getVideoCategories';
import removeWhitespace from '../services/removeWhitespace';

const AddLearningVideoCard = () => {
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryError, setSelectedCategoryError] = useState<string>();
  const [selectedMoodSpecific, setSelectedMoodSpecific] = useState<
    string | null
  >();
  const [selectedMoodSpecificError, setSelectedMoodSpecificError] =
    useState<string>();

  const { mutate: addLearningVideo, isLoading: isAddingVideo } =
    useAddLearningVideo();

  const { data: categories, isLoading: isCategoryFetching } =
    useGetVideoCategories();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function handleVideoSubmit(data: FieldValues) {
    if (!isAddingNewCategory && !selectedCategory) {
      setSelectedCategoryError('Category is required');
      return;
    }
    if (!selectedMoodSpecific) {
      setSelectedMoodSpecificError('Mood specific is required');
      return;
    }

    console.log(data);
    addLearningVideo(
      {
        title: removeWhitespace(data.title),
        url: removeWhitespace(data.url),
        embedUrl: removeWhitespace(data.embedUrl),
        author: removeWhitespace(data.author),
        category: isAddingNewCategory
          ? removeWhitespace(data.category as string)
          : selectedCategory || '',
        moodSpecific: selectedMoodSpecific,
      },
      {
        onSuccess: () => {
          setIsAddingNewCategory(false);
          reset({
            title: '',
            url: '',
            embedUrl: '',
            author: '',
            category: '',
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
              maxLength: {
                value: 100,
                message: 'Title should be at most 100 characters long',
              },
              validate: {
                notOnlyWhitespace: (value) =>
                  value.trim().length >= 4 ||
                  'Category cannot be only whitespace',
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
              validate: {
                notOnlyWhitespace: (value) =>
                  value.trim().length >= 5 ||
                  'Category cannot be only whitespace',
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
              validate: {
                notOnlyWhitespace: (value) =>
                  value.trim().length >= 5 ||
                  'Category cannot be only whitespace',
              },
            })}
          />
          {errors.embedUrl && (
            <ErrorMessage>{errors.embedUrl.message as string}</ErrorMessage>
          )}
        </div>
        <div>
          <Heading className='mb-0 text-lg font-medium'>Author</Heading>
          <Input
            {...register('author', {
              required: 'Author is required',
              minLength: {
                value: 5,
                message: 'Author should be at least 5 characters long',
              },
              maxLength: {
                value: 30,
                message: 'Quote should be at most 30 characters long',
              },
              validate: {
                notOnlyWhitespace: (value) =>
                  value.trim().length >= 5 ||
                  'Category cannot be only whitespace',
              },
            })}
          />
          {errors.author && (
            <ErrorMessage>{errors.author.message as string}</ErrorMessage>
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
                    validate: {
                      notOnlyWhitespace: (value) =>
                        value.trim().length !== 0 ||
                        'Category cannot be only whitespace',
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
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit(handleVideoSubmit)}>
          {isAddingVideo ? <LoadingSpinner /> : 'Add Video'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddLearningVideoCard;
