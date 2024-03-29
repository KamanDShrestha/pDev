import { useAuthContext } from '../context/AuthProvider';
import useGetGoalReminder from '../services/goalReminder/getGoalReminders';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { navigationMenuTriggerStyle } from './ui/navigation-menu';

const GoalReminderDialog = () => {
  const { user } = useAuthContext();
  const { data: goalReminders } = useGetGoalReminder(user?.id as string);
  console.log(goalReminders);

  return (
    <>
      <Dialog>
        <DialogTrigger className={navigationMenuTriggerStyle()}>
          Reminder
        </DialogTrigger>
        <DialogContent>hello</DialogContent>
      </Dialog>
    </>
  );
};

export default GoalReminderDialog;
