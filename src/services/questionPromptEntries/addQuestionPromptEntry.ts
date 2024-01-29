import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { AddQuestionPromptEntryData, ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useAddQuestionPromptEntry() {
  const response = useMutation({
    mutationFn: (data: AddQuestionPromptEntryData) =>
      axiosInstance
        .post('/questionPromptEntries/add', data)
        .then((res) => res.data),
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
