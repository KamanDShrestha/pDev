import { axiosInstance } from '../../constants';
import { EmbarkedJourneyCount } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetOngoingJourneysCount() {
  const response = useQuery<EmbarkedJourneyCount>({
    queryKey: ['ongoingJourneysCount'],
    queryFn: () =>
      axiosInstance
        .get('/progress/getOngoingJourneysCount')
        .then((res) => res.data.data),
  });
  return response;
}
