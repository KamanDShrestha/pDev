import { axiosInstance } from '../../constants';
import { GoalSet } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetCompletedGoalSets(userId: string) {
  const response = useQuery<GoalSet[]>({
    queryKey: ['completedGoalSets', userId],
    queryFn: () =>
      axiosInstance
        .get(`/goals/completed/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
