import { GetEmbarkedJourneyData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetEmbarkedJourney(
  userId: string,
  journeyId: string
) {
  const response = useQuery<GetEmbarkedJourneyData>({
    queryKey: ['embarkedJourney', userId, journeyId],
    queryFn: () =>
      axiosInstance
        .get(`/progress/get/${userId}/${journeyId}`)
        .then((res) => res.data),
  });

  return response;
}
