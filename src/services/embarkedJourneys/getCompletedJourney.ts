import { axiosInstance } from '../../constants';
import { EmbarkedJourney, ErrorResponse } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useGetCompletedJourney(
  userId: string,
  journeyId: string
) {
  const response = useQuery<EmbarkedJourney, AxiosError<ErrorResponse>>({
    queryKey: ['completedJourney', userId, journeyId],
    queryFn: () =>
      axiosInstance
        .get(`/progress/getCompleted/${userId}/${journeyId}`)
        .then((res) => res.data.completedJourney),
  });

  return response;
}
