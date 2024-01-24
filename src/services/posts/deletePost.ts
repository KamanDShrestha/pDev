import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse, PostData } from '../../types';

export default function useDeletePost(communityId: string, category: string) {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (postId: string) =>
      axiosInstance.delete(`/posts/delete/${postId}`).then((res) => res.data),
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries([
        'posts',
        communityId,
        { category: category },
      ]);
      const previousPosts = queryClient.getQueryData([
        'posts',
        communityId,
        { category: category },
      ]);
      queryClient.setQueryData(
        ['posts', communityId, { category: category }],
        (old: PostData[] | undefined) => {
          return old?.filter((post: PostData) => post._id !== postId);
        }
      );
      return { previousPosts };
    },
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response, 'response after deleting');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured.');
      console.log(error);
    },
  });
  return response;
}
