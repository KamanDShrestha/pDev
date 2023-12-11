import React from 'react';
import Heading from './Heading';
import { useAuthContext } from '../context/AuthProvider';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { SelectLabel } from '@radix-ui/react-select';
import { Button } from './ui/button';

const AddPostCard = () => {
  const { user } = useAuthContext();
  const { communityId } = useParams<{ communityId: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  return (
    <>
      <Heading className='text-2xl'>Create your post</Heading>
      <div>
        <div>
          <label>Provide a title</label>
          <Input {...register('postTitle')} />
        </div>
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className='m-auto text-sm font-medium'>
                  Category
                </SelectLabel>
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
          <label>Provide description</label>
          <Textarea
            {...register('postDescription')}
            placeholder='Your content...'
          />
        </div>
        <Button>Post</Button>
      </div>
    </>
  );
};

export default AddPostCard;
