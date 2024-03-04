import { Quote } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetRandomQuoteForMood(mood: string) {
  const response = useQuery<Quote>({
    queryKey: ['randomQuote', mood],
    queryFn: () =>
      axiosInstance
        .get(`/quotes/quoteForMood/${mood}`)
        .then((res) => res.data.data),
  });
  return response;
}
