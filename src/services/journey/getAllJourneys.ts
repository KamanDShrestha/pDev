import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';
import { JourneyData } from '../../types';

export function useGetAllJourneys() {
  const response = useQuery<JourneyData[]>({
    queryKey: ['journeys'],
    queryFn: () =>
      axiosInstance
        .get('/journeys')
        .then((response) => response.data.allJourneys),
  });

  return response;
}
