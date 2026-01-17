import { axiosInstance } from '@/src/constants';
import { AllConversationData } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllConversations(userId: string) {
  const response = useQuery<AllConversationData[]>({
    queryKey: ['allConversations', userId],
    queryFn: () =>
      axiosInstance
        .get(`/chats/${userId}`)
        .then((response) => response.data.data),
  });
  return response;
}
