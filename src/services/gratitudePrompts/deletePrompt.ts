import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types';

export default function useDeletePrompt() {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationFn: (promptId: string) =>
      axiosInstance
        .delete(`/gratitudeJournalPrompts/delete/${promptId}`)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['graditudePrompts']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}
