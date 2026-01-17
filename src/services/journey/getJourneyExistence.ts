import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetJourneyExistence(journeyId: string) {
  const response = useQuery<boolean>({
    queryKey: ['journeyExistence', journeyId],
    queryFn: () =>
      axiosInstance
        .get(`/journeys/existence/${journeyId}`)
        .then((res) => res.data.data),
  });
  return response;
}
