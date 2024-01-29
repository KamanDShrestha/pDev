import { axiosInstance } from '../../constants';
import { DeletePromptEntry, ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useDeleteQuestionPrompt() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: DeletePromptEntry) =>
      axiosInstance
        .delete(`/questionPrompts/delete/${data.promptId}`)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['questionPrompts']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error);
    },
  });
  return response;
}
