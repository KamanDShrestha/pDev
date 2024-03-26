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
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { useState } from 'react';
import { Button } from './ui/button';
import useEditPost from '../services/posts/editPost';
import LoadingSpinner from './LoadingSpinner';
import { useQueryClient } from '@tanstack/react-query';

interface EditPostDialogProps {
  post: PostData;
}

const EditPostDialog = ({ post }: EditPostDialogProps) => {
  const [selectedCategory, setSelectedCategory] = useState(post.postCategory);
  const { register, handleSubmit } = useForm({
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
    updatePost(
      {
        postId: post._id,
        postEditFields: {
          ...post,
          postTitle: data.postTitle,
          post: data.post,
          postCategory: selectedCategory,
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
            <Input id='title' {...register('postTitle')} />
          </div>
          <div>
            <label htmlFor='content' className='font-medium'>
              Post Content
            </label>
            <Textarea id='content' {...register('post')} />
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
