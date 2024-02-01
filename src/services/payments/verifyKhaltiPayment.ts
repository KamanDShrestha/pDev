import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useVerifyKhaltiPayment(pidx: string) {
  const response = useQuery({
    queryKey: ['verifyKhaltiPayment', pidx],
    queryFn: () =>
      axiosInstance
        .post('/payments/verify/khalti', { pidx: pidx })
        .then((res) => res.data.data),
  });
  return response;
}
