import { axiosInstance } from '../../constants';
import { AddAnswerData, ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useAddAnswer() {
  const response = useMutation({
    mutationFn: (data: AddAnswerData) =>
      axiosInstance.post('/QAs/add/answer', data).then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured.');
      console.log(error);
    },
  });
  return response;
}
