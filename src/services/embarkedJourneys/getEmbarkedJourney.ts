import { EmbarkedJourney, ErrorResponse } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useGetEmbarkedJourney(
  userId: string,
  journeyId: string
) {
  const response = useQuery<EmbarkedJourney, AxiosError<ErrorResponse>>({
    queryKey: ['embarkedJourney', userId, journeyId],
    enabled: !!userId && !!journeyId && journeyId !== 'newJourney',
    queryFn: () =>
      axiosInstance
        .get(`/embarked_journeys/specific/${userId}/${journeyId}`)
        .then((res) => res.data.embarkedJourney),
  });

  return response;
}
