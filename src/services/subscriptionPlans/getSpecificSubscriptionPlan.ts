import { SubscriptionPlan } from '@/src/types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetSpecificSubscriptionPlan(planId: string) {
  const response = useQuery<SubscriptionPlan>({
    queryKey: ['subscriptionPlans', planId],
    queryFn: () =>
      axiosInstance
        .get(`/subscriptions/get/${planId}`)
        .then((res) => res.data.data),
  });
  return response;
}
