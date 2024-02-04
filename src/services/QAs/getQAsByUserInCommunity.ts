import { axiosInstance } from '../../constants';
import { QAsData } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetQAsByUserInCommunity(
  communityId: string,
  userId: string
) {
  const response = useQuery<QAsData>({
    queryKey: ['QAs', communityId, userId],
    queryFn: () =>
      axiosInstance
        .get(`/QAs/get/${communityId}/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
