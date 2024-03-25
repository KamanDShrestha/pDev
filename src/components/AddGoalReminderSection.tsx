import { FieldValues, useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useState } from 'react';
import { Button } from './ui/button';
import useAddGoalSet from '../services/goalSetting/addGoalSet';
import { useAuthContext } from '../context/AuthProvider';
import { cn } from '../lib/utils';
import Heading from './Heading';

import LoadingSpinner from './LoadingSpinner';
import { FaRegCalendarCheck } from 'react-icons/fa';

const AddGoalReminderSection = () => {
  const [numberOfGoals, setNumberOfGoals] = useState(5);

  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);

  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedCountInWeek, setSelectedCountInWeek] = useState(0);
  const [selectedCountWeeks, setSelectedCountWeeks] = useState(0);
  const [selectedCountInMonth, setSelectedCountInMonth] = useState(0);

  const [duration, setDuration] = useState(5);

  const { register, handleSubmit, watch } = useForm();
  const { mutate: addGoalSet, isLoading: isAddingGoalSet } = useAddGoalSet();
  const { user } = useAuthContext();

  const periodOptions = [
    { name: 'Daily', value: 'daily' },
    { name: 'Within a week', value: 'withinWeek' },
    { name: 'Weekly', value: 'weekly' },
    { name: 'Monthly', value: 'monthly' },
  ];
  const durationOptions = [3, 5, 7];

  const providedGoalSetTitle = watch('goalSetTitle');
  const providedStartDate = watch('startDate');
  const providedGoals = Array.from({ length: numberOfGoals }, (_, index) => {
    return watch(`goal${index + 1}`);
  });

  function handlePeriodChange({
    period,
    index,
  }: {
    period: string;
    index: number;
  }) {
    setSelectedPeriod(period);
    setSelectedPeriodIndex(index);
  }

  function handleCountInWeekChange({
    count,
    index,
  }: {
    count: number;
    index: number;
  }) {
    setSelectedCountInWeek(index);
    setDuration(count);
  }

  function handleCountWeeksChange({
    count,
    index,
  }: {
    count: number;
    index: number;
  }) {
    setSelectedCountWeeks(index);
    setDuration(count);
  }

  function handleCountInMonthChange({
    count,
    index,
  }: {
    count: number;
    index: number;
  }) {
    setSelectedCountInMonth(index);
    setDuration(count);
  }

  function handleDurationChange({
    duration,
    index,
  }: {
    duration: number;
    index: number;
  }) {
    setSelectedDuration(index);
    setDuration(duration);
  }

  function handleAddGoalSet(data: FieldValues) {
    console.log(data);
    console.log(
      Array.from({ length: numberOfGoals }, (_, index) => {
        return { goal: data[`goal${index + 1}`] };
      })
    );

    addGoalSet({
      userId: user?.id as string,
      goalSetTitle: data.goalSetTitle,
      goalSetType: selectedPeriod,
      startDate: new Date(),
      remindingCount: duration,
      goals: Array.from({ length: numberOfGoals }, (_, index) => {
        return { goal: data[`goal${index + 1}`] };
      }),
    });
  }

  return (
    <div className='flex flex-wrap items-center justify-around gap-5'>
      <Card>
        <CardHeader>
          <Heading className='mb-0'>Preview</Heading>
        </CardHeader>
        <CardContent className='flex flex-col gap-3 text-lg'>
          <CardTitle>
            {providedGoalSetTitle || 'Provide a goal set title'}
          </CardTitle>
          <p className='font-medium'>
            {providedStartDate
              ? `Start Date: ${new Date(providedStartDate).toDateString()}`
              : 'Provide a goal set start date'}
          </p>
          <p className='font-medium'>
            Reminder period: {selectedPeriod || 'Select a period'}
          </p>
          <p className='font-medium'>
            Reminder duration: {duration || 'Select a duration'}
          </p>

          <div>
            {providedGoals.map((goal, index) => (
              <p key={index} className='flex items-center gap-3'>
                <span>
                  <FaRegCalendarCheck />
                </span>
                <span>{goal || 'Provide a goal'}</span>
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* section for adding goal */}
      <Card className='max-w-[500px]'>
        <CardHeader>
          <CardTitle>Add custom goals</CardTitle>
          <CardDescription>
            You can add custom goals for personal accountability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-3'>
            <div>
              <label htmlFor='goalSetTitle' className='text-lg font-medium'>
                Title
              </label>
              <Input id='goalSetTitle' {...register('goalSetTitle')} />
            </div>

            <div>
              <label htmlFor='startDate' className='text-lg font-medium'>
                Start Date:
              </label>
              <Input id='startDate' {...register('startDate')} type='date' />
            </div>

            <div>
              <label htmlFor='startDate' className='text-lg font-medium'>
                Select period for reminder:
              </label>
              <div className='flex justify-around gap-4 p-4'>
                {periodOptions.map((option, index) => (
                  <div
                    className={cn(
                      'p-2 text-sm font-medium border border-solid rounded-lg cursor-pointer',
                      selectedPeriodIndex === index
                        ? 'bg-blue-500 text-white'
                        : ''
                    )}
                    key={index}
                    onClick={() =>
                      handlePeriodChange({ period: option.value, index })
                    }
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            </div>

            {/* add section for selecting the content  */}

            {selectedPeriod === 'daily' && (
              <div>
                <label htmlFor='daily' className='text-lg font-medium'>
                  Select the duration:
                </label>

                <div className='flex justify-around gap-4 p-4'>
                  {durationOptions.map((option, index) => (
                    <div
                      className={cn(
                        'p-2 text-sm font-medium border border-solid rounded-lg cursor-pointer',
                        selectedDuration === index
                          ? 'bg-blue-500 text-white'
                          : ''
                      )}
                      key={index}
                      onClick={() =>
                        handleDurationChange({ duration: option, index })
                      }
                    >
                      {option} days
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedPeriod === 'withinWeek' && (
              <div>
                <label htmlFor='withinWeek' className='text-lg font-medium'>
                  Select the number of times in a week:
                </label>
                <div className='flex justify-around gap-4 p-4'>
                  {Array.from({ length: 3 }, (_, index) => (
                    <div
                      className={cn(
                        'px-3 py-1 text-sm font-medium border border-solid rounded-lg cursor-pointer',
                        selectedCountInWeek === index
                          ? 'bg-blue-500 text-white'
                          : ''
                      )}
                      key={index}
                      onClick={() =>
                        handleCountInWeekChange({ count: index + 1, index })
                      }
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedPeriod === 'weekly' && (
              <div>
                <label htmlFor='weekly' className='text-lg font-medium'>
                  Select the number of weeks:
                </label>
                <div className='flex justify-around gap-4 p-4'>
                  {Array.from({ length: 5 }, (_, index) => (
                    <div
                      className={cn(
                        'px-3 py-1 text-sm font-medium border border-solid rounded-lg cursor-pointer',
                        selectedCountWeeks === index
                          ? 'bg-blue-500 text-white'
                          : ''
                      )}
                      key={index}
                      onClick={() =>
                        handleCountWeeksChange({ count: index + 1, index })
                      }
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedPeriod === 'monthly' && (
              <div>
                <label htmlFor='monthly' className='text-lg font-medium'>
                  Select the number of count in a month:
                </label>
                <div className='flex justify-around gap-4 p-4'>
                  {Array.from({ length: 5 }, (_, index) => (
                    <div
                      className={cn(
                        'px-3 py-1 text-sm font-medium border border-solid rounded-lg cursor-pointer',
                        selectedCountInMonth === index
                          ? 'bg-blue-500 text-white'
                          : ''
                      )}
                      key={index}
                      onClick={() =>
                        handleCountInMonthChange({ count: index + 1, index })
                      }
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label htmlFor='numberOfGoals' className='text-lg font-medium'>
                Number of goals
              </label>
              <Select
                defaultValue='5'
                onValueChange={(value) => setNumberOfGoals(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select number of goals' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Number of days</SelectLabel>
                    {Array.from({ length: 10 }, (_, index) => (
                      <SelectItem key={index} value={(index + 1).toString()}>
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor='goals' className='text-lg font-medium'>
                Goals
              </label>
              <div className='space-y-2'>
                {
                  // create goals input fields based on the number of goals
                  Array.from({ length: numberOfGoals }).map((_, index) => (
                    <Input
                      key={index}
                      {...register(`goal${index + 1}`)}
                      placeholder={`Goal ${index + 1}`}
                    />
                  ))
                }
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit(handleAddGoalSet)}
            disabled={isAddingGoalSet}
          >
            {isAddingGoalSet ? <LoadingSpinner /> : 'Add my goals'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddGoalReminderSection;
