import { axiosInstance } from '@/src/constants';
import { QHPData } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetQHPForConversations() {
  const response = useQuery<QHPData[]>({
    queryKey: ['conversations', 'qhps'],
    queryFn: () =>
      axiosInstance
        .get('/qhps/')
        .then((response) => response.data.data),
  });
  return response;
}
