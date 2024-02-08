import { axiosInstance } from '../../constants';
import { ErrorResponse, UpdateSubscriptionPlanData } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdateSubscriptionPlan() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: UpdateSubscriptionPlanData) =>
      axiosInstance.put('/subscriptions/update', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['subscriptionPlans']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
