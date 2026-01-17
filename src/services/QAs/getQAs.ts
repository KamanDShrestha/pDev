import { QAsData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetQAs() {
  const response = useQuery<QAsData[]>({
    queryKey: ['QAs'],
    queryFn: () => axiosInstance.get('/questions').then((res) => res.data.data),
  });
  return response;
}
