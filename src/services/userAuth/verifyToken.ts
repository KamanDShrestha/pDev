import { BACKEND_URL } from '@/src/constants';
import { ErrorResponse } from '@/src/types';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useVerifyToken() {
  const result = useMutation({
    mutationFn: ({
      email,
      verificationToken,
    }: {
      email: string;
      verificationToken: string;
    }) =>
      axios
        .post(
          `${BACKEND_URL}/users/verifyEmail`,
          {
            email,
            verificationToken,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => response.data),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  console.log(result);
  return result;
}
