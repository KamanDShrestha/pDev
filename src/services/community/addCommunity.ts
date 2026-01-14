import { axiosInstance } from '../../constants';
import { ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useAddCommunity() {
  const response = useMutation({
    mutationFn: (data: FormData) =>
      axiosInstance.post('/communities', data).then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data.message ||
        'An error occurred while adding community.'
      );
    },
  });

  return response;
}
