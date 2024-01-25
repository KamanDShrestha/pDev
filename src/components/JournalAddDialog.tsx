import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import Heading from './Heading';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import getFormattedDate from '../services/getFormattedDate';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { FieldValues, useForm } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';
import { useAuthContext } from '../context/AuthProvider';
import { useState } from 'react';
import useAddJournalEntry from '../services/journals/addJournalEntry';

const journalCategories = [
  {
    label: 'Reflection',
    value: 'reflection',
  },
  {
    label: 'Learning',
    value: 'learning',
  },
  {
    label: 'Gratitude',
    value: 'gratitude',
  },
  {
    label: 'Goals',
    value: 'goals',
  },
  {
    label: 'Personal',
    value: 'personal',
  },
  {
    label: 'Other',
    value: 'other',
  },
];
const JournalAddDialog = () => {
  const { user } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: addJournalEntry } = useAddJournalEntry();
  console.log(errors);
  function handleJournalEntrySubmit(data: FieldValues) {
    if (!selectedCategory) {
      setCategoryError('Please select a category for your journal entry.');
      return;
    }
    addJournalEntry({
      userId: user?.id as string,
      journalEntry: {
        journalTitle: data.journalTitle,
        journalContent: data.journalContent,
        entryDate: data.entryDate,
        journalCategory: selectedCategory,
      },
    });

    console.log(data);
  }

  return (
    <Dialog>
      <div className='flex justify-center w-full'>
        <DialogTrigger>
          <Textarea
            placeholder='Provide journal entry.'
            className='lg:w-[500px] w-[350px]'
          />
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your journal entry</DialogTitle>
          <DialogDescription>
            Pour your heart out. This is a safe space.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-3'>
          <div>
            <Heading className='mb-0 text-base'>Title</Heading>
            <Input
              placeholder='Provide title for the journal.'
              {...register('journalTitle', {
                required: {
                  value: true,
                  message: 'Please provide a title for your journal entry.',
                },
              })}
            />
            {errors.journalTitle && (
              <ErrorMessage>
                {errors.journalTitle.message as string}
              </ErrorMessage>
            )}
          </div>
          <div className='flex justify-between'>
            <div>
              <Select
                onValueChange={(category) => {
                  setCategoryError('');
                  setSelectedCategory(category);
                }}
              >
                <SelectTrigger className='w-[200px]'>
                  <SelectValue placeholder='Select a category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {journalCategories.map((category) => (
                      <SelectItem value={category.value} key={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {categoryError && <ErrorMessage>{categoryError}</ErrorMessage>}
            </div>
            <div>
              <Input
                type='date'
                defaultValue={getFormattedDate()}
                {...register('entryDate', {
                  required: {
                    value: true,
                    message: 'Please provide entry date for the journal.',
                  },
                })}
              />
              {errors.entryDate && (
                <ErrorMessage>
                  {errors.entryDate.message as string}
                </ErrorMessage>
              )}
            </div>
          </div>
          <div>
            <Heading className='mb-0 text-base'>Put forth your entry</Heading>
            <Textarea
              placeholder='Provide your entry.'
              className='min-h-[300px]'
              {...register('journalContent', {
                required: {
                  value: true,
                  message: 'Please provide content for your entry.',
                },
              })}
            />
            {errors.journalContent && (
              <ErrorMessage>
                {errors.journalContent.message as string}
              </ErrorMessage>
            )}
          </div>
          <Button
            className='m-auto'
            onClick={handleSubmit(handleJournalEntrySubmit)}
          >
            Add your journal entry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JournalAddDialog;
