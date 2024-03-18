import useGetGoalSet from '../services/goalSetting/getGoalSet';
import { useAuthContext } from '../context/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import LoadingSpinner from './LoadingSpinner';

import { TbCheckbox } from 'react-icons/tb';
import { FaCheck } from 'react-icons/fa';

import useCompleteGoal from '../services/goalSetting/completeGoal';

const GoalSet = () => {
  const { user } = useAuthContext();
  const { data: goalSet, isLoading: isFetchingGoalSet } = useGetGoalSet(
    user?.id as string
  );
  const { mutate: completeGoal } = useCompleteGoal();
  console.log(goalSet);

  function updateGoalStatus(goalId: string) {
    completeGoal({ userId: user?.id as string, goalId });
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
                <div className='flex justify-around gap-5'>
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
