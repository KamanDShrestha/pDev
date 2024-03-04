import { Quote } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetRandomQuoteForMood(mood: number) {
  const response = useQuery<Quote>({
    queryKey: ['randomQuote', mood],
    queryFn: () => {
      let moodDetails = '';

      if (mood === 1 || mood === 2) moodDetails = 'low';
      if (mood === 3) moodDetails = 'neutral';
      if (mood === 4 || mood === 5) moodDetails = 'high';

      const result = axiosInstance
        .get(`/quotes/quoteForMood/${moodDetails}`)
        .then((res) => res.data.data);
      return result;
    },
  });
  return response;
}
