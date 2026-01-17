import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetGratitudeJournalCount(userId: string) {
  const response = useQuery<number>({
    queryKey: ['gratitudeJournalCount', userId],
    queryFn: () =>
      axiosInstance
        .get(`/gratitude_journals/count/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
