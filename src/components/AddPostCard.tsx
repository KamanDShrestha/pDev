import { useState } from 'react';
import Heading from './Heading';
import { useAuthContext } from '../context/AuthProvider';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { Button } from './ui/button';
import ErrorMessage from './ErrorMessage';
import useAddPost from '../services/posts/addPost';
import useAddQA from '../services/QAs/addQA';
import LoadingSpinner from './LoadingSpinner';
import { Checkbox } from './ui/checkbox';
import removeWhitespace from '../services/removeWhitespace';

const AddPostCard = () => {
  const { user } = useAuthContext();
  const { communityId } = useParams<{ communityId: string }>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryError, setSelectedCategoryError] = useState('');
  const [isAnonymousChecked, setIsAnonymousChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { mutate: addPost, isLoading: isAddingPost } = useAddPost();
  const { mutate: addQA, isLoading: isAddingQA } = useAddQA();

  const postCategories = [
    {
      categoryValue: 'question',
      categoryLabel: 'Question',
    },
    {
      categoryValue: 'reflection',
      categoryLabel: 'Reflection',
    },
    {
      categoryValue: 'learning',
      categoryLabel: 'Learning',
    },
  ];

  function handlePost(data: FieldValues) {
    if (
      selectedCategory === '' ||
      selectedCategory === null ||
      selectedCategory === undefined
    ) {
      setSelectedCategoryError(
        () => 'Please select a category before posting.'
      );
      return;
    }

    if (selectedCategory === 'question') {
      addQA(
        {
          userId: user?.id as string,
          communityId: communityId as string,
          questionTitle: removeWhitespace(data.postTitle),
          question: removeWhitespace(data.postContent),
          isAnonymous: isAnonymousChecked,
        },
        {
          onSuccess: () => {
            setSelectedCategory('');
            setValue('postTitle', '');
            setValue('postContent', '');
            setIsAnonymousChecked(false);
          },
        }
      );
    } else {
      addPost(
        {
          userId: user?.id as string,
          communityId: communityId as string,
          postCategory: selectedCategory,
          postTitle: removeWhitespace(data.postTitle),
          post: removeWhitespace(data.postContent),
          isAnonymous: isAnonymousChecked,
        },
        {
          onSuccess: () => {
            setSelectedCategory('');
            setValue('postTitle', '');
            setValue('postContent', '');
            setIsAnonymousChecked(false);
          },
        }
      );
    }
  }

  return (
    <>
      <Heading className='text-2xl'>Create your post</Heading>
      <div className='flex flex-col gap-3'>
        <div>
          <label className='font-medium'>Provide a title</label>
          <Input
            {...register('postTitle', {
              required: 'Please provide a title',
              minLength: {
                value: 5,
                message: 'Title must be at least 5 characters long',
              },
              maxLength: {
                value: 200,
                message: 'Title must be at most 50 characters long',
              },
              validate: {
                notOnlyWhitespace: (value) =>
                  value.trim().length >= 5 || 'This cannot be only whitespace',
              },
            })}
          />
          {errors.postTitle && (
            <ErrorMessage>{errors.postTitle.message as string}</ErrorMessage>
          )}
        </div>
        <div>
          <Select
            onValueChange={(value) => {
              setSelectedCategory(value);
              setSelectedCategoryError('');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {postCategories.map((category, index) => {
                  if (user?.role === 'user' && user.hasSubscribed === false) {
                    if (category.categoryValue === 'question') {
                      return null;
                    }
                  }
                  return (
                    <SelectItem value={category.categoryValue} key={index}>
                      {category.categoryLabel}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedCategoryError && (
            <ErrorMessage>{selectedCategoryError as string}</ErrorMessage>
          )}
        </div>
        <div>
          <label className='font-medium' htmlFor='content'>
            Your content
          </label>
          <Textarea
            id='content'
            {...register('postContent', {
              required: 'Please provide content for your post.',
              minLength: {
                value: 20,
                message: 'Content must be at least 20 characters long',
              },
              maxLength: {
                value: 400,
                message: 'Content must be provided within 400 characters.',
              },
              validate: {
                notOnlyWhitespace: (value) =>
                  value.trim().length >= 20 || 'This cannot be only whitespace',
              },
            })}
            placeholder='Your content...'
          />
          {errors.postContent && (
            <ErrorMessage>{errors.postContent.message as string}</ErrorMessage>
          )}
        </div>
        <div className='flex items-center gap-1 text-sm'>
          <Checkbox
            placeholder='Make it anonymous'
            checked={isAnonymousChecked}
            onCheckedChange={() =>
              setIsAnonymousChecked((previous) => !previous)
            }
          />
          <label>Make it anonymous</label>
        </div>
        <Button onClick={handleSubmit(handlePost)}>
          {isAddingPost || isAddingQA ? <LoadingSpinner /> : 'Post'}
        </Button>
      </div>
    </>
  );
};

export default AddPostCard;
