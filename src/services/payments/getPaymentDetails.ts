import { PaymentData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetPaymentDetails(userId: string) {
  const response = useQuery<PaymentData[]>({
    queryKey: ['paymentDetails', userId],
    queryFn: () =>
      axiosInstance
        .get(`/payments/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
