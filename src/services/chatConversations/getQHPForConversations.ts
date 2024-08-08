import { axiosInstance } from '@/src/constants';
import { QHPData } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetQHPForConversations() {
  const response = useQuery<QHPData[]>({
    queryKey: ['conversations', 'qhps'],
    queryFn: () =>
      axiosInstance
        .get('/users/getQHPs')
        .then((response) => response.data.data),
  });
  return response;
}
