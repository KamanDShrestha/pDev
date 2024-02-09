import { axiosInstance } from '@/src/constants';
import { QuotesByCategory } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllQuotes() {
  const response = useQuery<QuotesByCategory[]>({
    queryKey: ['quotes'],
    queryFn: () =>
      axiosInstance.get('/quotes/get').then((res) => res.data.data),
  });
  return response;
}
