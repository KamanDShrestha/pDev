import { axiosInstance } from '../../constants';
import { ApplicationData } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetSpecificApplication(userId: string) {
  const response = useQuery<ApplicationData[]>({
    queryKey: ['getSpecificApplication', userId],
    queryFn: () =>
      axiosInstance
        .get(`/qhpPost/getSpecificApplication/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
