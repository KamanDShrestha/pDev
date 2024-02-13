import { PostCountData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetPostsCount(userId: string) {
  const response = useQuery<PostCountData>({
    queryKey: ['postsCount', userId],
    queryFn: () =>
      axiosInstance.get(`/posts/count/${userId}`).then((res) => res.data.data),
  });
  return response;
}
