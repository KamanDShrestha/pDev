import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../constants';
import toast from 'react-hot-toast';
import { ErrorResponse, UpdateJourneyFeedbackStatusData } from '../../types';
import { AxiosError } from 'axios';

export function useUpdateJourneyFeedbackStatus() {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationFn: (data: UpdateJourneyFeedbackStatusData) =>
      axiosInstance
        .patch('/journey_feedbacks/status', data)
        .then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(['journeyFeedbacks']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
      console.log(error);
    },
  });
  return response;
}
