import { QhpDetails } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetQhpDetails(userId: string) {
  const response = useQuery<QhpDetails>({
    queryKey: ['qhpDetails', userId],
    queryFn: () =>
      axiosInstance.get(`/qhps/${userId}`).then((res) => res.data.data),
  });
  return response;
}
