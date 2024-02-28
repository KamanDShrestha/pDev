import { axiosInstance } from '../../constants';
import { ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdateProfileImage() {
  const response = useMutation({
    mutationFn: (data: FormData) =>
      axiosInstance
        .patch('/users/updateProfilePicture', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data);
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}
