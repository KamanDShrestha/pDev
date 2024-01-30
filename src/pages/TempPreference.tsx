import { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';

import useAddPreferredJourney from '../services/journey/addPreferredJourney';
import { useAuthContext } from '../context/AuthProvider';
import { set } from 'react-hook-form';
import setToLocalStorage from '../services/localStorage/setToLocalStorage';
import getFromLocalStorage from '../services/localStorage/getFromLocalStorage';

const journeyCategories = [
  'Mindfulness',
  'Stoicism',
  'Personal Productivity',
  'Mindset',
  'Beating Procrastination',
];

// const journeyDescriptions = [
//   "Mindfulness is the psychological process of purposely bringing one's attention to experiences occurring in the present moment without judgment, which one can develop through the practice of meditation and through other training.",
//   'Stoicism is a school of Hellenistic philosophy founded by Zeno of Citium in Athens in the early 3rd century BC. It is a philosophy of personal ethics informed by its system of logic and its views on the natural world.',
//   'Personal Productivity is a goal-oriented approach to getting things done (GTD) that brings together the best practices and technology tips to help you work smarter instead of harder.',
//   "Mindset is a set of assumptions, methods, or notations held by one or more people or groups of people. A mindset can also be seen as arising out of a person's world view or philosophy of life.",
//   'Procrastination is the action of delaying or postponing something. It is a common human experience involving delay in everyday chores or even putting off salient tasks such as attending an appointment, submitting a job report or academic assignment, or broaching a stressful issue with a partner.',
// ];

const journeyUsages = [
  'Mindfulness is a great way to start your day. It helps you to be more present and aware of your surroundings, which can help you feel less stressed and more focused.',
  'Stoicism is a philosophy that teaches us to focus on what we can control and let go of the rest. It teaches us to be mindful of our thoughts, emotions, and actions so that we can live a more fulfilling life.',
  'Personal Productivity is a way to get more done in less time. It’s about being efficient and effective with your time, energy, and attention.',
  'Mindset is a way of thinking that can help you achieve your goals. It’s about believing in yourself and having the confidence to take risks.',
  'Procrastination is a common problem that many people struggle with. It can be hard to get started on a task, and it’s easy to put off tasks until the last minute. But procrastination can have serious consequences for your health, relationships, and career.',
];

const TempPreference = () => {
  const { user, setUser } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const { mutate } = useAddPreferredJourney();
  function handleSelection(index: number) {
    setSelectedCategory(() => index);
  }

  function handleSubmit() {
    console.log(journeyCategories[selectedCategory]);
    mutate(journeyCategories[selectedCategory], {
      onSuccess: () => {
        setUser &&
          setUser((prev) => ({
            ...prev,
            preferredJourney: journeyCategories[selectedCategory],
          }));
        setToLocalStorage('authentication', {
          ...(getFromLocalStorage('authentication') as {
            [key: string]: string;
          }),
          preferredJourney: journeyCategories[selectedCategory],
        });
      },
    });
  }
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div>
        <h2 className='text-xl font-semibold'>
          Choose your preferred journey:
        </h2>
        <div className='flex flex-col'>
          {journeyCategories.map((category, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={cn(
                      'p-4 m-3 space-x-4 border border-b rounded-full hover:cursor-pointer text-left',
                      selectedCategory === index && 'bg-gray-800 text-white'
                    )}
                    key={index}
                    onClick={() => handleSelection(index)}
                  >
                    <span>{index + 1}.</span>
                    <span>{category}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={0}>
                  <div className='p-2 text-sm text-center w-[300px]'>
                    {journeyUsages[index]}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
