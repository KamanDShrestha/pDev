import { axiosInstance } from '@/src/constants';
import { UserLikes } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetUsersLiking(postId: string) {
  const response = useQuery<UserLikes[]>({
    queryKey: ['posts', 'usersLiking', postId],
    queryFn: () =>
      axiosInstance
        .get(`/posts/getUsersLiking/${postId}`)
        .then((response) => response.data.data),
  });
  return response;
}
