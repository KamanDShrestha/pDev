import { AxiosError } from 'axios';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from '@/src/types';
import toast from 'react-hot-toast';

export default function useContinueJourney() {
  const response = useMutation({
    mutationFn: (data: { userId: string; journeyId: string }) =>
      axiosInstance
        .patch('/progress/continueJourney', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
