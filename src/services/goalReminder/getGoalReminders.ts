import { GoalReminder } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetGoalReminder(userId: string) {
  const response = useQuery<GoalReminder[]>({
    queryKey: ['goalReminders', userId],
    queryFn: () =>
      axiosInstance
        .get(`/goal_reminders/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
