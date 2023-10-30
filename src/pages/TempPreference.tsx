import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import useAddPreferredJourney from '../services/journey/addPreferredJourney';

const journeyCategories = [
  'Mindfulness',
  'Stoicism',
  'Personal Productivity',
  'Mindset',
  'Beating Procrastination',
];

const TempPreference = () => {
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const { mutate } = useAddPreferredJourney();
  function handleSelection(index: number) {
    setSelectedCategory(() => index);
  }

  function handleSubmit() {
    console.log(journeyCategories[selectedCategory]);
    mutate(journeyCategories[selectedCategory]);
  }
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div>
        <h2 className='text-xl font-semibold'>
          Choose your preferred journey:
        </h2>
        <div>
          {journeyCategories.map((category, index) => (
            <div
              className={cn(
                'p-4 m-3 space-x-4 border border-b rounded-full hover:cursor-pointer',
                selectedCategory === index && 'bg-gray-800 text-white'
              )}
              key={index}
              onClick={() => handleSelection(index)}
            >
              <span>{index + 1}.</span>
              <span>{category}</span>
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          <Button className='mt-4' onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TempPreference;
