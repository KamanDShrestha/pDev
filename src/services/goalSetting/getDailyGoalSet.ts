import { GetGoalSetData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetDailyGoalSet(userId: string) {
  const response = useQuery<GetGoalSetData>({
    queryKey: ['goalSet', userId],
    queryFn: () =>
      axiosInstance
        .get(`/goalSetting/getDailyGoalSet/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
