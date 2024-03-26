import { axiosInstance } from '../../constants';
import { ErrorResponse, QAsData } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useEditQA() {
  const response = useMutation({
    mutationFn: (data: { questionId: string; questionEditFields: QAsData }) =>
      axiosInstance.patch('/QAs/edit', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(
        (error.response?.data.message as string) || 'An error occurred.'
      );
    },
  });
  return response;
}
