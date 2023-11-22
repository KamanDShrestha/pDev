import { axiosInstance } from '@/src/constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetEmbarkedJourneyById(embarkedJourneyId: string) {
  const response = useQuery({
    queryKey: ['embarkedJourney', embarkedJourneyId],
    queryFn: () =>
      axiosInstance
        .get(`/progress/embarkedJourney/${embarkedJourneyId}`)
        .then((res) => res.data),
  });
  return response;
}
