import { BACKEND_URL } from '@/src/constants';
import { ObtainedNotification } from '@/src/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetAllNotifications(userId: string) {
  const response = useQuery<ObtainedNotification[]>({
    queryKey: ['notifications', userId],
    queryFn: () =>
      axios
        .get(`${BACKEND_URL}/notifications/get/${userId}`, {
          withCredentials: true,
        })
        .then((response) => response.data.data),
  });
  return response;
}
