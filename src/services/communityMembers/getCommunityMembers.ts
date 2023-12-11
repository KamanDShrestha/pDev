import { axiosInstance } from '../../constants';
import { CommunityMemberData } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetCommunityMembers(communityId: string) {
  const response = useQuery<CommunityMemberData>({
    queryKey: ['communityMembers', communityId],
    queryFn: () =>
      axiosInstance
        .get(`/communityMembers/get/${communityId}`)
        .then((res) => res.data.data),
  });
  return response;
}
