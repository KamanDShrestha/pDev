import { FaCheck } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthProvider';
import useGetWeeklyGoalSet from '../services/goalSetting/getWeeklyGoalSet';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { TbCheckbox } from 'react-icons/tb';
import { useQueryClient } from '@tanstack/react-query';
import useCompleteGoal from '../services/goalSetting/completeGoal';

const WeeklyGoalSet = () => {
  const { user } = useAuthContext();
  const { data: weeklyGoalSet } = useGetWeeklyGoalSet(user?.id as string);
  console.log('weekly goal set', weeklyGoalSet);
  const { mutate: completeGoal } = useCompleteGoal();

  const queryClient = useQueryClient();

  function updateGoalStatus(goalId: string) {
    completeGoal(
      { userId: user?.id as string, goalId, goalSetType: 'weekly' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['weeklyGoalSet', user?.id as string]);
        },
      }
    );
  }

  return (
    <>
      {weeklyGoalSet !== null ? (
        <Card>
          <CardHeader>
            <CardTitle>Weekly Goal Reminder</CardTitle>
            <CardDescription>Your weekly goal set</CardDescription>
          </CardHeader>

          {weeklyGoalSet === null && <p>You have not set any goal</p>}
          {weeklyGoalSet &&
            (typeof weeklyGoalSet === 'string' ? (
              <p>{weeklyGoalSet}</p>
            ) : (
              weeklyGoalSet && (
                <CardContent className='space-y-3'>
                  <CardTitle>{weeklyGoalSet.goalSetTitle}</CardTitle>
                  <div className='flex flex-wrap justify-around gap-5'>
                    {weeklyGoalSet.goals.map((goal, index) => (
                      <Card key={index}>
                        <CardContent className='p-3 max-w-[400px] flex flex-col items-center'>
                          <span className='text-2xl'>
                            {goal.completionStatus ? (
                              <FaCheck />
                            ) : (
                              <span
                                className='hover:cursor-pointer'
                                onClick={() => updateGoalStatus(goal._id)}
                              >
                                <TbCheckbox />
                              </span>
                            )}
                          </span>
                          <span className='font-medium'>{goal.goal}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              )
            ))}
        </Card>
      ) : null}
    </>
  );
};

export default WeeklyGoalSet;
