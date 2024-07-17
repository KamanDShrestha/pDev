import { axiosInstance } from '@/src/constants';
import { ErrorResponse } from '@/src/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useAddPing() {
  const response = useMutation({
    mutationFn: ({
      acceptingUser,
      acceptedUser,
    }: {
      acceptingUser: string;
      acceptedUser: string;
    }) =>
      axiosInstance
        .post('/ping/add', { acceptedUser, acceptingUser })
        .then((response) => response.data),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured.');
    },
  });
  return response;
}
