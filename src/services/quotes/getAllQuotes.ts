import { axiosInstance } from '../../constants';
import { QuotesByCategory } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllQuotes() {
  const response = useQuery<QuotesByCategory[]>({
    queryKey: ['quotes'],
    queryFn: () =>
      axiosInstance.get('/quotes').then((res) => res.data.data),
  });
  return response;
}
