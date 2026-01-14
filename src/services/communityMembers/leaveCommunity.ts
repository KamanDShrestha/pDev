import { axiosInstance } from '../../constants';
import { ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useLeaveCommunity() {
  const response = useMutation({
    mutationFn: (data: { communityId: string; userId: string }) =>
      axiosInstance
        .patch('/community_members', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(
        (error.response?.data.message as string) || 'An error occurred.'
      );
    },
  });
  return response;
}
