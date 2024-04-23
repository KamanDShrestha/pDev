import { useEffect, useReducer, useState } from 'react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { FieldValues, useForm } from 'react-hook-form';
import * as z from 'zod';
import profileCompletionSchema from '../schema/profileCompletionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../components/ErrorMessage';
import { useProfileCompletion } from '../services/profileCompletion/useProfileCompletion';
import { useAuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useUpdateUserDOB from '../services/users/updateUserDOB';
import setToLocalStorage from '../services/localStorage/setToLocalStorage';
import getFromLocalStorage from '../services/localStorage/getFromLocalStorage';
import useDocumentTitle from '../services/getTitle';

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
  const { user, setUser } = useAuthContext();
  const [hasDOB, setHasDOB] = useState(user?.dateOfBirth !== null);
  const navigate = useNavigate();
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

  const {
    register: DOBForm,
    handleSubmit: handleDOBSubmit,
    formState: { errors: DOBErrors },
  } = useForm();

  const { mutate } = useProfileCompletion();
  const { mutate: updateDOB } = useUpdateUserDOB();

  useDocumentTitle('Complete Profile - SelfSync');

  useEffect(() => {
    if (!user?.isNewUser) navigate('/home');
  }, [navigate, user?.isNewUser]);

  useEffect(() => {
    if (currentQuestion === questions.length) return;
    setValue('answer1', personalProfile[currentQuestion].answers[0]);
    setValue('answer2', personalProfile[currentQuestion].answers[1]);
    setValue('answer3', personalProfile[currentQuestion].answers[2]);
  }, [currentQuestion, personalProfile, setValue]);

  useEffect(() => {
    if (user?.dateOfBirth === null) {
      setHasDOB(false);
    } else {
      setHasDOB(true);
    }
  }, [user?.dateOfBirth]);

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

  function handleDOBSubmission(data: FieldValues) {
    updateDOB(
      { userId: user?.id as string, dob: data.dateOfBirth },
      {
        onSuccess: () => {
          setUser &&
            setUser((prev) => ({ ...prev, dateOfBirth: data.dateOfBirth }));
          setToLocalStorage('authentication', {
            ...(getFromLocalStorage('authentication') as {
              [key: string]: string;
            }),
            dateOfBirth: data.dateOfBirth,
          });
        },
      }
    );
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      {!hasDOB ? (
        <Card>
          <CardHeader>
            <CardTitle>Provide your date of birth: </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type='date'
              {...DOBForm('dateOfBirth', {
                required: {
                  value: true,
                  message: 'Please provide your date of birth',
                },
                validate: {
                  isDateOfBirthValid: (value) => {
                    const date = new Date(value);
                    const currentDate = new Date();
                    const age = currentDate.getFullYear() - date.getFullYear();
                    if (age < 13) {
                      return 'You must be at least 13 years old to register';
                    }
                    return true;
                  },
                },
              })}
            />
            {DOBErrors.dateOfBirth && (
              <ErrorMessage>
                {DOBErrors.dateOfBirth.message as string}
              </ErrorMessage>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleDOBSubmit(handleDOBSubmission)}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : questions.length !== currentQuestion ? (
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
              <Input
                className='rounded-full'
                {...register('answer1', {
                  required: 'Please provide an answer',
                  minLength: {
                    value: 20,
                    message: 'Answer must have at least 20 characters',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Answer must have at most 200 characters',
                  },
                  validate: {
                    notOnlyWhitespace: (value) =>
                      value.trim().length >= 20 ||
                      'This cannot be only whitespace',
                  },
                })}
              />

              {errors.answer1 && (
                <ErrorMessage>{errors.answer1.message}</ErrorMessage>
              )}
            </div>

            <div>
              <Input
                className='rounded-full'
                {...register('answer2', {
                  required: 'Please provide an answer',
                  minLength: {
                    value: 20,
                    message: 'Answer must have at least 20 characters',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Answer must have at most 200 characters',
                  },
                  validate: {
                    notOnlyWhitespace: (value) =>
                      value.trim().length >= 20 ||
                      'This cannot be only whitespace',
                  },
                })}
              />
              {errors.answer2 && (
                <ErrorMessage>{errors.answer2.message}</ErrorMessage>
              )}
            </div>

            <div>
              <Input
                className='rounded-full'
                {...register('answer3', {
                  required: 'Please provide an answer',
                  minLength: {
                    value: 20,
                    message: 'Answer must have at least 20 characters',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Answer must have at most 200 characters',
                  },
                  validate: {
                    notOnlyWhitespace: (value) =>
                      value.trim().length >= 20 ||
                      'This cannot be only whitespace',
                  },
                })}
              />
              {errors.answer3 && (
                <ErrorMessage>{errors.answer3.message}</ErrorMessage>
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
