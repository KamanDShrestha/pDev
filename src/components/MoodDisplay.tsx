import { useState } from 'react';
import { DatePicker } from './DatePicker';
import Heading from './Heading';
import { IoChevronBack } from 'react-icons/io5';
import { IoChevronForward } from 'react-icons/io5';
import useGetMoodByLoggedDate from '../services/moods/getMoodByLoggedDate';
import { useAuthContext } from '../context/AuthProvider';
import { Card, CardContent } from './ui/card';
import LoadingSpinner from './LoadingSpinner';
import { moodEmoji } from '../constants';

const MoodDisplay = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { user } = useAuthContext();
  const { data: loggedMood, isLoading: isFetchingMood } =
    useGetMoodByLoggedDate(user?.id as string, date);

  console.log(loggedMood);

  function decreaseDate() {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  }

  function increaseDate() {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  }

  return (
    <Card className='max-w-[500px] m-auto'>
      <CardContent className='flex flex-col items-center gap-5 p-3'>
        <Heading className='mb-1 text-2xl'>Mood</Heading>
        <div className='flex items-center gap-3'>
          <span
            className='text-3xl hover:cursor-pointer'
            onClick={decreaseDate}
          >
            <IoChevronBack />
          </span>
          <DatePicker date={date} setDate={setDate} />
          <span
            className='text-3xl hover:cursor-pointer'
            onClick={increaseDate}
          >
            <IoChevronForward />
          </span>
        </div>
        <div>
          {isFetchingMood && <LoadingSpinner />}
          {loggedMood === null && <p>No mood has been logged at this date.</p>}
          {loggedMood && loggedMood !== null && (
            <Card>
              <CardContent className='flex flex-col items-center gap-3 p-3 min-w-[300px]'>
                <p className='text-lg font-semibold'>
                  Mood Score: {loggedMood.mood}
                </p>
                <span className='m-auto text-3xl'>
                  {moodEmoji[loggedMood.mood as keyof typeof moodEmoji]}
                </span>
                <p className='text-center'>
                  <span className='text-lg font-semibold'>Reasoning</span>{' '}
                  <br />
                  <span>{loggedMood.reasoning}</span>
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodDisplay;
