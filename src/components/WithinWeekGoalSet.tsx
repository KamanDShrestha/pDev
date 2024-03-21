import { FaCheck } from 'react-icons/fa';
import { TbCheckbox } from 'react-icons/tb';
import { useAuthContext } from '../context/AuthProvider';
import useGetWithinWeekGoalSet from '../services/goalSetting/getWithinWeekGoalSet';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useQueryClient } from '@tanstack/react-query';
import useCompleteGoal from '../services/goalSetting/completeGoal';

const WithinWeekGoalSet = () => {
  const { user } = useAuthContext();
  const { data: withinWeekGoalSet } = useGetWithinWeekGoalSet(
    user?.id as string
  );

  const queryClient = useQueryClient();

  const { mutate: completeGoal } = useCompleteGoal();

  function updateGoalStatus(goalId: string) {
    completeGoal(
      { userId: user?.id as string, goalId, goalSetType: 'withinWeek' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            'withinWeekGoalSet',
            user?.id as string,
          ]);
        },
      }
    );
  }

  return (
    <>
      {withinWeekGoalSet !== null ? (
        <Card>
          <CardHeader>
            <CardTitle>Within Week Goal Reminder</CardTitle>
            <CardDescription>Your within week goal set</CardDescription>
          </CardHeader>

          {withinWeekGoalSet &&
            (typeof withinWeekGoalSet === 'string' ? (
              <p>{withinWeekGoalSet}</p>
            ) : (
              withinWeekGoalSet && (
                <CardContent className='space-y-3'>
                  <CardTitle>{withinWeekGoalSet.goalSetTitle}</CardTitle>
                  <div className='flex flex-wrap justify-around gap-5'>
                    {withinWeekGoalSet.goals.map((goal, index) => (
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

export default WithinWeekGoalSet;
