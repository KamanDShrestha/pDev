import { axiosInstance } from '../../constants';
import { ErrorResponse, UpdateQuestionPromptStatusData } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdatePromptVerificationStatus() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: UpdateQuestionPromptStatusData) =>
      axiosInstance
        .put('/questionPrompts/updateStatus', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response);
      queryClient.invalidateQueries(['questionPrompts']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error);
    },
  });
  return response;
}
