import { axiosInstance } from '../../constants';
import { Mood } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetTodayMood(userId: string) {
  const response = useQuery<Mood>({
    queryKey: ['todayMood', userId],
    queryFn: () =>
      axiosInstance
        .get(`/moods/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
