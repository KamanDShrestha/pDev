import { axiosInstance } from '../../constants';
import { JourneyData } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetSpecificJourney(name: string) {
  const response = useQuery<JourneyData>({
    queryKey: ['journey', name],
    queryFn: () =>
      axiosInstance
        .get(`/journeys/${name}`)
        .then((response) => response.data.journey),
  });
  return response;
}
