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

const AddGoalReminderSection = () => {
  const [numberOfGoals, setNumberOfGoals] = useState(5);
  const { register, handleSubmit } = useForm();
  const { mutate: addGoalSet } = useAddGoalSet();
  const { user } = useAuthContext();

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
      startDate: new Date(),
      remindingDays: 5,
      goals: Array.from({ length: numberOfGoals }, (_, index) => {
        return { goal: data[`goal${index + 1}`] };
      }),
    });
  }

  return (
    <>
      {/* Provided goal set card */}
      <div></div>

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
          <Button onClick={handleSubmit(handleAddGoalSet)}>Add my goals</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default AddGoalReminderSection;
