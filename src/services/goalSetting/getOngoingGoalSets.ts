import { axiosInstance } from '../../constants';
import { GoalSet } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetOngoingGoalSets(userId: string) {
  const response = useQuery<GoalSet[]>({
    queryKey: ['ongoingGoalSets', userId],
    queryFn: () =>
      axiosInstance
        .get(`/goalSetting/get/ongoingGoalSets/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
