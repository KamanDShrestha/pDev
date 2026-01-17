import { axiosInstance } from '@/src/constants';
import { useQuery } from '@tanstack/react-query';

export default function useObtainPingStatus({
  statusOfId,
  statusForId,
}: {
  statusOfId: string;
  statusForId: string;
}) {
  const response = useQuery<string>({
    queryKey: ['pingStatus', statusForId, statusOfId],
    queryFn: () =>
      axiosInstance
        .get(`/pings/status/${statusForId}/${statusOfId}`)
        .then((response) => response.data.data),
  });
  return response;
}
