import { axiosInstance } from '../../constants';
import { EditCommunityData, ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useEditCommunityDetails() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: EditCommunityData) =>
      axiosInstance.patch('/communities', data).then((res) => res.data),
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
