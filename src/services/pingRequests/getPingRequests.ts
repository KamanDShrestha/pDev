import { axiosInstance } from '@/src/constants';
import { PingRequest } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetPingRequests(userId: string) {
  const response = useQuery<PingRequest>({
    queryKey: ['pingRequests', userId],
    queryFn: () =>
      axiosInstance
        .get(`/ping_requests/${userId}`)
        .then((response) => response.data.data),
  });
  return response;
}
