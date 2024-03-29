import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthProvider';
import { cn } from '../lib/utils';
import useGetGoalReminder from '../services/goalReminder/getGoalReminders';
import useUpdateReadStatus from '../services/goalReminder/updateReadStatus';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { navigationMenuTriggerStyle } from './ui/navigation-menu';
import { IoAlert } from 'react-icons/io5';

const GoalReminderDialog = () => {
  const { user } = useAuthContext();
  const { data: goalReminders } = useGetGoalReminder(user?.id as string);
  console.log(goalReminders);
  const { mutate: updateReadStatus } = useUpdateReadStatus();

  const queryClient = useQueryClient();
  function handleUpdateReadStatus(id: string) {
    updateReadStatus(
      { reminderId: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['goalReminders', user?.id]);
        },
      }
    );
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className={navigationMenuTriggerStyle()}>
          Reminder
          {goalReminders &&
            goalReminders.filter((goalReminders) => !goalReminders.readStatus)
              .length > 0 && (
              <span className='text-lg text-red-500'>
                <IoAlert />
              </span>
            )}
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Goal reminders</DialogTitle>{' '}
          <div className='h-[60vh] overflow-scroll flex flex-col gap-5 justify-center items-center'>
            {(!goalReminders || goalReminders?.length === 0) &&
              'No reminders for today. Keep up the good work!'}
            {goalReminders &&
              goalReminders.map((goalReminder, index) => (
                <Card
                  key={index}
                  className={cn(
                    goalReminder.readStatus
                      ? ''
                      : 'dark:bg-[#33415c] bg-[#e6e8e6]'
                  )}
                >
                  <CardContent className='p-2 space-y-3'>
                    <p>{goalReminder.message}</p>
                    {goalReminder.readStatus ? null : (
                      <p
                        className='text-xs hover:cursor-pointer'
                        onClick={() => handleUpdateReadStatus(goalReminder._id)}
                      >
                        Read
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GoalReminderDialog;
