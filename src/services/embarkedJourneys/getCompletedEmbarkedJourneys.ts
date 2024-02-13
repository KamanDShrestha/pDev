import { axiosInstance } from '../../constants';
import { EmbarkedJourney } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetCompletedEmbarkedJourneys(userId: string) {
  const response = useQuery<EmbarkedJourney[]>({
    queryKey: ['completedEmbarkedJourneys', userId],
    queryFn: () =>
      axiosInstance
        .get(`/progress/getCompletedJourneys/${userId}`)
        .then((res) => res.data.data),
  });

  return response;
}
