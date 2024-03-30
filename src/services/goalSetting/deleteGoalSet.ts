import { axiosInstance } from '../../constants';
import { ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useDeleteGoalSet() {
  const response = useMutation({
    mutationFn: (goalSetId: string) =>
      axiosInstance
        .delete(`/goalSetting/delete/${goalSetId}`)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}
