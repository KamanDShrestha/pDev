import { useState } from 'react';

import Heading from './Heading';
import { Textarea } from './ui/textarea';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { useAuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import ErrorMessage from './ErrorMessage';
import useLogMood from '../services/moods/logMood';
import useUpdateLoggedMood from '../services/users/updateLoggedMood';
import setToLocalStorage from '../services/localStorage/setToLocalStorage';
import { Separator } from './ui/separator';
import { moods } from '../constants';

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
  const { mutate } = useLogMood();
  const { mutate: updateMood } = useUpdateLoggedMood();
  const { user, setUser } = useAuthContext();

  function handleMoodSelection(index: number) {
    setSelectedMood(index);
  }

  function handleMoodSave(data: FieldValues) {
    if (selectedMood < 0) return toast.error('Please select a mood');

    console.log({
      userId: user?.id,
      mood: {
        mood: moods[selectedMood].score,
        loggedDate: Date.now().toLocaleString(),
        reasoning: register('reasoning'),
      },
    });

    mutate(
      {
        userId: user?.id as string,
        mood: {
          mood: moods[selectedMood].score,
          loggedDate: new Date(),
          reasoning: data.reasoning,
        },
      },
      {
        onSuccess: () => {
          handleModalClose();
          updateMood({ userId: user?.id as string });
          setUser &&
            setUser((currentUser) => {
              const updatedUser = {
                ...currentUser,
                loggedMood: true,
              };
              setToLocalStorage('authentication', updatedUser);
              return updatedUser;
            });
        },
      }
    );
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
          <Separator className='my-1' />
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
          <Separator className='my-1' />
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
              minLength: {
                value: 10,
                message: 'Reasoning must have at least 10 characters',
              },

              maxLength: {
                value: 100,
                message: 'Reasoning must have at most 100 characters',
              },
              validate: {
                notOnlyWhitespace: (value) =>
                  value.trim().length >= 10 || 'This cannot be only whitespace',
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
