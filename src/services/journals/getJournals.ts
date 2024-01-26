import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

type FetchQueryJournal = {
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
};
export default function useGetJournals(
  userId: string,
  fetchQueryJournal?: FetchQueryJournal
) {
  const response = useQuery({
    queryKey: ['journals', userId, fetchQueryJournal],
    queryFn: () =>
      axiosInstance
        .get(`/journals/get/${userId}`, {
          params: {
            category: fetchQueryJournal?.category,
          },
        })
        .then((res) => res.data),
  });
  return response;
}
