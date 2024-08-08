import { axiosInstance } from '@/src/constants';
import { ConversationData } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetConversations({
  senderId,
  recipientId,
  limit,
}: {
  senderId: string | null | undefined;
  recipientId: string | null | undefined;
  limit: number;
}) {
  const response = useQuery<ConversationData>({
    queryKey: ['conversations', senderId, recipientId, limit],
    queryFn: () =>
      axiosInstance
        .get(`/chat/get/${senderId}/${recipientId}/${limit}`)
        .then((response) => response.data.data),
    enabled: !!senderId && !!recipientId,
  });
  return response;
}
