import { PostData } from '@/src/types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export function useGetPosts(communityId: string) {
  const response = useQuery<PostData[]>({
    queryKey: ['posts'],
    queryFn: () =>
      axiosInstance
        .get(`/posts/get/${communityId}`)
        .then((res) => res.data.data),
  });
  return response;
}
