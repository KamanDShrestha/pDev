import React, { useEffect, useReducer, useState } from 'react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import profileCompletionSchema from '../schema/profileCompletionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../components/ErrorMessage';
import { useProfileCompletion } from '../services/profileCompletion/useProfileCompletion';

type ProfileCompletion = {
  question: string;
  description: string;
  answers: string[];
};

interface ProfileCompletionAction {
  type: 'ADD_ANSWER';
  payload: {
    question: number;
    answers: string[];
  };
}

const questions = [
  'Tell us about your challenges you would like to overcome.',
  'Tell us about your goals you would like to achieve.',
  'Tell us about your values you admire about yourself.',
];

const descriptions = [
  'include any challenges that you been struggling with for a while. This can be anything from a bad habit to a mental health issue.',
  'include any goals that you would like to achieve. This can be anything from a new skill to a new job.',
  'include any values that you admire about yourself. This can be anything from your work ethic to your kindness.',
];

const initialState = {
  0: { question: questions[0], description: descriptions[0], answers: [''] },
  1: { question: questions[1], description: descriptions[1], answers: [''] },
  2: { question: questions[2], description: descriptions[2], answers: [''] },
};

const reducer = (
  state: { [key: number]: ProfileCompletion },
  action: ProfileCompletionAction
) => {
  switch (action.type) {
    case 'ADD_ANSWER':
      return {
        ...state,
        [action.payload.question]: {
          ...state[action.payload.question],
          answers: action.payload.answers,
        },
      };
    default:
      return state;
  }
};

const NewUser = () => {
  const [personalProfile, dispatch] = useReducer(reducer, initialState);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<z.infer<typeof profileCompletionSchema>>({
    defaultValues: { answer1: '', answer2: '', answer3: '' },
    resolver: zodResolver(profileCompletionSchema),
  });

  const { mutate } = useProfileCompletion();

  useEffect(() => {
    if (currentQuestion === questions.length) return;
    setValue('answer1', personalProfile[currentQuestion].answers[0]);
    setValue('answer2', personalProfile[currentQuestion].answers[1]);
    setValue('answer3', personalProfile[currentQuestion].answers[2]);
  }, [currentQuestion, personalProfile, setValue]);

  console.log(personalProfile);

  function handleBackButton() {
    if (currentQuestion === 0) return;
    setCurrentQuestion((prev) => prev - 1);
  }

  function handleNextButton() {
    if (currentQuestion === questions.length) return;

    dispatch({
      type: 'ADD_ANSWER',
      payload: {
        question: currentQuestion,
        answers: [watch('answer1'), watch('answer2'), watch('answer3')],
      },
    });

    setCurrentQuestion((prev) => prev + 1);
  }

  function handleSubmitButton() {
    console.log('submitted');
    console.log(personalProfile);
    console.log({
      challenges: personalProfile[0].answers,
      goals: personalProfile[1].answers,
      values: personalProfile[2].answers,
    });
    mutate({
      challenges: personalProfile[0].answers,
      goals: personalProfile[1].answers,
      values: personalProfile[2].answers,
    });
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      {questions.length !== currentQuestion ? (
        <Card className='m-5 w-[350px] sm:w-[500px]'>
          <CardHeader>
            <h2 className='text-lg font-semibold sm:text-xl'>
              {personalProfile[currentQuestion].question}
            </h2>
            <CardDescription className='text-xs'>
              {personalProfile[currentQuestion].description}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-5'>
            <div>
              <Input className='rounded-full' {...register('answer1')} />
              {errors.answer1 && (
                <ErrorMessage>{errors.answer1.message}</ErrorMessage>
              )}
            </div>

            <div>
              <Input className='rounded-full' {...register('answer2')} />
              {errors.answer1 && (
                <ErrorMessage>{errors.answer1.message}</ErrorMessage>
              )}
            </div>

            <div>
              <Input className='rounded-full' {...register('answer3')} />
              {errors.answer1 && (
                <ErrorMessage>{errors.answer1.message}</ErrorMessage>
              )}
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button onClick={handleBackButton}>Back</Button>

            <Button onClick={handleSubmit(handleNextButton)}>Next</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <p>Would you like to save your preferences?</p>
          </CardHeader>
          <CardFooter className='flex justify-between'>
            <Button onClick={handleBackButton}>Back</Button>
            <Button onClick={handleSubmit(handleSubmitButton)}>Submit</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default NewUser;
