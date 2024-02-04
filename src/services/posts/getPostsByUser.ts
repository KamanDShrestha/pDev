import { axiosInstance } from '../../constants';
import { PostData } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetPostsByUser(communityId: string, userId: string) {
  const response = useQuery<PostData[]>({
    queryKey: ['posts', communityId, userId],
    queryFn: () =>
      axiosInstance
        .get(`/posts/get/${communityId}/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
