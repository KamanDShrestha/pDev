import { axiosInstance } from '../../constants';
import { ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useDiscontinueJourney() {
  const response = useMutation({
    mutationFn: (data: { userId: string; journeyId: string }) =>
      axiosInstance
        .patch('/progress/discontinueJourney', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data);
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}
