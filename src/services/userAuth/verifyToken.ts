import { BACKEND_URL } from '@/src/constants';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function useVerifyToken() {
  const response = useMutation({
    mutationFn: ({
      email,
      verificationToken,
    }: {
      email: string;
      verificationToken: string;
    }) =>
      axios
        .post(`${BACKEND_URL}/users/verifyEmail`, {
          email,
          verificationToken,
        })
        .then((response) => response.data),
  });
  return response;
}
