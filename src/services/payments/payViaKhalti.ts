import { PayViaKhaltiDetails } from '../../types';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';

export default function usePayViaKhalti() {
  const response = useMutation({
    mutationFn: (data: PayViaKhaltiDetails) =>
      axiosInstance
        .post('/payments/pay/khalti', data)
        .then((res) => res.data.data),
    onError: (error) => console.log(error),
  });
  return response;
}
