import { axiosInstance } from '@/src/constants';
import { PingUsers } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetPings(userId: string) {
  const response = useQuery<PingUsers[]>({
    queryKey: ['pings', userId],
    queryFn: () =>
      axiosInstance
        .get(`/pings/${userId}`)
        .then((response) => response.data.data),
  });
  return response;
}
