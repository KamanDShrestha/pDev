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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  function handleJournalEntrySubmit(data: FieldValues) {
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
            <Select>
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
            <div>
              <Input type='date' defaultValue={getFormattedDate()} />
            </div>
          </div>
          <div>
            <Heading className='mb-0 text-base'>Put forth your entry</Heading>
            <Textarea
              placeholder='Provide your entry.'
              className='min-h-[300px]'
            />
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
