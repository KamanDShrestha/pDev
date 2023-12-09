import { axiosInstance } from '../../constants';
import { AddJourneyFeedbackData } from '../../types';
import { useMutation } from '@tanstack/react-query';

export default function useAddJourneyFeedback() {
  const response = useMutation({
    mutationFn: (data: AddJourneyFeedbackData) =>
      axiosInstance.post('/journeyFeedbacks/add', data).then((res) => res.data),
  });
  return response;
}
