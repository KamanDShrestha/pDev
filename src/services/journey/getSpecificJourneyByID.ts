import { axiosInstance } from '../../constants';
import { JourneyData } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetSpecificJourneyByID(id: string) {
  const response = useQuery<JourneyData>({
    queryKey: ['journey', id],
    queryFn: () =>
      axiosInstance
        .get(`/journey/get/${id}`)
        .then((response) => response.data.journey),
  });
  return response;
}
