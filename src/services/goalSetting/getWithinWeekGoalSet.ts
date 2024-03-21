import { GetGoalSetData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetWithinWeekGoalSet(userId: string) {
  const response = useQuery<GetGoalSetData>({
    queryKey: ['withinWeekGoalSet', userId],
    queryFn: () =>
      axiosInstance
        .get(`/goalSetting/getWithinWeekGoalSet/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
