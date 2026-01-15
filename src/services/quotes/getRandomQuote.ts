import { Quote } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetRandomQuote(category: string) {
  const response = useQuery<Quote>({
    queryKey: ['quotes', 'randomQuote', category],
    queryFn: () =>
      axiosInstance
        .get(`/quotes/random/${category}`)
        .then((res) => res.data.data),
  });
  return response;
}
