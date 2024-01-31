import { SubscriptionPlan } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetSubscriptionPlans() {
  const response = useQuery<SubscriptionPlan[]>({
    queryKey: ['subscriptionPlans'],
    queryFn: () =>
      axiosInstance.get('/subscriptions/get').then((res) => res.data.data),
  });
  return response;
}
