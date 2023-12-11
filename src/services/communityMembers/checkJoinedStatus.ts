import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useCheckJoinedStatus(
  communityId: string,
  userId: string
) {
  const response = useQuery<boolean>({
    queryKey: ['joinedStatus', communityId, userId],
    queryFn: () =>
      axiosInstance
        .get(`/communityMembers/hasJoined/${communityId}/${userId}`)
        .then((res) => res.data.status),
  });
  return response;
}
