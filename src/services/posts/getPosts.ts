import { PostData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

type FetchQueryPost = {
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export function useGetPosts(
  communityId: string,
  fetchQueryPost?: FetchQueryPost
) {
  const response = useQuery<PostData[]>({
    queryKey: ['posts', communityId, fetchQueryPost],
    queryFn: () =>
      axiosInstance
        .get(`/posts/get/${communityId}`, {
          params: {
            category: fetchQueryPost?.category,
          },
        })
        .then((res) => res.data.data),
  });
  return response;
}
