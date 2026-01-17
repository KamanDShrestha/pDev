import { JourneyFeedbacks } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetJourneyFeedbacks() {
  const response = useQuery<JourneyFeedbacks[]>({
    queryKey: ['journeyFeedbacks'],
    queryFn: () =>
      axiosInstance.get('/journey_feedbacks').then((res) => res.data.data),
  });
  return response;
}
