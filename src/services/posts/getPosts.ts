import { PostData, QAsData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

type FetchQueryPost = {
  category?: string | undefined;
  sortBy?: string | undefined;
  sortDirection: string | undefined;
  limit?: number;
  skip: number;
};

export function useGetPosts(
  communityId: string,
  fetchQueryPost?: FetchQueryPost
) {
  const response = useQuery<
    { posts: PostData[]; total: number } | { posts: QAsData[]; total: number }
  >({
    queryKey: ['posts', communityId, fetchQueryPost],
    queryFn: () =>
      axiosInstance
        .get(`/posts/get/${communityId}`, {
          params: {
            category: fetchQueryPost?.category,
            sortBy: fetchQueryPost?.sortBy,
            sortDirection: fetchQueryPost?.sortDirection,
            limit: fetchQueryPost?.limit,
            skip: fetchQueryPost?.skip,
          },
        })
        .then((res) => res.data.data),
  });
  return response;
}
