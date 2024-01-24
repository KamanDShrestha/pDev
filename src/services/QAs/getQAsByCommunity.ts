import { axiosInstance } from '@/src/constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetQAsByCommunity(communityId: string) {
  const response = useQuery({
    queryKey: ['QAs', communityId],
    queryFn: () =>
      axiosInstance.get(`/QAs/get/${communityId}`).then((res) => res.data.data),
  });
  return response;
}
