import { axiosInstance } from '@/src/constants';
import { ErrorResponse } from '@/src/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdatePingRequestStatus() {
  const response = useMutation({
    mutationFn: ({
      senderId,
      recipientId,
      status,
    }: {
      senderId: string;
      recipientId: string;
      status: string;
    }) =>
      axiosInstance
        .patch(`/ping_requests/status`, {
          senderId,
          recipientId,
          status,
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
