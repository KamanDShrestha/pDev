import { axiosInstance } from '../../constants';
import { EmbarkedJourney } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetCurrentEmbarkedJourney(userId: string) {
  const response = useQuery<EmbarkedJourney>({
    queryKey: ['currentEmbarkedJourney', userId],
    queryFn: () =>
      axiosInstance
        .get(`/progress/getCurrentJourney/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
