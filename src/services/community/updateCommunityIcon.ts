import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types';

export default function useUpdateCommunityIcon() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: FormData) =>
      axiosInstance.patch('/communities/icon', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['communities']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(error.response?.data.message);
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });

  return response;
}
