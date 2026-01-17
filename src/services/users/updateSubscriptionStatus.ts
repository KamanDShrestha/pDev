import { axiosInstance } from '../../constants';
import { ErrorResponse, UpdateSubscriptionStatusData } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdateSubscriptionStatus() {
  const response = useMutation({
    mutationFn: (data: UpdateSubscriptionStatusData) =>
      axiosInstance
        .patch('/users/subscription', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error);
    },
  });
  return response;
}
