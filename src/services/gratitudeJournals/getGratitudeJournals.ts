import { GratitudeJournals } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetGratitudeJournals(userId: string) {
  const response = useQuery<GratitudeJournals[]>({
    queryKey: ['gratitudeJournals', userId],
    queryFn: () =>
      axiosInstance
        .get(`/gratitude_journals/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
