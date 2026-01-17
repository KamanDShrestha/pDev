import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetTotalNumberOfUsers() {
  const response = useQuery<number>({
    queryKey: ['totalNumberOfUsers'],
    queryFn: () =>
      axiosInstance.get('/users/total').then((res) => res.data.data),
  });
  return response;
}
