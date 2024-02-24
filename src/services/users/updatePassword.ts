import { axiosInstance } from '../../constants';
import { ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdatePassword() {
  const response = useMutation({
    mutationFn: (data: {
      userId: string;
      currentPassword: string;
      newPassword: string;
    }) =>
      axiosInstance
        .patch('/users/updatePassword', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occured.');
    },
  });
  return response;
}
