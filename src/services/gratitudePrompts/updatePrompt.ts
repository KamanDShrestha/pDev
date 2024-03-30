import { axiosInstance } from '../../constants';
import { ErrorResponse, GratitudeJournalPrompt } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdatePrompt() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: {
      promptId: string;
      promptEditFields: GratitudeJournalPrompt;
    }) =>
      axiosInstance
        .patch('/gratitudeJournalPrompts/update', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['graditudePrompts']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}
