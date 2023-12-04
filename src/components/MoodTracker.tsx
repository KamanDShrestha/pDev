import { useState } from 'react';

import Heading from './Heading';
import { Textarea } from './ui/textarea';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { useAuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import ErrorMessage from './ErrorMessage';

interface MoodTrackerProps {
  handleModalClose: () => void;
}

const MoodTracker = ({ handleModalClose }: MoodTrackerProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedMood, setSelectedMood] = useState(-1);
  const { user } = useAuthContext();
  const moods = [
    { mood: 'Terrible', emoji: '😰', score: 1 },
    { mood: 'Bad', emoji: '👎', score: 2 },
    { mood: 'Alright', emoji: '🙂', score: 3 },
    { mood: 'Good', emoji: '😁', score: 4 },
    { mood: 'Fantastic', emoji: '🥳', score: 5 },
  ];

  function handleMoodSelection(index: number) {
    setSelectedMood(index);
  }

  function handleMoodSave() {
    if (selectedMood < 0) return toast.error('Please select a mood');

    console.log({
      userId: user?.id,
      mood: {
        mood: moods[selectedMood].score,
        loggedDate: Date.now().toLocaleString(),
        reasoning: register('reasoning'),
      },
    });
  }
  return (
    <>
      <div className='relative space-y-5 border rounded-xl max-w-[500px] p-5 shadow-lg  bg-stone-50 dark:bg-slate-900'>
        <span
          className='absolute top-4 right-5 hover:cursor-pointer'
          onClick={handleModalClose}
        >
          X
        </span>
        <div>
          <Heading className='mb-3 text-2xl'>How's your mood today?</Heading>
          <div className='flex flex-wrap justify-center gap-5'>
            {moods.map((mood, index) => (
              <div
                className={`flex flex-col items-center ${
                  selectedMood === index &&
                  'border-2 border-slate-600 dark:border-white rounded-xl'
                } p-3 cursor-pointer`}
                key={index}
                onClick={() => handleMoodSelection(index)}
              >
                <span className='text-xl font-medium'>{mood.mood}</span>
                <span className='text-3xl'>{mood.emoji}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className='text-lg font-medium'>
            State your reasoning for your mood today. Reflect on that.
          </label>
          <Textarea
            placeholder='Your reasoning...'
            {...register('reasoning', {
              required: {
                value: true,
                message: 'Please provide valid reasoning for your mood',
              },
            })}
          />
          {errors.reasoning && (
            <ErrorMessage>{errors.reasoning.message as string}</ErrorMessage>
          )}
        </div>
        <Button onClick={handleSubmit(handleMoodSave)}>Save</Button>
      </div>
    </>
  );
};

export default MoodTracker;
