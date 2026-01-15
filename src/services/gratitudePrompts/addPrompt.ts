import { ErrorResponse, GratitudeJournalPrompt } from '../../types';
import { axiosInstance } from '../../constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export default function useAddPrompt() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: GratitudeJournalPrompt) =>
      axiosInstance
        .post('/gratitude_journal_prompts', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['graditudePrompts']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}
