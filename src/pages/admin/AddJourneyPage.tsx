import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import InputFieldLabel from '../../components/InputFieldLabel';
import { Input } from '../../components/ui/input';
import ErrorMessage from '../../components/ErrorMessage';
const AddJourneyPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [numberOfActionSteps, setNumberOfActionSteps] = useState(10);

  const providedName = watch('journeyName');

  function handleJourneySubmit() {
    console.log('clicked');
  }

  return (
    <div className='flex flex-col items-center justify-center w-screen min-h-screen gap-10 overflow-scroll'>
      <div className='w-[350px] sm:w-[400px] h-[200px] bg-slate-100'>
        Preview
      </div>
      <div className='flex flex-wrap items-center justify-around gap-5'>
        <Card>
          <CardHeader>
            <CardTitle>Add new journey for the users !</CardTitle>
            <CardDescription>
              Through this, add new journeys for the users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleJourneySubmit)}>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='journeyName'
                  hasContent={
                    providedName !== undefined && providedName?.length !== 0
                  }
                >
                  Journey Name
                </InputFieldLabel>
                <Input {...register('journeyName')} type='text' />
                {errors.journeyName && (
                  <ErrorMessage>
                    {errors.journeyName?.message as string}
                  </ErrorMessage>
                )}
              </div>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='journeyDescription'
                  hasContent={
                    providedName !== undefined && providedName?.length !== 0
                  }
                >
                  Journey Description
                </InputFieldLabel>
                <Input {...register('journeyDescription')} type='text' />
                {errors.journeyDescription && (
                  <ErrorMessage>
                    {errors.journeyDescription.message as string}
                  </ErrorMessage>
                )}
              </div>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='journeyImportance'
                  hasContent={
                    providedName !== undefined && providedName?.length !== 0
                  }
                >
                  Journey Importance
                </InputFieldLabel>
                <Input {...register('journeyImportance')} type='text' />
                {errors.journeyImportance && (
                  <ErrorMessage>
                    {errors.journeyImportance.message as string}
                  </ErrorMessage>
                )}
              </div>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='journeyUsages'
                  hasContent={
                    providedName !== undefined && providedName?.length !== 0
                  }
                >
                  Journey Usages
                </InputFieldLabel>
                <Input {...register('journeyUsages')} type='text' />
                {errors.journeyUsages && (
                  <ErrorMessage>
                    {errors.journeyUsages.message as string}
                  </ErrorMessage>
                )}
              </div>
              <div className='relative group'>
                <InputFieldLabel
                  htmlFor='journeyQuotes'
                  hasContent={
                    providedName !== undefined && providedName?.length !== 0
                  }
                >
                  Journey Quotes
                </InputFieldLabel>
                <Input {...register('journeyQuotes')} type='text' />
                {errors.journeyQuotes && (
                  <ErrorMessage>
                    {errors.journeyQuotes.message as string}
                  </ErrorMessage>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add action steps for the journey</CardTitle>
          </CardHeader>
          <CardContent>
            {Array.from(Array(numberOfActionSteps)).map((_, index) => (
              <p>{index + 1}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddJourneyPage;
