import { GetGoalSetData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetMonthlyGoalSet(userId: string) {
  const response = useQuery<GetGoalSetData>({
    queryKey: ['monthlyGoalSet', userId],
    queryFn: () =>
      axiosInstance
        .get(`/goalSetting/getMonthlyGoalSet/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
