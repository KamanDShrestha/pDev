import { AddQuestionPromptData, ErrorResponse } from '../../types';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export default function useAddQuestionPrompt() {
  const response = useMutation({
    mutationFn: (data: AddQuestionPromptData) =>
      axiosInstance.post('/questionPrompts/add', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error);
    },
  });

  return response;
}
