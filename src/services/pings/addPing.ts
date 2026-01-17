import { axiosInstance } from '@/src/constants';
import { useAuthContext } from '@/src/context/AuthProvider';
import { ErrorResponse } from '@/src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useAddPing() {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: ({
      acceptingUser,
      acceptedUser,
    }: {
      acceptingUser: string;
      acceptedUser: string;
    }) =>
      axiosInstance
        .post('/pings', { acceptedUser, acceptingUser })
        .then((response) => response.data),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(['pings', user?.id]);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured.');
    },
  });
  return response;
}
