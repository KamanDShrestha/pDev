import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse, QAsData } from '../../types';

export default function useDeleteQA(communityId: string) {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (QAId: string) =>
      axiosInstance.delete(`/questions/${QAId}`).then((res) => res.data),
    onMutate: async (QAId: string) => {
      await queryClient.cancelQueries(['QAs', communityId]);
      const previousQAs = queryClient.getQueryData(['QAs', communityId]);
      queryClient.setQueryData(
        ['QAs', communityId],
        (old: QAsData[] | undefined) => {
          return old?.filter((QA: QAsData) => QA._id !== QAId);
        }
      );
      return { previousQAs };
    },
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response, 'response after deleting');
      queryClient.invalidateQueries(['QAs', communityId]);
      queryClient.invalidateQueries(['posts']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured.');
      console.log(error);
    },
  });
  return response;
}
