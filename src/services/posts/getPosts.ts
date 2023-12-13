import { axiosInstance } from '@/src/constants';
import { useQuery } from '@tanstack/react-query';

export async function useGetPosts(communityId: string) {
  const response = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      axiosInstance
        .get(`/posts/get/${communityId}`)
        .then((res) => res.data.data),
  });
  return response;
}
