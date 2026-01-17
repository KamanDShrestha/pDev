import { axiosInstance } from '../../constants';
import { JourneyData } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetSpecificJourney({ name, id }: { name?: string, id?: string }) {
  const response = useQuery<JourneyData>({
    queryKey: ['journey', name, id],
    enabled: !!name || !!id,
    queryFn: () =>
      axiosInstance
        .get(`/journeys/specific`, {
          params: { name, id }
        })
        .then((response) => response.data.journey),
  });
  return response;
}
