import { useState } from 'react';
import { DatePicker } from './DatePicker';
import Heading from './Heading';
import { IoChevronBack } from 'react-icons/io5';
import { IoChevronForward } from 'react-icons/io5';

const MoodDisplay = () => {
  const [date, setDate] = useState<Date>(new Date());

  function decreaseDate() {
    setDate(new Date(date.setDate(date.getDate() - 1)));
  }

  function increaseDate() {
    setDate(new Date(date.setDate(date.getDate() + 1)));
  }

  return (
    <div className='flex flex-col items-center'>
      <Heading className='mb-1 text-2xl'>Mood</Heading>
      <div className='flex items-center gap-3'>
        <span className='text-3xl' onClick={decreaseDate}>
          <IoChevronBack />
        </span>
        <DatePicker date={date} setDate={setDate} />
        <span className='text-3xl' onClick={increaseDate}>
          <IoChevronForward />
        </span>
      </div>
    </div>
  );
};

export default MoodDisplay;
