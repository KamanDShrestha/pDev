import { axiosInstance } from '../../constants';
import { ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useDeleteCommunity() {
  const response = useMutation({
    mutationFn: (communityId: string) =>
      axiosInstance
        .delete(`/community/delete/${communityId}`)
        .then((res) => res.data.status),
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured.');
    },
  });
  return response;
}
