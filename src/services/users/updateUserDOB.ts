import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { ErrorResponse, UpdateUserDOBData } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useUpdateUserDOB() {
  const response = useMutation({
    mutationFn: (data: UpdateUserDOBData) =>
      axiosInstance
        .patch('/users/dob', data)
        .then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error.response?.data.message);
    },
  });
  return response;
}
