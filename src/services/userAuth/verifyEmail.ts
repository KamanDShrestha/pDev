import { BACKEND_URL } from '@/src/constants';
import { ErrorResponse } from '@/src/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useVerifyEmail() {
  const response = useMutation({
    mutationFn: ({ email, name }: { email: string; name: string }) =>
      axios
        .post(`${BACKEND_URL}/users/sendVerificationEmail`, { email, name })
        .then((response) => response.data),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
