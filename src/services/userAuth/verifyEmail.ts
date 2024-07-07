import { BACKEND_URL } from '@/src/constants';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function useVerifyEmail() {
  const response = useMutation({
    mutationFn: ({ email, name }: { email: string; name: string }) =>
      axios
        .post(`${BACKEND_URL}/users/sendVerificationEmail`, { email, name })
        .then((response) => response.data),
  });
  return response;
}
