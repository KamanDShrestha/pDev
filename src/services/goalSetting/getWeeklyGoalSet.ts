import { GetGoalSetData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetWeeklyGoalSet(userId: string) {
  const response = useQuery<GetGoalSetData>({
    queryKey: ['weeklyGoalSet', userId],
    queryFn: () =>
      axiosInstance
        .get(`/goals/weekly/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
