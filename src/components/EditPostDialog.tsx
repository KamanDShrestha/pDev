import { PostData } from '../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { FaPen } from 'react-icons/fa';
import { Input } from './ui/input';
import { FieldValues, useForm } from 'react-hook-form';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { useState } from 'react';
import { Button } from './ui/button';
import useEditPost from '../services/posts/editPost';
import LoadingSpinner from './LoadingSpinner';
import { useQueryClient } from '@tanstack/react-query';
import removeWhitespace from '../services/removeWhitespace';
import ErrorMessage from './ErrorMessage';
import { Checkbox } from './ui/checkbox';

interface EditPostDialogProps {
  post: PostData;
}

const EditPostDialog = ({ post }: EditPostDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState(post.postCategory);
  const [selectedCategoryError, setSelectedCategoryError] = useState('');
  const [isAnonymousChecked, setIsAnonymousChecked] = useState(
    post.isAnonymous
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { postTitle: post.postTitle, post: post.post },
  });

  const { mutate: updatePost, isLoading: isUpdatingPost } = useEditPost();
  const categories = [
    { label: 'Reflection', value: 'reflection' },
    { label: 'Learning', value: 'learning' },
    { label: 'Question', value: 'question' },
  ];

  const queryClient = useQueryClient();

  function handleUpdatePost(data: FieldValues) {
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
    updatePost(
      {
        postId: post._id,
        postEditFields: {
          ...post,
          postTitle: removeWhitespace(data.postTitle),
          post: removeWhitespace(data.post),
          postCategory: selectedCategory,
          isAnonymous: isAnonymousChecked,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['posts', post.communityId]);
        },
      }
    );
  }
  return (
    <Dialog>
      <DialogTrigger>
        <span className='cursor-pointer '>
          <FaPen />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit post</DialogTitle>
        <DialogDescription>
          You can edit your post title and content here.
        </DialogDescription>
        <div className='flex flex-col gap-3'>
          <div>
            <label htmlFor='title' className='font-medium'>
              Title
            </label>
            <Input
              id='title'
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
            <label htmlFor='content' className='font-medium'>
              Post Content
            </label>
            <Textarea
              id='content'
              {...register('post', {
                required: 'Please provide content for your post.',
                minLength: {
                  value: 20,
                  message: 'Content must be at least 20 characters long',
                },
                maxLength: {
                  value: 400,
                  message: 'Content must be provided within 400 characters.',
                },
              })}
            />
            {errors.post && (
              <ErrorMessage>{errors.post.message as string}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor='category' className='font-medium'>
              Post Category
            </label>
            <Select
              defaultValue={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Choose a category' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, index) => (
                  <SelectItem key={index} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCategoryError && (
              <ErrorMessage>{selectedCategoryError as string}</ErrorMessage>
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
          <Button
            onClick={handleSubmit(handleUpdatePost)}
            disabled={isUpdatingPost}
          >
            {isUpdatingPost ? <LoadingSpinner /> : 'Update post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
