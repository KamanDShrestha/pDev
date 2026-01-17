import { axiosInstance } from '../../constants';
import { EmbarkedJourney } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllEmbarkedJourneys(userId: string) {
  const response = useQuery<EmbarkedJourney[]>({
    queryKey: ['embarkedJourney', userId],
    queryFn: () =>
      axiosInstance
        .get(`/embarked_journeys/${userId}`)
        .then((res) => res.data.embarkedJourneys),
  });
  return response;
}
