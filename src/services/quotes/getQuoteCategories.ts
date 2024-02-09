import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetQuoteCategories() {
  const response = useQuery<string[]>({
    queryKey: ['quoteCategories'],
    queryFn: () =>
      axiosInstance.get('/quotes/categories').then((res) => res.data.data),
  });
  return response;
}
