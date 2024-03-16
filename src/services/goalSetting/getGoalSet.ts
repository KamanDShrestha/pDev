import { GetGoalSetData } from '@/src/types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetGoalSet(userId: string) {
  const response = useQuery<GetGoalSetData>({
    queryKey: ['goalSet', userId],
    queryFn: () =>
      axiosInstance
        .get(`/goalSetting/getGoalSet/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
