import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetJourneyCompletionStatus(
  userId: string,
  journeyId: string
) {
  const response = useQuery({
    queryKey: ['completionStatus', userId, journeyId],
    enabled: !!userId && !!journeyId && journeyId !== 'newJourney',
    queryFn: () =>
      axiosInstance
        .get(`/embarked_journeys/completion_status/${userId}/${journeyId}`)
        .then((res) => res.data.data),
  });
  return response;
}
