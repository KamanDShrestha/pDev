import { axiosInstance } from '../../constants';
import { GoalSet } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetCompletedGoalSets(userId: string) {
  const response = useQuery<GoalSet[]>({
    queryKey: ['completedGoalSets', userId],
    queryFn: () =>
      axiosInstance
        .get(`/goalSetting/get/completedGoalSets/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
