import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types';

export default function useUpdateStatus() {
  const response = useMutation({
    mutationFn: (data: { feedbackId: string; feedbackStatus: string }) =>
      axiosInstance
        .patch(`/prompt_feedbacks/status/${data.feedbackId}`, {
          feedbackStatus: data.feedbackStatus,
        })
        .then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}
