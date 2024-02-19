import { axiosInstance } from '../../constants';
import { EmbarkedJourneyCount } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetCompletedJourneysCount() {
  const response = useQuery<EmbarkedJourneyCount>({
    queryKey: ['completedJourneysCount'],
    queryFn: () =>
      axiosInstance
        .get('/progress/getCompletedJourneysCount')
        .then((res) => res.data.data),
  });
  return response;
}
