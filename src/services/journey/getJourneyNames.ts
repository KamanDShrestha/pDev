import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetJourneyNames() {
  const response = useQuery<string[]>({
    queryKey: ['journeyNames'],
    queryFn: () =>
      axiosInstance.get('/journeys/getNames').then((res) => res.data.data),
  });
  return response;
}
