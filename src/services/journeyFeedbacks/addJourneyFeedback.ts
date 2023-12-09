import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { AddJourneyFeedbackData, ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useAddJourneyFeedback() {
  const response = useMutation({
    mutationFn: (data: AddJourneyFeedbackData) =>
      axiosInstance.post('/journeyFeedbacks/add', data).then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
