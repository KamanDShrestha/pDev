import { axiosInstance } from '../../constants';
import { EmbarkedJourney } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetCompletedEmbarkedJourneys(userId: string) {
  const response = useQuery<EmbarkedJourney[]>({
    queryKey: ['completedEmbarkedJourneys', userId],
    queryFn: () =>
      axiosInstance
        .get(`/embarked_journeys/completed/${userId}`)
        .then((res) => res.data.data),
  });

  return response;
}
