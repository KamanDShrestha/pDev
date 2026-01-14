import { AddEmbarkedJourneyData, ErrorResponse } from '../../types';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export default function useAddEmbarkedJourney() {
  const response = useMutation({
    mutationFn: (data: AddEmbarkedJourneyData) =>
      axiosInstance.post('/embarked_journeys', data).then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error);
    },
  });
  return response;
}
