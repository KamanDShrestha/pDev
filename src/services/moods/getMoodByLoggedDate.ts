import { Mood } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetMoodByLoggedDate(
  userId: string,
  loggedDate: Date
) {
  const response = useQuery<Mood>({
    queryKey: ['moodByLoggedDate', userId, loggedDate],
    queryFn: () =>
      axiosInstance
        .get(`/moods/sort/date/${userId}/${loggedDate}`)
        .then((res) => res.data.data),
  });
  return response;
}
