import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetLikedStatus(postId: string, userId: string) {
  const response = useQuery<boolean>({
    queryKey: ['likedStatus', postId, userId],
    queryFn: () =>
      axiosInstance
        .get(`/posts/hasLiked/${postId}/${userId}`)
        .then((res) => res.data.status),
  });
  return response;
}
