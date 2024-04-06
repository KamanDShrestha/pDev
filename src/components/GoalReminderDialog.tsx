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
        <DialogContent className='h-[60vh] overflow-scroll'>
          {!goalReminders || goalReminders?.length === 0 ? (
            <div className='flex items-center justify-center'>
              No reminders. Keep up the good work!
            </div>
          ) : (
            <>
              <DialogTitle>Goal reminders</DialogTitle>
              <div className='flex flex-col items-center justify-center h-full gap-5 '>
                {goalReminders &&
                  goalReminders.map((goalReminder, index) => (
                    <Card
                      key={index}
                      className={cn(
                        goalReminder.readStatus
                          ? 'w-full'
                          : 'dark:bg-[#33415c] bg-[#e6e8e6] w-full'
                      )}
                    >
                      <CardContent className='p-2 space-y-3'>
                        <div>
                          <p className='font-medium'>{goalReminder.message}</p>
                          <p className='text-sm'>
                            {new Date(
                              goalReminder.reminderDate
                            ).toLocaleString()}
                          </p>
                        </div>
                        {goalReminder.readStatus ? (
                          <p className='text-xs font-medium'>Acted on</p>
                        ) : (
                          <p
                            className='text-xs font-medium hover:cursor-pointer'
                            onClick={() =>
                              handleUpdateReadStatus(goalReminder._id)
                            }
                          >
                            Read
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GoalReminderDialog;
