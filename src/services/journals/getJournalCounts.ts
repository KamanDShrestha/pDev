import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetJournalCount(userId: string) {
  const response = useQuery<number>({
    queryKey: ['journalCount', userId],
    queryFn: () =>
      axiosInstance
        .get(`/journals/count/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
