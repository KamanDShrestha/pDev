import { axiosInstance } from '@/src/constants';
import { ErrorResponse } from '@/src/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdatePingStatus() {
  const response = useMutation({
    mutationFn: ({
      acceptingUser,
      acceptedUser,
      activeStatus,
    }: {
      acceptingUser: string;
      acceptedUser: string;
      activeStatus: string;
    }) =>
      axiosInstance
        .patch(`/pings/status`, {
          acceptingUser,
          acceptedUser,
          activeStatus,
        })
        .then((response) => response.data),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred.');
    },
  });
  return response;
}
