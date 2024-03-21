import { useAuthContext } from '../context/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import LoadingSpinner from './LoadingSpinner';

import { TbCheckbox } from 'react-icons/tb';
import { FaCheck } from 'react-icons/fa';

import useCompleteGoal from '../services/goalSetting/completeGoal';
import { useQueryClient } from '@tanstack/react-query';
import useGetDailyGoalSet from '../services/goalSetting/getDailyGoalSet';

const GoalSet = () => {
  const { user } = useAuthContext();
  const { data: goalSet, isLoading: isFetchingGoalSet } = useGetDailyGoalSet(
    user?.id as string
  );
  const { mutate: completeGoal } = useCompleteGoal();
  const queryClient = useQueryClient();
  console.log(goalSet);

  function updateGoalStatus(goalId: string) {
    completeGoal(
      { userId: user?.id as string, goalId, goalSetType: 'daily' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['goalSet', user?.id as string]);
        },
      }
    );
  }

  return (
    <>
      {isFetchingGoalSet && <LoadingSpinner />}

      <Card>
        <CardHeader>
          <CardTitle className='text-3xl'>Daily goal reminder</CardTitle>
        </CardHeader>

        {goalSet === null && <p>You have not set any goal</p>}
        {goalSet &&
          (typeof goalSet === 'string' ? (
            <p>{goalSet}</p>
          ) : (
            goalSet && (
              <CardContent className='space-y-3'>
                <CardTitle>{goalSet.goalSetTitle}</CardTitle>
                <div className='flex flex-wrap justify-around gap-5'>
                  {goalSet.goals.map((goal, index) => (
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
    </>
  );
};

export default GoalSet;
