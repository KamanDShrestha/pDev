import { Quote } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetQuotesByCategory(category: string) {
  const response = useQuery<Quote[]>({
    queryKey: ['quotes', category],
    queryFn: () =>
      axiosInstance.get(`/quotes/get/${category}`).then((res) => res.data.data),
  });
  return response;
}
