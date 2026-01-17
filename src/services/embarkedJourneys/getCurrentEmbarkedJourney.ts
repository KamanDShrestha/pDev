import { axiosInstance } from '../../constants';
import { EmbarkedJourney } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetCurrentEmbarkedJourney(userId: string) {
  const response = useQuery<EmbarkedJourney>({
    queryKey: ['currentEmbarkedJourney', userId],
    queryFn: () =>
      axiosInstance
        .get(`/embarked_journeys/ongoing/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
