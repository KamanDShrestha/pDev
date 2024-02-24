import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { ErrorResponse, UpdateUserDetailsData } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useUpdateUserDetails() {
  const response = useMutation({
    mutationFn: (data: UpdateUserDetailsData) =>
      axiosInstance.patch('/users/updateDetails', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(error);
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
