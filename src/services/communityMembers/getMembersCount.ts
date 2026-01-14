import { axiosInstance } from '../../constants';
import { MembersCount } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetMembersCount() {
  const response = useQuery<MembersCount>({
    queryKey: ['membersCountInJourney'],
    queryFn: () =>
      axiosInstance
        .get('/community_members/count')
        .then((res) => res.data.data),
  });
  return response;
}
