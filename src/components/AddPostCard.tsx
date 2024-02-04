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

const AddPostCard = () => {
  const { user } = useAuthContext();
  const { communityId } = useParams<{ communityId: string }>();
  const [selectedCategory, setSelectedCategory] = useState('');
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
    if (selectedCategory === 'question') {
      addQA(
        {
          userId: user?.id as string,
          communityId: communityId as string,
          questionTitle: data.postTitle,
          question: data.postContent,
        },
        {
          onSuccess: () => {
            setSelectedCategory('');
            setValue('postTitle', '');
            setValue('postContent', '');
          },
        }
      );
    } else {
      addPost(
        {
          userId: user?.id as string,
          communityId: communityId as string,
          postCategory: selectedCategory,
          postTitle: data.postTitle,
          post: data.postContent,
          isAnonymous: isAnonymousChecked,
        },
        {
          onSuccess: () => {
            setSelectedCategory('');
            setValue('postTitle', '');
            setValue('postContent', '');
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
            })}
          />
          {errors.postTitle && (
            <ErrorMessage>{errors.postTitle.message as string}</ErrorMessage>
          )}
        </div>
        <div>
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {postCategories.map((category, index) => (
                  <SelectItem value={category.categoryValue} key={index}>
                    {category.categoryLabel}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className='font-medium'>Your content</label>
          <Textarea
            {...register('postContent', {
              required: 'Please provide content for your post.',
              minLength: {
                value: 5,
                message: 'Title must be at least 5 characters long',
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
            className='w-3 h-3'
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
