import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { ErrorResponse, UpdateActionCompletionData } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useUpdateActionCompletion() {
  const response = useMutation({
    mutationFn: (data: UpdateActionCompletionData) =>
      axiosInstance.patch('/progress/updateActionStepCompletion', data),
    onSuccess: () => {
      toast.success(
        "You have successfully completed your today's action step. 🎉"
      );
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}
