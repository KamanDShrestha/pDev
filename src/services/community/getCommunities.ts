import { CommunityData } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetCommunities() {
  const response = useQuery<CommunityData[]>({
    queryKey: ['communities'],
    queryFn: () =>
      axiosInstance.get('/communities').then((res) => res.data.data),
  });
  return response;
}
