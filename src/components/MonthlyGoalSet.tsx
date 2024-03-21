import { FaCheck } from 'react-icons/fa';
import { TbCheckbox } from 'react-icons/tb';
import { useAuthContext } from '../context/AuthProvider';
import useGetMonthlyGoalSet from '../services/goalSetting/getMonthlyGoalSet';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import useCompleteGoal from '../services/goalSetting/completeGoal';
import { useQueryClient } from '@tanstack/react-query';

const MonthlyGoalSet = () => {
  const { user } = useAuthContext();
  const { data: monthlyGoalSet } = useGetMonthlyGoalSet(user?.id as string);
  const { mutate: completeGoal } = useCompleteGoal();

  const queryClient = useQueryClient();

  function updateGoalStatus(goalId: string) {
    completeGoal(
      { userId: user?.id as string, goalId, goalSetType: 'monthly' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['monthlyGoalSet', user?.id as string]);
        },
      }
    );
  }

  return (
    <>
      {monthlyGoalSet !== null ? (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Goal Reminder</CardTitle>
            <CardDescription>Your monthly goal set</CardDescription>
          </CardHeader>

          {monthlyGoalSet &&
            (typeof monthlyGoalSet === 'string' ? (
              <p>{monthlyGoalSet}</p>
            ) : (
              monthlyGoalSet && (
                <CardContent className='space-y-3'>
                  <CardTitle>{monthlyGoalSet.goalSetTitle}</CardTitle>
                  <div className='flex flex-wrap justify-around gap-5'>
                    {monthlyGoalSet.goals.map((goal, index) => (
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

export default MonthlyGoalSet;
