import { LucideDot } from 'lucide-react';
import { useAuthContext } from '../context/AuthProvider';
import useGetCompletedGoalSets from '../services/goalSetting/getCompletedGoalSets';
import LoadingSpinner from './LoadingSpinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import useGetOngoingGoalSets from '../services/goalSetting/getOngoingGoalSets';
import { Button } from './ui/button';
import useDeleteGoalSet from '../services/goalSetting/deleteGoalSet';
import { useQueryClient } from '@tanstack/react-query';
import { Separator } from './ui/separator';

const GoalSettingSection = () => {
  const { user } = useAuthContext();
  const { data: completedGoalSets, isLoading: isFetchingGoalSets } =
    useGetCompletedGoalSets(user?.id as string);
  const { data: ongoingGoalSets, isLoading: isFetchingOngoingGoalSets } =
    useGetOngoingGoalSets(user?.id as string);
  const { mutate: deleteGoalSet, isLoading: isDeleting } = useDeleteGoalSet();

  const queryClient = useQueryClient();

  function handleDeleteGoalSet(goalSetId: string) {
    deleteGoalSet(goalSetId, {
      onSuccess: () => {
        queryClient.invalidateQueries(['ongoingGoalSets', user?.id]);
      },
    });
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Completed Goal sets</CardTitle>
          <CardDescription>You can find your goal sets here.</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-around'>
          {isFetchingGoalSets && <LoadingSpinner />}
          {completedGoalSets?.length === 0 && (
            <p>You do not have any completed goals sets.</p>
          )}
          {completedGoalSets &&
            completedGoalSets.map((goalSet) => (
              <Card key={goalSet._id}>
                <CardHeader>
                  <CardTitle>{goalSet.goalSetTitle}</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-wrap gap-5'>
                  <div>
                    <p className='font-medium'>
                      {`${new Date(
                        goalSet.startDate
                      ).toDateString()} - ${new Date(
                        goalSet.endDate
                      ).toDateString()}`}
                    </p>
                    <p className='my-3 text-lg font-medium text-center'>
                      {goalSet.goalSetType === 'daily'
                        ? 'Daily Action Plan'
                        : goalSet.goalSetType === 'monthly'
                        ? 'Monthly Action Plan'
                        : goalSet.goalSetType === 'weekly'
                        ? 'Weekly Milestones'
                        : goalSet.goalSetType === 'withinWeek'
                        ? 'Weekly Action Plan'
                        : ''}
                    </p>
                    <div>
                      {goalSet.goals
                        .filter((goal) => goal.day === 1)
                        .map((goal, index) => (
                          <span key={index} className='flex gap-2'>
                            <span className='text-lg'>
                              <LucideDot />
                            </span>
                            <span>{goal.goal}</span>
                          </span>
                        ))}
                    </div>
                  </div>
                  <Separator
                    orientation='vertical'
                    className='hidden h-100 lg:block'
                  />
                  <div>
                    <CardTitle className='text-lg'>
                      Completion statistics
                    </CardTitle>
                    <p className='flex'>
                      <LucideDot />
                      You completed{' '}
                      {(
                        (goalSet.goals.filter(
                          (goal) => goal.completionStatus === true
                        ).length /
                          goalSet.goals.length) *
                        100
                      ).toFixed(2)}
                      {'%'}
                      out of total set goals over the period.
                    </p>
                    <p className='flex'>
                      <LucideDot />
                      On average, you completed{' '}
                      {(
                        goalSet.goals.filter(
                          (goal) => goal.completionStatus === true
                        ).length / goalSet.remindingCount
                      ).toFixed(1)}{' '}
                      goals per reminder.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ongoing goal sets</CardTitle>
          <CardDescription>You can find your goal sets here.</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-wrap items-center justify-around'>
          {isFetchingOngoingGoalSets && <LoadingSpinner />}
          {ongoingGoalSets?.length === 0 && (
            <p>You do not have any ongoing sets.</p>
          )}
          {ongoingGoalSets &&
            ongoingGoalSets.map((goalSet) => (
              <Card key={goalSet._id}>
                <CardHeader>
                  <CardTitle>{goalSet.goalSetTitle}</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-wrap gap-5'>
                  <div>
                    <p className='font-medium'>
                      {`${new Date(
                        goalSet.startDate
                      ).toDateString()} - ${new Date(
                        goalSet.endDate
                      ).toDateString()}`}
                    </p>
                    <p className='my-3 text-lg font-medium text-center'>
                      {goalSet.goalSetType === 'daily'
                        ? 'Daily Action Plan'
                        : goalSet.goalSetType === 'monthly'
                        ? 'Monthly Action Plan'
                        : goalSet.goalSetType === 'weekly'
                        ? 'Weekly Milestones'
                        : goalSet.goalSetType === 'withinWeek'
                        ? 'Weekly Action Plan'
                        : ''}
                    </p>
                    <div>
                      {goalSet.goals
                        .filter((goal) => goal.day === 1)
                        .map((goal, index) => (
                          <span key={index} className='flex gap-2'>
                            <span className='text-lg'>
                              <LucideDot />
                            </span>
                            <span>{goal.goal}</span>
                          </span>
                        ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleDeleteGoalSet(goalSet._id)}
                    variant={'destructive'}
                    size={'sm'}
                    disabled={isDeleting}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </CardContent>
      </Card>
    </>
  );
};

export default GoalSettingSection;
