import { axiosInstance } from '../../constants';
import { CommunityData } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetSpecificCommunity(communityId: string) {
  const response = useQuery<CommunityData>({
    queryKey: ['community', communityId],
    queryFn: () =>
      axiosInstance
        .get(`/communities/${communityId}`)
        .then((res) => res.data.data),
  });
  return response;
}
