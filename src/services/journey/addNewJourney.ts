import { ErrorResponse } from '../../types';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
export function useAddNewJourney() {
  const response = useMutation({
    mutationFn: (data: FormData) =>
      axiosInstance
        .post('/journeys', data)
        .then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success('This journey has been added successfully');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });

  return response;
}
