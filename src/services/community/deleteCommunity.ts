import { axiosInstance } from '../../constants';
import { ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useDeleteCommunity() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (communityId: string) =>
      axiosInstance
        .delete(`/communities/${communityId}`)
        .then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response);
      queryClient.invalidateQueries(['communities']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured.');
    },
  });
  return response;
}
