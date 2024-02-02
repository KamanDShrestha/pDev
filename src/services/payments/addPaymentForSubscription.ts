import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AddPaymentData, ErrorResponse } from '../../types';

export default function useAddPaymentForSubscription() {
  const response = useMutation({
    mutationFn: (data: AddPaymentData) =>
      axiosInstance.post('/payments/add', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}
