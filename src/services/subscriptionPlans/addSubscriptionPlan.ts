import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { AddSubscriptionPlanData, ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useAddSubscriptionPlan() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: AddSubscriptionPlanData) =>
      axiosInstance.post('/subscriptions', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['subscriptionPlans']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error);
    },
  });
  return response;
}
