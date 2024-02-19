import { axiosInstance } from '../../constants';
import { EmbarkedJourneyCount } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetDiscontinuedJourneysCount() {
  const response = useQuery<EmbarkedJourneyCount>({
    queryKey: ['discontinuedJourneysCount'],
    queryFn: () =>
      axiosInstance
        .get('/progress/getDiscontinuedJourneysCount')
        .then((res) => res.data.data),
  });
  return response;
}
