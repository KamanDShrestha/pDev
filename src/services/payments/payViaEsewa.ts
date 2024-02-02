import { PayViaEsewaDetails } from '../../types';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';

export default function usePayViaEsewa() {
  const response = useMutation({
    mutationFn: (data: PayViaEsewaDetails) =>
      axiosInstance.post('/payments/pay/eSewa', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return response;
}
